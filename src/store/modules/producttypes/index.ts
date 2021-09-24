import getters from "@/store/modules/producttypes/getters";
import mutations from "@/store/modules/producttypes/mutations";
import actions from "@/store/modules/producttypes/actions";
import '@/types/ProductsState'

export default {
    namespaced: true,
    state: <ProductsState>{},
    getters,
    mutations,
    actions
}