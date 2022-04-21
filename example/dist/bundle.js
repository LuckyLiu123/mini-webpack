;(function(modules){

    function require(id) {

        const [fn, mapping] = modules[id];

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
            "use strict";

var _foo = require("./foo.js");

var _data = require("./data.json");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_data2.default);
console.log('main.js');
(0, _foo.foo)();
        }, {"./foo.js":2,"./data.json":3}],
    
        2: [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

function foo() {
  console.log('foo');
  (0, _bar.bar)();
}
        }, {"./bar.js":4}],
    
        3: [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "name": "zhangsan"
};
        }, {}],
    
        4: [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

function bar() {
  console.log('bar');
}
        }, {}],
    
})








