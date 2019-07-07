<template>
    <div id='navigationFavorite'>
        <div class="frame">
            <div class="contents">
                <div class="navigation_favorite">
                    <Img class='icon_favorite' src = 'NaviFavorite.png' />
                    <Img class='icon_editpage' src = 'Edit.png' />
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
export default {
  name: 'home',
  components: {
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
    clickPlus () {
      this.$router.push('/')
    },
    clickEdit () {
      this.$router.push('/')
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
#NavigationFavorite{
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
  .navigation_favorite{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 10em;
  }
  .icon_favorite{ // 즐겨찾기 나타내는 페이지 아이콘
    width:50px;
    height:50px;
    position:absolute;
    margin:15px;
  }
  .icon_editpage{ // 편집 아이콘
    width:50px;
    height:50px;
    position:fixed;
    top:15px;
    left: 740px;
  }
</style>