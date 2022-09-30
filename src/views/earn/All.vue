<template>
  <div v-loading="loading">
  <el-row class="project-item" v-for="(item, index) in earnStore.programs" :key="index">
    <el-col :span="6">
      <div class="project-icons">
        <img v-for="(icon, index) in getIcons(item)" :key="index" :src="icon" width="36" height="36"/>
      </div>
      <div class="project-name text-white">{{item.programName}}</div>
      <div class="hit-label">{{item.description}}</div>
      <div class="project-price text-white">{{preFormatNumber(item?.price)}}</div>
      <div class="hit-label">Est. Benchmark Price</div>
    </el-col>
    <el-col :span="18">
      <el-row :gutter="15" class="sub-group">
        <el-col v-for="(program,index) in item.lockPeriods" :key="index" :span="8">
          <div class="sub-project-item">
            <div class="flex-between">
              <div class="project-day text-white">
                {{program.period}} Day(s)
                <div class="hit-label">Duration</div>
              </div>

              <div :span="12" class="text-right project-prec">
                {{program.annualPercentageRate * 100}}%
                <div class="hit-label">APR</div>
              </div>
            </div>
            <div class="project-action">
              <div>
                <div class="project-settlement">
                  <label>Settlement:</label>
                  <div>{{formatTime(program.nextSettlementTime)}}</div>
                </div>
              </div>
              <div>
                <el-button class="rounded-lg" type="primary" @click="showPopup(item, program)">
                  Invest
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>
import {usePopupManager} from "@/common/Popup";
import ApproveDialog from "@/components/ApproveDialog";
import {onMounted, ref, watch} from 'vue'
import EtHLogo from '@/assets/currency/eth.svg'
import USDCLogo from '@/assets/currency/usdc.svg'
import {useActiveWeb3Vue} from "@/common";
const { chainId} = useActiveWeb3Vue();
import {formatTime} from '@/common/utils/date'
import {preFormatNumber} from '@/common/utils'

import {useEarnStore} from "@/store/earn";
import {useRoute} from "vue-router";
// const BUSDAddress  = '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee';
// const contractAddress= '0xD4d4F819c99504D3Fc9F547c69Ea30C48AEaF3C9'
//  const contractAddress= '0x22e81E25266E217fFB984D94C8B32DD544e85E68'
const loading = ref(false)
const route = useRoute()
const iconMaps = {
  ETH: EtHLogo,
  USDC: USDCLogo
}
console.debug('init all')

const earnStore = useEarnStore()

watch(() => [chainId.value, route.params.product] ,([id, productName])=>{
  if(id && route.path.indexOf('/earn')>=0) {
    loading.value = true
    earnStore.loadPrograms(id, productName).finally(() => {
      loading.value = false
    }).catch(() => {

    })
  }
})
onMounted(()=>{
  if(!earnStore.programs?.value?.length && !loading.value && chainId.value ) {
    loading.value = true
    earnStore.loadPrograms(chainId.value, route.params.product).finally(() => {
      loading.value = false
    }).catch(() => {

    })
  }
})
const getIcons = (item) =>{
  let tokins = item.tokens || []
  return tokins.map(item =>{
    return iconMaps[item.name]
  })
}
const manager = usePopupManager()
const showPopup = (project, program) =>{
  manager.addPopup(ApproveDialog,{
    project,
    program
    // period:
  }, {success:() =>{
    }})
}

</script>

<style scoped lang="scss">
.project-name {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;

}
.project-icons{
  margin-top: 10px;
}
.project-price {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
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
  padding: 0 20px;
  margin-bottom: 20px;
}
.project-day {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}
.project-action {
  display: flex;
  justify-content: space-between;
}
.project-action .v-btn {
  text-transform: none;
}
.project-prec {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #f7931a;
}
.sub-project-item {
  background: #353543;
  box-shadow: 0px 0px 33px rgba(34, 34, 44, 0.245528);
  border-radius: 8px;
  padding: 15px;
}
.sub-group{
  margin: 15px 0;
}
.flex-between{
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>
