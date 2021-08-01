import './style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {modify_hljs, Valine, ValinePanel} from "react-valine"

modify_hljs((hljs)=>{
    const python = require('highlight.js/lib/languages/python')
    hljs.registerLanguage('python', python)
    return hljs
})

// ReactDOM.render(
//     <Valine appId="s8REl9WtWtOw7omr7frVIpMP-MdYXbMMI"
//             appKey="amadgvU7WzMYQ9eqMatTHLWM"
//             editMode={true}
//             CommentClass={"Comment_blog"}
//             CounterClass={"Counter_blog"}
//             placeholder={"说点什么吧，: 开启表情输入"}
//     >
//         <ValinePanel />
//     </Valine>,
//     document.getElementById('root')
// );
