import '@/types/ProductsState'
export default {
    setAllProducts(state: ProductsState, products: Products[]){
        state.products = products
    }
}