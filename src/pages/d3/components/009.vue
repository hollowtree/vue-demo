<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var width = 800,
            height = 500
        var svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        var circle_data = d3.range(50).map(function () {
            return {
                x: Math.round(Math.random() * width),
                y: Math.round(Math.random() * height),
                r: Math.round(Math.random() * 20 + 5)
            }
        })

        var circles = svg.append('g')
            .attr('class', 'circles')
            .selectAll('circle')
            .data(circle_data)
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => {
                return d.r
            })
            .attr('fill', 'rgb(70, 130, 180)')

        var zoom_handler = d3.zoom()
            .on('zoom', zoom_actions)

        function zoom_actions() {
            circles.attr('transform', d3.event.transform)
        }

        zoom_handler(svg)

        var drag_handler = d3.drag()
            .on('drag', function (d) {
                d3.select(this)
                    .attr('cx', d.x = d3.event.x)
                    .attr('cy', d.y = d3.event.y)
            })

        drag_handler(circles)
    }
}
</script>
