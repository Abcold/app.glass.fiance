import { createApp } from 'vue';
import { createI18n } from "vue-i18n";
import { createWeb3 } from '@/common/createWeb3';
// const infuraKey = process.env.VUE_APP_INFURA_KEY;
const infuraKey ='a1406288824b45dd82d7f55e71db887e'
import { theme } from './configs/theme';
import { providerOptions }  from './configs/providers'
import messages from './messages';
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './plugins/theme.css'

// import App from "./App"

import router from './router'
import Main from "./Main.vue";
const web3vue = createWeb3({
    infuraKey,
    providerOptions,
    theme,
    global:true
})

const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
})
// To register individual components where they are used (serve.vue) instead of using the
const app = createApp(Main);
// app.use(vuetify)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(i18n);

app.use(createPinia())
app.use(web3vue);

app.config.devtools = true
app.use(router);
app.mount('#app');
