/* eslint-disable */

console.log('import methods.js')

function aa() {
    console.log('aa')
}

var aaa = 'abc'

var placeSearch, autocomplete;
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
                                      (document.getElementById('autocomplete')),{types: ['geocode']});
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
    document.getElementById("lat").value=place.geometry.location.lat();
    document.getElementById("lng").value=place.geometry.location.lng();
}

var navigationFav = [
  {
    name: '집',
    id: 1,
    title: '서울시 광진구 천호대로 111'
  },
  {
    name: '회사',
    id: 2,
    title: '경기 성남시 분당구 판교역로 235'
  }
]

function addNavigationFav (name_, id_, title_) {
  navigationFav.push({
    name: name_,
    id: id_,
    title: title_
  })
}

function delNavigationsFav (index) {
  navigationFav.splice(index, 1)
}


var navigationSear = [
  {
    id: 0,
    title: '서울 광진구 능동로 209'
  },
  {
    id: 1,
    title: '서울 강남구 영동대로 513'
  }
]

function addNavigationSear (title_) {
  navigationSear.push({
    title: title_
  })
}

function delNavigationsSear (index) {
  navigationSear.splice(index, 1)
}

var radioFav = [
  {
    id : '0',
    region : "서울",
    name : "mbc",
    channel : '95.9'
  }
]

function addRadioFav (id_, region_, name_) {
  radioFav.push({
    id: id_,
    region: region_,
    name: name_
    //channel: channel_
  })
}

function delRadioFav (index) {
  radioFav.splice(index, 1)
}

var json = require('./navifav.json')
//console.log(json)

export {
    aa,
    aaa,
    placeSearch,
    autocomplete,
    initAutocomplete,
    fillInAddress,
    navigationFav,
    addNavigationFav,
    delNavigationsFav,
    navigationSear,
    addNavigationSear,
    delNavigationsSear,
    radioFav,
    addRadioFav,
    delRadioFav
}