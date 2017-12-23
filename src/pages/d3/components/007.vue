<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var data = [
            { x: 0, y: 40 },
            { x: 10, y: 80 },
            { x: 20, y: 50 },
            { x: 30, y: 70 }
        ]
        var width = 500,
            height = 500,
            margin = 25,
            axisLength = width - 2 * margin

        var xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, axisLength])

        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([axisLength, 0])

        var chart = d3.select('#chart')
            .append('svg')
            // .attr('viewBox','0,0,'+ width+','+height)
            .attr('width', width)
            .attr('height', height)
            .style('border', '1px solid #666')

        chart.append('g')
            .classed('x-axis', true)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + (height - margin) + ')'
            })
            .call(d3.axisBottom(xScale))

        chart.selectAll('g.x-axis g.tick:nth-child(n+3)')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -(height - 2 * margin))
            .style('stroke-width', 1)
            .style('stroke', '#ccc')
            .style('stroke-dasharray', '1,5,1')

        chart.append('g')
            .classed('y-axis', true)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')'
            })
            .call(d3.axisLeft(yScale))

        chart.selectAll('g.y-axis g.tick:nth-child(n+3)')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (width - 2 * margin))
            .attr('y2', 0)
            .style('stroke-width', 1)
            .style('stroke', '#ccc')
            .style('stroke-dasharray', '1,5,1')

        var line = d3.line()
            .x(function (d) {
                console.log(xScale(d.x))

                return xScale(d.x)
            })
            .y(function (d) {
                console.log(yScale(d.y))

                return yScale(d.y)
            })

        chart.append('path')
            .attr('d', line(data))
            .attr('stroke', 'blue')
            .attr('fill', 'none')
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')'
            })

        var arc1 = d3.arc()
            .innerRadius(xScale(10))
            .outerRadius(xScale(20))
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI)

        chart.append('path')
            .attr('d', arc1())
            .attr('fill', 'rgba(70, 130, 180, .7)')
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')'
            })
    }
}
</script>
