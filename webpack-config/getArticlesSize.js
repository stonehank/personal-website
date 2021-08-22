const gzipSize = require('gzip-size');
const fs=require('fs-extra')
const path=require('path')
const dirVars = require('./base/dir-vars.config.js')
let blogPath=path.resolve(dirVars.assetsDir,'doc/blog')
let sourceCodePath=path.resolve(dirVars.assetsDir,'doc/sourceCode')



// 计算global-search 文件大小
function getGZipSize(folderPath){
    let allSize=0
    let files=fs.readdirSync(folderPath)
    files.forEach(file=>{
        if(file.startsWith('.'))return
        let size=gzipSize.fileSync(folderPath+'/'+file)-320
        let status=fs.statSync(folderPath+'/'+file)
        if(status.isDirectory()){
            throw new Error('Error in calc gzip size, 目录中存在目录')
        }
        allSize+=size
    })
    return allSize
}

module.exports=getGZipSize(blogPath)+ getGZipSize(sourceCodePath)
