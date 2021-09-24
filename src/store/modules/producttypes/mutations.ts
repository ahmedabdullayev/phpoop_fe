import '@/types/ProductsState'
export default {
    setAllProductTypes(state: ProductsState, products: ProductTypes[]){
        state.productTypes = products
    }
}