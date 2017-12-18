# 源码探究 - d3-selection

这里用到了[Object.prototype.constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)。
```js
function Test(name, age) {
    this.name = name
    this.age = age
}
var a = new Test('Tom', 12)
console.log(a)
// Test {name: "Tom", age: 12}
```

## selectorAll.js
`d3.selectorAll(selector)`