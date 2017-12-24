<template>
    <div id="chart">

    </div>
</template>
<script>

export default {
    mounted() {
        let d3 = this.d3,
            svg = d3.select('#chart').append('svg')
                .attr('width', 960).attr('height', 500),
            margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom,
            chart = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


        let x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width])

        let antiX = d3.scaleLinear()
            .domain([0, width])
            .range([0, 100])

        let y = d3.scaleLinear()
            .domain([0, 100])
            // .domain([0, d3.max(data, d => {
            //     return d.y + 20
            // })])
            .range([height, 0])

        let antiY = d3.scaleLinear()
            .domain([height, 0])
            .range([0, 100])

        var xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y);

        chart.append('g')
            .attr('class', 'axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)

        chart.append('g')
            // .attr('transform', 'translate(0,0)')
            .call(yAxis)

        chart.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'transparent')
            .attr('stroke', 'steelblue')



        let data = [],
            line = d3.line()
                .x((d) => {
                    return x(d.x)
                })
                .y(d => {
                    return y(d.y + 1)
                })
        chart.select('rect')
            .on('click', function (d) {
                let aimX = d3.event.offsetX - margin.left,
                    aimY = d3.event.offsetY - margin.top
                console.log(aimX, aimY, antiX(aimX), antiY(aimY))
                data.push({
                    x: antiX(aimX),
                    y: antiY(aimY)
                })
                drawLine()

            })
        let a = false
        let drawLine = () => {
            let L = d3.select('.line')
            if (a) {
                L.attr('d', line(data))
            } else {
                chart
                    .append('path')
                    .datum(data)
                    .attr('fill', 'none')
                    .attr('stroke', 'red')
                    .attr('class', 'line')
                    .attr('d', line)
                a = true
            }

        }

    }
}
</script>

