<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let data = []
        for (let i = 0; i <= 100; i++) {
            data.push({ x: i, y: Math.random() * 10 + i * 0.5 | 0 })
        }

        let d3 = this.d3,
            svg = d3.select('#chart').append('svg').attr('width', 960).attr('height', 500),
            margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom,
            chart = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        let x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width])
        chart.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))

        let y = d3.scaleLinear()
            // .domain([0, 100])
            .domain([0, d3.max(data, d => {
                return d.y + 20
            })])
            .range([height, 0])

        chart.append('g')
            // .attr('transform', 'translate(0,0)')
            .call(d3.axisLeft(y))


        let area = d3.area()
            .x((d) => {
                return x(d.x)
            })
            .y1(d => {
                return y(d.y)
            })
        area.y0(y(0))

        chart.append('path')
            .datum(data)
            .attr('fill', 'steelblue')
            .attr('stroke', 'steelblue')
            .attr('d', area)


        let line = d3.line()
            .x((d) => {
                return x(d.x)
            })
            .y(d => {
                return y(d.y + 1)
            })
        chart.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('d', line)


        let area2 = d3.area()
            .x((d) => {
                return x(d.x)
            })
            .y0(d => {
                return y(d.y + 15)
            })
            .y1(d => {
                return y(d.y + 20)
            })

        chart.append('path')
            .datum(data)
            .attr('fill', 'steelblue')
            .attr('stroke', 'steelblue')
            .attr('d', area2)
    }
}
</script>
