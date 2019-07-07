<template>
    <div id='navigationSearch'>
        <div class="frame">
            <div class="contents">
                <div class="navigation_search">
                    <Img class='icon_search' src = 'NaviSearch.png' />
                    <Img class="icon_back_atSearch" @click="Back" src="leftarrow.png" /> 
               </div>
               <div class="list" style="overflow:auto">
                <!-- <p v-for="navi in navigations" v-bind:key = "navi.id" @click="navilistclick(navi, navigations)">{{navigations.indexOf(navi)+1}}. {{navi.title}}</p> -->
                <div class="listname" v-for="navi in navigations" v-bind:key = "navi.id" @click="navilistclick(navi, navigations)">
                  {{navigations.indexOf(navi)+1}}. {{navi.address}}
                  <HR width="80%" align = "left"/>
                </div>
               </div>
            </div>
            <div class="googleMapPage" v-show="mapShow">
                <input  class='navisearchinput' type="text" id="in" v-model="navisearch" placeholder="주소 검색">
                <Img class="icon_enter" @click="addSearch" src="enter.png" />
                <Img class="icon_map_out" @click="outTo" src = 'plus.png' />
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
    navigationSear,
    addNavigationSear,
    delNavigationsSear
  } from './methods'
import { getNavigationSearch, getNavigationSearchResult, addNavigationSearch } from './DBmethods'

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
      navigations: navigationSear,
      mapShow: false,
      navisearch: ''
    }
  },
  methods: {
    Back () {
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
    outTo () {
      this.mapShow = false
      getNavigationSearch()
      this.navigations = getNavigationSearchResult
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
    navilistclick (navi, navigations) {
      if(this.isdeletemode === true){
        // alert("delete '" + name + "'?")
        var del = confirm( "delete '" + navi.name + "'?")
        if (del === true){
          var naviIndex = navigations.indexOf(navi)
          //navigations.splice(naviIndex, 1)
          delNavigationsFav(naviIndex)
        }
      }
      else{
        alert(navigations.indexOf(navi) + 1 + ' ' + navi.title)
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
    }
  },
  mounted () {
    this.initHardKeyAction()
    getNavigationSearch()
    this.navigations = getNavigationSearchResult
  }
}
</script>
<style lang="scss">
#NavigationSearch{
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
  .navigation_search{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 7em;
  }
  .icon_search{ // 즐겨찾기 나타내는 페이지 아이콘
    width:50px;
    height:50px;
    position:absolute;
    margin:15px;
  }
  .icon_back_atSearch{
    width:50px;
    height:50px;
    position:fixed;
    top:15px;
    left:740px;
  }
  .list{
    position: relative;
    top:100px;
    left:20px;
    width: 780px;
    height: 190px;
    overflow: scroll;
  }
  .listname{
    font-size: 20px;
    position:relative;
    left:10%;
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