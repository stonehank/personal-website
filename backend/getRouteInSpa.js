
const path = require('path')
const fs = require('fs-extra')

// const staticRoute = [
//     '/',
//     '/blogs/default',
//     '/blogs/archive',
//     '/blogs/labels',
//     '/blogs/sourcecode',
//     '/blogs/algorithm',
//     '/projects',
// ]



const blogDir = path.resolve('../assets/', 'doc/blog')
const leetcodeDir = path.resolve('../assets/', 'doc/leetcode')
const sourceCodeDir = path.resolve('../assets/', 'doc/sourceCode')

const blogPath = '/article'
const leetcodePath = '/algorithm'
const sourceCodeDirPath = '/article'


const blogRoute = resolve(blogDir, blogPath, ['.blog-list.json'])
const leetcodeRoute = resolve(leetcodeDir, leetcodePath, ['.leetcode-list.json'])
const sourceCodeRoute = resolve(sourceCodeDir, sourceCodeDirPath, ['.sourceCode-list.json'])

function resolve(dir, prefixPath, excludes = []) {
    const res = []
    let dirData
    try {
        dirData = fs.readdirSync(dir)
    } catch (_) {
        dirData = []
    }
    for (let i = 0; i < dirData.length; i++) {
        if (excludes.includes(dirData[i])) continue
        res.push(prefixPath + '/' + path.parse(dirData[i]).name)
    }
    return res
}
const blogListJson = require('../assets/doc/blog/.blog-list.json')
const _algorithmJson = require('../assets/doc/leetcode/.leetcode-list.json')
const sourceCodeList = require('../assets/doc/sourceCode/.sourceCode-list.json')

const algorithmJson = {}
for (const k in _algorithmJson) {
    if (_algorithmJson[k].hasThinking) {
        algorithmJson[k] = _algorithmJson[k]
    }
}

function convertToList(jsonList, flags, filter) {
    if (!filter) filter = (_) => true
    if (!Array.isArray(jsonList)) jsonList = [jsonList]
    if (!Array.isArray(flags)) flags = []
    const list = []
    for (let i = 0; i < jsonList.length; i++) {
        const json = jsonList[i]
        const flag = flags[i]
        for (const k in json) {
            if (!json.hasOwnProperty(k)) continue
            if (!filter(json[k])) continue
            list.push({
                ...json[k],
                flag
            })
        }
    }
    return list
}
function objGroupBy(objOrList, key, {
    priorityProps = null,
    onlyCount = false,
    specificProp = null
} = {}) {
    const result = {}
    const os = Object.prototype.toString
    if (Array.isArray(objOrList)) {
        for (const objData of objOrList) {
            if (!objData[key]) continue
            _group(objData[key], result, objData)
        }
    } else {
        for (const k in objOrList) {
            if (!objOrList.hasOwnProperty(k)) continue
            const objData = objOrList[k]
            if (!objData[key]) continue
            _group(objData[key], result, objData)
        }
    }
    function _group(data, result, objData) {
        const typeData = os.call(data)
        if (typeData === "[object Array]") {
            if (priorityProps && data[priorityProps] != null) {
                _group(data[priorityProps], result, objData)
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] == null) continue
                    if (specificProp != null && data[i] !== specificProp) continue
                    _group(data[i], result, objData)
                }
            }
        } else if (typeData === "[object Object]") {
            if (priorityProps && data[priorityProps] != null) {
                _group(data[priorityProps], result, objData)
            } else {
                for (const _k in data) {
                    if (!data.hasOwnProperty(_k)) continue
                    if (data[_k] == null) continue
                    if (specificProp != null && data[_k] !== specificProp) continue
                    _group(data[_k], result, objData)
                }
            }
        } else if (!result[data]) {
            if (onlyCount) result[data] = 1
            else result[data] = [objData]
        } else if (onlyCount) {
            result[data]++
        } else {
            result[data].push(objData)
        }
    }
    if (specificProp) {
        // 在specificProp下，结果只能由一个key
        const keys = Object.keys(result)
        if (keys.length !== 1) {
            throw new Error('在specificProp下，结果只能由一个key')
        }
        return result[keys[0]]
    }
    return result
}
function getTagsCount(specificProp = null) {
    let countsObj = objGroupBy(
        convertToList([blogListJson, algorithmJson, sourceCodeList], ['随笔', '算法', '源码阅读']),
        'relatedTags',
        {
            onlyCount: true,
            specificProp
        }
    )
    const list = []
    for (const key in countsObj) {
        const obj = { label: key, count: countsObj[key] }
        list.push(obj)
    }
    countsObj = null
    return list
}
const labelRoute = getTagsCount().map(obj => '/label/' + obj.label)

module.exports = [...blogRoute, ...leetcodeRoute, ...sourceCodeRoute, ...labelRoute]
