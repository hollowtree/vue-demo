<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


        var data = [
            { letter: 'A', frequency: 0.08167 },
            { letter: 'B', frequency: 0.01492 },
            { letter: 'C', frequency: 0.02780 },
            { letter: 'D', frequency: 0.04253 },
            { letter: 'E', frequency: 0.12702 }
        ]

        var x = d3.scaleBand()
            // .domain()
            .range([0, width])

        var y = d3.scaleLinear()
            .range([height, 0])

        var xAxis = d3.axisBottom(x)


        var yAxis = d3.axisLeft(y)

        var svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


        x.domain(data.map(function (d) {
            return d.letter
        }))

        y.domain([0, d3.max(data, function (d) {
            return d.frequency
        })])

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
        // .append('text')
        // .attr('transform', 'rotate(-90)')
        // .attr('y', 6)
        // .attr('dy', '.71em')
        // .style('text-anchor', 'end')
        // .text('Frequency')

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) {
                return x(d.letter)
            })
            .attr('width', function (d) {
                return 20
            })
            .attr('y', function (d) {
                return y(d.frequency)
            })
            .attr('height', function (d) {
                return height - y(d.frequency)
            })
            .attr('transform', 'translate(' + (width / data.length / 2 - 10) + ',0)')

        // d3.select("input").property("checked", true).each(change);

        setTimeout(function () {
            var x0 = x.domain(data.sort(true ? function (a, b) { return b.frequency - a.frequency; } : function (a, b) { return d3.ascending(a.letter, b.letter); })
                .map(function (d) { return d.letter; }))
                .copy();

            svg.selectAll(".bar")
                .sort(function (a, b) { return x0(a.letter) - x0(b.letter); });

            var transition = svg.transition().duration(1000),
                delay = function (d, i) { return i * 100; };

            transition.selectAll(".bar")
                .delay(delay)
                .attr("x", function (d) { return x0(d.letter); });

            transition.select(".x.axis")
                .call(xAxis)
                .selectAll("g")
                .delay(delay);
        }, 1000);
    }
}
</script>
