
function require(filename) {

    const map  ={
        './main.js': mainjs,
        './foo.js': foojs,
    }

    const fn = map[filename];

    //cjs 的规范
    const module = {
        exports: {}
    };

    fn(require, module, module.exports);

    return module.exports;
}

require('./main.js');

//main.js
function mainjs(require, module, exports) {
    // esm 中的 import 可以放在函数内吗? 不行 import必须放在顶层作用域中
    // 还可以使用cjs 其实就是自己实现一个require
    // 将 import 替换为自己实现的 require,模拟 import 导入文件的行为
    // import { foo } from './foo.js'
    // module -> cjs
    const { foo } = require('./foo.js');
    
    console.log('main.js');
    foo();
}


//foo.js
function foojs(require, module, exports){
    // export function foo(){
    exports.foo = function foo(){
        console.log('foo');
    }
}







