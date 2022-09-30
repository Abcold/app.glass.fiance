<template>
  <div class="finx-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>
<style lang="scss" >

body,
html {
  background: #2a2b31;
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
#app,.finx-main {
  height: 100%;
}
.main {
  height: 100%;
  .body {

  }
}
.web3-manager{
  position: absolute;
  right: 30px;
  top: 30px;
}
.main-container {
  flex-grow: 1;
}
a {
  text-decoration: none;
  color: rgba(255,255,255,1);
}
.top-nav a {
  padding-right: 1rem;
  padding-left: 1rem;
}
body {
  font-size:14px;
}

.header {
  padding: 0 64px;
  height: 60px;
  display: flex;
  align-items: center;
  .top-nav {
    opacity: 0.6;
  }
}
.main {
  padding: 0 64px;
  flex-direction: column;
  max-width: 2560px;
  min-width: 1024px;
  display: flex;
  align-items: flex-start;
  min-height: 580px;
  h1 {
    font-size: 56px;
    overflow-wrap: normal;
    font-weight: 600;
    margin: 0px;
  }
  p {
    font-weight: 300;
    max-width: 780px;
    font-size: 24px;
  }
}

.header-content {
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.body-content {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: end;
  justify-content: flex-end;
  will-change: transform;
  align-items: flex-start;
  width: 100%;
  height: calc(100vh - 105px);
  padding-bottom: 3%;
  background-image: url('@/assets/svg/bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 500px;
  background-position: right;
  .partner {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    a {
      padding-right: 10px;
      color: white;
      width: 24px;
    }
  }
}
</style>
