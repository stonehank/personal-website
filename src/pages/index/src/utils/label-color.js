import {getTagsCount} from "pagesDir/index/src/utils/list-json-controller";

let tagsCountList=getTagsCount()

let colorList=[
    [2,'#9c9c9c'],
    [5,'#94c270'],
    [10,'#599c11'],
    [15,'#3c68b1'],
    [30,'#95389e'],
    [50,'#d49f47'],
    [Infinity,'#c23c6d'],
]

let labelColor={}

for(let i=0;i<tagsCountList.length;i++){
    let count=tagsCountList[i].count
    let label=tagsCountList[i].label
    labelColor[label]=''
    for(let j=0;j<colorList.length;j++){
        if(count<colorList[j][0]){
            labelColor[label]=colorList[j][1]
            break
        }
    }
}


export default  labelColor
