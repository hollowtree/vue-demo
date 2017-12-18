<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var chartdata = [410, 370, 330, 300, 270, 240, 220, 200, 180, 165, 150, 135, 120,
            135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410]
        var height = 200,
            width = 800,
            barWidth = width / chartdata.length - 2,
            barOffset = 2

        var xScale = d3.scaleOrdinal()
            .domain(d3.range(0, chartdata.length))
            .range([0, width])

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(chartdata)])
            .range([0, height - 5])

        var colors = d3.scaleLinear()
            .domain([0, chartdata.length * .33, chartdata.length * .66, chartdata.length])
            .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1'])

        var dynamicColor = ''

        var chart = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#bce8f1')

        function applyTransition(selection, ease, delay, height) {
            selection.transition()
                .ease(ease)
                .delay(delay)
                .duration(1000)
                .attr("height", height)
                .attr('y', 200 - height)
        }

        chart.selectAll('rect')
            .data(chartdata)
            .enter()
            .append('rect')
            .style('fill', function (d, i) {
                return colors(i)
            })
            .style('stroke', '#31708f')
            .style('stroke-width', '5')
            .attr('width', barWidth)
            .attr('height', 0)
            .attr('x', function (d, i) {
                return i * (barWidth + barOffset)
            })
            .attr('y', height)
            .on('mouseover', function () {
                // --- 保存颜色
                dynamicColor = this.style.fill
                d3.select(this)
                    .style('fill', '#3c763d')
            })
            .on('mouseout', function () {
                d3.select(this)
                    .style('fill', dynamicColor)
            })
            .each(function (d, i) {
                d3.select(this)
                    .call(applyTransition, d3.easeCubic, i * 50, yScale(d), i)
            })
    }
}
</script>
