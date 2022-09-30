<template>
  <div class="home-container page-container">
    <div class="page-header">
      <div class="ph-left">
        <h2>{{pageTitle}}</h2>
        <h4>Monetize your market view for the highest rewards</h4>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="All" name="all">
          <All :contract="contract" v-if="activeName == 'all'"></All>
        </el-tab-pane>
        <el-tab-pane label="My Portfolio" name="portfolio">
          <MyPortfolio :contract="contract" v-if="activeName == 'portfolio'"></MyPortfolio>
        </el-tab-pane>
        <el-tab-pane label="My Asset" name="asset">
        <MyAsset :contract="contract" v-if="activeName == 'asset'"></MyAsset>
        </el-tab-pane>
      </el-tabs>

      <div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useRoute} from 'vue-router'
import MyAsset from "@/views/earn/MyAsset";
import All from "@/views/earn/All";
import MyPortfolio from "@/views/earn/MyPortfolio";
import {useEarnStore} from "@/store/earn";
import {useI18n} from "vue-i18n";
const activeName = ref('all')
// const contract = ref('0x22e81E25266E217fFB984D94C8B32DD544e85E68')
const contract = ref('0xa6Da39933aBD1C33055c9165Fd052566aE8A5c23')
useEarnStore()
const route = useRoute()
const {t} = useI18n()
const langMap = {
  dual_investment:t('Dual Investment'),
  covered_call: t('Covered Call'),
  sell_put: t('Sell Put')
}
console.debug(route.params)
const pageTitle = computed(()=>{
  return langMap[route.params.product] ||''
})
</script>

<style scoped lang="stylus">
.home-container {
  padding: 25px;
}
.el-tabs__active-bar {
  background-color #FFF;
}
.page-header {
  color: #fff;
  display: flex;
  margin-bottom: 25px;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    /* identical to box height, or 114% */

    display: flex;
    align-items: center;
    font-feature-settings: "pnum" on, "lnum" on;
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 10px;
  }
}

</style>
