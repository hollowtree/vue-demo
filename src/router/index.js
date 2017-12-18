import Vue from 'vue'
import Router from 'vue-router'
import d3Root from '@/pages/d3Root'
import d3001 from '@/pages/components/001'
import d3002 from '@/pages/components/002'
import d3003 from '@/pages/components/003'
import d3004 from '@/pages/components/004'
import d3005 from '@/pages/components/005'
import d3006 from '@/pages/components/006'
import d3007 from '@/pages/components/007'
import d3008 from '@/pages/components/008'
import d3009 from '@/pages/components/009'
import d3010 from '@/pages/components/010'
import d3011 from '@/pages/components/011'
import d3012 from '@/pages/components/012'
import d3013 from '@/pages/components/013'
import d3014 from '@/pages/components/014'
import d3015 from '@/pages/components/015'
import kLine001 from '@/pages/components/kLine001'
import kLine002 from '@/pages/components/kLine002'
import kLine003 from '@/pages/components/kLine003'
import kLine004 from '@/pages/components/kLine004'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/d3',
            component: d3Root,
            children: [
                {
                    path: '001',
                    component: d3001
                },
                {
                    path: '002',
                    component: d3002
                },
                {
                    path: '003',
                    component: d3003
                },
                {
                    path: '004',
                    component: d3004
                },
                {
                    path: '005',
                    component: d3005
                },
                {
                    path: '006',
                    component: d3006
                },
                {
                    path: '007',
                    component: d3007
                },
                {
                    path: '008',
                    component: d3008
                },
                {
                    path: '009',
                    component: d3009
                },
                {
                    path: '010',
                    component: d3010
                },
                {
                    path: '011',
                    component: d3011
                },
                {
                    path: '012',
                    component: d3012
                },
                {
                    path: '013',
                    component: d3013
                },
                {
                    path: '014',
                    component: d3014
                },
                {
                    path: '015',
                    component: d3015
                },

                {
                    path: 'kline001',
                    component: kLine001
                },
                {
                    path: 'kline002',
                    component: kLine002
                },
                {
                    path: 'kline003',
                    component: kLine003
                },
                {
                    path: 'kline004',
                    component: kLine004
                }
            ]
        }
    ]
})
