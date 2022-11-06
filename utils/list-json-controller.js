import blogListJson from 'doc/blog/.blog-list.json';
import _algorithmJson from 'doc/leetcode/.leetcode-list.json'
import sourceCodeList from 'doc/sourceCode/.sourceCode-list.json'
import { convertToList, objGroupBy } from './list-json-parser'
let yearInfoCache = null
const algorithmJson = {}
for (const k in _algorithmJson) {
    if (_algorithmJson[k].hasThinking) {
        algorithmJson[k] = _algorithmJson[k]
    }
}


export function getDemo(type, count) {
    let json = null
    if (type === 'blog') {
        json = blogListJson
    } else if (type === 'leetcode' || type === 'algorithm') {
        json = algorithmJson
    } else if (type === 'sourceCode') {
        json = sourceCodeList
    } else {
        return
    }
    return convertToList([json])
        .sort((a, b) => a.created_at <= b.created_at ? 1 : -1)
        .slice(0, count)
}

export function allList() {
    return convertToList(
        [blogListJson, algorithmJson, sourceCodeList],
        ['随笔', '算法', '源码阅读'])
}


/* Archive --- Start --- */
export function allListOnSpecificYearMonth(year, month) {
    return convertToList(
        [blogListJson, algorithmJson, sourceCodeList],
        ['随笔', '算法', '源码阅读'],
        (item) => {
            return item.timeArr
                && item.timeArr.length > 0
                && item.timeArr[0] === +year
                && item.timeArr[1] === +month - 1
        })
}

export function getYearInfo(year) {
    year = +year
    const allYear = getAllYearsInfo()
    return allYear.find(obj => obj.year === year)
}

export function getYearMonthInfo(year, month) {
    year = +year
    const allYear = getAllYearsInfo()
    const yearInfo = allYear.find(obj => obj.year === year)
    const yearMonthInfo = {}
    yearMonthInfo.year = yearInfo.year
    yearMonthInfo.month = month
    const allYearBlogsCount = yearInfo.month_counts.reduce((a, b) => a + b)
    yearMonthInfo.view_count = Math.floor(yearInfo.view_count / allYearBlogsCount * yearInfo.month_counts[month - 1])
    yearMonthInfo.blog_count = yearInfo.month_counts[month - 1]
    return yearMonthInfo
}


export function getAllYearsInfo() {
    if (yearInfoCache) return yearInfoCache
    const yearsObj = {}
    let yearList = []
    __getJsonYearInfo(blogListJson, yearsObj)
    __getJsonYearInfo(algorithmJson, yearsObj)
    __getJsonYearInfo(sourceCodeList, yearsObj)
    for (const k in yearsObj) {
        yearList.push(yearsObj[k])
    }
    yearList = yearList.sort((a, b) => a.year - b.year)
    yearInfoCache = yearList
    return yearList
}


function __getJsonYearInfo(json, yearsObj) {
    for (const k in json) {
        if (!json.hasOwnProperty(k)) continue
        if (!json[k].timeArr) continue
        const [year, monthIdx] = json[k].timeArr
        if (year == null) continue
        if (yearsObj[year] == null) {
            yearsObj[year] = {
                view_count: 0,
                blog_count: 0,
                year,
                month_counts: Array(12).fill(0)
            }
        }
        yearsObj[year].month_counts[monthIdx]++
        yearsObj[year].blog_count++
        yearsObj[year].view_count += Math.floor(((new Date().getTime() - new Date().setFullYear(year, 0, 1)) / 1000 / 3600 / 24))
    }
}

/* Archive --- End --- */


/* Tags --- Start --- */

export function getTagsCount(specificProp = null) {
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
export function getTagsObj(specificProp = null) {
    return objGroupBy(
        convertToList([blogListJson, algorithmJson, sourceCodeList], ['随笔', '算法', '源码阅读']),
        'relatedTags',
        {
            specificProp
        }
    )
}



/* Tags --- End --- */
