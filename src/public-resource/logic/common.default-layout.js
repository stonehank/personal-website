import 'componentsDir/header/index.js'
import 'componentsDir/meta/index.js'
import 'componentsDir/top-nav/index.js'
import 'componentsDir/footer/index.js'
import 'componentsDir/comment/index.js'
import 'componentsDir/external-links/index.js'

import 'cssDir/_variables.scss'
import 'cssDir/common.scss'
import 'cssDir/github.scss'
import 'cssDir/github-markdown-css.css'
import 'cssDir/vue-bbs-theme.scss'
import 'jsDir/themeDetect.js'
import {scrollTo} from "pagesDir/index/src/utils";

$(document).ready(()=>{
    $(document).on('click',function(ev){
        if($(ev.target).is('a[href^="#"]')){
            let hash=decodeURI($(ev.target).attr('href'))
            console.log('in click',hash)
            setTimeout(()=>{
                scrollTo(hash)
            },100)
        }
    })
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         console.log('in click')
    //         e.preventDefault();
    //
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });
})
