<template>
  <div id='app'>
    <div class="frame">
      <div class="contents">
        <div v-show="navigation" class="navigation">
          na
          시트 저장, 불러오기
          <input id="autocomplete" placeholder="Enter your address" type="text">
          <p>A.C : {{angleCurrent}}</p>
          <p>A.S : {{angleSaved}}</p>
          <p>H.C : {{heightCurrent}}</p>
          <p>H.S : {{heightSaved}}</p>
          <p>B.C : {{bfCurrent}}</p>
          <p>B.S : {{bfSaved}}</p>
          <p>I.C : {{intervalcount}}</p>
          <div id="load" @click='onload'> load </div>
          <div id="save" @click='onsave'> save </div>
         
          <!-- 네비게이션 -->
          <!-- <ul>
            <li
              is="home"
              v-for="(navi, index) in navigation"
              v-bind:key = "navi.id"
              v-bind:title = "navi.title"
              v-on:remove = "navigation.splice(index, 1)"
            >{{index+1}}. {{navi.title}}<br></li>
          </ul> -->
          <p v-for="navi in navigations" v-bind:key = "navi.id" @click="navilistclick(navi, navigations)">{{navigations.indexOf(navi)}} {{navi.name}}</p>
          <div id="listdelete" @click="listdelete">delete</div>
          <div id="listadd" @click="listadd">add</div>
        </div>
        <div v-show="list" class="list">
          <input type="text" id="inname" v-model="newnaviname" placeholder="명칭 입력">
          <input type="text" id="in" v-model="newnavi" placeholder="새 주소 입력">
          <div id="add" @click="add">+</div>
          <div id="listclose" @click="listclose">X</div>
        </div>
        <div v-show="radio" class="radio">
          radio
          <!-- 라디오 -->
        </div>
      </div>
      <div class="tab">
        <div class="tab-list" id="navigationtab" @click='clickNavigationTab'>
          NAVIGATION
        </div>
        <div class="tab-list" id="radiotab" @click='clickRadioTab'>
          RADIO
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import button from 'obigo-js-ui-rnbs/components/button'
/* eslint-disable */

// import '@/methods.js'
// import { naver } from '@/naverLogin_implicit-1.0.3'
import {
    aa,
    aaa,
    placeSearch,
    autocomplete,
    initAutocomplete,
    fillInAddress} from './methods'
import {naver_id_login} from './naverLogin_implicit-1.0.3'

export default {
  name: 'home',
  components: {
    // 'obg-button': button
  },
  data: function () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
      naverlogin: false,
      navigation: true,
      radio: false,
      list: false,
      userID: 0,
      carName: '',
      carSize: 0,
      angleCurrent: 10,
      heightCurrent: 10,
      bfCurrent: 10,
      angleSaved: 0,
      heightSaved: 0,
      bfSaved: 0,
      temp: '',
      intervalcount: 0,
      navigations: [
        {
          name: '집',
          id: 1,
          title : '서울시 광진구'
        },
        {
          name: '회사',
          id: 2,
          title: '경기도 하남시'
        }
      ],
      navinum: 2,
      newnavi: '',
      newnaviname : '',
      isdeletemode: false,
      aa: ''
    }
  },
  methods: {
    startApp () {
      userID = 0
      carName = ''
      carSize = ''
      angleCurrent = 10
      heightCurrent = 10
      bfCurrent = 10
      angleSaved = 0
      heightSaved = 0
      bfSaved = 0
      temp = ''
      intervalcount = 0
      navigations = []
      navinum = 0
      newnavi = ''
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
    clickNavigationTab () {
      this.navigation = true
      this.radio = false
      this.list = false
      this.isdeletemode = false
    },
    clickRadioTab () {
      this.navigation = false
      this.radio = true
      this.list = false
      this.isdeletemode = false
    },
    saveSetting(){
      this.angleSaved = this.angleCurrent
      this.heightSaved = this.heightCurrent
      this.bfSaved = this.bfCurrent
    },
    load(){
      // angle load
      if (this.angleCurrent > this.angleSaved) this.angleCurrent -= 1
      else if (this.angleCurrent < this.angleSaved) this.angleCurrent += 1

      // height load
      if (this.heightCurrent > this.heightSaved) this.heightCurrent -= 1
      else if (this.heightCurrent < this.heightSaved) this.heightCurrent += 1

      // bf load
      if (this.bfCurrent > this.bfSaved) this.bfCurrent -= 1
      else if (this.bfCurrent < this.bfSaved) this.bfCurrent += 1

      this.intervalcount += 1
    },
    onload(){
      this.$options.interval = setInterval(this.load, 500)
    },
    onsave(){
      this.angleSaved=this.angleCurrent
      this.heightSaved=this.angleCurrent
      this.bfSaved=this.bfCurrent
    },
    listadd () {
      this.navigation = false
      this.list = true
      this.isdeletemode = false
    },
    listdelete () {
      this.isdeletemode = !this.isdeletemode
    },
    listclose () {
      this.list = false
      this.navigation = true
      this.isdeletemode = false
      // this.navigations.push({
      //   id: ++this.navinum,
      //   title: '123'
      // })
    },
    add () {
      this.navigations.push({
        name: this.newnaviname,
        id: ++this.navinum,
        title: this.newnavi
      })
      this.newnavi = ''
      this.newnaviname = ''
    },
    navilistclick (navi, navigations) {
      if(this.isdeletemode === true){
        // alert("delete '" + name + "'?")
        var del = confirm( "delete '" + navi.name + "'?")
        if (del === true){
          var naviIndex = navigations.indexOf(navi)
          navigations.splice(naviIndex, 1)
        }
      }
      else{
        alert(navigations.indexOf(navi) + ' ' + navi.title)
        aa()
      }
    }
  },
  created () {
    // this.$options.interval = setInterval(this.logcc, 1000)
    console.log(this.$options.interval !== null)
  },
  mounted () {
    this.initHardKeyAction()
  },
  updated (){
    if (this.$options.interval !== null){
      if(this.angleCurrent === this.angleSaved && this.heightCurrent === this.heightSaved && this.bfCurrent === this.bfSaved){
        clearInterval(this.$options.interval)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
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
    border: 1px dashed black;
  }
  .contents p{
    font-size:20px
  }
  #load{
    font-size: 30px;
    border: 2px solid white;
    width: 70px;
    text-align: center;
    padding: 3px;
  }
  #save{
    font-size: 30px;
    border: 2px solid white;
    width: 70px;
    text-align: center;
    padding: 3px;
    position: absolute;
    left: 80px;
    top: 204px;
  }
  #listadd{
    font-size: 20px;
    border: 1px solid white;
    width: 40px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  #listdelete{
    font-size: 20px;
    border: 1px solid white;
    width: 60px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  
  #listclose{
    font-size: 20px;
    border: 1px solid white;
    width: 15px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .tab{
    position: absolute;
    top: 276;
    left: 0px;
    width: 800px;
    height: 71px;
    border: 1px solid black;
  }
  .tab-list{
    position: relative;
    display: flex;
    float: left;
    width: 399px;
    height: inherit;
    border: 1px solid black;
    text-align: center;
    font-size: 2em;
    justify-content: center;
  }
  .tab-list #navigationtab{
    left: 0px;
    border: 1px solid black;
  }
  .tab-list #radiotab{
    left: 400px;
    border: 1px solid black;
  }
  .navigation{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 4em;
  }
  .radio{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 4em;
  }
  .list{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 4em;
  }
  .pac-container{ 
    z-index: 1500 !important;
  }
  #naver_id_login{
    visibility: hidden;
  }
</style>
