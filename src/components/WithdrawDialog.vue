<template>
  <el-dialog
    width="500px"
    class="approve-dialog"
    :title="$t('Withdraw')"
    v-model="visible"
    @close="handleClose"
  >
    <v-alert v-if="showError" type="error">Something want.</v-alert>

    <div class="withdraw-summary withdraw-bg">
      <div>
        {{$t('Balance')}}
        <div>{{info.name}}</div>
      </div>
      <div>{{$t('Amount')}}
        <div>
          {{info.amount}}
        </div>
      </div>
    </div>
    <div class="withdraw-hint">{{$t('You Will Get')}}</div>
    <div class="withdraw-summary">
      <div>{{info.name}}</div>
      <div>{{info.amount}}</div>
    </div>

    <el-button class="block" type="primary" :loading="loading"
               @click="handleWithdraw"> {{ $t('Withdraw') }}</el-button>
  </el-dialog>
</template>

<script setup>
import {defineProps, defineEmits, ref, onMounted} from "vue";
import ABI from "@/configs/abi";
import {useActiveWeb3Vue} from "@/common";
import {utils} from "web3";
import {Token} from "@uniswap/sdk-core";
import { SupportedChainId} from "@/common/Web3Modal/constants";
import {tryParseCurrencyAmount} from "@/common/utils/currency";

const { web3 , account} = useActiveWeb3Vue();
const visible = ref(true)
const props = defineProps({
  info: {
    type: Object
  }
})
const showError = ref(false)
const emit = defineEmits('close','success')
const loading = ref(false)
const handleClose = () =>{
  visible.value = false
  emit('close')
}
const userInput = ref(props.info.amount.toString())
onMounted(() =>{
  userInput.value = props.info.amount.toString()
})
const handleWithdraw = () =>{
  loading.value = true
  // let chain = CHAIN_INFO[SupportedChainId.BINANCE_TESTNET]
  const {contractAddr,name,decimals,internalType} = props.info
  const contract = new web3.value.eth.Contract(ABI, contractAddr);
  let busd = new Token(SupportedChainId.BINANCE_TESTNET, contractAddr,decimals ,name, name)
  const amountToken = tryParseCurrencyAmount((props.info.amount - 0.001).toString(), busd)

  const  withdrawAmount = utils.toHex(utils.toWei(amountToken.quotient.toString(), 'wei'))
  // console.debug(utils.toWei(amountToken.quotient.toString(), 'wei'))
  contract.methods.withdraw(internalType, withdrawAmount)
    .send({from: account.value}).then(() =>{
      emit('success')
    handleClose()
  }).finally(()=>{
    loading.value = false
  }).catch(() =>{
    showError.value = true
  })
}

</script>

<style scoped lang="scss">
.withdraw-hint{
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  margin-left: 10px;
  margin-top: 20px;
}
.withdraw-bg{
  background: rgba(57, 57, 72, 0.3);
  box-shadow: 0px 0px 33px rgba(34, 34, 44, 0.245528);
  border-radius: 8px;
}
.withdraw-summary {

  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  > div {
    > div{
      margin-top: 10px;
    }
  }
}
</style>
