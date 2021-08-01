
const generateLayoutTemplate=require('./layoutHtml')


module.exports=function buildPage (templateParameters){
    const {fullPagePath,...otherParameters}=templateParameters

    let config,layoutName,contentPrefix,content,contentSuffix
    try{
        config=require(`pagesDir/${fullPagePath}/config.js`)
    }catch(_){
        config=null
    }
    if(config){
        layoutName=config.layout
        contentPrefix=config.contentPrefix
        content=config.content
        contentSuffix=config.contentSuffix

    }
    /* if not found layout, get default */
    if(!layoutName)layoutName='default-layout'

    if(contentPrefix && typeof contentPrefix!=='function'){
        throw new Error('The contentPrefix in config must provide a ejs render function.')
    }
    if(content && typeof content!=='function'){
        throw new Error('The content in config must provide a ejs render function.')
    }
    if(contentSuffix && typeof contentSuffix!=='function'){
        throw new Error('The contentSuffix in config must provide a ejs render function.')
    }
    let layout=generateLayoutTemplate(layoutName)

    return layout.run({
        contentPrefix,
        content,
        contentSuffix,
        ...otherParameters
    })
}
