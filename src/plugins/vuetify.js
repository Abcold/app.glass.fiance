// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import {createVuetify} from 'vuetify'
import {aliases, custom} from './iconset.js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

// const myCustomLightTheme = {
//   dark: true,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#2768CA',
//     'primary-darken-1': '#3700B3',
//     secondary: '#FFF',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// }

export default createVuetify({
    directives,
    components,
    theme: {
      defaultTheme: 'dark',
      themes: {
        // myCustomLightTheme,
      }
    },
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     },
  //   }
  // },
    icons: {
      // defaultSet: 'custom',
      aliases,
      sets: {
        custom,
      },
    }
  }
)
