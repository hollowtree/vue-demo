<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3
        var data = []
        for (var i = 0; i < 40; i++) {
            // --- 一个小坑
            // --- toFixed 会将数字转换为字符串
            // --- d3.max 对字符串数组求最大值会出现异常
            // --- 前面应加加号，或用 Math.round
            // --- 另，求数组字符串的最大值的简便方法是 Math.max.apply(null, arr)
            data.push(+((Math.random() + 0.2) * 100).toFixed(0))
        }
        var margin = { top: 20, right: 30, bottom: 30, left: 40 },
            width = 800,
            height = 200

        // var x = d3.scaleLinear()
        //     .domain([0, data.length])
        //     // .rangeRoundBands([0, width], .1)
        //     .range([0, width])

        var x = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, width])

        var y = d3.scaleLinear()
            .domain([0, 120])
            .range([height, 0])
        // .ticks(20)

        var chart = d3.select('#chart')
            .append('svg')
            .classed('chart', true)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        var content = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        var barWidth = width / data.length;

        var bar = content.selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function (d, i) { return 'translate(' + i * barWidth + ',0)' })

        bar.append('rect')
            .attr('y', function (d) { return y(d) })
            .attr('height', function (d) { return height - y(d) })
            .attr('width', barWidth - 1)
        bar.append('text')
            .attr('x', barWidth)
            .attr('y', function (d) { return y(d) + 3 })
            .attr('dy', '.75em')
            .text(function (d) { return d })

        chart.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top + 5) + ')')
            .call(d3.axisBottom(x))

        chart.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + (margin.left - 5) + ', ' + margin.top + ')')
            .call(d3.axisLeft(y))
    }
}
</script>
