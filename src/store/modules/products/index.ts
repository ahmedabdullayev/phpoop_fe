import getters from "@/store/modules/products/getters";
import mutations from "@/store/modules/products/mutations";
import actions from "@/store/modules/products/actions";
import '@/types/ProductsState'

export default {
    namespaced: true,
    state: <ProductsState>{},
    getters,
    mutations,
    actions
}