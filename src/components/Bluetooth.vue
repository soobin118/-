<template>
  <div>
    <div id='login'>
        CarInfo
  </div>
</div>
  
  
</template>
<script>
/* eslint-disable */
import './methods'
import { gotoLogin } from './DBmethods'
import { $ } from 'jquery'

var scriptElement = document.createElement('script'); 
scriptElement.src = 'http://code.jquery.com/jquery-latest.js';

console.log('end... last')

export default {
  name: 'CarInfo',
  components: {
  },
  data: function () {
    return {
    }
  },
  created () {
    console.log('created..')
  },
  methods: {
  },
  mounted () {
    console.log('mounted..')
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
    }
    if(connected === true/*connectedAddress !== ad*/){
      //연결 됨
      console.log('connected BT MAC Address : ' + connectedAddress.address)
      var inputdata = { 'btMac' : connectedAddress.address}
      setbtMac(connectedAddress.address)
      getUser(inputdata)
      console.log('getUserResult')
      console.log(getUserResult)

      var carName_, carData_, carResult_
      if(getUserResult.result === "success"){
        carName_ = "2019_G90"
        carData_ = { "userID" : getUserResult.userID, "carName" : carName_ }
        getCarSetting(carData_)
        carResult_ = getCarSettingResult
        console.log('carResult_')  
        console.log(carResult_)
        if(carResult_.length === 1){
          setCarSettingInfo(getCarSettingResult[0],'','')
          /*
          시트 적용할지 물어본다!!!!
          */
         console.log('this.applyDiv = true1')
          this.applyDiv = true
          // gotoSeat()
          //적용할 데이터가 있는 경우
          // UI부분으로 넘어감
        }
        else{
          //계산해야하는 경우
          //값을 가져온 후 Seat으로 넘어가서 계산
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
          /*
          시트 적용할지 물어본다!!!!
          */
         setTimeout(function() {
           console.log('this.applyDiv = true2')
          this.applyDiv = true
          this.applyDivF
          console.log(this.applyDiv)
          
         }, 1000)
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
    }
  })
})

  },
}
</script>

<style lang="scss">

</style>