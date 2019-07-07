/* eslint-disable */
import $ from 'jquery'
// import router from './router'
import router from '../router'

var getUserResult
var carModel

var currentAngle
var currentHeight
var currentBf

var calcCarSetting = {}

var radio
var frequencyData 

var setRadio = function(data_){
    radio = data_
}

var setFrequencyData = function(data_){
    frequencyData = data_
}

var setCurrentSeat = function(angle_, height_, bf_){
    console.log('setCurrentSeat')
    currentAngle = angle_
    currentHeight = height_
    currentBf = bf_
    // updateCarSetting(angle_,height_,bf_)
}
 
var scriptElement = document.createElement('script'); 
scriptElement.src = 'http://code.jquery.com/jquery-latest.js';

var gotoSeat = function(){
    router.push('/Seat')
}

var gotoMember = function(){
    router.push('/Member')
}

var gotoNaviFavorite = function(){
    console.log('gotoNaviFavorite')
    router.push('/NavigationFavorite')
}

var gotoStart = function(){
    router.push('/Start')
}

var gotoLogin = function(){
    router.push('/')
}

var gotoCarInfo = function(){
    router.push('/CarInfo')
}

var gotoTunerInfo = function(){
    router.push('/TunerInfo')
}

var setCarModel = function(modelname) {
    carModel = modelname
}

var getUser = function(allData) {
   // var allData = { 'btMac': '1DSdf:sd56:2156s:df:2156' };
   var tmp
   var res
   console.log(allData)
   $.ajax({
       // url:"http://13.125.213.176:1200/insert/user",
       url:"http://13.125.213.176:1200/get/user",
       type:"POST",
       processData: false,
       dataType: 'json',
       async: false,
       contentType: 'application/json',
       data: JSON.stringify(allData),
       success: function(result) {
           this.res = result
           // console.log(result)
           if (result) {
               // JSON 파싱 설명
               // JSON string => parse => JSON object
               // JSON object => stringify => JSON string
               // JSON.parse(jsonString);
               // JSON.stringify(jsonObject);

               tmp = JSON.parse(JSON.stringify(result));
               //alert(tmp[0].userID);
               res = tmp
               getUserResult = tmp
               console.log('DBmethods.. getUser.. tmp..')
               console.log(tmp)
               return res
           } else {
             
               //alert("잠시 후에 시도해주세요. " + result);
           }
       },
       error: function() {
            //alert("에러 발생 ");
            console.log('getUser..Error..')
       }
   })
}

var addUserResult
var addUser = function(allData) {
   // var allData = { 'btMac': '1DSdf:sd56:2156s:df:2156' };
   var tmp
   var res
   //var allData = { 'btMac': bt, 'snsID': '123@12.12'}
   $.ajax({
       url:"http://13.125.213.176:1200/insert/user",
       type:"POST",
       processData: false,
       dataType: 'json',
       async: false,
       contentType: 'application/json',
       data: JSON.stringify(allData),
       success: function(result) {
           this.res = result
           // console.log(result)
           if (result) {
               // JSON 파싱 설명
               // JSON string => parse => JSON object
               // JSON object => stringify => JSON string
               // JSON.parse(jsonString);
               // JSON.stringify(jsonObject);

               tmp = JSON.parse(JSON.stringify(result));
               //alert(tmp[0].userID);
               res = tmp
               addUserResult = tmp
               //console.log(res)
               console.log('user insert')
               return res
           } else {
               alert("잠시 후에 시도해주세요. " + result);
           }
       },
       error: function() {
           //alert("에러 발생 ");
           console.log('addUser..Error..')
       }
   })
}

var updateUserResult
var updateUser = function(mac, id, pass) {
   var tmp
   var res
   var allData = { 'btMac': mac, 'snsID' : id, 'password' : pass}
   $.ajax({
       url:"http://13.125.213.176:1200/update/user",
       type:"POST",
       processData: false,
       dataType: 'json',
       async: false,
       contentType: 'application/json',
       data: JSON.stringify(allData),
       success: function(result) {
           this.res = result
           // console.log(result)
           if (result) {
               // JSON 파싱 설명
               // JSON string => parse => JSON object
               // JSON object => stringify => JSON string
               // JSON.parse(jsonString);
               // JSON.stringify(jsonObject);

               tmp = JSON.parse(JSON.stringify(result));
               //alert(tmp[0].userID);
               res = tmp
               updateUserResult = tmp
               //console.log(res)
               console.log('user update')
               return res
           } else {
               alert("잠시 후에 시도해주세요. " + result);
           }
       },
       error: function() {
           alert("에러 발생 ");
       }
   })
}

var getCarSettingResult
var existCarSetting
var existCarInfo
var newCarInfo

var setCarSettingResult = function(data_) {
    getCarSettingResult = data_
}

var setCarSettingInfo = function(data1, data2, data3){
    existCarSetting = data1
    existCarInfo = data2
    newCarInfo = data3
}

var getCarSetting = function(allData) {
    var tmp
    var res
    $.ajax({
        url:"http://13.125.213.176:1200/get/carSetting",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                res = tmp
                getCarSettingResult = tmp
                console.log(getCarSettingResult)
                //console.log(res)
                return res
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            //alert("에러 발생 ");
            console.log('getCarSetting..Error..')
        }
    })
 }

//수정필요 insert
 var insertCarSetting = function(angle_, height_, bf_) {
    var tmp
    var res
    var userID = getUserResult.userID
    var carName = carModel
    var allData = {'userID': userID, 'carName' : carName, 'angle' : angle_, 'height' : height_, 'bf' : bf_}
    $.ajax({
        url:"http://13.125.213.176:1200/insert/carSetting",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                console.log('insert car setting')
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            //alert("에러 발생 ");
            console.log('insertCarSetting..Error..')
        }
    })
 }


//수정 필요 update
 var updateCarSetting = function(angle_, height_, bf_) {
    var tmp
    var res
    console.log(getUserResult)
    var userID_ = getUserResult.userID
    var carName = carModel
    var allData = {'userID': userID_, 'carName' : carName, 'angle' : angle_, 'height' : height_, 'bf' : bf_}
    console.log('updateCarSetting')
    console.log(allData)
    $.ajax({
        url:"http://13.125.213.176:1200/update/carSetting",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                console.log('update car setting')
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            //alert("에러 발생 ");
            console.log('updateCarSetting..Error..')
        }
    })
 }


 var calcAngle = function() {
    var newAngle
    console.log('calcCarSetting : ')
    console.log(calcCarSetting)
    if(existCarSetting.angle < newCarInfo.angleMin) {
        newAngle = newCarInfo.angleMin
    } else if(existCarSetting.angle > newCarInfo.angleMax) {
        newAngle = newCarInfo.angleMax
    } else {
        newAngle = existCarSetting.angle
    }
    console.log('calcCarSetting : ')
    console.log(calcCarSetting)
    //return newAngle
    getCarSettingResult[0].angle = newAngle
    console.log('getCarSettingResult[0].angle : ', newAngle)
    console.log('getCarSettingResult[0].angle : ', getCarSettingResult[0].angle)
    console.log('getCarSettingResult')
    console.log(getCarSettingResult)
    calcCarSetting.angle = newAngle
    console.log('calcCarSetting : ')
    console.log(calcCarSetting)
    console.log('calcCarSetting.angle : ')
    console.log(calcCarSetting.angle)
}


var calcBF = function() {
    var newBF
    var total = existCarSetting.bf + existCarInfo.minDistFromPedal
    if(newCarInfo.minDistFromPedal > total) {
        newBF = 0
    } else {
        newBF = total - newCarInfo.minDistFromPedal
        if(newBF > newCarInfo.bfMax) {
            newBF = newCarInfo.bfMax
        }
    }

    //return newBF
    calcCarSetting.bf = newBF
    getCarSettingResult[0].bf = newBF
}

var calcHeight = function() {
    var newHeight
    var total = existCarSetting.height + existCarInfo.seatThickness + existCarInfo.minDistFromFloor
    if(newCarInfo.minDistFromFloor + newCarInfo.seatThickness > total) {
        newHeight = 0
    } else {
        newHeight = total - (newCarInfo.minDistFromFloor + newCarInfo.seatThickness)
        if(newHeight > newCarInfo.heightMax) {
            newHeight = newCarInfo.heightMax
        }
    }

    //return newHeight
    calcCarSetting.height = newHeight
    getCarSettingResult[0].height = newHeight
}



var getNavigationFavoriteResult

var getNavigationFavorite = function() {
    var tmp
    var res
    var allData = {'userID': getUserResult.userID}
    $.ajax({
        url:"http://13.125.213.176:1200/get/naviFavorite",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                res = tmp
                getNavigationFavoriteResult = tmp
                console.log(tmp)
                //console.log(res)
                return res
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            alert("에러 발생 ");
        }
    })
 }

 var addNavigationFavorite = function(name, address) {
    var tmp
    var res
    var allData = {'userID': getUserResult.userID, 'name' : name, 'address': address}
    $.ajax({
        url:"http://13.125.213.176:1200/insert/naviFavorite",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                res = tmp
                console.log(tmp)
                //console.log(res)
                return res
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            alert("에러 발생 ");
        }
    })
 }

 var delNavigationFavorite = function(name) {
    var tmp
    var res
    var allData = {'userID': getUserResult.userID, 'name' : name}
    $.ajax({
        url:"http://13.125.213.176:1200/delete/naviFavorite",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                res = tmp
                console.log(tmp)
                //console.log(res)
                return res
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            alert("에러 발생 ");
        }
    })
 }


 var getNavigationSearchResult

var getNavigationSearch = function() {
    var tmp
    var res
    var allData = {'userID': getUserResult.userID}
    $.ajax({
        url:"http://13.125.213.176:1200/get/naviSearch",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                res = tmp
                getNavigationSearchResult = tmp
                console.log(tmp)
                //console.log(res)
                return res
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            alert("에러 발생 ");
        }
    })
 }


 var addNavigationSearch = function(address) {
    var tmp
    var res
    var allData = {'userID': getUserResult.userID, 'address': address}
    $.ajax({
        url:"http://13.125.213.176:1200/insert/naviSearch",
        type:"POST",
        processData: false,
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(allData),
        success: function(result) {
            this.res = result
            if (result) {
                tmp = JSON.parse(JSON.stringify(result));
                res = tmp
                console.log(tmp)
                //console.log(res)
                return res
            } else {
                alert("잠시 후에 시도해주세요. " + result);
            }
        },
        error: function() {
            alert("에러 발생 ");
        }
    })
 }



 var getRadioResult

 var getRadio = function() {
     var tmp
     var res
     var allData = {'userID': getUserResult.userID}
     var $ajaxpost = $.ajax({
         url:"http://13.125.213.176:1200/get/radio",
         type:"POST",
         processData: false,
         dataType: 'json',
         async: false,
         contentType: 'application/json',
         data: JSON.stringify(allData),
         success: function(result) {
             this.res = result
             if (result) {
                 tmp = JSON.parse(JSON.stringify(result));
                 res = tmp
                 getRadioResult = tmp
                 console.log(tmp)
                 //console.log(res)
                 return res
             } else {
                 alert("잠시 후에 시도해주세요. " + result);
             }
         },
         error: function() {
             alert("에러 발생 ");
         }
     })
     $ajaxpost.then(function(){
         console.log('getradio then.............')
     })
     return $ajaxpost
  }

  
 var btMac
 var setbtMac = function(allData) {
   btMac = allData
 }

 var getRadioTableResult

 var getRadioTable = function() {
     var tmp
     var res
     $.ajax({
         url:"http://13.125.213.176:1200/get/radioTable",
         type:"GET",
         processData: false,
         dataType: 'json',
         async: false,
         contentType: 'application/json',
         success: function(result) {
             this.res = result
             if (result) {
                 tmp = JSON.parse(JSON.stringify(result));
                 res = tmp
                 getRadioTableResult = tmp
                 console.log(tmp)
                 //console.log(res)
                 return res
             } else {getRadioTable
                 alert("잠시 후에 시도해주세요. " + result);
             }
         },
         error: function() {
             alert("에러 발생 ");
         }
     })
  }

   var updateRadio = function(allData) {
       var tmp
       var res
       $.ajax({
           url:"http://13.125.213.176:1200/update/radio",
           type:"POST",
           processData: false,
           dataType: 'json',
           async: false,
           contentType: 'application/json',
           data: JSON.stringify(allData),
           success: function(result) {
               this.res = result
               if (result) {
                   tmp = JSON.parse(JSON.stringify(result));
                   res = tmp
                   return res
               } else {
                   alert("잠시 후에 시도해주세요. " + result);
               }
           },
           error: function() {
               alert("에러 발생 ");
           }
       })
    }

  var insertRadio = function(allData) {
      var tmp
      var res
      $.ajax({
          url:"http://13.125.213.176:1200/insert/radio",
          type:"POST",
          processData: false,
          dataType: 'json',
          async: false,
          contentType: 'application/json',
          data: JSON.stringify(allData),
          success: function(result) {
              this.res = result
              if (result) {
                  tmp = JSON.parse(JSON.stringify(result));
                  res = tmp
                  return res
              } else {
                  alert("잠시 후에 시도해주세요. " + result);
              }
          },
          error: function() {
              alert("에러 발생 ");
          }
      })
   }

   var deleteRadio = function(allData) {
       var tmp
       var res
       $.ajax({
           url:"http://13.125.213.176:1200/delete/radio",
           type:"POST",
           processData: false,
           dataType: 'json',
           async: false,
           contentType: 'application/json',
           data: JSON.stringify(allData),
           success: function(result) {
               this.res = result
               if (result) {
                   tmp = JSON.parse(JSON.stringify(result));
                   res = tmp
                   return res
               } else {
                   alert("잠시 후에 시도해주세요. " + result);
               }
           },
           error: function() {
               alert("에러 발생 ");
           }
       })
    }

    var getUser = function(allData) {
        var tmp
        var res
        console.log(allData)
        $.ajax({
            // url:"http://13.125.213.176:1200/insert/user",
            url:"http://13.125.213.176:1200/get/user",
            type:"POST",
            processData: false,
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(allData),
            success: function(result) {
                this.res = result
                if (result) {
                    tmp = JSON.parse(JSON.stringify(result));
                    res = tmp
                    getUserResult = tmp
                    console.log('DBmethods.. getUser.. tmp..')
                    console.log(tmp)
                    return res
                } else {                  
                    //alert("잠시 후에 시도해주세요. " + result);
                }
            },
            error: function() {
                 //alert("에러 발생 ");
                 console.log('getUser..Error..')
            }
        })
     }



    var postTotal = function(userID_, carModel_, height_, angle_, bf_, currentHeight_, currentAngle_, currentBf_) {
        var tmp
        var res
        console.log('currentHeight_ : ', currentHeight_)
		console.log('calcCarSetting', calcCarSetting)
//        var allData_ = { 'userID' : userID_, 'carName' : carModel_, 'height' : height_, 'angle' : angle_, 'bf' : bf_ , 'existHeight' : '', 'existAngle' : '', 'existBf' : '',
//                        'beforeHeight' : currentHeight_, 'beforeAngle' : currentAngle_, 'beforeBf' : currentBf_}
		var allData_ = { 'userID' : userID_, 'carName' : carModel_, 'height' : calcCarSetting.height, 'angle' : calcCarSetting.angle, 'bf' : calcCarSetting.bf , 'existHeight' : '', 'existAngle' : '', 'existBf' : '',
                        'beforeHeight' : currentHeight_, 'beforeAngle' : currentAngle_, 'beforeBf' : currentBf_}
		console.log('existCarSetting',existCarSetting)
        if(existCarSetting){
            allData_.existAngle = existCarSetting.angle
            allData_.existHeight = existCarSetting.height
            allData_.existBf = existCarSetting.bf
        }
        console.log('postTotal')
        console.log(allData_)
        $.ajax({
            url:"http://13.125.213.176:1200/post/total",
            type:"POST",
            processData: false,
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(allData_),
            success: function(result) {
                this.res = result
                console.log('postTotal success')
                if (result) {
                    tmp = JSON.parse(JSON.stringify(result));
                    res = tmp
                    return res
                } else {
                    alert("잠시 후에 시도해주세요. " + result);
                }
            },
            error: function() {
                alert("에러 발생 ");
            }
        })
    }

export {
    getUser,
    getUserResult,
    addUser,
    addUserResult,
    getCarSetting,
    insertCarSetting,
    updateCarSetting,
    getCarSettingResult,
    getNavigationFavorite,
    getNavigationFavoriteResult,
    addNavigationFavorite,
    delNavigationFavorite,
    getNavigationSearch,
    getNavigationSearchResult,
    addNavigationSearch,
    gotoMember,
    getRadio,
    getRadioResult,
    gotoSeat,
    gotoNaviFavorite,
    gotoStart,
    gotoLogin,
    gotoCarInfo,
    gotoTunerInfo,
    existCarSetting,
    existCarInfo,
    newCarInfo,
    setCarSettingResult,
    setCarSettingInfo,
    calcAngle,
    calcBF,
    calcHeight,
    updateUserResult,
    updateUser,
    btMac,
    setbtMac,
    updateRadio,
    getRadioTable,
    getRadioTableResult,
    insertRadio,
    deleteRadio,
    setCarModel,
    carModel,
    currentAngle,
    currentHeight,
    currentBf,
    setCurrentSeat,
    calcCarSetting,
    radio,
    frequencyData,
    setRadio,
    setFrequencyData,
    postTotal
}