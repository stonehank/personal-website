const header = require('componentsDir/header/html.ejs')
const meta = require('componentsDir/meta/html.ejs')
const topNav = require('componentsDir/top-nav/html.ejs')
const footer = require('componentsDir/footer/html.ejs')
const comment = require('componentsDir/comment/html.ejs')
const externalLinks = require('componentsDir/external-links/html.ejs')

const layout = require('./html.ejs')

module.exports = function layoutRender(params,metaConfig){
    const {pageLocales,contentPrefix,content,contentSuffix, ...otherParams}=params
    const renderData = {
    	header : header({htmlLang: metaConfig.lang, wmpConfig:{...params}}),
			meta : meta({...metaConfig, wmpConfig:{...params}}),
			topNav : topNav({wmpConfig:{pageLocales: otherParams.locales["top-nav"], ...params}}),
			footer : footer({wmpConfig:{pageLocales: otherParams.locales["footer"], ...params}}),
            comment : comment({wmpConfig:{pageLocales: otherParams.locales["comment"], ...params}}),
			externalLinks : externalLinks({wmpConfig:{pageLocales: otherParams.locales["external-links"], ...params}}),
		}
    if(content)renderData.content=content({wmpConfig:{pageLocales, ...otherParams}})
    if(contentPrefix)renderData.contentPrefix=contentPrefix({wmpConfig:{pageLocales, ...otherParams}})
    if(contentSuffix)renderData.contentSuffix=contentSuffix({wmpConfig:{pageLocales, ...otherParams}})

    return layout(renderData)
}
