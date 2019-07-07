<template>
  <div id='app_radio'>
    <div class="frame">
      <div class="contents">
        <div class="radio">
          <Img class="icon_radio" src="radio.png" />
          <Img class="plus_radio" src="plus.png" @click="addlist" />
        </div>
        <div class="list" style="overflow:auto">
        <!-- <p v-for="radio in radios" v-bind:key = "radio.id" @click="radiolistclick(radio, radios)">{{radios.indexOf(radio)+1}}. {{radio.region}}_{{radio.name}}</p> -->
          <div class="listname" v-for="radio in radios" v-bind:key = "radio.id" @click="radiolistclick(radio, radios)">
            {{radios.indexOf(radio)+1}}. {{radio.name}} {{radio.region}}
            <HR width="80%" align = "left"/>
          </div>
        </div>
        <div v-show="list" class="listPlusDiv">
          <input type="text" id="inname" v-model="newRadioRegion" placeholder="지역 입력">
          <input type="text" id="in" v-model="newRadioName" placeholder="방송국 입력">
          <div id="add" @click="add">+</div>
          <div id="listclose" @click="listclose">X</div>
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
import {
    radioFav,
    addRadioFav,
    delRadiosFav
  } from './methods'
import { getRadio, getRadioResult } from './DBmethods'
// import {getBT} from './bluetooth'
export default {
  name: 'home',
  components: {
    // 'obg-button': button
  },
  data: function () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
      userID: 0,
      radios: '',
      name: '',
      region: '',
      channel: '',
      list: false,
      radionum: 0,
      newRadioRegion: '',
      newRadioName: '',
      blue: [],
      address: ''
    }
  },
  methods: {
    clickNavigationTab () {
      this.$router.push('/App')
    },
    radiolistclick (radio, radios) {
      // if(this.isdeletemode === true){
      //   // alert("delete '" + name + "'?")
      //   var del = confirm( "delete '" + navi.name + "'?")
      //   if (del === true){
      //     var naviIndex = navigations.indexOf(navi)
      //     //navigations.splice(naviIndex, 1)
      //     delNavigationsFav(naviIndex)
      //   }
      // }
      // else{
      // }
      alert(radios.indexOf(radio)+ 1 + '. ' + radio.name + ' ' + radio.channel)
    },
    addlist () {
      this.list = true
    },
    add () {
      addRadioFav(++this.radionum, this.newRadioRegion, this.newRadioName)
      this.newRadioRegion = ''
      this.newRadioName = ''
    },
    listclose () {
      this.list = false
    },
    logblue () {
//      console.log(this.blue)
//      console.log(this.blue[0])
//      console.log(this.blue[0].address)
      console.log('address : ' + this.addr)
    }
  },
  mounted () {
    //this.address = getBT()
    getRadio()
    this.radios = getRadioResult

  },
  created () {
//     setTimeout(function () {
//       this.blue = getBT()
//       console.log('getBT : ' + this.blue)
//       console.log('getBT[0] : ' + this.blue[0].address)
//       this.address = this.blue[0].address
//       document.getElementById('address').innerHTML = this.blue[0].address
// //      this.$options.interval = setInterval(this.logblue, 1000)
//       console.log(this.address)
//       this.addr = this.blue[0].address
//     }, 2000)
    // this.$options.interval = setInterval(this.logblue, 1000)
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
  .list{
    position: relative;
    top:100px;
    left: 20px;
    width: 780px;
    height: 205px;
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
</style>
