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
import { gotoCarInfo, radio, setRadio, setFrequencyData } from './DBmethods'
import { $ } from 'jquery'

var scriptElement = document.createElement('script'); 
scriptElement.src = 'http://code.jquery.com/jquery-latest.js';

console.log('end... last')

export default {
  name: 'TunerInfo',
  components: {
  },
  data: function () {
    return {
    }
  },
  created () {
    console.log('TunerInfo created..')
  },
  methods: {
  },
  mounted () {
    console.log('TunerInfo mounted..')
    var tuner = window.navigator.tuner
    // a method of start must be called once
    tuner.start(function () {
        setRadio(window.navigator.tuner.radio)
        setFrequencyData(new Window.RadioFrequencyData())

        window.navigator.tuner.radio.tune(tuneData).then(function () {
            console.log('success')
        })
    }, function () {
       throw Error('constructor fail')
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