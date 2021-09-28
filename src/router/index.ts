import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Index from '../views/Index.vue'
import AddProduct from '../views/AddProduct.vue'
import testForm from '../views/testForm.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // {
  //   path: '/add-product',
  //   name: 'AddProduct',
  //   component: AddProduct
  // },
  {
    path: '/add-product',
    name: 'testForm',
    component: testForm
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
