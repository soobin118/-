<template>
  <div id='member'>
    <div class="frame">
      <div class="contents">
        <div class="memberui">
          <Img class="icon_cobi" src="cobi.png" /> 
        </div>
      <div v-show='exist' class='idDiv'>
        <p class='Explain'>기존의 계정을 입력해주세요.</p>
         <table style='margin:auto'>
                 <tr><td>
                <div class="plusExplain">SNS ID</div></td>
                <td>
                <input type="text" id="inname" v-model="snsid" placeholder="SNS계정 입력">
                </td>
                </tr>
                <tr><td>
                <div class="plusExplain">비밀번호</div></td>
                <td>
                <input type="text" id="in" v-model="password" placeholder="비밀번호 입력">
                </td></tr>
                </table>
                <obg-button class = 'idsend' @click='login' type='squareroundoutline'>로그인</obg-button>
    </div>
    <div v-show='newM' class='idDiv'>
        <p class='Explain'>생성할 계정을 입력해주세요.</p>
         <table style='margin:auto'>
                 <tr><td>
                <div class="plusExplain">SNS ID</div></td>
                <td>
                <input type="text" id="inname" v-model="snsid" placeholder="SNS계정 입력">
                </td>
                </tr>
                <tr><td>
                <div class="plusExplain">비밀번호(4자리 숫자)</div></td>
                <td>
                <input type="text" id="in" v-model="password" placeholder="비밀번호 입력">
                </td></tr>
                </table>
                <obg-button class = 'idsend' @click='signup' type='squareroundoutline'>회원가입</obg-button>
          </div>          
          <center>
              <div class="confirm" v-show="duplicated">
                <br>아이디 중복입니다.<div style="margin-top:20px"></div>
                  <div class="buttonDiv">
                    <div id="delOK" @click="okError">
                      확인
                    </div>
                  </div>
              </div>
          </center>
      
          <center>
              <div class="confirm" v-show="wrongpassword">
                <br>아이디 / 비밀번호가 틀렸습니다.<div style="margin-top:10px"></div>
                <div class="buttonDiv">
                  <div id="delOK" @click="okError">
                    확인
                  </div>
                </div>
              </div>
          </center>
      </div>
      <div class="tab">
        <div class="tab-list" @click='exist=true;newM=false'>
          기존회원
        </div>
        <div class="tab-list" @click='newM=true;exist=false'>
          신규회원
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import button from 'obigo-js-ui-rnbs/components/button'
import { updateUser, updateUserResult, addUser, getUser, addUserResult, btMac, gotoSeat, gotoLogin, carModel, insertCarSetting, updateCarSetting, currentAngle, currentHeight, currentBf, setCurrentSeat } from './DBmethods'

export default {
  name: 'home',
  components: {
    'obg-button': button
  },
  data: function () {
    return {
      hardkeyCodes: this.$hardkey.getCodes(),
      userID: 0,
      carName: '',
      carSize: 0,
      angle: currentAngle,
      height: currentHeight,
      bf: currentBf,
      exist: false,
      newM: false,
      duplicated: false,
      wrongpassword: false,
      snsid: '',
      password: ''
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
    },
    clickRadioTab () {
      this.$router.push('/App_Radio')
    },
    clickNavigationTab () {
      this.$router.push('/App')
    },
    signup () {
        if(this.snsid !== '' && this.password !== ''){
          var allData = { 'btMac': btMac, 'snsID': this.snsid, 'password': this.password }
          addUser(allData)
          if(addUserResult.result==="success"){
            console.log('adduser success...!!! ')
            var getuserdata = {'btMac' : btMac}
            getUser(getuserdata)
            insertCarSetting(this.angle,this.height,this.bf)
            this.$router.push('/Manual')
          }
          else{
            if(addUserResult.content==="duplicated"){
              this.duplicated = true
            }
          }
          this.snsid = ''
          this.password = ''
        }
    },
    login () {
        if(this.snsid !== '' && this.password !== ''){
          var allData = { 'btMac': btMac, 'snsID': this.snsid, 'password': this.password }
          // console.log(btMac)
          // console.log(this.snsid)
          // console.log(this.password)
          updateUser(btMac, this.snsid, this.password)
          console.log(updateUserResult)
          if(updateUserResult.result==="success"){
            // insertCarSetting(this.angle,this.height,this.bf)
            console.log('updateuser succes')
            gotoLogin()
          }
          else{
            if(updateUserResult.content==="no Data"){
              this.wrongpassword = true
            }
            if(updateUserResult.content==='wrong password'){
              this.wrongpassword = true
            }
            this.snsid = ''
            this.password = ''
            console.log('login실패')
          }
        }
    },
    okError () {
      this.duplicated = false
      this.wrongpassword = false
    }
  },
  mounted () {
    this.initHardKeyAction()
  }
}
</script>

<style lang="scss">
#member{
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
  .memberui{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 10em;
  }
  .icon{
    width:80px;
    height:80px; 
    margin-left:30px;
    margin-right:30px;
  }
  .icon_cobi{
      width:250px;
      height:250px;
      position:absolute;
      top:5%;
      left:35%;
  }
  .plusExplain{
    font-size: 40px;
    margin-bottom:20px;
  }
  .Explain{
      font-size:30px;
      text-align: center;
      margin-top:10px;
  }

  input{
    font-size:30px;
    margin-bottom:20px;
  }
  .idDiv{
    width: 800px;
    height: 276px;
    background-color: black;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 4em;
  }
  .idsend{
      font-size:20px;
      position:relative;
      margin:auto;
  }
  .confirm{
    position: absolute;
    left: 300px;
    top: 80px;
    width: 250px;
    height: 130px;
    border: 1px solid white;
    background: gray;
    text-align: center;
    font-size: x-large;
  }

  .buttonDiv{
      margin:auto;
    width: auto;
    height: 40px;
  }

  #delOK{
    width: 50px;
    height: 30px;
    border: 1px solid white;
    padding-top: 2px;
      margin:auto;
    text-align: center;
  }
</style>
