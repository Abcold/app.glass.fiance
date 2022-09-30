<template>
  <div  v-if="dependDone" v-loading="loading">
    <div class="project-item" v-for="(item, index) in earnStore.myProtfolio" :key="index">
    <el-row class="project-row" >
      <el-col :span="12">
        <div class="flex-column">
          <div class="project-icons">
            <img :src="EtHLogo" width="36" height="36"/>
            <img :src="USDCLogo" width="36" height="36"/>
          </div>
          <div class="project-name">
            <div>{{ item.buyTokenId == '0' ? $t('ETH(sell high)'):$t('USDC (buy low)') }}</div>
            <span class="hit-label">{{ $t('ETH/USDC iZiSwap Protocol') }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="hit-label">{{ $t('Benchmark Price') }}</div>
        <div class="project-price text-white">{{item.prePrice}}</div>
      </el-col>
      <el-col :span="3">
        <div class="hit-label">{{ $t('Duration') }}</div>
        <div class="project-price text-white">{{item.period}} Day(s)</div>
      </el-col>
      <el-col :span="3">
        <div class="hit-label">{{ $t('Settlement Price') }}</div>
        <div class="project-price text-white">{{item.settlePrice}}</div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row class="project-row">
      <el-col :span="3">
        <div class="hit-label">{{ $t('My Amount') }}</div>
        <div class="project-price-normal text-white">{{item.amount}}</div>
      </el-col>
      <el-col :span="5">
        <div class="hit-label">{{ $t('Order Time') }}</div>
        <div class="project-price-normal text-white">{{formatTime(item.orderTime)}}</div>
      </el-col>
      <el-col :span="5">
        <div class="hit-label">{{ $t('Start Time') }}</div>
        <div class="project-price-normal text-white">{{formatTime(item.startTime)}}</div>
      </el-col>
      <el-col :span="5">
        <div class="hit-label">{{ $t('Est. Settlement') }}</div>
        <div class="project-price-normal text-white">{{formatTime(item.settleTime) }}</div>
      </el-col>
      <el-col :span="3">
        <div class="hit-label">{{ $t('APR') }}</div>
        <div class="project-price-normal text-white">{{item.apr}}%</div>
      </el-col>
      <el-col :span="3">
        <div class="hit-label">{{ $t('Earned') }}</div>
        <div class="project-price-normal text-white">{{item.reward}}</div>
      </el-col>
    </el-row>
    </div>
  </div>
  <div v-else>
    {{$t('Please Connect Wallet First!')}}
  </div>
</template>

<script setup>
import EtHLogo from '@/assets/currency/eth.svg'
import USDCLogo from '@/assets/currency/usdc.svg'
import {formatTime} from '@/common/utils/date'

import {onMounted, ref, defineProps, watch} from "vue";
// import ABI from "@/configs/abi";
import {useActiveWeb3Vue} from "@/common";
// import {formatTime} from "@/common/utils/date"
import {useEarnStore} from "@/store/earn";
// import {utils} from "web3";
const { account} = useActiveWeb3Vue();
const props = defineProps({
  contract: {
    type: String,
    default: ''
  }
})
const earnStore = useEarnStore()
const dependDone = ref(true)
const loading = ref(true)
let loaded = false
const loadProtfolio =  async () => {
  loading.value = true
  earnStore.loadMyProtfolio().then(() =>{
    loaded = true
  }).finally(() =>{
    loading.value = false
  })
  // const contract = new web3.value.eth.Contract(ABI, props.contract);
  // const result = await contract.methods.orders(account.value, 0).call()
  // console.debug(result)
}
onMounted(() =>{
  if (account.value && props.contract) {
    loadProtfolio()
  } else {
    dependDone.value  = false
  }
})
watch(() => [account.value, props.contract], () =>{
  if (account.value && props.contract && !loaded) {
    dependDone.value = true
    loadProtfolio()
  }
})
</script>

<style scoped lang="scss">
.project-icons {
  display: flex;
  margin-right: 10px;
  img:last-child {
    margin-left: -5px;
  }
}


.project-name {
  font-weight: 700;
  font-size: 24px;
  div{
    line-height: 20px;
  }
}
.el-divider{
  margin: 15px;
}
.flex-column {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.project-price {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
}
.project-price-normal{
  font-weight: 400;
  font-size: 14px;
}
.hit-label {
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 8px 0;
}

.project-settlement {
  font-size: 12px;
  letter-spacing: 0.01em;
  font-feature-settings: "pnum" on, "lnum" on;

  color: rgba(255, 255, 255, 0.6);
}

.project-item {
  background: rgba(57, 57, 72, 0.3);
  box-shadow: 0px 0px 33px rgba(34, 34, 44, 0.245528);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

</style>
