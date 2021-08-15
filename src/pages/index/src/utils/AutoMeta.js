import seoData from '../../../../../seo/seo.json'
let defaultMetaObj= {
    "title": "Task2bid",
    "og_title": "Task2bid",
    "keywords": "Task2bid",
    "og_url": "https://www.task2bid.comdefault",
    "description": "Task2bid Category",
    "og_description": "Task2bid Category",
    "og_image": "https://www.task2bid.com/images/link-share-thumbnail.png"
}
export default (to, from,customMeta) => {
    let toPath=to.path
    let pathArr=toPath.split('/').slice(1)
    let defaultMeta=Object.assign(defaultMetaObj,customMeta)
    let curMeta=seoData['/'+pathArr[0]]
    if(!curMeta){
        curMeta=defaultMeta
    }else if(pathArr.length>1){
        for(let i=1;i<pathArr.length;i++){
            curMeta=curMeta['children']
            if(!curMeta){
                curMeta=defaultMeta
                break;
            }else{
                let key='/'+pathArr[i]
                curMeta=curMeta[key]
                if(!curMeta){
                    curMeta=defaultMeta
                    break;
                }
            }
        }
    }
    if(curMeta){
        $('head').find('title').html(curMeta.title)
        $('meta[name="description"]').attr('content',curMeta.description)
        $('meta[name="keywords"]').attr('content',curMeta.keywords)
        $('meta[property="og:title"]').attr('content',curMeta.og_title)
        $('meta[property="og:description"]').attr('content',curMeta.og_description)
        $('meta[property="og:image"]').attr('content',curMeta.og_image)
        $('meta[property="og:url"]').attr('content',curMeta.og_url)
        $('meta[name="twitter:title"]').attr('content',curMeta.og_title)
        $('meta[name="twitter:description"]').attr('content',curMeta.og_description)
        $('meta[name="twitter:image"]').attr('content',curMeta.og_image)
        $('meta[name="twitter:url"]').attr('content',curMeta.og_url)
    }
}
