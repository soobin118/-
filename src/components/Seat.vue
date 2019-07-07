<template>
  <div id='seat'>
    <div class="frame">
      <div class="contents">
        <div class="seatui">
          <Img class="icon_seat" src="Seat.png" />
          <p class="explain_seat">시트 조정 중입니다.<br>잠시만 기다려주세요.</p>
          <Img class="bf" v-if='status==0' src="redArrow.png" />
          <Img class="h" v-if='status==1' src="redArrow.png" />
          <Img class="angle" v-if='status==2' src="angleArrow.png" />
        </div>
      </div>
      <!-- <div class="tab">
        <div class="tab-list" @click='clickNavigationTab'>
          내비게이션
        </div>
        <div class="tab-list" @click='clickRadioTab'>
          라디오
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import button from 'obigo-js-ui-rnbs/components/button'
/* eslint-disable */
import { getUserResult, getCarSetting, getCarSettingResult,
        btMac , existCarSetting, existCarInfo,
        newCarInfo, carModel, currentAngle,
        currentHeight, currentBf, setCurrentSeat,
        calcCarSetting, insertCarSetting, postTotal } from './DBmethods'

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
      angleCurrent: 90,
      heightCurrent: 30,
      bfCurrent: 20,
      status: 3,
      angleSaved: getCarSettingResult[0].angle,
      bfSaved: getCarSettingResult[0].bf,
      heightSaved: getCarSettingResult[0].height
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
    },
    loadAngle() {
      // angle load
      this.status = 2
      console.log('A.C : ' + this.angleCurrent + ' A.S : ' + this.angleSaved)
      if (this.angleCurrent > this.angleSaved) this.angleCurrent -= 1
      else if (this.angleCurrent < this.angleSaved) this.angleCurrent += 1
      else {
        clearInterval(this.$options.interval)
        this.status = 3
        this.$router.push('/Start')
      }
      setCurrentSeat(this.angleCurrent,this.heightCurrent,this.bfCurrent)
    },
    loadHeight() {
      // height load
      this.status = 1
      console.log('H.C : ' + this.heightCurrent + ' H.S : ' + this.heightSaved)
      if (this.heightCurrent > this.heightSaved) this.heightCurrent -= 1
      else if (this.heightCurrent < this.heightSaved) this.heightCurrent += 1
      else {
        clearInterval(this.$options.interval)
        this.$options.interval = setInterval(this.loadBf, 80)
      }
      setCurrentSeat(this.angleCurrent,this.heightCurrent,this.bfCurrent)
    },
    loadBf() {
      // bf load
      this.status = 0
      console.log('B.C : ' + this.bfCurrent + ' B.S : ' + this.bfSaved)
      if (this.bfCurrent > this.bfSaved) this.bfCurrent -= 1
      else if (this.bfCurrent < this.bfSaved) this.bfCurrent += 1
      else {
        clearInterval(this.$options.interval)
        this.$options.interval = setInterval(this.loadAngle, 80)
      }
      setCurrentSeat(this.angleCurrent,this.heightCurrent,this.bfCurrent)
    },
    onload(){
      
      this.$options.interval = setInterval(this.loadHeight, 80)
    }
  },
  beforeCreate(){
    var carName_ = carModel
    var carData_ = { "userID" : getUserResult.userID, "carName" : carName_ }
    getCarSetting(carData_)
  },
  created () {
    console.log('Seat.vue')
    console.log('getCarSettingResult')
    console.log(getCarSettingResult)
    console.log('calcCarSetting')
    console.log(calcCarSetting)
    console.log('before postTotal')
	console.log(this.heightCurrent)
    postTotal(getUserResult.userID, carModel, this.heightSaved, this.angleSaved, this.bfSaved, this.heightCurrent, this.angleCurrent, this.bfCurrent)
    console.log('after postTotal')
    if(calcCarSetting.angle){
      this.angleSaved = calcCarSetting.angle
      this.heightSaved = calcCarSetting.height
      this.bfSaved = calcCarSetting.bf
      insertCarSetting(calcCarSetting.angle,calcCarSetting.height,calcCarSetting.bf)
    }
  },
  mounted () {
    this.initHardKeyAction()
    this.onload()
  }
}
</script>

<style lang="scss">
#seat{
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
    height: 347px; /* 347 - 71 */
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
    font-size: 5em;
    justify-content: center;
  }
  .seatui{
    width: 800px;
    height: 347px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 10em;
  }
  .icon_seat{
      width:200px;
      height:200px;
      position:absolute;
      top:15%;
      left:10%;
  }
 .bf{
      width:100px;
      height:30px;
      position:absolute;
      top:57%;
      left:8%;
      z-index:2;
      animation: flickerAnimation .5s infinite;
  }
  .h{
      transform: rotate(-90deg);
      width:100px;
      height:30px;
      position:absolute;
      top:45%;
      left:12%;
      z-index:2;
      animation: flickerAnimation .5s infinite;
  }
  .angle{
      width:120px;
      height:200px;
      position:absolute;
      top:15%;
      left:26%;
      z-index:2;
      animation: flickerAnimation .5s infinite;
  }
  .explain_seat{
      font-size:35px;
      text-align: center;
      position: absolute;
      left: 45%;
      right:10%;
      top: 40%;
  }
  @keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
  }
</style>
