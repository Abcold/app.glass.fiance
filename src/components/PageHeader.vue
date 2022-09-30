<template>
  <div class="header">
    <div class="header-content">
      <a href="#/home"><img src="@/assets/svg/finx.svg" /></a>
      <div class="top-nav">
        <a v-for="item in menus" @click="gotoPage(item)" :key="item.name" :class="['nav-item', {'is-active': item.isActive}]">{{ item.label}}</a>

      </div>
    </div>
  </div>

</template>

<script>
import {computed, defineComponent} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "TopNav",
  setup() {
    const route = useRoute()
    const {t} = useI18n()
    const router = useRouter()
    const items =[{
      path: '/home',
      label: t('Home')
    },{
      path: '/developers',
      label: t('Developers')
    },{
      path: 'whitepaper',
      label: t('Whitepaper')
    },{
      path: '/faq',
      label: t('FAQ')
    },{
      path: '/about',
      label: t('About Us')
    },{
      path: '/app/earn',
      label:t('Launch App')
    }]
    const menus = computed(()=>{
      return items.map(item => {
        item.isActive = item.path === route.path
        return item
      })
    })
    const gotoPage = ({path}) =>{
      router.push(path)
    }
    return {
      menus,
      gotoPage
    }
  }
})
</script>

<style scoped>
.nav-item{
  cursor: pointer;
}
</style>
