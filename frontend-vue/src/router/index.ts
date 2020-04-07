import Vue from 'vue'
import VueRouter from 'vue-router'

import { paths } from '@/constants/router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths
})

export default router
