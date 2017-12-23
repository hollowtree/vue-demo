<template>
    <div id="chart">

    </div>
</template>
<script>
import kline from "../tools/kline";
export default {
    mounted() {
        let data = []
        for (let i = 0; i <= 100; i++) {
            let y = Math.random() * 10 + i * 0.5 | 0
            data.push({
                x: i,
                y: y,
                y0: y + 20
            })
        }

        let d3 = this.d3,
            width = 960,
            height = 200,
            svg = d3.select('#chart').append('svg').attr('width', 960).attr('height', 400),
            chart = svg.append('g')

        let x = d3.scaleLinear()
            .domain([1, 100])
            .range([0, width])

        let y = d3.scaleLinear()
            // .domain([0, 100])
            .domain([0, d3.max(data, d => {
                return d.y + 20
            })])
            .range([height, 0])

        var xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y);

        chart.append('g')
            .attr('class', 'axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)

        let line = kline()
            .x((d) => {
                return x(d.x)
            })
            .y(d => {
                return y(d.y + 1)
            })
            .y1(d => {
                return y(d.y0)
            })

        chart.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('class', 'zoom-line')
            .attr('d', line)

        let zoom = d3.zoom()
            .scaleExtent([1, 10])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on('zoom', zoomed)

        svg.call(zoom).transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity.scale(width / (x(100) - x(0))))

        function zoomed() {
            let t = d3.event.transform,
                xt = t.rescaleX(x)

            chart.select('.zoom-line')
                .attr('d', line.x(function (d) { return xt(d.x) }))
            chart.select('.axis--x').call(xAxis.scale(xt))
        }

    }
}
</script>
<style>
.zoom-line,
.zoom-area {
  clip-path: url(#clip);
}
</style>
