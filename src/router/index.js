import Vue from 'vue'
import Router from 'vue-router'
import kLine001 from '@/components/kLine001'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'kLine001',
            component: kLine001
        }
    ]
})
