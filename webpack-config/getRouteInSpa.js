const path = require('path')
const fs = require('fs-extra')
const dirVars = require('./base/dir-vars.config.js')

let staticRoute=[
    '/',
    '/blogs/default',
    '/blogs/archive',
    '/blogs/labels',
    '/blogs/sourcecode',
    '/blogs/algorithm',
    '/projects',
]



let blogDir=path.resolve(dirVars.assetsDir,'doc/blog')
let leetcodeDir=path.resolve(dirVars.assetsDir,'doc/leetcode')
let sourceCodeDir=path.resolve(dirVars.assetsDir,'doc/sourceCode')

let blogPath='/articles'
let leetcodePath='/algorithm'
let sourceCodeDirPath='/articles'


let blogRoute=resolve(blogDir,blogPath,['.blog-list.json'])
let leetcodeRoute=resolve(leetcodeDir,leetcodePath,['.leetcode-list.json'])
let sourceCodeRoute=resolve(sourceCodeDir,sourceCodeDirPath,['.sourceCode-list.json'])

function resolve(dir,prefixPath,excludes=[]){
    let res=[]
    let dirData
    try{
        dirData=fs.readdirSync(dir)
    }catch(_){
        dirData=[]
    }
    for(let i=0;i<dirData.length;i++){
        if(excludes.includes(dirData[i]))continue
        res.push(prefixPath + '/' + path.parse(dirData[i]).name)
    }
    return res
}

module.exports=[...staticRoute,...blogRoute,...leetcodeRoute,...sourceCodeRoute]
