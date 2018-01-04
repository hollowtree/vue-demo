<style>
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

path.line {
  fill: none;
  stroke-width: 1px;
  pointer-events: none;
}

.zoomOut {
  fill: #66a;
  cursor: pointer;
}

.zoomOutText {
  pointer-events: none;
  fill: #ccc;
}

.zoomOverlay {
  pointer-events: all;
  fill: none;
}

.band {
  fill: none;
  stroke-width: 2px;
  stroke: black;
}
</style>
<template>
    <div>
        <button> Zoom Out </button>
        <div id="chart">

        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const d3 = this.d3

        let data = [[], [], []];
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 3; j++) {
                data[j].push({
                    x: i * 5,
                    y: Math.random() * 100 - j * 50
                })
            }
        }

        var bandPos = [-1, -1];
        var colors = d3.scaleOrdinal(d3.schemeCategory10);

        var x, y, xDomain, yDomain, xDomainMin, yDomainMin, xAxis, yAxis, zoomArea, line;
        xDomain = 0;
        yDomain = 0;
        xDomainMin = 0;
        yDomainMin = 0;

        var margin = {
            top: 40,
            right: 40,
            bottom: 50,
            left: 60
        }
        var width = 900 - margin.left - margin.right;
        var height = 450 - margin.top - margin.bottom;
        var drag = d3.drag();

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var zoomOverlay = svg.append("rect")
            .attr("width", width - 10)
            .attr("height", height)
            .attr("class", "zoomOverlay")
            .call(drag);

        var band = svg.append("rect")
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "band");

        var zoomout = svg.append("g");

        drag.on("end", function () {
            var pos = d3.mouse(this);
            var x1 = x.invert(bandPos[0]);
            var x2 = x.invert(pos[0]);

            if (x1 < x2) {
                zoomArea.x1 = x1;
                zoomArea.x2 = x2;
            } else {
                zoomArea.x1 = x2;
                zoomArea.x2 = x1;
            }

            var y1 = y.invert(pos[1]);
            var y2 = y.invert(bandPos[1]);

            if (x1 < x2) {
                zoomArea.y1 = y1;
                zoomArea.y2 = y2;
            } else {
                zoomArea.y1 = y2;
                zoomArea.y2 = y1;
            }

            bandPos = [-1, -1];

            d3.select(".band").transition()
                .attr("width", 0)
                .attr("height", 0)
                .attr("x", bandPos[0])
                .attr("y", bandPos[1]);

            zoom();

        });

        drag.on("drag", function () {

            var pos = d3.mouse(this);

            if (pos[0] < bandPos[0]) {
                d3.select(".band").
                    attr("transform", "translate(" + (pos[0]) + "," + bandPos[1] + ")");
            }
            if (pos[1] < bandPos[1]) {
                d3.select(".band").
                    attr("transform", "translate(" + (pos[0]) + "," + pos[1] + ")");
            }
            if (pos[1] < bandPos[1] && pos[0] > bandPos[0]) {
                d3.select(".band").
                    attr("transform", "translate(" + (bandPos[0]) + "," + pos[1] + ")");
            }

            //set new position of band when user initializes drag
            if (bandPos[0] == -1) {
                bandPos = pos;
                d3.select(".band").attr("transform", "translate(" + bandPos[0] + "," + bandPos[1] + ")");
            }

            d3.select(".band").transition().duration(1)
                .attr("width", Math.abs(bandPos[0] - pos[0]))
                .attr("height", Math.abs(bandPos[1] - pos[1]));
        });

        function zoom() {
            if (zoomArea.x1 > zoomArea.x2) {
                x.domain([zoomArea.x2, zoomArea.x1]);
            } else {
                x.domain([zoomArea.x1, zoomArea.x2]);
            }

            if (zoomArea.y1 > zoomArea.y2) {
                y.domain([zoomArea.y2, zoomArea.y1]);
            } else {
                y.domain([zoomArea.y1, zoomArea.y2]);
            }

            var t = svg.transition().duration(750);
            t.select(".x.axis").call(xAxis);
            t.select(".y.axis").call(yAxis);
            t.selectAll(".line").attr("d", line);

        }
        function pullData() {
            var input;
            xDomain = 0;
            yDomain = 0;
            yDomainMin = 0;
            xDomainMin = 0;
            updateChart();
        }
        pullData()

        function updateChart() {
            var xmax, ymax, xmin, ymin;

            d3.selectAll('.line').remove();
            d3.selectAll(".axis").remove();

            data.forEach((da, idx) => {
                xmax = da.map(d => d.x).reduce((a, c) => Math.max(a, c))
                ymax = da.map(d => d.y).reduce((a, c) => Math.max(a, c))

                xmin = da.map(d => d.x).reduce((a, c) => Math.min(a, c))
                ymin = da.map(d => d.y).reduce((a, c) => Math.min(a, c))

                xDomain = Math.max(xDomain, xmax);
                yDomain = Math.max(yDomain, ymax);
                xDomainMin = Math.min(xDomainMin, xmin);
                yDomainMin = Math.min(yDomainMin, ymin);
            })
            xDomain += xDomain * .10;
            yDomain += yDomain * .10;
            xDomainMin += xDomainMin * .10;
            yDomainMin += yDomainMin * .10;


            line = d3.line()
                .x(function (d) {
                    return x(d.x);
                })
                .y(function (d) {
                    return y(d.y);
                });

            zoomArea = {
                x1: xDomainMin,
                y1: yDomainMin,
                x2: xDomain,
                y2: yDomain
            };

            x = d3.scaleLinear().range([0, width]).domain([xDomainMin, xDomain]);
            y = d3.scaleLinear().range([height, 0]).domain([yDomainMin, yDomain]);

            xAxis = d3.axisBottom(x)
            yAxis = d3.axisLeft(y)

            svg.append("g")
                .attr("class", "x axis")
                .call(xAxis)
                .attr("transform", "translate(0," + height + ")");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            data.forEach((da, idx) => {
                svg.append("path")
                    .datum(da)
                    .attr("class", "line line" + idx)
                    .attr("clip-path", "url(#clip)")
                    .style("stroke", colors(idx))
                    .attr("d", line);
            })

            d3.select(".band").raise();

            zoom();
        }

        var zoomOut = function () {
            x.domain([xDomainMin, xDomain]);
            y.domain([yDomainMin, yDomain]);

            var t = svg.transition().duration(750);
            t.select(".x.axis").call(xAxis);
            t.select(".y.axis").call(yAxis);

            t.selectAll(".line").attr("d", line);
        }
        document.querySelector('button').addEventListener('click', zoomOut)
    }
}
</script>



