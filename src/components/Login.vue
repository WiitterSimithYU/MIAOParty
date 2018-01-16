<template>
  <div class="container">
    <div class="login">
      <div class="login-header" >
        <span class="login-header-title" >Hi,请完善以下摇奖信息</span>
      </div>
      <div class="login-contain">
        <div class="login-contain-1">
          <div class="login-name-image"></div>
          <input type="text" class="login-contain-name" placeholder="名字" v-model="username"/>
        </div>
        <div class="login-split"></div>
        <div class="login-contain-2">
          <div class="login-code-image"></div>
          <input type="text" class="login-contain-code" placeholder="身份证" v-model="userid"/>
        </div>
        <div class="login-split"></div>
        <div class="login-submit">
          <input type="submit" value="提交" class="login-subText"  @click="login" >
        </div>
      </div>

    </div>
    <div class="background">

    </div>
  </div>
</template>

<script>
  export default {
    name:'Login',
    data(){

          return{
            username:'',
            userid:''
          }
    },
    methods:{
        //登录逻辑
       login(){
         if(this.username!='' && this.userid!=''){
           this.toLogin();
         }
       },
        //登录请求
        toLogin(){

          //需要想后端发送的登录参数
          let loginParam = {
            'username':this.username,
            'userid':this.userid
          }
       //请求后端,
//          alert(this.username)
          var url = this.HOST + '/user/login'
          this.$http.post( url,loginParam,{emulateJSON:true}).then((response) => {
            alert(response.data.msg)
           if(response.data.code == 0){
           let expireDays = 1000 * 60 * 60 * 24 * 15;
           this.setCookie('session', this.userid, expireDays);
            if(this.$store.loginPath == null){
               this.$router.push('/shake');
            }else if(this.$store.loginPath == '/shake'){
               this.$router.push('/shake');
             }else {
               this.$router.push('/vote');
             }

           }
           }, (response) => {
              alert(response.error)
           //Error
            console.log(response.error());
           });
        }
    }
  }

</script>

<style scoped>

  * {
    margin: 0px;
    padding: 0px;
  }

  input::-webkit-input-placeholder,textarea::-moz-placeholder{
    color: #A8A8A8;font-size: 15px;font-family: PingFang-SC-Medium;
  }
  input::-moz-placeholder,textarea::-moz-placeholder{
    color: #A8A8A8;font-size: 15px;font-family: PingFang-SC-Medium;
  }
  input:-ms-input-placeholder,textarea::-moz-placeholder{
    color: #A8A8A8;font-size: 15px;font-family: PingFang-SC-Medium;
  }

  .login-split{
    margin-left: 17.5px;
    width: 220px;
    height: 1px;
    background: #EBEBF0;
  }
  .login{
    margin:0 auto;
    margin-top: 31.87%;
    width: 255px;
    height: 300px;
    border-radius:7px;
    background-color: white;
  }
  .login-header{
    width: 100%;
    height: 65px;
    text-align: center;
    line-height: 65px;
    border-top-left-radius:7px;
    border-top-right-radius: 7px;
    background: -webkit-linear-gradient(left,rgba(244,216,166,1),rgba(157,124,62,1));
    background: linear-gradient(to right, rgba(244,216,166,1), rgba(157,124,62,1));
  }
  .login-header-title{
    font-size: 16px;
    font-family: PingFang-SC-Medium;
  }
  .login-contain-1{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin-left: 20.5px;
    margin-top: 13px;
    margin-right: 20.5px;
    height: 55px;
    /*background-color: aquamarine;*/
  }
  .login-contain-2{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin-left: 20.5px;
    margin-top: 0px;
    margin-right: 20.5px;
    height: 55px;
    /*background-color: blueviolet;*/
  }
  .login-name-image{
    width: 20px;
    height: 20px;
    margin-left: 3px;
    background-position: 0% 0%;
    background-color: white;
    background-image:url('titleName.png');
    background-repeat:no-repeat;
    background-size: cover;

  }
  .login-code-image{

    width: 20px;
    height: 20px;
    margin-left: 3px;
    background-position:0% 100%;
    background-color: white;
    background-image:url('titleName.png');
    background-repeat:no-repeat;
    background-size: cover;
  }
  .login-contain-name{
    border: none;
    margin-left: 10px;
    width: 160px;
    height: 100%;
    font-size: 15px;
    outline:medium;
    color: rgba(51,51,51,1);
    font-family: PingFang-SC-Medium;
    /*background-color: cornflowerblue;*/
  }
  .login-contain-code{
    border: none;
    margin-left: 10px;
    width: 160px;
    height: 100%;
    outline:medium;
    font-size: 15px;
    color: rgba(51,51,51,1);
    font-family: PingFang-SC-Medium;
    /*background-color: aquamarine;*/
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    /*background-color:rgba(51,51,51,0.8);*/
    background:url("shakeback.png") center no-repeat;
    background-size: cover;
  }

  .login-submit{
    margin-left: 17.5px;
    margin-right: 17.5px;
    margin-top: 35px;
    height: 44px;
  }
  .login-subText{
    width: 100%;
    height: 100%;
    border: none;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 22px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    /*line-height: 10px;*/
    background: -webkit-linear-gradient(left,rgba(244,216,166,1),rgba(157,124,62,1));
    background: linear-gradient(to right, rgba(244,216,166,1), rgba(157,124,62,1));
  }

</style>
