
const languagesData = require('localesDir/index.js')
const {isoCode, createDefaultMeta, primaryLang, languageUrlStr} = require('localesDir/config.js')

function getCurPageLang(langObj, folder1, folder2, page, defaultMeta) {
    if (!folder1 && folder2 || !page) {
        throw new Error('Error, Check plugins.config.js!! Possible error1 : Must have page. Possible error2: if have folder2 name, must have folder1(parent folder) name.')
    }
    if (folder1 && folder2 && page) {
        return resolve(langObj, [folder1, folder2, page], 0, defaultMeta)
    } else if (folder1 && page) {
        return resolve(langObj, [folder1, page], 0, defaultMeta)
    } else if (page) {
        return resolve(langObj, [page], 0, defaultMeta)
    }
}

function resolve(langObj, keyArr, idx, defaultMeta) {
    if (idx === keyArr.length) return langObj
    if (langObj[keyArr[idx]]) {
        return resolve(langObj[keyArr[idx]], keyArr, idx + 1, defaultMeta)
    } else {
        return {meta: defaultMeta}
    }
}


module.exports=function generateLayoutTemplate(layoutName){

    let layoutRender
    try{
        layoutRender=require(`layoutDir/${layoutName}/html.js`)
    }catch(_){
        throw new Error("Each layout should have a '.html.js', to provide a layout render function")
    }
    return {
        run({
                contentPrefix,
                content,
                contentSuffix,
                language,
                publicPath,
                folderLocalesName1 = null,
                folderLocalesName2 = null,
                pageLocalesName,
                author,
                customPageConfig,
                isDev
            } = {}) {
            const locales = languagesData[language]
            let defaultMeta = createDefaultMeta(folderLocalesName1, folderLocalesName2, pageLocalesName, author)
            let curPageLang = getCurPageLang(locales.pages, folderLocalesName1, folderLocalesName2, pageLocalesName, defaultMeta)
            const metaConfig = curPageLang.meta
            metaConfig.lang = isoCode[language]

            let prefixPath = publicPath + (language === primaryLang ? "" : languageUrlStr[language])
            if(folderLocalesName1)prefixPath = prefixPath +folderLocalesName1 + '/'
            if(folderLocalesName2)prefixPath = prefixPath +folderLocalesName2  + '/'
            let params = {
                contentPrefix,
                content,
                contentSuffix,
                author,
                publicPath,
                language,
                prefixPath,
                pageLocalesName,
                folderLocalesName1,
                folderLocalesName2,
                locales,
                pageLocales: curPageLang,
                pageConfig: customPageConfig,
                isDev
            }
            return layoutRender(params,metaConfig)
        }
    }

}
