<template>
  <el-dialog
    width="500px"
    class="approve-dialog"
    :title="title"
    v-model="visible"
    @close="handleClose"
  >
    <template #header="{  titleId, titleClass }">
      <div :id="titleId" :class="titleClass">{{title}}</div>
      <div>ETH/USDC iZiSwap Protocol</div>
    </template>
        <el-row :gutter="20">
          <el-col :span="12">
            APR
          </el-col>
          <el-col :span="12" class="highlight">
            {{program.annualPercentageRate * 100}}%
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            Est.Benchmark Price
          </el-col>
          <el-col :span="12" >
            {{preFormatNumber(project?.price)}}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            Duration
          </el-col>
          <el-col :span="12">
            {{program.period}} Day(s)
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            Order Time
          </el-col>
          <el-col :span="12">{{orderTimes.orderTime}}
           </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            Start Time
          </el-col>
          <el-col :span="12"> {{orderTimes.startTime}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            Settlement
          </el-col>
          <el-col :span="12">{{orderTimes.settlement}}</el-col>
        </el-row>
        <div class="c-input">
          <el-input v-model="inputValue" class="amount-input">
            <template v-slot:append v-if="canSelectCurrency">

            <CurrencySelect v-model="selectedCurrency" :currencys="currencys"></CurrencySelect>
            </template>
          </el-input>


        </div>
    <div>
      Available balance:
      <template v-if="selectedCurrency.index">
      {{balance}} {{selectedCurrency.name}}
      </template>
      <template v-else>
        {{parseFloat(etherBalance).toPrecision(5)}} {{ether.symbol}}
      </template>
    </div>
        <el-button v-if="!isApproved"  class="block" type="primary" :loading="loading"
                @click="handleApprove"> Approve</el-button>
        <el-button v-else  class="block" type="primary" block :loading="loading"
                @click="handleInvest"> Invest</el-button>

  </el-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits, onMounted, watch} from 'vue'
import {useActiveWeb3Vue, useEther} from "@/common";
import {ERC20_API} from "@/configs/erc20_abis";
import {utils} from "web3";
import {getABIByProduct} from "@/configs/abi";
import { SupportedChainId } from '../common/Web3Modal/constants/chains.js';
import {tryParseCurrencyAmount} from "@/common/utils/currency";
import {getOrderTimes, preFormatNumber} from '@/common/utils'
import {ProductId} from '@/api/common'
import { CHAIN_INFO } from '../common/Web3Modal/constants/chainInfo.js';
import { Token } from '@uniswap/sdk-core';
import CurrencySelect from "@/components/CurrencySelect";
import {computed} from "@vue/runtime-core";
import EtHLogo from '@/assets/currency/eth.svg'
import USDCLogo from '@/assets/currency/usdc.svg'
import {useI18n} from "vue-i18n";
import {getProductId} from "@/api/common";
import {useRoute} from "vue-router";
// import get from 'lodash/get'
import { ElNotification } from 'element-plus'

const {t} = useI18n()
const visible = ref(true)
const { web3 , account,chainId, etherBalance} = useActiveWeb3Vue();
const ether = useEther(chainId);
const props = defineProps({
  program: {
     type: Object,
     default: null
   },
  project: {
     type: Object,
     default: null
   }
 })
const logoMap = {
  USDC:USDCLogo,
  ETH: EtHLogo
};
const hintMap = {
  USDC:t('buy low'),
  ETH: t('sell high')
}
// const BUSDAddress  = '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee';
const pair = props.project.tokens || []
const currencys = ref(pair.map((item,index) => {
  return {
    ...item,
    logo: logoMap[item.name],
    hint: hintMap[item.name],
    symbol: item.name,
    index
  }
}))
const orderTimes = getOrderTimes()
const selectedCurrency = ref(currencys.value[0])
const route = useRoute()
const productName = route.params.product
const productId = getProductId(productName)
// const selectedCurrency = ref(BUSDAddress)
const canSelectCurrency = productId == ProductId.DualInvestment
if(productId == ProductId.SellPut ){
  selectedCurrency.value = currencys.value[1]
}
const title = computed(() =>{
  if(canSelectCurrency) {
    return `${selectedCurrency.value?.name} (${selectedCurrency.value?.hint}) `
  } else {
    return t(route.params.product)
  }
})

const inputValue = ref(0.1)
const emit = defineEmits(['success', 'fail','close'])
const loading = ref(false)
// let contract = new web3.value.eth.Contract(ERC20_API, props.project.contractAddr);
const isApproved = ref(false)
const balance = ref('')
let ABI
onMounted(async ()=>{
  ABI = await getABIByProduct(productName)
  await checkApproved()
  // console.debug('allowance', val)
  // console.debug(utils.toHex(utils.toWei('100000000000000000', 'gwei')))
})
console.debug(1)
const checkApproved = async () =>{
  if(selectedCurrency.value.index ==0 ){
    isApproved.value = true
    return;
  }
  const contract = new web3.value.eth.Contract(ERC20_API, selectedCurrency.value.contractAddr);
  isApproved.value = false
  const val = await contract.methods.allowance(account.value, props.project.contractAddr).call()
  if(val > 0) {
    isApproved.value = true
  }
  const balanceVal = await contract.methods.balanceOf(account.value).call()

  const {decimals} = selectedCurrency.value
  balance.value = (balanceVal/Math.pow(10, decimals))
  return val
}
watch(() => selectedCurrency.value , checkApproved)

const handleApprove = () => {
   loading.value = true
  const contract = new web3.value.eth.Contract(ERC20_API, selectedCurrency.value.contractAddr);
  contract.methods
    .approve(props.project.contractAddr, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    .send({from: account.value}).then(() => {
    loading.value = false
    isApproved.value = true
    ElNotification({
      title: 'Success',
      message: 'Approve success.',
      type: 'success',
    })
    checkApproved()
  }).catch(() => {
    loading.value = false
    ElNotification({
      title: 'Error',
      message: 'Approve Failed',
      type: 'error',
    })
  });

}

const handleInvest = async () =>{
  let chain = CHAIN_INFO[SupportedChainId.BINANCE_TESTNET]
  if(!chain){
    console.error('not find chain')
  }
  const {decimals, name, symbol, contractAddr} = selectedCurrency.value

  // console.debug(`${chain.nativeCurrency.name} decimals: `, chain.nativeCurrency.decimals)
  let busd = new Token(SupportedChainId.BINANCE_TESTNET, contractAddr,
    decimals ,
    symbol,
    name)
  const amountToken = tryParseCurrencyAmount(inputValue.value.toString(), busd)
  loading.value = true
  const contract = new web3.value.eth.Contract(ABI, props.project.contractAddr);
  console.debug(amountToken,amountToken.quotient)
  const  value = utils.toHex(utils.toWei(amountToken.quotient.toString(), 'wei'))
  const sendInfo = {from: account.value}
  if(selectedCurrency.value.index == 0) {
    sendInfo.value = value
  }
   contract.methods.buy(selectedCurrency.value.index, value ,props.program.period)
    .send(sendInfo).then(() =>{
     ElNotification({
       title: 'Success',
       message: 'Invest success.',
       type: 'success',
     })
      handleClose()
    }).catch(() =>{
     ElNotification({
       title: 'Error',
       message: 'Invest Failed',
       type: 'error',
     })
    }).finally(()=>{
      loading.value = false
    })
  // console.debug('invest', result)
}
const handleClose = () =>{
  visible.value = false
  emit('close')
}
</script>

<style scoped lang="scss">
.amount-input{
  margin-top: 15px;
  .el-input{
    border: none;
  }
  ::v-deep{
    .el-input-group__append{
      box-shadow: none;
      padding: 0px;
    }
    .el-input__wrapper{
      background-color: transparent;
      box-shadow: none;
    }
  }
  padding: 10px;
  margin-bottom: 10px;
  background: #272832;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}
.el-row {
  margin-bottom: 10px;
}
.approve-dialog{
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  /* or 229% */

  letter-spacing: 0.01em;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
.block{
  width: 100%;
  margin-top: 10px;
}
</style>
