import {request} from '@/api/request'
import {CategoryId, getProductId, isTestEnv} from "@/api/common";

export function getProgramList(chainId, productName, categoryId = CategoryId.Earn){
  if(isTestEnv) {
    return request.get(`api/${productName}/program.json?rnd=` + Date.now())
  }
  let productId = getProductId(productName)
   return request.get(`/chain/${chainId}/category/${categoryId}/product/${productId}/program`)
}
