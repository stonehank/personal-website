<template>
    <ResultsRender v-if="query"
                   :results="results"
                   :labelResults="labelResults"
                   :hideSearch="hideSearch"
    />
</template>

<script>
    import {allList} from "pagesDir/index/src/utils/list-json-controller";
    import {ignoreInterceptTags, inHTMLTag, searchPrecision} from "pagesDir/index/src/utils/list-json-parser";

    export default {
        name: "ResultsAnalysis",
        components: {
            ResultsRender:()=>import("pagesDir/index/src/commons/SearchSystem/ResultsRender")
        },
        props:{
            query:String,
            global:Boolean,
            afterGlobalDone:Function,
            hideSearch:Function,
        },
        watch:{
            query:{
                immediate:true,
                handler:function(newV){
                    this.updateSearchResult(newV)
                }
            },
            global:{
                immediate:true,
                handler:function(newV,oldV){
                    if(newV){
                        this.getFullList()
                        .then(()=>this.updateSearchResult(this.query))
                    }else{
                        this.updateSearchResult(this.query)
                    }
                }
            }
        },
        data(){
            return {
                list:allList(),
                results:[],
                labelResults:[],
                globalDone:false,
                simpleSearchProps:['title','created_at'],
                complicateSearchProps:[{prop:'summary',globalProp:'content'}]
            }
        },
        methods:{
            updateSearchResult(query){
                this.results=this.computeArticleMatch(query)
                this.labelResults=this.computeTagsMatch(query)
            },
            computeArticleMatch(patternValue) {
                if(!patternValue)return []
                patternValue=patternValue.trim().toLowerCase()
                if (patternValue === "") return []

                let finalMathResultArr=[]
                function searchCore(pattern,content,precisionMatchArr,propIdx,fromIndex){
                    let matchIndex,precisionIndex=searchPrecision(pattern,content,fromIndex)
                    if(precisionIndex===null)matchIndex= -1
                    else if(precisionIndex!==-1){precisionMatchArr[propIdx]=1;matchIndex=precisionIndex}
                    else matchIndex = content.indexOf(patternValue,fromIndex)
                    return matchIndex
                }
                function simpleSplit(obj,curProp,matchIdx,patternValue){
                    let prefix=null,match=null,affix=null
                    if (matchIdx === -1) return [prefix,match,affix]
                    prefix = obj[curProp].substr(0, matchIdx)
                    match = obj[curProp].substr(matchIdx, patternValue.length)
                    affix = obj[curProp].substr(matchIdx + patternValue.length)
                    return [prefix,match,affix]
                }
                function complicateSplit(obj,curProp,precisionMatchArr,propIdx,matchIdx,patternValue){
                    let prefix=null,match=null,affix=null
                    if (matchIdx !== -1) {
                        const lo = 50, hi = 100
                        let contentMatchPart=obj[curProp].toLowerCase().substring(matchIdx - lo, matchIdx + hi)
                        // 去除tag内部内容
                        while(inHTMLTag(patternValue,contentMatchPart.toLowerCase(),Math.min(matchIdx,lo))){
                            precisionMatchArr[propIdx]=0
                            matchIdx=searchCore(patternValue,obj[curProp].toLowerCase(),precisionMatchArr,propIdx,matchIdx+patternValue.length)
                            if(matchIdx!==-1)contentMatchPart=obj[curProp].substring(matchIdx - lo, matchIdx + hi)
                            else break
                        }
                        if(matchIdx===-1)return [prefix,match,affix,matchIdx]
                        // prefix = obj[curProp].substring(matchIdx-lo, matchIdx)
                        prefix =getPrefix(obj[curProp],matchIdx,lo)
                        match = obj[curProp].substr(matchIdx, patternValue.length)
                        affix = getAffix(obj[curProp],matchIdx,patternValue,hi)
                        // obj[curProp].substr(matchIdx + patternValue.length,hi)
                    }
                    return [prefix,match,affix,matchIdx]
                }
                function getPrefix(content,matchIdx,lo){
                    let from=matchIdx - lo
                    let to=matchIdx
                    let searchString=content.substring(from,to)
                    let lastSave=0
                    let regexp=RegExp('<.*?>','g');
                    while(lastSave < to - from){
                        let match=regexp.exec(searchString)
                        if(match){
                            lastSave=match.index
                        }else{
                            break
                        }
                    }
                    if(lastSave===0){
                        return content.substring(from,to)
                    }else{
                        return content.substring(from + lastSave,to)
                    }
                }
                function getAffix(content,matchIdx,patternValue,hi){
                    let from=matchIdx + patternValue.length
                    let to=from + hi
                    let searchString=content.substring(from,to)
                    let lastSave=0
                    let regexp=RegExp('<\\/.*?>','g');
                    while(true){
                        let match=regexp.exec(searchString)
                        // let match=searchString.slice(lastSave).match(/<\/.*?>/)
                        if(match){
                            if(match.index + match[0].length>=hi)break
                            lastSave=match.index + match[0].length
                        }else{
                            break
                        }
                    }
                    if(lastSave===0){
                        return content.substring(from,to)
                    }else{
                        return content.substring(from,from + lastSave)
                    }
                }
                function getPath(flag,slug){
                   if(flag==='算法'){
                       return '/algorithm/'+slug
                   }else{
                       return '/articles/'+slug
                   }
                }
                // 添加颜色html
                function addMatchColor(prefix,match,affix){
                    // console.log(prefix,match,affix)
                    prefix=ignoreInterceptTags(prefix)
                    return `<span>${prefix}<b style="background:yellow;color:#333">${match}</b>${affix}</span>`
                }
                for (let index = 0; index < this.list.length; index++) {

                    let curData=this.list[index]

                    let precisionMatchArr=Array(this.simpleSearchProps?this.simpleSearchProps.length:0 +
                    this.complicateSearchProps?this.complicateSearchProps.length:0).fill(0)
                    let weightPoint=0
                    let curResultObj={
                        path:getPath(curData.flag,curData['slug']),
                        slug:curData['slug'],
                        flag:curData.flag
                    }
                    let normalMatchArr=[]
                    if(this.simpleSearchProps){
                        for(let i=0;i<this.simpleSearchProps.length;i++){
                            let curProp,initProp
                            let curProps=this.simpleSearchProps[i]
                            if(typeof curProps==="string"){
                                curProp=curProps
                                initProp=curProps
                            }
                            else{
                                let {prop,globalProp}=curProps
                                if(globalProp && this.global)curProp=globalProp
                                else curProp=prop
                                initProp=prop
                            }
                            let lowerCase=curData[curProp].toLowerCase()
                            let matchIdx=searchCore(patternValue,lowerCase,precisionMatchArr,i)
                            let [prefix,match,affix]=simpleSplit(curData,curProp,matchIdx,patternValue)
                            let finalMatchDate= matchIdx===-1
                                ? curData[curProp]
                                : addMatchColor(prefix,match,affix)
                            if(matchIdx!==-1){
                                normalMatchArr[i]=1
                            }else{
                                normalMatchArr[i]=0
                            }
                            curResultObj=Object.assign(curResultObj,{[initProp]:finalMatchDate})
                        }
                    }
                    if(this.complicateSearchProps){
                        for(let j=0;j<this.complicateSearchProps.length;j++){
                            let complicateProp
                            let complicateProps=this.complicateSearchProps[j]
                            if(typeof complicateProps==="string")complicateProp=complicateProps
                            else{
                                let {prop,globalProp}=complicateProps
                                if(globalProp && this.global)complicateProp=globalProp
                                else complicateProp=prop
                            }
                            if(!complicateProp || !curData[complicateProp])continue
                            let lowerCase=curData[complicateProp].toLowerCase()
                            let matchIdx=searchCore(patternValue,lowerCase,precisionMatchArr,this.simpleSearchProps.length+j)

                            let [prefix,match,affix,newMatchIdx]=complicateSplit(curData,complicateProp,precisionMatchArr,this.simpleSearchProps.length+j,matchIdx,patternValue)

                            let finalMatchDate= newMatchIdx===-1
                                ? curData[complicateProp].substring(0,100)
                                : addMatchColor(prefix,match,affix)


                            if(newMatchIdx!==-1){
                                normalMatchArr[this.simpleSearchProps.length+j]=1
                            }else{
                                normalMatchArr[this.simpleSearchProps.length+j]=0
                            }
                            curResultObj=Object.assign(curResultObj,{matchContent:finalMatchDate})
                        }
                    }

                    let curWeight=10000
                    let normalWeight=500
                    // console.log(precisionMatchArr)
                    for(let i=0;i<precisionMatchArr.length;i++){
                        if(precisionMatchArr[i]===1){
                            weightPoint+=curWeight/Math.pow(2,i)
                        }
                    }
                    for(let i=0;i<normalMatchArr.length;i++){
                        if(normalMatchArr[i]===1){
                            weightPoint+=normalWeight/Math.pow(2,i)
                        }
                    }
                    if(weightPoint!==0) finalMathResultArr.push([weightPoint,curResultObj])

                }
                return finalMathResultArr.sort((a,b)=>b[0]-a[0]).map(arr=>arr[1])
            },
            computeTagsMatch(patternValue) {
                if(!patternValue)return []
                patternValue=patternValue.trim().toLowerCase()
                if (patternValue === "") return []
                let matchResultSet = new Set()
                for (let index = 0; index < this.list.length; index++) {
                    let tagList=this.list[index].relatedTags
                    if(!tagList)continue
                    for (let i = 0; i < tagList.length; i++) {
                        let isMatch = tagList[i].includes(patternValue)
                        if (isMatch) matchResultSet.add(tagList[i])
                    }
                }
                return Array.from(matchResultSet)
            },
            getFullList(){
                if(this.globalDone) {
                    return Promise.resolve().then(()=>this.afterGlobalDone())
                }
                this.globalDone=false
                let fetchQueue = []
                for(let i= 0;i<this.list.length;i++){
                    // console.log(this.list[i])
                    if(this.list[i].flag==='随笔'){
                        fetchQueue.push(
                            import(
                                /* webpackMode: "lazy-once" */
                                /* webpackInclude: /\.json$/ */
                                /* webpackExclude: /.*-list\.json$/ */
                                /* webpackChunkName: "blog-global-search" */
                                `assetsDir/doc/blog/${this.list[i].slug}.json`)
                            .then(({default:obj}) => {
                                this.list[i].content = obj.content
                            }))
                    }else if(this.list[i].flag==='源码阅读'){
                        fetchQueue.push(
                            import(
                                /* webpackMode: "lazy-once" */
                                /* webpackInclude: /\.json$/ */
                                /* webpackExclude: /.*-list\.json$/ */
                                /* webpackChunkName: "sourcecode-global-search" */
                                `assetsDir/doc/sourceCode/${this.list[i].slug}.json`)
                            .then(({default:obj}) => {
                                this.list[i].content = obj.content
                            }))
                    }
                }
                return Promise.all(fetchQueue).then(()=>{
                    this.afterGlobalDone()
                })
            }
        }
    }
</script>

<style scoped>

</style>
