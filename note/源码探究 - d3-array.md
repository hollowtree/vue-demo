# 源码探究 - d3-array

## min.js
`d3.min(array[, accessor])`

求一个数组的最小值，并忽视数组中的 undefined, null 和 NaN。此外还可以传一个可选的函数作为第二个参数对数组的每一项进行处理，并返回处理后的数组的最小值
```js
Math.min(2, 3, 4, undefined)
// NaN

d3.min([2, 3, 4, undefined])
// 2

d3.min([2, 3, 5, undefined], (val) => val * val)
// 4
// 返回数组每一项的平方的最小值
```

## max.js
`d3.max(array[, accessor])`

求一个数组的最大值

## extent.js
`d3.extent(array[, accessor])`

返回一个数组的各项的范围 `[min, max]`

## sum.js
`d3.sum(array[, accessor])`

与前面几个js类似，这里在遍历数组每一项中用了 `if (value = +values[i]) sum += value;`。先将每一项转化为数字，而且将这个转换的过程放在了 if 中，这样就跳过了 undefined, null 和 NaN。

## mean.js
`d3.mean(array[, accessor])`

求一个数组的平均值，将数组有效项之和除以数组有效项个数。
```js
d3.mean([2,undefined,undefined,undefined,4,6])
// 4
```

## shuffle.js
`d3.shuffle(array[, i0[, i1]])`

打乱一个数组。参数 array 是一个数组，i0 是要打乱的数组部分的起点序号，i1 是对应的终点序号。i0 的默认值是数组的长度，i1 的默认值是0。
```js
d3.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
// 6, 0, 7, 5, 1, 8, 2, 4, 9, 3]
// 会打乱传入的数组，结果不定，代码运行时，先在整个数组中随机
// 出一个序号 k（0 <= k <= 9），将 arr[k] 与 arr[9] 交换位
// 置，随后随机出一个序号k1（0 <= k1 <= 8），将 arr[k1] 与
//  arr[8] 交换位置，依此类推...

d3.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4, 8)
// [0, 1, 2, 3, 6, 7, 4, 5, 8, 9]
// 数组中有10个数，打乱第4个到第8个的顺序
```

函数的实现很简洁：
```js
function (array, i0, i1) {
    var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
        t,
        i;
    while (m) {
        i = Math.random() * m-- | 0;
        t = array[m + i0];
        array[m + i0] = array[i + i0];
        array[i + i0] = t;
    }
    return array;
}
```
此外对数值取整用了`|`，效果与`parseInt`类似，有些差别的大概是`|`不会生成`NaN`。[参考链接](https://jsperf.com/math-round-vs-hack/99)
```js
parseInt('gsdf')
// NaN

'gsdf' | 0
// 0
```

## ascending.js
`d3.ascending(a, b)`
升序
```js
// 源码实现：
function(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
// 感觉类似于
function(a, b) {
    return a - b;
}
```

## descending.js
` d3.descending(a, b)`
降序

## median.js
`d3.median(array[, accessor])`