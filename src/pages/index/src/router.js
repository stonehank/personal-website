

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
                path:'labels',
                component:()=>import('./pages/Blogs/Tags')
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
        path:'/archive/:slug',
        component:()=>import('./pages/ArchiveMonth')
    },
    {
        path:'/algorithm/:slug',
        component:()=>import('./pages/Algorithm')
    },
    {
        path:'/labels/:slug',
        component:()=>import('./pages/LabelDetail.vue')
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
