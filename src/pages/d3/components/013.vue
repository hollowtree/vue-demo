<template>
    <div id="chart">

    </div>
</template>
<script>
import kline from "../tools/kline";
export default {
    mounted() {
        let d3 = this.d3
        let data = [{ "date": "2017-12-22 00:00:00", "high_price": 13.63, "low_price": 13.45, "open_price": 13.5, "close_price": 13.52 }, { "date": "2017-12-21 00:00:00", "high_price": 13.68, "low_price": 13.16, "open_price": 13.18, "close_price": 13.54 }, { "date": "2017-12-20 00:00:00", "high_price": 13.31, "low_price": 13.13, "open_price": 13.2, "close_price": 13.26 }, { "date": "2017-12-19 00:00:00", "high_price": 13.32, "low_price": 12.74, "open_price": 12.79, "close_price": 13.28 }, { "date": "2017-12-18 00:00:00", "high_price": 12.91, "low_price": 12.64, "open_price": 12.73, "close_price": 12.75 }, { "date": "2017-12-15 00:00:00", "high_price": 12.93, "low_price": 12.67, "open_price": 12.9, "close_price": 12.72 }, { "date": "2017-12-14 00:00:00", "high_price": 13.31, "low_price": 12.91, "open_price": 13.15, "close_price": 13 }, { "date": "2017-12-13 00:00:00", "high_price": 13.2, "low_price": 12.88, "open_price": 13, "close_price": 13.13 }, { "date": "2017-12-12 00:00:00", "high_price": 13.48, "low_price": 13.02, "open_price": 13.4, "close_price": 13.02 }, { "date": "2017-12-11 00:00:00", "high_price": 13.57, "low_price": 12.88, "open_price": 13.08, "close_price": 13.5 }, { "date": "2017-12-08 00:00:00", "high_price": 13.09, "low_price": 12.75, "open_price": 12.89, "close_price": 13.09 }, { "date": "2017-12-07 00:00:00", "high_price": 13.14, "low_price": 12.75, "open_price": 13.05, "close_price": 12.83 }, { "date": "2017-12-06 00:00:00", "high_price": 13.27, "low_price": 12.79, "open_price": 13.26, "close_price": 13.08 }, { "date": "2017-12-05 00:00:00", "high_price": 13.49, "low_price": 13.1, "open_price": 13.15, "close_price": 13.3 }, { "date": "2017-12-04 00:00:00", "high_price": 13.37, "low_price": 13, "open_price": 13.05, "close_price": 13.3 }, { "date": "2017-12-01 00:00:00", "high_price": 13.48, "low_price": 12.96, "open_price": 13.4, "close_price": 13 }, { "date": "2017-11-30 00:00:00", "high_price": 13.73, "low_price": 13.26, "open_price": 13.7, "close_price": 13.38 }, { "date": "2017-11-29 00:00:00", "high_price": 13.93, "low_price": 13.47, "open_price": 13.73, "close_price": 13.82 }, { "date": "2017-11-28 00:00:00", "high_price": 13.85, "low_price": 13.4, "open_price": 13.85, "close_price": 13.7 }, { "date": "2017-11-27 00:00:00", "high_price": 14.3, "low_price": 13.75, "open_price": 14.3, "close_price": 13.93 }, { "date": "2017-11-24 00:00:00", "high_price": 14.59, "low_price": 13.78, "open_price": 14.29, "close_price": 14.56 }, { "date": "2017-11-23 00:00:00", "high_price": 15.24, "low_price": 14.07, "open_price": 15.15, "close_price": 14.35 }, { "date": "2017-11-22 00:00:00", "high_price": 15.24, "low_price": 14.48, "open_price": 14.48, "close_price": 15.1 }, { "date": "2017-11-21 00:00:00", "high_price": 14.79, "low_price": 14.01, "open_price": 14.07, "close_price": 14.45 }, { "date": "2017-11-20 00:00:00", "high_price": 14.25, "low_price": 13.05, "open_price": 13.13, "close_price": 14.25 }, { "date": "2017-11-17 00:00:00", "high_price": 13.46, "low_price": 13.03, "open_price": 13.17, "close_price": 13.18 }, { "date": "2017-11-16 00:00:00", "high_price": 13.12, "low_price": 12.67, "open_price": 12.9, "close_price": 13.1 }, { "date": "2017-11-15 00:00:00", "high_price": 13.13, "low_price": 12.77, "open_price": 12.9, "close_price": 12.9 }, { "date": "2017-11-14 00:00:00", "high_price": 13.26, "low_price": 12.81, "open_price": 12.95, "close_price": 12.95 }, { "date": "2017-11-13 00:00:00", "high_price": 13.1, "low_price": 12.35, "open_price": 12.35, "close_price": 12.9 }, { "date": "2017-11-10 00:00:00", "high_price": 12.55, "low_price": 12.15, "open_price": 12.37, "close_price": 12.3 }, { "date": "2017-11-09 00:00:00", "high_price": 12.57, "low_price": 12.15, "open_price": 12.2, "close_price": 12.33 }, { "date": "2017-11-08 00:00:00", "high_price": 12.59, "low_price": 11.93, "open_price": 12, "close_price": 12.13 }, { "date": "2017-11-07 00:00:00", "high_price": 12.09, "low_price": 11.25, "open_price": 11.27, "close_price": 11.92 }, { "date": "2017-11-06 00:00:00", "high_price": 11.42, "low_price": 11.09, "open_price": 11.42, "close_price": 11.28 }, { "date": "2017-11-03 00:00:00", "high_price": 11.68, "low_price": 11.35, "open_price": 11.49, "close_price": 11.39 }, { "date": "2017-11-02 00:00:00", "high_price": 11.58, "low_price": 11.26, "open_price": 11.36, "close_price": 11.54 }, { "date": "2017-11-01 00:00:00", "high_price": 11.59, "low_price": 11.32, "open_price": 11.56, "close_price": 11.4 }, { "date": "2017-10-31 00:00:00", "high_price": 11.58, "low_price": 11.39, "open_price": 11.55, "close_price": 11.54 }, { "date": "2017-10-30 00:00:00", "high_price": 11.73, "low_price": 11.45, "open_price": 11.55, "close_price": 11.56 }, { "date": "2017-10-27 00:00:00", "high_price": 11.56, "low_price": 11.18, "open_price": 11.19, "close_price": 11.56 }, { "date": "2017-10-26 00:00:00", "high_price": 11.32, "low_price": 11.12, "open_price": 11.25, "close_price": 11.18 }, { "date": "2017-10-25 00:00:00", "high_price": 11.37, "low_price": 11.25, "open_price": 11.36, "close_price": 11.27 }, { "date": "2017-10-24 00:00:00", "high_price": 11.42, "low_price": 11.18, "open_price": 11.2, "close_price": 11.39 }, { "date": "2017-10-23 00:00:00", "high_price": 11.4, "low_price": 11.15, "open_price": 11.39, "close_price": 11.19 }, { "date": "2017-10-20 00:00:00", "high_price": 11.59, "low_price": 11.41, "open_price": 11.59, "close_price": 11.48 }, { "date": "2017-10-19 00:00:00", "high_price": 11.72, "low_price": 11.57, "open_price": 11.64, "close_price": 11.63 }, { "date": "2017-10-18 00:00:00", "high_price": 11.7, "low_price": 11.51, "open_price": 11.53, "close_price": 11.69 }, { "date": "2017-10-17 00:00:00", "high_price": 11.65, "low_price": 11.48, "open_price": 11.62, "close_price": 11.51 }, { "date": "2017-10-16 00:00:00", "high_price": 11.6, "low_price": 11.29, "open_price": 11.36, "close_price": 11.59 }, { "date": "2017-10-13 00:00:00", "high_price": 11.56, "low_price": 11.25, "open_price": 11.56, "close_price": 11.36 }, { "date": "2017-10-12 00:00:00", "high_price": 11.58, "low_price": 11.47, "open_price": 11.54, "close_price": 11.55 }, { "date": "2017-10-11 00:00:00", "high_price": 11.58, "low_price": 11.34, "open_price": 11.48, "close_price": 11.53 }, { "date": "2017-10-10 00:00:00", "high_price": 11.5, "low_price": 11.33, "open_price": 11.33, "close_price": 11.47 }, { "date": "2017-10-09 00:00:00", "high_price": 11.64, "low_price": 11.26, "open_price": 11.57, "close_price": 11.3 }, { "date": "2017-09-29 00:00:00", "high_price": 11.16, "low_price": 10.86, "open_price": 10.92, "close_price": 11.11 }, { "date": "2017-09-28 00:00:00", "high_price": 10.98, "low_price": 10.82, "open_price": 10.98, "close_price": 10.88 }, { "date": "2017-09-27 00:00:00", "high_price": 11.08, "low_price": 10.9, "open_price": 11.01, "close_price": 10.93 }, { "date": "2017-09-26 00:00:00", "high_price": 11.3, "low_price": 10.96, "open_price": 11.26, "close_price": 11.05 }, { "date": "2017-09-25 00:00:00", "high_price": 11.45, "low_price": 11.18, "open_price": 11.44, "close_price": 11.29 }, { "date": "2017-09-22 00:00:00", "high_price": 11.52, "low_price": 11.31, "open_price": 11.43, "close_price": 11.44 }]
        console.log(d3.extent(data, function (d) {
            return d.date
        }))
        data.reverse()

        let width = 960,
            height = 500,
            svg = d3.select('#chart').append('svg').attr('width', width + 100).attr('height', height + 100),
            chart = svg.append('g')

        let x = d3.scaleBand()
            .domain(data.map(function (val) {
                return val.date
            }))
            .range([0, width])
            .paddingInner(1)
            .paddingOuter(0.5)

        let y = d3.scaleLinear()
            .domain([d3.min(data, d => {
                return d.low_price
            }), d3.max(data, d => {
                return d.high_price
            })])
            .range([height, 0])

        var xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y);

        chart.append('g')
            .attr('class', 'axis--x')
            .attr('transform', 'translate(50,' + (height + 50) + ')')
            .call(xAxis.tickValues(x.domain().filter(function (d, i) {
                return !(i % 5)
            })).tickFormat(function (d, i, data) {
                return d3.timeFormat("%Y-%m-%d")(d3.isoParse(d))
            }))

        chart.append('g')
            .attr('class', 'axis--y')
            .attr('transform', 'translate(50,50)')
            .call(yAxis)

        let lineRise = kline()
            .isDraw((d, i) => {
                return d.open_price <= d.close_price
            })
            .x((d, i) => {
                return x(d.date)
            })
            .l(() => {
                return x.step() * 0.2
            })
            .y(d => {
                return y(d.open_price)
            })
            .y1(d => {
                return y(d.close_price)
            })
            .y2(d => {
                return y(d.high_price)
            })
            .y3(d => {
                return y(d.low_price)
            })

        let lineDown = kline()
            .isDraw((d, i) => {
                return d.open_price > d.close_price
            })
            .x((d, i) => {
                return x(d.date)
            })
            .l(() => {
                return x.step() * 0.2
            })
            .y(d => {
                return y(d.open_price)
            })
            .y1(d => {
                return y(d.close_price)
            })
            .y2(d => {
                return y(d.high_price)
            })
            .y3(d => {
                return y(d.low_price)
            })
        // --- 线

        chart.append('path')
            .datum(data)
            .attr('fill', 'red')
            .attr('stroke', 'red')
            .attr('class', 'kline zoom-line')
            .attr('transform', 'translate(50,50)')
            .attr('d', lineRise)

        chart.append('path')
            .datum(data)
            .attr('fill', 'green')
            .attr('stroke', 'green')
            .attr('class', 'kline zoom-line')
            .attr('transform', 'translate(50,50)')
            .attr('d', lineDown)

        d3.selectAll('.kline')
            .on('mousemove', function (e) {
                let i = Math.round((d3.event.x - 50) / x.step())
                console.log(i)
            })


        // let zoom = d3.zoom()
        //     .scaleExtent([1, 10])
        //     .translateExtent([[0, 0], [width, height]])
        //     .extent([[0, 0], [width, height]])
        //     .on('zoom', zoomed)

        // svg.call(zoom).transition()
        //     .duration(500)
        //     .call(zoom.transform, d3.zoomIdentity.scale(width / (x(20) - x(0))))

        // function zoomed() {
        //     let t = d3.event.transform,
        //         xt = t.rescaleX(x)

        //     chart.select('.zoom-line')
        //         .attr('d', line.x(function (d) { return xt(d.x) }))
        //     chart.select('.axis--x').call(xAxis.scale(xt))
        // }

    }
}
</script>
<style>
.zoom-line,
.zoom-area {
  clip-path: url(#clip);
}
</style>
