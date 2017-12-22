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

        svg.append('defs').append('clipPath').attr('id', 'clip')
            .append('rect')
            .attr('width', width)
            .attr('height', height)

        let x = d3.scaleLinear()
            .domain([0, 100])
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

        chart.append('g')
            // .attr('transform', 'translate(0,0)')
            .call(yAxis)


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
            .attr('class', 'zoom-area zoom-area1')
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
            .attr('class', 'zoom-line')
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
            .attr('class', 'zoom-area zoom-area2')
            .attr('d', area2)

        let zoom = d3.zoom()
            .scaleExtent([1,10])
            .translateExtent([[0,0], [width,height]])
            .extent([[0,0], [width,height]])
            .on('zoom', zoomed)

        svg.call(zoom).transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity.scale(width/(x(100) - x(0))))

        function zoomed(){
            let t=d3.event.transform,
                xt = t.rescaleX(x)

            chart.select('.zoom-area1').attr('d', area.x(function(d){return xt(d.x)}))
            chart.select('.zoom-line').attr('d', line.x(function(d){return xt(d.x)}))
            chart.select('.zoom-area2').attr('d', area2.x(function(d){return xt(d.x)}))
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
