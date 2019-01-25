import Vue from 'vue'
import Router from 'vue-router'

import index from './views/index'
import list from './views/list'
import topic from './views/topic'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component:index,
      redirect:'/all',
      children:[
        {
          path:':tab',
          component:list
        }
      ]
    },{
      path:'/topic/:id',
      component:topic
    }
  ]
})
