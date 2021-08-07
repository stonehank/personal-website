

const routes = [
    {
        path: '/',
        component: () => import( './pages/Home')
    },
    {
        path:'/blogs',
        component:()=>import('./pages/Blogs'),
        redirect: '/blogs/default',
        children:[
            {
                path:'default',
                component:()=>import('./pages/Blogs/Default')
            },
            {
                path:'archive',
                component:()=>import('./pages/Blogs/Archive')
            },
            {
                path:'tags',
                component:()=>import('./pages/Blogs/BlogTags')
            },
            {
                path:'sourcecode',
                component:()=>import('./pages/Blogs/SourceCode')
            },
            {
                path:'algorithm',
                component:()=>import('./pages/Blogs/Algorithm')
            },
        ]
    },
    {
        path:'/articles/:slug',
        component:()=>import('./pages/Article')
    },

    {
        path:'/projects',
        component:()=>import('./pages/Projects')
    },
    {
        path: '*', component: () => import( './components/Error')
    }
]


export default routes
