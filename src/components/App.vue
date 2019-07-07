<template>
  <div id='app'>
    <div class="frame">
      <div class="contents">
        <div class="navigation">
          <table style='margin:auto'>
          <td><Img class='icon' @click='onNaviFavorite' src = 'NaviFavorite.png' />
          <p class='iconExplain'>즐겨찾기</p></td>
          <td><Img class='icon' @click='onNaviSearch' src = 'NaviSearch.png' />
          <p class='iconExplain'>최근검색목록</p></td>
          </table>
        </div>
      </div>
      <div class="tab">
        <div class="tab-list-active">
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
    onNaviFavorite () {
      this.$router.push('/NavigationFavorite')
    },
    onNaviSearch () {
      this.$router.push('/NavigationSearch')
    },
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
    }
  },
  mounted () {
    this.initHardKeyAction()
  }
}
</script>

<style lang="scss">
#app{
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
  .tab-list-active{
    position: relative;
    display: flex;
    float: left;
    width: 399px;
    height: inherit;
    border: 1px solid black;
    text-align: center;
    font-size: 3em;
    justify-content: center;
    background: black;
  }
  .navigation{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 10em;
  }
  .icon{
    width:150px;
    height:150px; 
    margin-left:30px;
    margin-right:30px;
    margin-top:30px;
  }
  .iconExplain{
    font-size:30px;
    text-align:center;
  }
</style>
