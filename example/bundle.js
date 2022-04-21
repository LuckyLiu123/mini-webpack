//重构bundle1.js文件
//1. 解决相对路径和绝对路径的问题
//2. 解决访问数据时不安全的问题
;(function(modules){

    function require(id) {

        const [fn, mapping] = modules[id];

        //cjs 的规范
        const module = {
            exports: {}
        };

        function localRequire(filename) {
            const id = mapping[filename];
            return require(id);
        }

        fn(localRequire, module, module.exports);

        return module.exports;
    }

    require(1);

})({
    1: [function (require, module, exports) {
        const { foo } = require('./foo.js');
        console.log('main.js');
        foo();
    }, {
        './foo.js': 2,
    }],
    2: [function (require, module, exports){
        exports.foo = function foo(){
            console.log('foo');
        }
    }, {

    }]
})








