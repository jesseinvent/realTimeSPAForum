import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login/Login'
import Parallex from '../components/Parallex'
import Signup from '../components/login/Signup'
import Forum from '../components/forum/Forum'
import Read from '../components/forum/Read'
import Create from '../components/forum/Create'
import Logout from '../components/login/Logout'
import CreateCategory from '../components/category/CreateCategory'


const routes = [
    { path: '/', component: Parallex },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/signup', component: Signup },
    { path: '/category', component: CreateCategory },
    { path: '/forum', component: Forum, name: 'forum' },
    { path: '/ask', component: Create},
    { path: '/question/:slug', component: Read, name: 'read'},
];

const router = new VueRouter ({
    routes,
    mode: 'history'
});

export default router;