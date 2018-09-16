import {postRequest} from '../utils/request'
import qs from 'qs'

// export function getShops(params){
//     return postRequest("https://easy-mock.com/mock/5b9535e6dd236325f85bf992/example/upload").then(res=>{
//       return res.data.data || {}
//     })
// }
export function getShops(params={}){
    return postRequest("https://gateway.imeihui.top/home/shoplist",params)
}