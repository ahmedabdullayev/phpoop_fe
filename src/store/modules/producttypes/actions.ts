import axios from "axios";

export default {
    FETCH_PRODUCTTYPES(context: any){
        return new Promise((resolve, reject) => {
            axios({
                'method': 'get',
                url: '/get-producttypes'
            }).then((response: any)=>{
                console.warn(response.data)
                context.commit("setAllProductTypes", response.data)
                resolve(response)
            })
                .catch((err: any)=>{
                    reject(err)
                })
        })
    }
}