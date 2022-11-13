const path = require('path')
const gzipSize = require('gzip-size');
const fs = require('fs-extra')


const blogPath = path.resolve('.', 'assets/doc/blog')
const sourceCodePath = path.resolve('.', 'assets/doc/sourceCode')

// 计算global-search 文件大小
function getGZipSize(folderPath) {

    let allSize = 0
    const files = fs.readdirSync(folderPath)
    files.forEach(file => {
        if (file.startsWith('.')) return
        const size = gzipSize.fileSync(folderPath + '/' + file) - 320
        const status = fs.statSync(folderPath + '/' + file)
        if (status.isDirectory()) {
            throw new Error('Error in calc gzip size, 目录中存在目录')
        }
        allSize += size
    })
    return allSize
}

module.exports = getGZipSize(blogPath) + getGZipSize(sourceCodePath)
