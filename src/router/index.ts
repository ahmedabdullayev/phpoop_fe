import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Index from '../views/Index.vue'
import AddProduct from '../views/AddProduct.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-products',
    name: 'AddProduct',
    component: AddProduct
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
