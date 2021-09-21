import axios from "axios";

export default {
    FETCH_PRODUCTS(context: any){
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: "/get-posts"
            }).then((response: any)=>{
                console.warn(response.data)
                context.commit("setAllProducts", response.data)
                resolve(response)
            })
                .catch((err: any)=>{
                    reject(err)
                })
        })
    }
}