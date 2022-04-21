//主逻辑

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('babel-core')
let id = 1;

//assets
function createAssets(filename) {
    //1. 获取文件的内容
    let source = fs.readFileSync(filename, {
        encoding: 'utf8'
    });

    //上下文
    const loaderContext = {
        addUser(user){
            console.log('user:', user);
        }
    }

    function initLoader(){
        //init loader
        const loaders = config.module.rules;
        loaders.forEach((loader) => {
            const { test, use } = loader;
            if(test.test(filename)) {
                // 通过call添加this
                source = use.call(loaderContext, source);   //链式调用loader
            }
        })
    }

    initLoader();

    //2. 获取文件的依赖关系 AST
    const ast = parser.parse(source, {
        sourceType: 'module'
    });

    const deps = [];
    traverse(ast, {
        ImportDeclaration({node}){
            // console.log(node.source.value);
            deps.push(node.source.value);
        }
    })

    const { code } = transformFromAst(ast, null, {
        presets: ['env'],   //配置对应的预设
    });
    // console.log(code);

    return {
        id: id++,
        code,
        deps,
        filename,
        mapping: {}
    }
}

function createGraph(){
    const mainAsset = createAssets('./example/main.js');

    const queue = [mainAsset];
    for(const asset of queue){
        //todo 如何避免无限递归  asset -> 1
        asset.deps.forEach((relativePath) => {
            //todo 自动补偿后缀 .js .json
            const childPath = path.resolve('./example/', relativePath);
            const child = createAssets(childPath);
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        })
    }
    return queue;
}

function build(graph){
    function createModules(graph){
        const modules = {}
        graph.forEach((asset) => {
            modules[asset.id] = [asset.code, asset.mapping];
        })
        return modules;
    }

    function createContext(modules){
        const template = fs.readFileSync('./bundle.ejs', {
            encoding: 'utf8'
        });
        return ejs.render(template, { modules });
    }

    function emitFile(context){
        fs.writeFileSync('./example/dist/bundle.js', context);
    }

    const modules = createModules(graph);
    // console.log(modules); 
    emitFile(createContext(modules));
}


//实现一个自定义的loader
function jsonLoader(source){
    console.log('----------------jsonLoader--------------------');
    // console.log(source);
    this.addUser('lisi');
    const data = JSON.parse(source);
    return `export default ${JSON.stringify(data)}`;
}

const config = {
    module: {
        rules: [
            {
                test: /\.json$/,
                use: jsonLoader
            }
        ],
    }
}

const graph = createGraph();
build(graph);
























