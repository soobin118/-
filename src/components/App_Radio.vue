<template>
  <div id='app_radio'>
    <div class="frame">
      <div class="contents">
        <div class="radio">
          <Img class="icon_radio" src="radio.png" />
          <Img v-show="!delmode" class='icon_edit' @click='clickEdit' src = 'Edit.png' />
          <Img v-show="delmode" class='icon_edit' @click='clickEdit' src = 'editblank.png' />
<!--          <Img class="plus_radio" src="plus.png" @click="addlist" /> -->
          <Img v-show="backshow" class="plus_radio" src="leftarrow.png" @click="back" /> 
        </div>
        <div class="list" style="overflow:auto">
          <center>
              <div class="confirm_radio" v-show="list4">
                <br>선택해주세요
                <div class="buttonDiv">
                  <div id="delOK" @click="addlist">
                    수정
                  </div>
                  <div id="delCancel" @click="deletelist">
                    삭제
                  </div>
                </div>
              </div>
          </center>
<!--
          <div v-show="list4">
            <div @click="addlist" >수정</div>
            <div @click="deletelist" >삭제</div>
          </div>    
-->
        <div style="float: left; width: 45%">
          <div v-show="list2" class="listname" v-for="name in radioNameTable" v-bind:key = "name.id" @click="addRegion(name)">
              {{name}}
              <HR width="80%" align = "left"/>
          </div>
        </div>
        <div style="float: left; width: 45%">
          <div v-show="list3" class="listname" v-for="region in radioRegionTable" v-bind:key = "region.id" @click="add(region)">
              {{region}}
              <HR width="80%" align = "left"/>
          </div>
        </div>
        <!-- <p v-for="radio in radios" v-bind:key = "radio.id" @click="radiolistclick(radio, radios)">{{radios.indexOf(radio)+1}}. {{radio.region}}_{{radio.name}}</p> -->
          <div class="listname" v-show="list1" v-for="radio in radios" v-bind:key = "radio.id" @click="choose(radio, radios)">
            {{radios.indexOf(radio)+1}}. {{radio.name}} {{radio.channel}} 
            <HR width="80%" align = "left"/>
          </div>    
        </div>
      </div>
      <div class="tab">
        <div class="tab-list" @click='clickNavigationTab'>
          내비게이션
        </div>
        <div class="tab-list-active">
          라디오
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import button from 'obigo-js-ui-rnbs/components/button'
// import {navigations} from ''
/* eslint-disable */

// var radioData
// window.navigator.tuner.radio.getPreset().then(function (data) {
//   radioData = data[0]
// }, function (err) {
//   console.log(err)
// }).then(function (){
//   var radio = window.navigator.tuner.radio
//   var presetData = new window.RadioPresetData()
//   presetData.index = 1 // must be specified
//   presetData.frequency = 0 // must be 0
//   window.navigator.tuner.radio.setPreset(presetData).then(function () {
//     console.log('success')
//   }, function (err) {
//     console.log(err)
//   }).then(function () {
//     getRadio()
//     this.radios = getRadioResult
//     getRadioTable()
//     this.radioTable = getRadioTableResult
//     if(this.radios.length < 6){
//       var count = this.radios.length;
//       while(count < 6){
//         this.radios[count] = {'name': radioData.index, 'channel': radioData.frequency}
//         count = count + 1
//       }
//     }
//   })
// })

var tuner = window.navigator.tuner
// a method of start must be called once
tuner.start(function () {
  var radio = window.navigator.tuner.radio
  var tuneData = new window.RadioTuneData()
  tuneData.radioDirection = radio.RadioDirectionEnum.TUNER_RADIO_DIRECTION_DOWN
  tuneData.stepSize = 5
  window.navigator.tuner.radio.tune(tuneData).then(function () {
    console.log('success')
  })


  var presetData = new window.RadioPresetData()
  presetData.index = 3 // must be specified
  presetData.frequency = 0 // must be 0
    window.navigator.tuner.radio.setPreset(presetData).then(function () {
    console.log('success presetData')
    console.log(presetData)
  }, function (err) {
    console.log(err)
  }).then(function () {
    // console.log('success presetData2')

    // var getradiothen = getRadio()
    // getradiothen.then(function() {
    //   console.log('.........getradiothen.then..........')
    // })
  }).then(function() {
    getRadio().then(function () {
      console.log('============then2===============')
      this.radios = getRadioResult
      getRadioTable()
      this.radioTable = getRadioTableResult
      if(this.radios.length < 6){
        var count = this.radios.length;
        console.log('radios.length' , this.radios.length)
        while(count < 6){
          console.log('count', count)
          //this.radios[count] = {'name': radioData.index, 'channel': radioData.frequency}
          count = count + 1
        }
      }

      // window.navigator.tuner.radio.getStation().then(function (data) {
      //   console.log('GetStation')
      //   console.log(data)
      // }, function (err) {
      //   console.log(err)
      // })



      // window.navigator.tuner.radio.getPreset().then(function (data) {
      //   for (var i = 0; i < data.length; i++) {
      //     console.log(data[i].index)
      //     console.log(data[i].band)
      //     console.log(data[i].frequency)
      //     console.log(data[i].programId)
      //     console.log(data[i].secondaryProgramId)
      //     console.log(data[i].stationName)
      //   }
      // }, function (err) {
      //   console.log(err)
      // })

      // var rad = window.navigator.tuner.radio
      // var frequencyData = new window.RadioFrequencyData()
      // frequencyData.frequency = 107700000
      // frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM


      // window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
      //   console.log('setFrequency success')
      // }, function (err){
      //   console.log(err)
      // })



    }).then(function() {
      //
      console.log('라디오 정보 가져온 후')

      // frequencyData.frequency = radios.channel
      // frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      // window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
      //   console.log('setFrequency success')
      // }, function (err){
      //   console.log(err)
      // }).then(function () {
        
      // })

      var frequencyData = new window.RadioFrequencyData()
      var cnt = 1

      frequencyData.frequency = getRadioResult[cnt-1].channel*1000000
      console.log('var')
      console.log(getRadioResult[cnt-1])
      frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
        console.log('setFrequency success')
        console.log(frequencyData)
      }, function (err){
        console.log(err)
      }).then(function () {
        //요기서 setpreset
        
      })

      presetData.index = cnt // must be specified
      cnt += 1
      presetData.frequency = 0 // must be 0
      window.navigator.tuner.radio.setPreset(presetData).then(function () {
        console.log('success presetData')
        console.log(presetData)
      }, function (err) {
        console.log(err)
      })

      frequencyData.frequency = getRadioResult[cnt-1].channel*1000000
      console.log('var')
      console.log(getRadioResult[cnt-1])
      frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
        console.log('setFrequency success')
        console.log(frequencyData)
      }, function (err){
        console.log(err)
      }).then(function () {
        //요기서 setpreset
        
      })

      presetData.index = cnt // must be specified
      cnt += 1
      presetData.frequency = 0 // must be 0
      window.navigator.tuner.radio.setPreset(presetData).then(function () {
        console.log('success presetData')
        console.log(presetData)
      }, function (err) {
        console.log(err)
      })

      frequencyData.frequency = getRadioResult[cnt-1].channel*1000000
      console.log('var')
      console.log(getRadioResult[cnt-1])
      frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
        console.log('setFrequency success')
        console.log(frequencyData)
      }, function (err){
        console.log(err)
      }).then(function () {
        //요기서 setpreset
        
      })

      presetData.index = cnt // must be specified
      cnt += 1
      presetData.frequency = 0 // must be 0
      window.navigator.tuner.radio.setPreset(presetData).then(function () {
        console.log('success presetData')
        console.log(presetData)
      }, function (err) {
        console.log(err)
      })

      frequencyData.frequency = getRadioResult[cnt-1].channel*1000000
      console.log('var')
      console.log(getRadioResult[cnt-1])
      frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
        console.log('setFrequency success')
        console.log(frequencyData)
      }, function (err){
        console.log(err)
      }).then(function () {
        //요기서 setpreset
        
      })

      presetData.index = cnt // must be specified
      cnt += 1
      presetData.frequency = 0 // must be 0
      window.navigator.tuner.radio.setPreset(presetData).then(function () {
        console.log('success presetData')
        console.log(presetData)
      }, function (err) {
        console.log(err)
      })

      frequencyData.frequency = getRadioResult[cnt-1].channel*1000000
      console.log('var')
      console.log(getRadioResult[cnt-1])
      frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
        console.log('setFrequency success')
        console.log(frequencyData)
      }, function (err){
        console.log(err)
      }).then(function () {
        //요기서 setpreset
        
      })

      presetData.index = cnt // must be specified
      cnt += 1
      presetData.frequency = 0 // must be 0
      window.navigator.tuner.radio.setPreset(presetData).then(function () {
        console.log('success presetData')
        console.log(presetData)
      }, function (err) {
        console.log(err)
      })


    })
    //요기서 에러

  }).then(function() {
      


      // for(var radi in getRadioResult){
      //   // frequencyData.frequency = getRadioResult[radi].channel*1000000000
      //   // console.log('var')
      //   // console.log(getRadioResult[radi])
      //   // frequencyData.band = radio.RadioBandEnum.TUNER_RADIO_BAND_FM

      //   // window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
      //   //   console.log('setFrequency success')
      //   //   console.log(frequencyData)
      //   // }, function (err){
      //   //   console.log(err)
      //   // }).then(function () {
      //   //   //요기서 setpreset
          
      //   // })

      //   // presetData.index = radi+1 // must be specified
      //   // cnt += 1
      //   // presetData.frequency = 0 // must be 0
      //   // window.navigator.tuner.radio.setPreset(presetData).then(function () {
      //   //   console.log('success presetData')
      //   //   console.log(presetData)
      //   // }, function (err) {
      //   //   console.log(err)
      //   // })

      // }
  })
}, function () {
  throw Error('constructor fail')
})


import {
    radioFav,
    addRadioFav,
    delRadiosFav
  } from './methods'
import { updateRadio, getUserResult, getRadio, getRadioResult, getRadioTable, getRadioTableResult, getUser, insertRadio, deleteRadio, } from './DBmethods'
import 'obigo-js-webapi/tuner/tuner'
// import {getBT} from './bluetooth'
export default {
  name: 'home',
  components: {
    // 'obg-button': button
  },
  data: function () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
      radios: '',
      list5: false,
      list4: false,
      list3: false,
      list2: false,
      list1: true,
      radioTable: '',
      radioRegionTable: ['수도권', '부산', '울산', '대구', '광주', '대전', '제주'],
      radioNameTable: ['KBS', 'MBC', 'SBS', '교통'],
      name: '',
      region: '',
      radioID: '',
      newRadioID: '',
      radio: '',
      backshow: false,
      delmode : false
    }
  },
  methods: {
    clickNavigationTab () {
      this.$router.push('/App')
    },
    clickEdit() {
      if(this.delmode === true) this.delmode = false
      else this.delmode = true
    },
    choose(radio, radios){
      if(this.delmode === true){
        if (radio.name == ''){
          this.list5 = false
          this.list4 = false
          this.list3 = false
          this.list2 = true
          this.list1 = false
          this.backshow = true
        } else {
          this.list5 = true
          this.list4 = true
          this.list3 = false
          this.list2 = false
          this.list1 = false
          this.backshow = true
        }
        var count = 0
        for ( var i in this.radioTable) {
          if(this.radioTable[i].channel == radio.channel){
            this.radioID = this.radioTable[i].radioID
            count = 1
            break
          }
        }
        if (count == 0){
          this.radioID = ''
        }
      }else {
        var frequencyData = new window.RadioFrequencyData()
        var r = window.navigator.tuner.radio
        frequencyData.frequency = radio.channel*1000000
        frequencyData.band = r.RadioBandEnum.TUNER_RADIO_BAND_FM

        window.navigator.tuner.radio.setFrequency(frequencyData).then(function() {
          console.log('radio')
          console.log(radio)
          console.log('radio.channel')
          console.log(radio.channel)
          console.log('setFrequency success')
          console.log(frequencyData)
        }, function (err){
          console.log(err)
        })
      }

      
      
    },
    radioInit(){
          getRadio()
          this.radios = getRadioResult
          getRadioTable()
          this.radioTable = getRadioTableResult
          if(this.radios.length < 6){
            var count = this.radios.length;
            while(count < 6){
              this.radios[count] = {'name': '', 'channel': '' }
              count = count + 1
            }
          }
  
//      var radioData
//      window.navigator.tuner.radio.getPreset().then(function (data) {
//        radioData = data[0]
//      }, function (err) {
//        console.log(err)
//      }).then(function (){
//        var radio = window.navigator.tuner.radio
//        var presetData = new window.RadioPresetData()
//        presetData.index = 1 // must be specified
//        presetData.frequency = 0 // must be 0
//        window.navigator.tuner.radio.setPreset(presetData).then(function () {
//          console.log('success')
//        }, function (err) {
//          console.log(err)
//        }).then(function () {
//          getRadio()
//          this.radios = getRadioResult
//          getRadioTable()
//          this.radioTable = getRadioTableResult
//          if(this.radios.length < 6){
//            var count = this.radios.length;
//            while(count < 6){
//              this.radios[count] = {'name': radioData.index, 'channel': radioData.frequency}
//              count = count + 1
//            }
//          }
//        })
//      })
console.log('init')
    },
    addlist() { //기존값있으면 넘겨주면서 update로.. 아니라면 인서트로..
      this.list5 = false
      this.list4 = false
      this.list3 = false
      this.list2 = true
      this.list1 = false
      this.backshow = true
    },
    addRegion(name){
      this.list5 = false
      this.list4 = false
      this.list3 = true
      this.list2 = false
      this.list1 = false
      this.backshow = true
      this.name = name
    },
    add (region) {
      this.region = region
      
      var count = 0
      for ( var i in this.radioTable) {
        if(this.radioTable[i].name == this.name){
          if(this.radioTable[i].region == this.region){
            this.newRadioID = this.radioTable[i].radioID
            count = 1
            break
          }
        }
      }
      if (count == 0){
        this.newRadioID = ''
      }

      if (this.radioID == ''){
        var allData = { 'userID': getUserResult.userID, 'radioID': this.newRadioID }
//        var allData = { 'userID': 22, 'radioID': this.newRadioID }
        insertRadio(allData)
      } else {
        var allData = { 'userID': getUserResult.userID, 'radioID': this.radioID, 'newRadioID': this.newRadioID }
//        var allData = { 'userID': 22, 'radioID': this.radioID, 'newRadioID': this.newRadioID }
        updateRadio(allData)
      }
      this.radioInit()
      this.list5 = false
      this.list4 = false
      this.list3 = false
      this.list2 = false
      this.list1 = true
      this.backshow = false
    },
    back(){
      this.delmode = false
      this.radioInit()
      this.list5 = false
      this.list4 = false
      this.list3 = false
      this.list2 = false
      this.list1 = true
      this.backshow = false
    },
    delete(){
      var allData = { 'userID': getUserResult.userID, 'radioID': this.radioID }
      deleteRadio(allData)
      this.back()
    },
    deletelist(){
      var allData = { 'userID': getUserResult.userID, 'radioID': this.radioID }
      deleteRadio(allData)
      this.radioInit()
      this.list5 = false
      this.list4 = false
      this.list3 = false
      this.list2 = false
      this.list1 = true
      this.backshow = false
    }
  },
  mounted () {
    this.radioInit()
  },
  created () {
  }
}
</script>

<style lang="scss">
#app_radio{
  position: relative;
  background:black;
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
  .radio{
    width: 800px;
    height: 80px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 7em;
  }
  .icon_radio{
      width:50px;
      height:50px;
      position:absolute;
      margin:15px;
  }
  .plus_radio{
      width:50px;
      height:50px;
      position:fixed;
      top:15px;
      left:740px;
  }
  .icon_edit{ // 편집 아이콘
    width:50px;
    height:50px;
    position:fixed;
    top:15px;
    left: 680px;
  }
  .list{
    position: relative;
    top:100px;
    left: 20px;
    width: 780px;
    height: 190px;
    overflow: scroll;
  }
  .listname{
    font-size: 20px;
    position:relative;
    left:10%;
  }
  .listPlusDiv{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 4em;
    z-index: 100;
  }
  .confirm_radio{
    position: absolute;
    left: 325px;
    top: 0px;
    width: 150px;
    height: 100px;
    border: 1px solid white;
    background: gray;
    text-align: center;
    font-size: x-large;
  }

  .buttonDiv{
    position: relative;
    left: 15px;
    margin-top: 11px;
    width: auto;
    height: 40px;
  }

  #delOK{
    float: left;
    width: 50px;
    height: 30px;
    border: 1px solid white;
    padding-top: 4px;
    margin: 5px;
    text-align: center;
  }

  #delCancel{
    float: left;
    width: 50px;
    height: 30px;
    border: 1px solid white;
    padding-top: 4px;
    margin: 5px;
    text-align: center;
  }
</style>