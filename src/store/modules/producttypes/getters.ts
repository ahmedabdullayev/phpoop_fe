import '@/types/ProductsState'
import '@/types/ProductTypes'

export default {
    productTypes:(state: ProductsState): ProductTypes[]=>{
        return state.productTypes
    }
}