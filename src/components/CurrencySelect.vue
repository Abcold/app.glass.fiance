<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link currency-item">
      <img :src="selectedValue.logo" width="24" height="24"/>
      {{selectedValue.name}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item class="currency-item" v-for="(item, index) in currencys" :key="index" :command="item.contractAddr" >
          <img :src="item.logo" width="24" height="24"/>
          {{item.name}}</el-dropdown-item>

      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import {defineEmits, ref, defineProps} from 'vue'
let emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  currencys: {
    type: Array,
    default: ()=>[]
  }
})
const selectedValue = ref(props.modelValue)
console.debug(2)
// const selectedItem = computed(()=>{
//   return props.currencys.find(item => item.address == selectedValue.value.address)
// })
const handleCommand = (address) =>{
  const currency = props.currencys.find(item => item.contractAddr == address)
  selectedValue.value = currency
  emit('update:modelValue', currency)
}

</script>

<style scoped lang="scss">
.currency-item{
  display: flex;
  align-items: center;
  img{
    margin-right: 10px;
  }
  &.el-dropdown-link{
    background: #454555;
    border-radius: 8px;
    height: 32px;
    padding-left: 10px;
  }
}
</style>
