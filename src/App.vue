<template>
  <div id='app'>
    <!-- <div v-if="naverlogin" id="naver_id_login"></div> -->
    <router-view></router-view>
    <obg-footer :mask=false @back='onBack' @more='onMore' disable='right'></obg-footer>
  </div>
</template>

<script>
/* eslint-disable */

import footer from 'obigo-js-ui-rnbs/components/footer'
import { naver_id_login } from './components/naverLogin_implicit-1.0.3'

export default {
  name: 'home',
  components: {
    'obg-footer': footer
  },
  data () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
      naverlogin: true
    }
  },
  methods: {
    onBack (evt) {
      console.log(evt)
      if (window.applicationFramework) {
        window.applicationFramework.applicationManager.getOwnerApplication(window.document).back()
      }
    },
    onMore (evt) {
      console.log(evt)
    },
    initHardKeyAction () {
      this.$hardkey.addHardkeyListener(this.hardkeyCodes.code.HARDKEY_BUTTON_BACK, (e) => {
        this.onBack()
      })
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style lang="scss">
#app{
  position: relative;
  background:#2a2a2a;
  color: #ffffff;
}
</style>
