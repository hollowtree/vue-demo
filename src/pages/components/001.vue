<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var data = [2, 3, 6, 8, 9, 23, 67]
        var width = 800,
            barHeight = 20

        var x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, width])

        var chart = d3.select("#chart")
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', barHeight * data.length)

        var bar = chart.selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')' })

        bar.append('rect')
            .attr('width', x)
            .attr('height', barHeight - 1)

        bar.append('text')
            .attr('x', function (d) { return x(d) - 3 })
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .text(function (d) { return d })
    }
}
</script>
