<template>
    <div id="chart">

    </div>
</template>

<script>
export default {
    mounted() {
        const d3 = this.d3
        let data = [1, 2, 3, 4, 5]
        let x = d3.scaleBand()
            .domain(data)
            .range([0, 600])
            .paddingInner(1)
            .paddingOuter(0.5)
        // .align([0.5])

        console.log(x(1), x(2), x(3), x(4), x(5))
        console.log(x.bandwidth())
        console.log(x.step())

        var xAxis = d3.axisBottom(x)
    }
}
</script>
