import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/ViewTable.vue'
import EditTable from './views/EditTable.vue'
import EditSpec from './views/EditSpec.vue'
import Shedule from './views/Shedule.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/editTable',
            name: 'editTable',
            component: EditTable
        },
        {
            path: '/editSpec',
            name: 'editSpec',
            component: EditSpec
        },
        {
            path: '/shedule',
            name: 'shedule',
            component: Shedule
        },
    ]
})
