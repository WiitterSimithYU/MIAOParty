<template>
  <div class="shake" align="center">
     <div class="shake-titleimg"></div>
     <div class="shake-shade">
       <!--<div class="shake-wawa" v-bind:class="{active:isActive}"></div>-->
       <div  v-bind:class="[ShakeWaWa,{AnimationStart:isStart,AnimationStop:isStop}]"></div>
     </div>
     <div v-bind:class="[ShakeShadow,{AnimationShaodowStart:isStart}]"></div>
     <div class="shake-yao">{{ShakeState}}</div>
  </div>
</template>

<script >

  export default{
      data(){
          return {
            ShakeWaWa: 'shake-wawa',
            ShakeShadow:'shake-shadow',
            ShakeState:'摇一摇',
            isStart: false,
            isStop: false,
            priceis:'',

          }
      },
      mounted(){

        this.init()//注册动画

      },

      methods:{

        //摇一摇数据请求
        toShake(){
          this.$store.loginPath = '/shake'
          var userid = this.getCookie('session')
          this.priceid = '1'

          //需要想后端发送的登录参数
          let shakeParam = {
            'userid':userid,
            'priceid':this.priceid
          }


          this.ShakeState = '正在摇一摇，请稍等...'
          //请求后端,
          var url = this.HOST + '/luck/shake'

          this.$http.post( url,shakeParam,{emulateJSON:true}).then((response) => {
//            alert(response.data.msg)

            if(response.data.code == 0){
//              alert(response.data.msg)
            }else if(response.data.code == 60002){
              this.$router.push('/login');
            }
            else if(response.data.code == 60004){

              this.$router.push('/login');
            }
          }, (response) => {
             alert('失败')
          });
        },

        init(){
            var that = this;//转换关系
            if (window.DeviceMotionEvent){
                /*开始摇动*/
               window.addEventListener('devicemotion',function () {
                  that._yaoyiyaoHandler(that.callback);
               },false);

              /*动画停止*/
              window.addEventListener('webkitAnimationEnd',function () {
                that.isStart = false
                that.ShakeState = '摇一摇'
              },false);

            }else {
                alert('浏览器不支持')
            }
        },

        callback(){
//            alert('yy')
          this.isStart = true
          this.toShake()//摇一摇数据
        },
        _yaoyiyaoHandler(callback){

          var speed = 20; //定义摇一摇加速度的临界值 值越小摇动的力度越小
          var x =  0, //初始化x,y,z上加速度的默认值
            y = 0,
            z =0,
            lastX =0,
            lastY = 0,
            lastZ =0,
            isHaveShaked = false;//用于记录是否在动画执行中
          /*获取x,y,z方向的即时加速度*/
          var acceleration = event.accelerationIncludingGravity;
          x = acceleration.x;
          y = acceleration.y;
          z = acceleration.z;
          if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed
            || Math.abs(z - lastZ) > speed) {

            callback()
            //摇一摇实际场景就是加速度的瞬间暴增/减
//            if (!isHaveShaked) {
//              //手机震动0.5秒
//              if (navigator.vibrate) {
//
//                navigator.vibrate(500);
//              } else if (navigator.webkitVibrate) {
//                navigator.webkitVibrate(500);
//              }
//              isHaveShaked = true;
//              // 摇一摇所执行的操作
//
//              isHaveShaked = false;
//            }
          }
          /*保存历史加速度*/
          lastX = x;
          lastY = y;
          lastZ = z;
        }
      }
  }

</script>

<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }

  .shake{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:url("shakeback.png") center no-repeat;
    background-size: cover;
  }

  .shake-titleimg{
    margin-top: 13%;
    width: 210px;
    height: 107px;
    background: url("shaketitle.png") no-repeat;
    background-size: contain;
    /*background-color: blueviolet;*/
  }
  .shake-shade{
    display:block;
    position:relative;
    width: 138px;
    height: 215px;
  }

  .shake-wawa{
    width: 138px;
    height: 215px;
    margin-top:58px;
    position: relative;
    background: url("wawa.png") no-repeat;
    background-size: contain;
  }
     /*动画开始*/
    .AnimationStart{

      transform: scale(1) rotate(20deg);
      animation: ab 1.2s linear 6;
      -webkit-animation: ab 1.2s linear 6;
      transform-origin: bottom ;
      -webkit-transform-origin: bottom;
      animation-fill-mode:forwards;
      -webkit-animation-fill-mode:forwards;
  }
     /*动画结束*/
    .AnimationStop{
      /*transform: scale(1) rotate(20deg) ;*/
      /*animation: ac 2s infinite;*/
      /*-webkit-animation: ac 2s infinite;*/
      /*transform-origin: bottom;*/
      /*-webkit-transform-origin: bottom;*/
    }
    /*阴影动画*/
  .shake-shadow{
    position: absolute;
    left: 50%;
    margin-left: -50px;
    margin-top: -5px;
    z-index: -10;
    width: 100px;
    height: 20px;
    background: rgba(0, 0, 0 , 1);
    border-radius: 50px/10px;
  }

  .AnimationShaodowStart{
    animation:  shrink-b  1.32s infinite  ;
    -webkit-animation:  shrink-b 1.32s infinite  ;
  }

  .shake-yao{
     margin-top: 25px;
     font-family: PingFang-SC-Medium;
     font-size: 16px;
     background-image: -webkit-gradient(linear, left 0, right 0, from(rgba(255,242,219,1)), to(rgba(173,130,80,1)));
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }

  @keyframes aa {
    0% {
      transform: scale(1) rotate(-20deg);
    }
    100% {
      transform: scale(1) rotate(20deg);
    }
  }

  @keyframes ab {


    0% {

      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    25%{
      -webkit-transform: rotate(20deg);
      transform: rotate(20deg)
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    75%{
      -webkit-transform: rotate(-20deg);
      transform: rotate(-20deg)
    }
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
  @keyframes ac {
    0% {
      -webkit-transform: rotate(20deg);
      transform: rotate(20deg);
    }
    }
  @keyframes init {
    /*from {*/
      /*transform: scale(0);*/
    /*}*/
    /*to {*/
      /*transform: scale(1);*/
    /*}*/
  }
  @keyframes shrink-a{

  }

  @keyframes shrink-b{
    0% {
      transform:translate(0px,0px);
      -webkit-transform:translate(0px,0px);
      width: 130px;
      height: 20px;
      background: rgba(0, 0, 0, 1);
      border-radius: 65px/10px;
    }

    50% {
      transform:translate(-30px,0px);
      -webkit-transform:translate(-30px,0px);
      width: 130px;
      height: 20px;
      background: rgba(0, 0, 0, 1);
      border-radius: 65px/10px;
    }

    100%{
      transform:translate(0px,0px);
      -webkit-transform:translate(0px,0px);
      width: 130px;
      height: 20px;
      background: rgba(0, 0, 0, 1);
      border-radius: 65px/10px;
    }
  }

</style>
