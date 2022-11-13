import seoData from '../seo/seo.json'

const defaultMetaObj = {
    "title": "个人博客",
    "og_title": "个人博客",
    "keywords": "博客，项目，算法思路，源码阅读，开源项目",
    "og_url": "https://stonehank.github.io/",
    "description": "记录一些日常笔记，源码阅读笔记归纳，还有个人一些项目展示",
    "og_description": "记录一些日常笔记，源码阅读笔记归纳，还有个人一些项目展示",
    "og_image": null
}

export default (to, from, customMeta) => {
    const toPath = to.path
    const pathArr = toPath.split('/').slice(1).filter(Boolean)
    const defaultMeta = Object.assign(defaultMetaObj, customMeta)
    let curMeta = seoData['/' + pathArr[0]]
    if (!curMeta) {
        curMeta = defaultMeta
    } else if (pathArr.length > 1) {
        for (let i = 1; i < pathArr.length; i++) {
            curMeta = curMeta.children
            if (!curMeta) {
                curMeta = defaultMeta
                break;
            } else {
                const key = '/' + pathArr[i]
                curMeta = curMeta[key]
                if (!curMeta) {
                    curMeta = defaultMeta
                    break;
                }
            }
        }
    }
    if (curMeta) {
        $('head').find('title').html(curMeta.title)
        $('meta[name="description"]').attr('content', curMeta.description)
        $('meta[name="keywords"]').attr('content', curMeta.keywords)
        $('meta[property="og:title"]').attr('content', curMeta.og_title)
        $('meta[property="og:description"]').attr('content', curMeta.og_description)
        $('meta[property="og:image"]').attr('content', curMeta.og_image)
        $('meta[property="og:url"]').attr('content', curMeta.og_url)
        $('meta[name="twitter:title"]').attr('content', curMeta.og_title)
        $('meta[name="twitter:description"]').attr('content', curMeta.og_description)
        $('meta[name="twitter:image"]').attr('content', curMeta.og_image)
        $('meta[name="twitter:url"]').attr('content', curMeta.og_url)
    }
}
