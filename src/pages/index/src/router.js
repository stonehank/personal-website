

const routes = [
    {
        path: '/',
        component: () => import( './pages/Home')
    },
    {
        path:'/blogs',
        component:()=>import('./pages/Blogs')
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
