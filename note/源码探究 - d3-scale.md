# 源码探究 - d3-scale

## band.js
```js
let data = [1, 2, 3, 4, 5]
let x = d3.scaleBand()
    .domain(data)
    .range([0, 600])
console.log(x(1), x(2), x(3), x(4), x(5))
// 0 120 240 360 480
console.log(x.bandwidth())
// 120
console.log(x.step())
// 120
```

```js
let data = [1, 2, 3, 4, 5]
let x = d3.scaleBand()
    .domain(data)
    .range([0, 600])
    .paddingOuter(0.5)
console.log(x(1), x(2), x(3), x(4), x(5))
// 50 150 250 350 450
console.log(x.bandwidth())
// 100
console.log(x.step())
// 100
```

```js
let data = [1, 2, 3, 4, 5]
let x = d3.scaleBand()
    .domain(data)
    .range([0, 600])
    .paddingInner(0.2)
console.log(x(1), x(2), x(3), x(4), x(5))
// 0 125 250 375 500
console.log(x.bandwidth())
// 100
console.log(x.step())
// 125
```

```js
let data = [1, 2, 3, 4, 5]
let x = d3.scaleBand()
    .domain(data)
    .range([0, 600])
    .paddingInner(1)
    .paddingOuter(0.5)
console.log(x(1), x(2), x(3), x(4), x(5))
// 60 180 300 420 540
console.log(x.bandwidth())
// 0
console.log(x.step())
// 120
```

scalePoint 实质就是 scaleBand，只是加了一层封装，使得 paddingInner 为1
```js
let data = [1, 2, 3, 4, 5]
let x = d3.scalePoint()
    .domain(data)
    .range([0, 600])
console.log(x(1), x(2), x(3), x(4), x(5))
// 0 150 300 450 600
console.log(x.bandwidth())
// 0
console.log(x.step())
// 150
```