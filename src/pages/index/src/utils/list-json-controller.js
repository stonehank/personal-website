import blogListJson from 'assetsDir/doc/blog/.blog-list.json';
import algorithmJson from 'assetsDir/doc/leetcode/.leetcode-list.json'
import sourceCodeList from 'assetsDir/doc/sourceCode/.sourceCode-list.json'
import {convertToList} from './list-json-parser'
let yearInfoCache=null

export function allListOnSpecificYearMonth(year,month){
    return convertToList(
        [blogListJson,algorithmJson,sourceCodeList],
        ['随笔','算法','源码阅读'],
        (item)=>{
            return item.timeArr
                && item.timeArr.length>0
                && item.timeArr[0] === +year
                && item.timeArr[1] === +month - 1
        })
}

export function getYearInfo(year){
    year = +year
    let allYear=getAllYearsInfo()
    return allYear.find(obj=>obj.year===year)
}


export function getAllYearsInfo(){
    if(yearInfoCache)return yearInfoCache
    let yearsObj={}
    let yearList=[]
    __getJsonYearInfo(blogListJson,yearsObj)
    __getJsonYearInfo(algorithmJson,yearsObj)
    __getJsonYearInfo(sourceCodeList,yearsObj)
    for(let k in yearsObj){
        yearList.push(yearsObj[k])
    }
    yearList=yearList.sort((a,b)=>a.year - b.year)
    yearInfoCache=yearList
    return yearList
}


function __getJsonYearInfo(json,yearsObj){
    for(let k in json){
        if(!json.hasOwnProperty(k))continue
        let [year,monthIdx]=json[k].timeArr
        if(yearsObj[year]==null){
            yearsObj[year]={
                view_count:0,
                blog_count:0,
                year:year,
                month_counts:Array(12).fill(0)
            }
        }
        yearsObj[year].month_counts[monthIdx]++
        yearsObj[year].blog_count++
        yearsObj[year].view_count += Math.floor( ((new Date().getTime() - new Date().setFullYear(year,0,1)) / 1000 / 3600 / 24  ))
    }
}
