<template>
  <div id='start'>
    <div class="frame">
      <div class="contents">
        <div class="startui">
          <Img class="icon_cobi" src="cobi.png" />
        </div>
      </div>
      <div class="tab">
        <div class="tab-list" @click='clickNavigationTab'>
          내비게이션
        </div>
        <div class="tab-list" @click='clickRadioTab'>
          라디오
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import button from 'obigo-js-ui-rnbs/components/button'
export default {
  name: 'home',
  components: {
    // 'obg-button': button
  },
  data: function () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
      userID: 0,
      carName: '',
      carSize: 0,
      angle: 0,
      height: 0,
      bf: 0
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
    },
    clickRadioTab () {
      this.$router.push('/App_Radio')
    },
    clickNavigationTab () {
      this.$router.push('/App')
    }
  },
  mounted () {
    this.initHardKeyAction()
  }
}
</script>

<style lang="scss">
#start{
  position: relative;
  background:#2a2a2a;
  color: #ffffff;
}
  .frame{
    width: 800px;
    height: 347px; /* 423 - 76 */
    border: 1px solid black;
  }
  .contents{
    width: 800px;
    height: 276px; /* 347 - 71 */
    border: 1px solid black;
  }
  .tab{
    position: absolute;
    top: 276;
    left: 0px;
    width: 800px;
    height: 71px;
    border: 1px solid black;
    background: linear-gradient(black, gray, black);
  }
  .tab-list{
    position: relative;
    display: flex;
    float: left;
    width: 399px;
    height: inherit;
    border: 1px solid black;
    text-align: center;
    font-size: 3em;
    justify-content: center;
  }
  .startui{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 10em;
  }
  .icon{
    width:80px;
    height:80px; 
    margin-left:30px;
    margin-right:30px;
  }
  .icon_cobi{
      width:250px;
      height:250px;
      position:absolute;
      top:5%;
      left:35%;
  }
</style>
