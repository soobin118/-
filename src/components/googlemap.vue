<template>
<div id='googlemapshow'>
  <div class='frame'>
    <div class='contents'>
      <Img class='icon_abe' src='plus.png'/>
  <div id="map" style="width: 800px; height: 260px;position:relativ;top:0px;"></div>
  </div>
  </div>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'home',
  components: {
    // 'obg-button': button
  },
  data: function () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
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
    }
  },
  mounted () {
    var lat = 37.563576; //위도 latitude
    var lng = 126.983431; //경도 longitude
    var locations = [
      ['명동', lat, lng],
    ];
    setTimeout(function() {
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

    },2000)
    
  }
  }
</script>
<style scoped>
#googlemapshow{
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
  .icon-abe{
    width:15px;
    height:15px;
    position:absolute;
    z-index:100;
  }
</style>