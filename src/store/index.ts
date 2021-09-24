import { createStore } from 'vuex'
import products from './modules/products'
import productTypes from './modules/producttypes'
export default createStore({
  modules: {
    products,
    productTypes
  }
})
