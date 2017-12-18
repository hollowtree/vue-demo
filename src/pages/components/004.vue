<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var data = []
        for (var i = 0; i < 15; i++) {
            data.push(10)
        }
        d3.select('#chart')
            .append('svg')
            .attr('width', 720)
            .attr('height', 120)
            .selectAll('circle')
            .data(data).enter()
            .append('circle')
            .attr('cy', 0)
            .transition()
            .duration(1000)
            .attr('cy', 80)
            .duration(1000)
            .attr('r', function (d) {
                return d
            })
            .duration(1000)
            .attr('cx', function (d, i) {
                return i * 40 + 20
            })
            .duration(1000)
            .style('fill', 'red')
            .transition()
            .attr('cx', function (d, i) {
                return (i + 1) * 40 + 20
            })
    }
}
</script>
