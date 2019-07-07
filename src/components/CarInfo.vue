<template>
  <div>
    <div id='CarInfo'>
     <Img class="loading" src="cobi.png" />
  </div>
</div>
  
  
</template>
<script>
/* eslint-disable */
import './methods'
import { gotoLogin, setCarModel, setCurrentSeat } from './DBmethods'
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
        model: '',
        angleCurrent: 90,
        heightCurrent: 40,
        bfCurrent: 70
    }
  },
  created () {
    console.log('created..')
    setCurrentSeat(this.angleCurrent,this.heightCurrent,this.bfCurrent)
  },
  methods: {
  },
  mounted () {
    console.log('mounted..')
    window.navigator.vehicle.start(function () {
    // to get data about Identification
    window.navigator.vehicle.carConfiguration.getIdentification().then(function (data) {
        console.log('모델')
        console.log(data.model)
        console.log('VIN')
        console.log(data.VIN)
        setCarModel(data.model)
    }, function (err) {
        console.error(err)
    }).then(function () {
        gotoLogin()
    })
    })
  },
}
</script>

<style lang="scss">
  .loading{
      width:250px;
      height:250px;
      position:absolute;
      top:52px;
      left:35%;
  }
</style>