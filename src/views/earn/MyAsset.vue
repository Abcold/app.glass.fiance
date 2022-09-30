<template>
  <el-table :data="earnStore.myAsset" style="width: 100%">
    <el-table-column prop="asset" :label="$t('Asset')" width="180" />
    <el-table-column prop="amount" :label="$t('Available Amount')" width="180" />
    <el-table-column prop="action" :label="$t('Action')" width="180">
      <template #default="scope">
        <el-button  type="primary" size="small" @click="handleWithdraw(scope)">{{$t('Withdraw')}}</el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {usePopupManager} from "@/common/Popup";
import WithdrawDialog from "@/components/WithdrawDialog";
import {useEarnStore} from "@/store/earn";
import {onMounted} from "vue";
const manager = usePopupManager()

const earnStore = useEarnStore()
onMounted(() => {
  earnStore.loadMyAsset()
})
const handleWithdraw = (info) =>{
  manager.addPopup(WithdrawDialog, {info:info.row}, {success:() =>{
      earnStore.loadMyAsset()
    }})

}

</script>

<style scoped>

</style>
