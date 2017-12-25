<template>
    <div id="chart">

    </div>
</template>
<script>
export default {
    mounted() {
        let d3 = this.d3

        var data = []
        for (let i = 0; i < 1000; i++) {
            let date = new Date(i * 1000 * 3600 * 24),
                day = date.getDay()
            if (day && day < 6) {
                data.push({
                    date: date
                })
            }
        }
        let dataLength = data.length
        let width = 860,
            height = 400,
            margin = 50,
            svg = d3.select('#chart').append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            chart = svg.append('g')

        let x = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, width])

        let y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0])

        var xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y);

        chart.append('g')
            .attr('class', 'axis--x')
            .attr('transform', 'translate(50,' + (height + 50) + ')')
            .call(xAxis.tickFormat(function (d, i) {
                return d3.timeFormat("%Y-%m-%d")(d3.isoParse(data[d].date))
            }))
        chart.append('g')
            .attr('class', 'axis--y')
            .attr('transform', 'translate(50,50)')
            .call(yAxis)

        let focus = chart.append('g')
            .attr('transform', 'translate(50,50)')
            .attr('stroke', 'red')
            .style('display', 'none')

        focus.append('line')
            .attr('id', 'focusLineX')
            .attr('class', 'focusLine')

        focus.append('line')
            .attr('id', 'focusLineY')
            .attr('class', 'focusLine')

        chart.append('rect')
            // --- fill 不能为 none，不然无法添加事件
            .style('fill', 'transparent')
            .style('stroke', '#31708f')
            .attr('class', 'mask')
            .attr('transform', 'translate(50,50)')
            .attr('width', width)
            .attr('height', height)
            .on('click', function () {
                
            })
            .on('mousemove', function () {
                // d3.event
                let mouse = d3.mouse(this)
                focus.style('display', 'block')
                focus.select('#focusLineX')
                    .attr('x1', x(x.invert(mouse[0])))
                    .attr('y1', y(0))
                    .attr('x2', x(x.invert(mouse[0])))
                    .attr('y2', y(100))

                focus.select('#focusLineY')
                    .attr('x1', x(0))
                    .attr('y1', y(y.invert(mouse[1])))
                    .attr('x2', x(dataLength))
                    .attr('y2', y(y.invert(mouse[1])))
            })
            .on('mouseout',function () {
                focus.style('display', 'none')
            })
    }
}
</script>


