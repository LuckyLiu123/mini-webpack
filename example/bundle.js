//重构bundle1.js文件
;(function(modules){

    function require(filename) {

        const fn = modules[filename];

        //cjs 的规范
        const module = {
            exports: {}
        };

        fn(require, module, module.exports);

        return module.exports;
    }

    require('./main.js');

})({
    './main.js':  function (require, module, exports) {
        const { foo } = require('./foo.js');
        console.log('main.js');
        foo();
    },
    './foo.js': function (require, module, exports){
        exports.foo = function foo(){
            console.log('foo');
        }
    }
})








