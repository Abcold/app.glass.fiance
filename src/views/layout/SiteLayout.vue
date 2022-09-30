<template>
  <div class="home-container page-container">
    <PageHeader></PageHeader>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteLayout"
}
</script>

<style scoped>

</style>
