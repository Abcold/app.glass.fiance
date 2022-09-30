<template>
  <component v-for="(item) in store.popups" :is="item.component" v-bind="item.props" v-on="item.events" :key="item.name" ></component>
</template>

<script setup>
import {usePopupManager} from "@/common/Popup/index";

const store = usePopupManager()

</script>

<style scoped>

</style>
