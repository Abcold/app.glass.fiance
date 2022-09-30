<template>
  <div class="home-container page-container">
    <el-button @click='test'>Test</el-button>
    <el-button @click="getApprovee">Check need approve</el-button>
  </div>
</template>

<script setup>
import {useActiveWeb3Vue} from '@/common'
// const contractAddress= '0x55F483B84fA831775fA0DA6758E306E7223b720b'
const BUSDAddress  = '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7';
import ABI from '@/configs/abi'
// import ERC20_API from '@/configs/erc20_abis'
import { utils } from 'web3'
// import {USDCAddress} from "@/configs/contract";
// const USDT = '0x40A72eec7E0D21eF688f0bf0FE3b5cCAcdD3Da31'
const test = () =>{

  // const amount = web3.utils.toWei('0.9675');
  // const hash = await contract.methods.transfer(to, amount)
  const { web3 , account} = useActiveWeb3Vue();
  const contract = new web3.value.eth.Contract(ABI, BUSDAddress);

  contract.methods
    .approve(BUSDAddress, utils.toHex(utils.toWei('1000000000000000000000000000', 'gwei')))
    .send({ from: account.value }).then(res =>{
    console.debug('success', res)
  }).catch(err =>{
    console.debug('err', err)
  });

}
const getApprovee = async () =>{
  const { web3 , account} = useActiveWeb3Vue();
  const contract = new web3.value.eth.Contract(ABI, BUSDAddress);
  const val = await contract.methods.allowance(account.value, BUSDAddress).call()
  //   .then(res =>{
  //   console.debug('success', res)
  // }).catch(err => console.debug(err))
  console.debug('allowance', val)
}
</script>

<style scoped >

</style>
