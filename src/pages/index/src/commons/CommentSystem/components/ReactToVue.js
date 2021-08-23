import {modify_hljs, Valine,ValineCount,ValinePanel,ValinePageview} from "../../../utils/react-valine/react-valine.js"
import {applyReactInVue} from 'vuereact-combined'

modify_hljs((hljs)=>{
    const python = require('highlight.js/lib/languages/python')
    hljs.registerLanguage('python', python)
    return hljs
})

let VueValine=applyReactInVue(Valine)
let VueValineCount=applyReactInVue(ValineCount)
let VueValinePanel=applyReactInVue(ValinePanel)
let VueValinePageview=applyReactInVue(ValinePageview)
export {
    VueValine,VueValineCount,VueValinePageview,VueValinePanel
}
