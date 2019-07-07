<template>
  <div>
    <div id='login'>
     <Img class="loading" src="cobi.png" />
      <div v-show='seat' id="login" @click="onNext"></div>
      <div id="apply">
        시트 적용 하실까요?
      <div id="buttonDiv">
        <div id="OK" @click="OK">
          OK
        </div>
        <div id="NO" @click="NO">
          NO
        </div>
      </div>      
    </div>
      <div id="BTReload">
        블루투스 연결 후 확인을 눌러주세요.
      <div id="buttonDiv_1">
        <div id="BTOK" @click="reload">
          확인
        </div>
      </div>      
    </div>
  </div>
  <center>
    <div class="confirm" v-show="connectError">
      <br>서버와 연결이 되지 않습니다.<br>잠시 후 다시 시도해주세요.<div style="margin-top:10px"></div>
      <div class="buttonDiv2">
        <div id="delOK" @click="reload">
          재연결
        </div>
      </div>
    </div>
  </center>
</div>
  
  
</template>
<script>
/* eslint-disable */

import './methods'
// import { naver_id_login } from './naverLogin_implicit-1.0.3'
import { getUser, getUserResult, getCarSetting, 
         getCarSettingResult, addUser, gotoSeat,
         existCarSetting, existCarInfo, newCarInfo, 
         setCarSettingResult, setCarSettingInfo,
         calcAngle, calcBF, calcHeight,
         gotoStart, gotoMember, setbtMac, 
         getRadioTable, getRadioTableResult,
         carModel, calcCarSetting } from './DBmethods'
import { $ } from 'jquery'
import { getBT, getSetBT } from './bluetooth'

var add

var scriptElement = document.createElement('script'); 
scriptElement.src = 'http://code.jquery.com/jquery-latest.js';

console.log('end... last')

export default {
  name: 'Login',
  components: {
  },
  data: function () {
    return {
      show: 0,
      getUserResult: [],
      allData: { 'btMac': '08:AE:D6:98:F7:90' },
      result: '',
      address: '',
      carData: {},
      carName: '',
      carResult: '',
      seat:false,
      //applyDiv: false,
      connectError: false
    }
  },
  created () {

    console.log('created..')
  },
  methods: {
    onNext () {
      this.$router.push('/Seat')
    },
    setbluetooth(ad) {
      this.address = ad
      console.log(this.address)

    },
    OK(){
      gotoSeat()
    },
    NO(){
      gotoStart()
    },
    // applyDivF(){
    //   this.applyDiv = true
    // },
    reload(){
      location.reload()
    }
  },
  mounted () {
    console.log('mounted..')
    getRadioTable()
    if (getRadioTableResult == undefined){
      this.connectError = true
    }


// window.navigator.vehicle.start(function () {
//   // to get data about Identification
//   window.navigator.vehicle.carConfiguration.getIdentification().then(function (data) {
//     console.log('모델')
//     console.log(data.model)
//     console.log('VIN')
//     console.log(data.VIN)
//   }, function (err) {
//     console.error(err)
//   })
// })


var ad
window.navigator.device.start(function () {
  window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
    ad = data
  }, function (err) {
    console.log(err)
  }).then(function (){
    var connectedAddress
    var connected = false
    for(var i = 0 ; i < 5 ; i++){
      if(ad[i].connected === true){
        connectedAddress = ad[i]
        connected = true
        break;
      }
      //요기서 블투 연결했는지 묻고 리로드
    }
    if(connected === true/*connectedAddress !== ad*/){
      //연결 됨
      console.log('connected BT MAC Address : ' + connectedAddress.address)
      var inputdata = { 'btMac' : connectedAddress.address}
      setbtMac(connectedAddress.address)
      getUser(inputdata)
      console.log('getUserResult')
      console.log(getUserResult)

      if(calcCarSetting){
        console.log('--------------------')
        console.log(calcCarSetting)
        console.log('-----------------')
      }

      var carName_, carData_, carResult_
      if(getUserResult.result === "success"){
        carName_ = carModel
        console.log('carname : ' + carName_)
        carData_ = { "userID" : getUserResult.userID, "carName" : carName_ }
        getCarSetting(carData_)
        carResult_ = getCarSettingResult
        console.log('carResult_')  
        console.log(carResult_)
        console.log('carResult_.length : ' + carResult_.length)
        if(carResult_.content === "no Data"){
          console.log('gotoStart')
          gotoStart()
        }
        if(carResult_.length === 1){
          
          console.log('carResult_.length === 1')
          setCarSettingInfo(getCarSettingResult[0],'','')
          /*
          시트 적용할지 물어본다!!!!
          */
         console.log('this.applyDiv = true1')
          // this.applyDiv = true
          // gotoSeat()
          //적용할 데이터가 있는 경우
          // UI부분으로 넘어감
          document.getElementById("apply").style.visibility = "visible"
        }
        else{
          //계산해야하는 경우
          //값을 가져온 후 Seat으로 넘어가서 계산
          console.log('carResult_.length === 1 else')
          if(carResult_[1][0].carName === carName_){
            setCarSettingInfo(carResult_[0][0], carResult_[1][1], carResult_[1][0])
          }
          else{
            setCarSettingInfo(carResult_[0][0], carResult_[1][0], carResult_[1][1])
          }
          console.log('existCarSetting')
          console.log(existCarSetting)
          console.log('existCarInfo')
          console.log(existCarInfo)
          console.log('newCarInfo')
          console.log(newCarInfo)
          calcAngle()
          calcBF()
          calcHeight()
          console.log('calc setting___')
          console.log('getCarSettingResult')
          console.log(getCarSettingResult)
          
          /*
          시트 적용할지 물어본다!!!!
          */
        //  setTimeout(function() {
        //    console.log('this.applyDiv = true2')
        //   this.applyDiv = true
        //   this.applyDivF
        //   console.log(this.applyDiv)
          
        //  }, 1000)
         document.getElementById("apply").style.visibility = "visible"
         
          // gotoSeat()
        }
        //적용할 데이터가 없는 경우
        //UI 없이 Start로 넘어감
        
        /*
        요기에다가 App으로 넘어가도록 만든다
        */
      }
      else{
        gotoMember()
      }
    }
    else {
      //연결된것 없음
      console.log('connected nothing')
      document.getElementById("BTReload").style.visibility = "visible"
      //location.reload()
    }
  })
})
  },
  updated () {
    console.log('login.vue : ' + this.address)
  }
}
</script>

<style lang="scss">
#login{
  position: relative;
  background:#2a2a2a;
  color: #ffffff;
  height: 347px;
}
  .frame{
    width: auto;
    height: auto;
  }
  .login{
    width: 400px;
    height: 200px;
    border: 1px solid black;
    border-radius: 5%;
    position: absolute;
    top: 73px; /* (347 - 200) / 2 */
    left: 200px;
  }
  .next{
    height: 30px;
    width: 50px;
    font-size:50px;
    /* padding: 10px; */
    left: 700px;
    top: 280px;
  }
  .loading{
      width:250px;
      height:250px;
      position:absolute;
      top:52px;
      left:35%;
  }

  #apply{
    width: 150px;
    height: 80px;
    position: absolute;
    left: 325px;
    top: 100px;
    border: 1px solid white;
    background: gray;
    text-align: center;
    visibility: hidden;
    font-size:x-large;
  }

  #buttonDiv{
    position: relative;
    left: 15px;
    margin-top: 11px;
    width: auto;
    height: 40px;
  }

  #OK{
    float: left;
    width: 50px;
    height: 30px;
    border: 1px solid white;
    padding-top: 4px;
    margin: 5px;
    text-align: center;
  }

  #NO{
    float: left;
    width: 50px;
    height: 30px;
    border: 1px solid white;
    padding-top: 4px;
    margin: 5px;
    text-align: center;
  }
    .confirm{
    position: absolute;
    left: 230px;
    top: 80px;
    width: 340px;
    height: 140px;
    border: 1px solid white;
    background: gray;
    text-align: center;
    font-size: x-large;
  }

  .buttonDiv2{
      margin:auto;
    width: auto;
    height: 40px;
  }

  #delOK{
    width: 150px;
    height: 30px;
    border: 1px solid white;
    padding-top: 2px;
      margin:auto;
    text-align: center;
  }

  #BTReload{
    width: 300px;
    height: 80px;
    position: absolute;
    left: 250px;
    top: 100px;
    border: 1px solid white;
    background: gray;
    text-align: center;
    visibility: hidden;
    font-size:x-large;
  }

  #buttonDiv_1{
    position: relative;
    left: 15px;
    margin-top: 11px;
    width: auto;
    height: 40px;
  }

  #BTOK{
    position: absolute;
    left: 110px;
    width: 50px;
    height: 30px;
    border: 1px solid white;
    padding-top: 4px;
    margin: 5px;
    text-align: center;
  }
</style>