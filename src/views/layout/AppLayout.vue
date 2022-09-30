<template>
  <div class="app-main">
    <div class="web3-manager">
      <Web3Manager></Web3Manager>
    </div>
    <Nav></Nav>
  <RouterView class="app-body"></RouterView>
    <PopupManager></PopupManager>
  </div>
</template>

<script>
import Nav from "@/views/Nav";
import PopupManager from "@/common/Popup/PopupManager";
import { Web3Manager } from "@/common";

export default {
  name: "AppLayout",
  components: {Nav, PopupManager,Web3Manager}
}
</script>

<style scoped>
.web3-manager{
  position: absolute;
  right: 30px;
  top: 30px;
}
.app-main{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.app-body{
  width: 100%;
  flex-grow: 1;
}
</style>
