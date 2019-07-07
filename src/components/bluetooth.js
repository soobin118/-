/* eslint-disable */

console.log('import bluetooth.js')

var data1
var data2

//function getBT (callback) {
//  window.navigator.device.start(function () {
//    window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
//      console.log(data)
//      setTimeout(function () {
//        data1 = data
//        data2 = data[0].deviceId
//        console.log('window : ' + data1)
//        console.log('window : ' + data2)
//      }, 1000)
//    }, function (err) {
//      console.log(err)
//    })
//  }, function (err) {
//    console.log(err)
//  })
//}
//
//getBT(function () {
//  console.log('window out : ' + data1)
//  console.log('window out : ' + data2)
//})
var bt

var setBT = function (bt_) {
  bt = bt_
}

var getBT = function () {
	console.log(bt)
	return bt
}

// var getBlueTooth = function () {
//     window.navigator.device.start(function () {
//       window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
//         console.log('function getBlueTooth()')
//         console.log(data)
//         setTimeout(function () {
//         data1 = data
//         data2 = data[0].deviceId
//         console.log('window : ' + data1)
//         console.log('window : ' + data2)
//           setBT(data1)
//         }, 1000)
//         return data
//       }, function (err) {
//         console.log(err)
//       })
//       }, function (err) {
//       console.log(err)
//       })
// }

function getBlueTooth() {
  return new Promise(resolve => {
    window.navigator.device.start(function () {
      window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
        console.log('function getBlueTooth()')
        console.log(data)
        setTimeout(function () {
        data1 = data
        data2 = data[0].deviceId
        console.log('window : ' + data1)
        console.log('window : ' + data2)
          setBT(data1)
        }, 1000)
        resolve(data)
        return data
      }, function (err) {
        console.log(err)
      })
      }, function (err) {
      console.log(err)
      })

  })
  window.navigator.device.start(function () {
    window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
      console.log('function getBlueTooth()')
      console.log(data)
      setTimeout(function () {
      data1 = data
      data2 = data[0].deviceId
      console.log('window : ' + data1)
      console.log('window : ' + data2)
        setBT(data1)
      }, 1000)
      return data
    }, function (err) {
      console.log(err)
    })
    }, function (err) {
    console.log(err)
    })
}

async function getSetBT () {
  try{
    console.log('function getSetBT()')
    var bta = await getBlueTooth()
    return bta
  } catch (err){
    
  }
}

// window.navigator.device.start(function () {
// window.navigator.device.bluetooth.getDevicesOnService().then(function (data) {
//   console.log(data)
//   setTimeout(function () {
// 	data1 = data
// 	data2 = data[0].deviceId
// 	console.log('window : ' + data1)
// 	console.log('window : ' + data2)
//     setBT(data1)
//   }, 1000)
// }, function (err) {
//   console.log(err)
// })
// }, function (err) {
// console.log(err)
// })

// console.log('window out : ' + data1)
// console.log('window out : ' + data2)

export {
  data1,
  data2,
  bt,
  setBT,
  getBT,
  getSetBT
}
