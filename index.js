//主逻辑

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('babel-core')

//assets
function createAssets(filename) {
    //1. 获取文件的内容
    const source = fs.readFileSync(filename, {
        encoding: 'utf8'
    });

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
        code,
        deps,
        filename
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
            queue.push(child);
        })
    }
    return queue;
}

function build(graph){
    const template = fs.readFileSync('./bundle.ejs', {
        encoding: 'utf8'
    });

    const code = ejs.render(template);
    fs.writeFileSync('./example/dist/bundle.js', code);
}

const graph = createGraph();
build(graph);
























