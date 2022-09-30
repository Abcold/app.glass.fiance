export const CategoryId = {
  Earn: 1,
  Vault: 2,
  XNFT: 3,
  Farm: 4
}
export const ProductId = {
  DualInvestment: 1,
  CoveredCall:2,
  MarketNetrual: 3,
  Saving: 4,
  XNFT: 5,
  SellPut: 6
}


export function getCategoryId(name) {
  let items = Object.keys(CategoryId);
  let key
  let id
  for(let i= 0 ; i < items.length; i++){
    key = items[i]
    if(key == name || camel2under(key)== name){
      id = CategoryId[key]
    }
  }
  return id;
}
export function getProductId(name) {
  let items = Object.keys(ProductId);
  let key
  let id
  for(let i= 0 ; i < items.length; i++){
    key = items[i]
    if(key == name || camel2under(key)== name){
      id = ProductId[key]
    }
  }
  return id;
}


export function camel2under(name) {
  name =  name.replace(/([A-Z])/g,"_$1").toLowerCase();
  if(name.substr(0,1) == '_'){
    return name.substr(1)
  }
  return name;
}

export const isTestEnv = true
