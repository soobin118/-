<template>
     <div id='navigationFavorite'>
        <div class="frame">
            <div class="contents">
                <div class="navigation_favorite">
                    <Img class='icon_favorite' src = 'NaviFavorite.png' />
                    <Img class='icon_plus' @click='clickPlus' src = 'plus.png' />
                    <Img class='icon_edit' @click='clickEdit' src = 'trashcan.png' />
                    <Img class="icon_back" @click="goBack" src="leftarrow.png" /> 
               </div>
                <div class="list" style="overflow:auto">
                <!-- <p v-for="navi in navigations" v-bind:key = "navi.id" @click="navilistclick(navi, navigations)">{{navigations.indexOf(navi)+1}}. {{navi.name}}</p> -->
                <div class="listname" v-for="navi in navigations" v-bind:key = "navi.id" @click="navilistclick(navi, navigations)">
                  {{navigations.indexOf(navi)+1}}. {{navi.name}}
                  <HR width="80%" align = "left"/>
                </div>
               </div>
               <div v-show="list" class="listPlusDiv">
                <table class='inputTable'>
                 <tr><td>
                <div class="plusExplain">명칭</div></td>
                <td>
                <input type="text" id="inname" v-model="newnaviname" placeholder="명칭 입력">
                </td>
                </tr>
                <tr><td>
                <div class="plusExplain">주소</div></td>
                <td>
                <input type="text" id="in" v-model="newnavi" placeholder="새 주소 입력">
                </td></tr>
                </table>
                <Img class='icon_plus' @click='add' src = 'plus.png' />
                <Img class='listclose' @click='listclose' src = 'plus.png' />
              </div>
              <div class="confirm" v-show="delFav">
                Delete {{delName}} ?
                <div class="buttonDiv">
                  <div id="delOK" @click="OKClick">
                    확인
                  </div>
                  <div id="delCancel" @click="cancleClick">
                    취소
                  </div>
                </div>
              </div>
            </div>
            <div class="googleMapPage" v-show="mapShow">
                <input  class='navisearchinput' type="text" id="in" v-model="navisearch" placeholder="주소 검색">
                <Img class="icon_enter" @click="addSearch" src="enter.png" />
                <Img class="icon_map_out" @click="outto" src = 'plus.png' />
                <div id="map" style="width: 800px; height: 260px;"></div>
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
/* eslint-disable */
import { 
    navigationFav,
    addNavigationFav,
    delNavigationsFav,
    navigationSear
  } from './methods'
 import { getNavigationFavorite, getNavigationFavoriteResult, addNavigationFavorite, delNavigationFavorite, gotoNaviFavorite, addNavigationSearch, getNavigationSearch, getNavigationSearchResult } from './DBmethods'

  
//import 'obigo-js-webapi/device/device'
//
//window.navigator.device.start(function () {
//  window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
//    console.log(data)
//  }, function (err) {
//    console.log(err)
//  })
//}, function (err) {
//  console.log(err)
//})

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
      bf: 0,
      navigations: navigationFav,
      /* navigations: [
         {
           name: '집',
          id: 1,
           title: '서울시 광진구',
           lat:37.545,
      lng:127.082
   },
        {
           name: '회사',
           id: 2,
          title: '경기도 하남시',
      lat:37.545,
     lng:127.082
         }
       ],*/
      list: false,
      isdeletemode: false,
      newnavi: '',
      newnaviname: '',
      jsonresult: '',
      jsonnavi: [],
      delName: '',
      del: false,
      delFav: false,
      delNaviIndex: '',
       mapShow: false,
       navisearch: '',
      navis: navigationSear
    }
  },
  methods: {
    outto () {
      this.mapShow = false
    }, 
    clickPlus () {
      this.list = true
      this.isdeletemode = false
    },
    clickEdit () {
      this.isdeletemode = true
},
goBack(){
  this.$router.push('/App')
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
    },
    add () {
      // this.navigations.push({
      //   name: this.newnaviname,
      //   id: ++this.navinum,
      //   title: this.newnavi
      // })
      if(this.newnavi !== '' && this.newnaviname !== ''){
        // addNavigationFav(this.newnaviname, this.navinum, this.newnavi)
        addNavigationFavorite(this.newnaviname,this.newnavi)
        this.newnavi = ''
        this.newnaviname = ''
      }
    },
    addSearch () { // 주소 검색한거 navigation search DB에 넣어주는 함수
      if(this.navisearch !== ''){
        addNavigationSearch(this.navisearch)
        var inputaddress = this.navisearch
        this.navisearch = ''
        getNavigationSearch()
        var size = getNavigationSearchResult.length;
        this.navis = getNavigationSearchResult[size-1]
        console.log(this.navis)
        this.mapShow = true;
        var lat = this.navis.lat;
        var lng = this.navis.lng;
        var locations = [[this.navis.address, lat, lng],];
        console.log(locations)
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: new google.maps.LatLng(lat, lng),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infowindow = new google.maps.InfoWindow();

        var marker, i;
        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
          id:i,
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          bounds: null,
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
        if(marker)
        {
          marker.addListener('click', function() {
            map.setZoom(16);
            map.setCenter(this.getPosition());
          });
        }
        }
      }
    },
    listclose () {
      getNavigationFavorite()
      this.navigations = getNavigationFavoriteResult
      this.list = false
      this.isdeletemode = false
      // this.navigations.push({
      //   id: ++this.navinum,
      //   title: '123'
      // })
    },
    navilistclick (navi, navigations) {
      if(this.isdeletemode === true){
        this.delName = navi.name
        //var del = confirm( "delete '" + navi.name + "'?")
        this.delFav = true
        this.delNaviIndex = navigations.indexOf(navi)
        //var naviIndex = navigations.indexOf(navi)
        //delNavigationsFav(naviIndex)
      }
      else{
        console.log(navi);
        this.mapShow = true;
        var lat = navi.lat; //위도 latitude
        var lng = navi.lng; //경도 longitude
        var locations = [
          [navi.address, navi.lat, navi.lng],
        ];
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: new google.maps.LatLng(lat, lng),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infowindow = new google.maps.InfoWindow();

        var marker, i;
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        id:i,
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        bounds: null,
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
      if(marker)
      {
        marker.addListener('click', function() {
          map.setZoom(16);
          map.setCenter(this.getPosition());
        });
        }
        }
      }
    },
    cancleClick () {
      this.delFav = false
    },
    OKClick () {
      //navigations.splice(naviIndex, 1)
      //delNavigationsFav(this.delNaviIndex)
      delNavigationFavorite(this.navigations[this.delNaviIndex].name)
      this.delFav = false
      getNavigationFavorite()
      this.navigations = getNavigationFavoriteResult
    }
  },
  mounted () {
    this.initHardKeyAction()
    getNavigationFavorite()
    this.navigations = getNavigationFavoriteResult
    //console.log(json)
    //this.jsonnavi = $.getJson('./navifav.json')
  },
  craeted() {
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
    font-size: 7em;
  }
  .icon_favorite{ // 즐겨찾기 나타내는 페이지 아이콘
    width:50px;
    height:50px;
    position:absolute;
    margin:15px;
  }
  .icon_plus{ // 추가 아이콘
    width:50px;
    height:50px;
    position:fixed;
    top: 15px;
    left: 740px;
  }
  .listclose{
    width:50px;
    height:50px;
    position:fixed;
    top:10px;
    left:10px;
    transform: rotate(-45deg)
  }
  .icon_edit{ // 편집 아이콘
    width:50px;
    height:50px;
    position:fixed;
    top:15px;
    left: 680px;
  }
  .icon_back{
    width:50px;
    height:50px;
    position:fixed;
    top:15px;
    left: 620px;
  }
  .list{
    position: relative;
    top:100px;
    left: 20px;
    width: 780px;
    height: 190px;
    overflow: scroll;
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
  .listname{
    font-size: 20px;
    position:relative;
    left:10%;
  }
  .plusExplain{
    font-size: 40px;
    margin-bottom:20px;
  }
  .inputTable{
    width:80%;
    position:fixed;
    top:50px;
    left:80px;
    border: 1px solid;
  }
  tr{
    border:1px solid;
  }
  td{
    text-align:center;
    position:relative;
  }
  input{
    font-size:30px;
    margin-bottom:20px;
  }

  .confirm{
    width: 150px;
    height: 70px;
    position: absolute;
    left: 300px;
    top: 100px;
    border: 1px solid white;
    background: gray;
    text-align: center;
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
  .googleMapPage{
    width: 800px;
    height: 347px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 4em;
    z-index: 100;
  }
  .navisearchinput{
    font-size:30px;
    width:600px;
    margin: 10px;
  }
  .icon_map_out{
    width:50px;
    height:50px;
    position:fixed;
    top: 15px;
    left: 730px;
    transform: rotate(-45deg)
  }
  .icon_enter{
    width:50px;
    height:50px;
    position:fixed;
    top: 8px;
    left: 620px;
  }
</style>