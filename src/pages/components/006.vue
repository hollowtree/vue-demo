<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var xScale = d3.scaleBand()
            .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .range([0, 600]);

        var xAxis = d3.axisBottom(xScale)
            // .ticks(10)
            .tickPadding(10)
        // .tickFormat(function (d) { return d })
        d3.select('#chart').append('svg').attr('width', 800).append('g').call(xAxis)
    }
}
</script>
