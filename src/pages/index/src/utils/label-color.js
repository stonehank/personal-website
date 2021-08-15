import {getTagsCount} from "pagesDir/index/src/utils/list-json-controller";

let tagsCountList=getTagsCount()

let colorList=[
    [2,'#9c9c9c'],
    [5,'#96cb7a'],
    [10,'#7ea748'],
    [15,'#4474bf'],
    [30,'#bf3ac9'],
    [50,'#c98b27'],
    [Infinity,'#b3124b'],
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
