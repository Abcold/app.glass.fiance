<script setup>
import { Web3Manager } from "@/common";
import Nav from "./views/Nav.vue";
import PopupManager from "@/common/Popup/PopupManager";

</script>
<template>
  <div class="main">
    <Nav></Nav>
    <div class="main-container">
     <div class="web3-manager">
       <Web3Manager></Web3Manager>
     </div>
      <router-view></router-view>
    </div>
    <PopupManager></PopupManager>
  </div>
</template>
<style lang="scss" >

body,
html {
  background: #1f2026;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
}
#app {
  height: 100%;
}
.main {
  display: flex;
  height: 100%;
}
.web3-manager{
  position: absolute;
  right: 30px;
  top: 30px;
}
.main-container {
  flex-grow: 1;
}
</style>
