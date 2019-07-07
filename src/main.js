/* eslint-disable */

import Vue from 'vue'
import i18n from './i18n'
import App from './App'
import ObigoUI from 'obigo-js-ui'
import router from './router'
import Vuetimers from 'vue-timers'
import axios from 'axios'
import async from 'async'

import 'obigo-js-webapi/vehicle/vehicle'
import 'obigo-js-ui/features/commonPopup'
import 'obigo-js-webapi/device/device'

Vue.use(ObigoUI)
Vue.use(Vuetimers)

Vue.prototype.$http = axios

// import { naver_id_login } from './components/naverLogin_implicit-1.0.3'

// var naveridlogin = new naver_id_login('TS7adrjF9NQUxlAOxEpk', 'localhost:8080')
// var state = naveridlogin.getUniqState()
// naveridlogin.setButton('white', 2, 40)
// naveridlogin.setDomain('YOUR_SERVICE_URL')
// naveridlogin.setState(state)
// naveridlogin.setPopup()
// naveridlogin.init_naver_id_login()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  async,
  render: h => h(App)
})
