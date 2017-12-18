<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var svg = d3.select('#chart')
            .append('svg')
            .attr('height', 200)
            .attr('width', 800)

        var circle1 = svg.append('g')
            .selectAll('circle')
            .data([{
                x: 20,
                y: 20,
                r: 15
            }])
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.r)
            .attr('fill', 'rgb(70, 130, 180)')

        var circle2 = svg.append('g')
            .selectAll('circle')
            .data([{
                x: 140,
                y: 20,
                r: 15
            }])
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.r)
            .attr('fill', 'rgb(70, 130, 180)')

        var zoom_handler = d3.zoom()
            .on('zoom', zoom_actions)

        function zoom_actions() {
            var transform = d3.zoomTransform(this)
            // same as  this.setAttribute("transform", "translate(" + transform.x + "," +
            //                             transform.y + ") scale(" + transform.k + ")");
            // this.setAttribute('tranform', transform)
            circle1.attr('transform', d3.event.transform)
        }
        zoom_handler(circle1)


        var drag_handler = d3.drag()
            .on('drag', function (d) {
                d3.select(this)
                    .attr('cx', d.x = d3.event.x)
                    .attr('cy', d.y = d3.event.y)
            })

        drag_handler(circle1)
    }
}
</script>
