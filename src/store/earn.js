import { defineStore } from 'pinia'
import {ref} from 'vue'
import  {getProgramList} from '@/api/dualInvestment'
import  {getABIByProduct} from "@/configs/abi";
import {useActiveWeb3Vue} from "@/common";
import {utils} from "web3";
// import EtHLogo from '@/assets/currency/eth.svg'
// import USDCLogo from '@/assets/currency/usdc.svg'
// const iconMaps = {
//   ETH: EtHLogo,
//   USDC: USDCLogo,
//   0: EtHLogo,
//   1: USDCLogo
// }
function transformProgram(program) {
  const {programId,programName,description, contractAddr, programInfo} = program
  return {
    programId,
    description,
    programName,
    contractAddr,
    price:0,
    annualPercentageRate: programInfo?.poolStats?.annualPercentageRate,
    tokens: programInfo?.token.pair,
    lockPeriods:programInfo?.lockPeriods
  }
}
function transformAsset(info, {tokens,contractAddr}) {
  let list = []
  if(parseInt(info[0]) > 0){
    let token = tokens[0]
    list.push({
      asset: 'ETH',
      amount: (info[0]/Math.pow(10, token.decimals)),
      internalType: 0,
      ...token,
      contractAddr
    })
  }
  if(parseInt(info[1]) > 0){
    let token = tokens[1]
    list.push({
      asset: 'USDC',
      amount: (info[1]/Math.pow(10, token.decimals)),
      internalType: 1,
      ...token,
      contractAddr
    })
  }
  return list;
}
class CustomError extends Error{
  constructor(msg,data) {
    super(msg);
    let self = this;
    Object.keys(data).forEach(key =>{
      self[key] = data[key]
    })
  }
}
function toEther(val){
  if(val){
    return parseFloat(utils.fromWei(val, 'ether')).toFixed(2)
  }
  return '-'
}
export function transformProtfolio(program, protfolios){
  const {programName, description } = program
  return protfolios.map((protfolio)=>{
    let token = program.tokens[protfolio.buyTokenId]
    // console.debug(protfolio)
    const {orderTime, startTime, amount,
      buyTokenId,apr, period, prePrice,status, reward,seqNum, settlePrice, settleTime} = protfolio
    // console.debug('perPrice', prePrice)
    return {
      programName, description,
      orderTime: orderTime* 1000,
      startTime: startTime * 1000,
      amount: (amount/Math.pow(10, token.decimals)).toFixed(2) ,
      buyTokenId,apr:(apr/Math.pow(10, 18) * 100).toFixed(2),
      period, prePrice: toEther(prePrice), reward: reward/Math.pow(10, token.decimals),seqNum,
      settlePrice: toEther(settlePrice) ,
      settleTime:settleTime * 1000,
      status
    }
  })

}
export const useEarnStore = defineStore('counter', () => {
  const { web3, account} = useActiveWeb3Vue();
  let ABI
  const programs = ref([])
  const myProtfolio = ref([])
  const balance = ref([])
  const myAsset = ref([])
  function loadPrograms(chainId, productName) {
    return getProgramList(chainId,productName).then(async (res) =>{
      ABI = await getABIByProduct(productName)
      programs.value = res.result?.map(transformProgram)
      loadPrices()
    })
  }
  function loadPrices() {
    programs.value.forEach(async (program) =>{
      const contract = new web3.value.eth.Contract(ABI, program.contractAddr);
      const price = await contract.methods.getWrappedTokenPrice().call()
      programs.value.forEach((item,index) =>{
        if(item.programId == program.programId) {
          item.price = utils.fromWei(price, 'ether')
          programs.value.splice(index, 1, item)
        }
      })
    })
  }
  async function loadMyProtfolio() {
    if(!account.value) {
      return Promise.reject(new CustomError('not connect w', {needConnect:true}))
    }
   return Promise.all(programs.value.map(async (program) => {
      const contract = new web3.value.eth.Contract(ABI, program.contractAddr);
     const result = await contract.methods.getOrders().call({from: account.value})
     myProtfolio.value = transformProtfolio(program, result)
    }))
  }
  async function loadMyAsset() {
    if(!account.value) {
      return Promise.reject(new CustomError('not connect w', {needConnect:true}))
    }
    return Promise.all(programs.value.map(async (program) => {
      const contract = new web3.value.eth.Contract(ABI, program.contractAddr);

      const result1 = await contract.methods.getBalance().call({from: account.value})
      // console.debug('balance', result1)
      myAsset.value = transformAsset(result1.unlocked,programs.value[0])
    }))
  }
  return { programs , loadPrograms,balance,
    myProtfolio, loadMyProtfolio, loadMyAsset, myAsset}
})
