<template>
  <div class="nav-wrap">
    <a href="#/app/earn/dual_investment" class="logo">
      <img class="glass-logo"  src="@/assets/svg/glass.svg" />
    </a>
    <el-menu
      class="nav-wrap"
      active-text-color="#ffd04b"
      background-color="transaction"
      default-active="2"
      text-color="#fff"
      @select="handleSelect"
    >
      <el-menu-item class="white-text" @click="redirectLink()" >
        <el-icon><IconHome/></el-icon>
        <span>{{$t('Home')}}</span>
      </el-menu-item>
      <el-sub-menu index="app/earn">
        <template #title>
          <el-icon><IconEarn /></el-icon>
          <span>{{$t('Earn')}}</span>
        </template>
          <el-menu-item index="dual_investment" >{{$t('dual_investment')}}</el-menu-item>
          <el-menu-item index="covered_call">{{$t('covered_call')}}</el-menu-item>
          <el-menu-item index="sell_put">{{$t('sell_put')}}</el-menu-item>
      </el-sub-menu>

      <!-- <el-menu-item index="3" disabled>
        <el-icon><IconVault /></el-icon>
        <span>{{$t('Vault')}}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><IconXNft /></el-icon>
        <span>{{$t('X-NFT')}}</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><IconFarm /></el-icon>
        <span>{{$t('Farm')}}</span>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon><IconMore /></el-icon>
        <span>{{$t('More')}}</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script setup>
// import { defineComponent, reactive, toRefs, onMounted, watch ,ref} from 'vue'
import { useRouter } from 'vue-router'
import IconHome from "@/common/icons/IconHome";
import IconEarn from "@/common/icons/IconEarn";
// import IconVault from "@/common/icons/IconVault";
// import IconXNft from "@/common/icons/IconXNft";
// import IconFarm from "@/common/icons/IconFarm";
// import IconMore from "@/common/icons/IconMore";

// import { routes } from '@/router'
const router = useRouter()
const handleSelect = (key, path) =>{
  console.debug(path.join('/'))
  if(key){ 
    router.push(`/${path.join('/')}`)
  }
}
const redirectLink=()=>{
  window.open('https://glassfinance.xyz')
}

//
// export default defineComponent({
//   name: 'Nav',
//
//   setup() {
//     const router = useRouter()
//     const opened = ref([])
//     const generateRouteItem = ({name, activeIcon,path, children })=>{
//       return {
//         title: name,
//         to: path,
//         prependIcon: activeIcon,
//         children: children?.map(generateRouteItem)
//       }
//     }
//
//     const reactiveData = reactive({
//       navList: routes.map(generateRouteItem),
//
//       navClick(e) {
//         router.push(e.path)
//       }
//     })
//
//     const changeNavActive = (currentPath) => {
//       reactiveData.navList.forEach((v) => {
//         const temp = v
//         temp.isActive = temp.path === currentPath
//         return temp
//       })
//     }
//
//     watch(
//       () => router.currentRoute.value,
//       (_n) => {
//         changeNavActive(_n.path)
//       }
//     )
//
//     onMounted(() => {
//       router.isReady().then(() => {
//         changeNavActive(router.currentRoute.value.path)
//       })
//     })
//
//     return {
//       opened,
//       Location,
//       ...toRefs(reactiveData)
//     }
//   }
// })
</script>

<style scoped lang="stylus">
.logo{
  margin: 20px 40px;
  margin-top:30px;
  display: block;
}
.glass-logo{
  width :140px
}
.white-text:active-text-color{
  color:#ffffff
}
.white-text.is-active{
  color:#ffffff
}
.nav-wrap {
  width: 230px;
  background: #353542;
  .el-menu-item{
    padding-left: 40px!important;
  }
:deep(.el-sub-menu) {
  .el-sub-menu__title{
    padding-left: 40px!important;
  }
  .el-menu{
    .el-menu-item{
      padding-left: 60px!important;
    }
  }
}
}
//.nav-list{
//  :deep(.v-list-item__prepend)  .v-icon {
//        margin-inline-end: 15px;
//    margin-inline-start: 20px;
//  }
//}
</style>
