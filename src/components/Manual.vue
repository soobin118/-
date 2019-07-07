<template>
  <div id='manual'>
    <div class="frame">
      <div class="contents_manual">
              <p class="manual_font1" v-show="show==0">안녕하세요.</p>
              <p class="manual_font2" v-show="show==1">C-OBI앱에 오신 것을<br>환영합니다.</p>
          <Img class="arrow_left" v-if="show>2" @click="show = (show - 1) % 6" src="leftarrow.png"/>
          <div class="text">
              <p class="manual_font" v-if="show==2">지금부터<br>차량의 시트 조정 값은<br>자동으로 저장되어<br>다음 탑승시에<br>시트 조정을 도와드립니다.
                  <br><br>언제든지 자유롭게 조정해주세요.</p>
              <p class="manual_font" v-else-if="show==3">내비게이션 탭에서는<br>즐겨찾기와 최근검색목록을<br>제공합니다.<br><br>
                  즐겨찾기에서는<br>수정, 삭제 및 추가가<br>가능합니다.</p>
              <p class="manual_font4" v-else-if="show==4">라디오 탭에서는<br>즐겨찾기 목록을 제공합니다.<br><br>
                  6개까지 지원하며,<br>추가 및 삭제가 가능합니다.</p>
              <p class="manual_font2" v-else-if="show==5">감사합니다.<br>지금부터 사용을 시작합니다.</p>
            </div>
              <p class="sheetNum" v-if="show==2">●○○○</p>
              <p class="sheetNum" v-if="show==3">○●○○</p>
              <p class="sheetNum" v-if="show==4">○○●○</p>
              <p class="sheetNum" v-if="show==5">○○○●</p>
          <Img class="arrow_right" v-if="show>=2" @click="show = (show + 1) % 6;MovetoApp();" src="rightarrow.png"/>
      </div>
    </div>
  </div>
</template>

<script>
// button from 'obigo-js-ui-rnbs/components/button'
export default {
  name: 'home',
  components: {
    // 'obg-button': button
  },
  data: function () {
    return {
      show: 0
    }
  },
  methods: {
    MovetoApp () {
      if (this.show === 0) {
        this.$router.push('/Start')
      }
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
    onload () {
      this.$options.interval = setInterval(this.load, 2000)
    },
    load () {
      this.show += 1
    }
  },
  mounted () {
    this.onload()
    this.initHardKeyAction()
  },
  updated () {
    if (this.$options.interval !== null) {
      if (this.show === 2) {
        clearInterval(this.$options.interval)
      }
    }
  }
}
</script>

<style lang="scss">
#manual{
  position: relative;
  background:#2a2a2a;
  color: #ffffff;
}
  .frame{
    width: 800px;
    height: 347px; /* 423 - 76 */
    border: 1px solid black;
  }
  .contents_manual{
    width: 800px;
    height: 347px;
    border: 1px solid black;
    background-color: black;
  }
  .arrow_left{
      width:80px;
      height:120px;
      position:fixed;
      top:100px;
      left:10px;
  }
  .text{
      width: 600px;
      height: 327px;
      position: fixed;
      left: 100px;
  }
  .manual_font{
      font-size:40px;
      text-align: center;
      position: absolute;
      left:0;
      width:100%;
  }
  .manual_font1{
      font-size:40px;
      text-align: center;
      position: absolute;
      left:0;
      top:45%;
      width:100%;
  }
  .manual_font2{
      font-size:40px;
      text-align: center;
      position: absolute;
      left:0;
      top:35%;
      width:100%;
  }
  .manual_font4{
      font-size:40px;
      text-align: center;
      position: absolute;
      left:0;
      top:20%;
      width:100%;
  }
  .arrow_right{
      width:80px;
      height:120px;
      position:fixed;
      top:100px;
      left:690px;
  }
  .sheetNum{
      font-size:10px;
      text-align:center;
      position:fixed;
      top:327px;
      left: 370px;
  }/*
  .fade-enter-active {// , .fade-leave-active {
  transition: opacity .5s;
  };
  .fade-enter{ // , .fade-leave-to
  // {
  opacity: 0;
  };
*/
</style>
