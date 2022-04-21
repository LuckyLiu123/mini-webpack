# mini-webpack
实现一个迷你版本的webpack

各个文件之间通过 import 形成依赖关系(图)，最终通过webpack打包生成一个bundle文件

## 通过代码如何实现图结构 ##
1. 获取文件对应的依赖
2. 获取文件的内容

将 import(es6) 的代码转换成 require(es5) 的代码，使用 babel-core.

## 如何生成 bundle.js ##


比较完整的代码
https://github.com/cuixiaorui/mini-webpack























