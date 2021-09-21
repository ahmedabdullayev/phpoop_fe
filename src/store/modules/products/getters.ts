import '@/types/ProductsState'
import '@/types/Products'
export default {
    products: (state: ProductsState): Products[]=>{
        return state.products
    }
}