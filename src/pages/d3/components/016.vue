<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3

        var randomX = d3.randomUniform(0, 10),
            randomY = d3.randomNormal(0.5, 0.12),
            data = d3.range(800).map(function () { return [randomX(), randomY()]; });

        var svg = d3.select('#chart')
            .append('svg')
            .attr('height', 500)
            .attr('width', 960),
            margin = { top: 194, right: 50, bottom: 214, left: 50 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width])

        var y = d3.scaleLinear()
            .range([height, 0])

        var brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("start brush", brushed);

        var dot = g.append("g")
            .attr("fill-opacity", 0.2)
            .selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("transform", function (d) { return "translate(" + x(d[0]) + "," + y(d[1]) + ")"; })
            .attr("r", 3.5);

        g.append("g")
            .call(brush)
            .call(brush.move, [3, 5].map(x))
            .selectAll(".overlay")
            .on("mousedown touchstart", beforebrushed, true);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        function beforebrushed() {
            d3.event.stopImmediatePropagation();
            d3.select(this.parentNode).transition().call(brush.move, x.range());
        }

        function brushed() {
            var extent = d3.event.selection.map(x.invert, x);
            dot.classed("selected", function (d) { return extent[0] <= d[0] && d[0] <= extent[1]; });
        }
    }
}
</script>
<style>
.selected {
  fill: red;
  stroke: brown;
}
</style>



