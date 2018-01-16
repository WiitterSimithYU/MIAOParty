<template>
  <div class="vote" align="center">
    <div class="vote-contain">
      <div class="vote-up"></div>
      <div class="vote-down"></div>
      <div class="vote-box"></div>
      <div class="vote-title"></div>
      <div class="vote-commit">
        <div class="vote-shadow"></div>
        <input type="submit" value="提交" class="vote-submit" @click="SubmitData">
      </div>
      <div class="vote-text" style="overflow:auto;">
        <ul>
          <li v-for="(items, index) in goods" class="program-item" :key="index">
            <div class="content">
              <label>
                <input class="self-checkbox" type="checkbox"
                       v-model="checkValues"
                       :value="items.programId"
                       :id="items.programId"
                       @click="setCheckValue($event,items)">
                <label :for="items.id"></label>
                <span class="vote-text-title">
                  {{items.storeName + '-' +items.programName}}
                </span>
                <!--<hr>-->
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vote',
    data(){
      return {
          goods:[], //节目数组
          checkValues: [],
          checkIds: []
      }
    },
    mounted(){
      this.voteData()
    },
    methods: {

//   check(){
//       alert('p')
//
//     if(event.srcElement.checked==true)
//       check_num++;
//     else
//       check_num--;
//     if(check_num>3)
//     {
//       alert("最多只能选3个！");
//       event.srcElement.checked=false;
//       check_num--;
//     }
//  },
      //选择投票
      setCheckValue: function (ev, item) {
        var id = item.programId;

        if (ev.srcElement.checked) {
            if (this.checkIds.length<5){
              this.checkIds.push(id);
            }else {
              ev.target.checked=false;
                ev.srcElement.checked = false
              ev.currentTarget.checked = false
                alert('最多选择5个')
            }

        } else if (this.checkIds.indexOf(id) > -1) {
          var index = this.checkIds.indexOf(id)
          this.checkIds.splice(index, 1)
        }
      },

    //投票数据请求
      voteData(){
        this.$store.loginPath = '/vote'
        var userid = this.getCookie('session')
//        alert(userid)
        if (userid == null){
            return this.$router.push('/login');
        }
        //需要想后端发送的登录参数
        let voteParam = {
          'userid': userid
        }
        //请求后端,
        var url = this.HOST + '/voting/content'
        this.$http.get(url, {params: voteParam}).then((response) => {
            alert(response.data.code)
          if (response.data.code == 0) {
            this.goods = response.data.data
          }else if(response.data.code == 60004){
            this.$router.push('/login');
          }else if (userid.length ==0&&response.data.code == 60002){
              alert('60002')
            this.$router.push('/login');
          }
          else {
              alert(response.data.msg)
          }
        }, (response) => {
          alert(response.error)
        });
      },

      //上传投票
       SubmitData(){
          var pro_n = this.checkIds.length
         if(pro_n<5) return alert('节目数必须5个')

        var userid = this.getCookie('session')

         var programs = this.checkIds.toString()
         alert(programs)
         //需要想后端发送的登录参数
         let submitParam = {
           'userid': userid,
           'programs':programs
         }
         //请求后端,
         var url = this.HOST + '/voting/commit'
         this.$http.post(url, submitParam,{emulateJSON:true}).then((response) => {
           alert(response.data.msg)
           if (response.data.code == 0) {

           }else if(response.data.code == 60004){
//             this.$router.push('/login');
           }
         }, (response) => {
           alert(response.error)
         });
       }

    }
  }
</script>

<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }
  input:checked +label+ span {
    color: rgba(217,171,106,1);
    /*font-weight: bold;*/
  }

  .self-checkbox {
    display: none;
  }

  .self-checkbox + label {
    display: inline-flex;
    margin-left: 2px;
    border: 1px solid rgba(179,179,179,1);
    position: relative;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
  }

  .self-checkbox:checked + label {

    border: 1px rgba(217,171,106,1) solid;
  }

  .self-checkbox:checked + label:after {
    position: absolute;
    content: "";
    left: 1px;
    width: 6px;
    height: 4px;
    border: 2px solid rgba(217,171,106,1);
    /*background-color: cornflowerblue;*/
    border-top-color: transparent;
    border-right-color: transparent;
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    transform: rotate(-45deg);
  }

  .vote-contain{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background:url("voteback.png")  no-repeat;
    background-size: cover;
  }
  .vote-up{
    position: fixed;
    top: 14px;
    width:100%;
    height: 72px;
    /*background-color: blueviolet;*/
    background:url("voteup.png") top no-repeat;
    background-size: contain;
  }
  .vote-down{
    position: fixed;
    bottom: 10px;
    width: 100%;
    height: 72px;
    /*background-color: white;*/
    background:url("votedown.png") bottom no-repeat;
    background-size: contain;
  }
  .vote-box{
    position: fixed;
    margin-top: 56px;
    /*top: 10px;*/
    width: 100%;
    height:78.5%;
    /*background-color: blueviolet;*/
    background:url("votebox.png") ;
    background-size: contain;
  }

  .vote-title{
    /*position: fixed;*/
    margin-top: 19px;
    width: auto;
    height: 48px;
    background:url("votetitle.png") center no-repeat;
    background-size: contain;
  }
  .vote-commit{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 80px;
    text-align: center;
    /*background-color: aquamarine;*/
  }
  .vote-shadow{
    /*background-color: blueviolet;*/
    margin-top: 1px;
    margin-left: 15px;
    margin-right: 15px;
    height: 10px;
    box-shadow: 0 -5px 15px 0px rgba(0,0,0,.7);
  }
  .vote-submit{
    margin-top: 10px;
    width: 235px;
    height: 44px;
    border: none;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 22px;
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    background: -webkit-linear-gradient(left,rgba(244,216,166,1),rgba(157,124,62,1));
    background: linear-gradient(to right, rgba(244,216,166,1), rgba(157,124,62,1));

  }
  .vote-text{
    position: fixed;
    left: 50%;
    margin-left: -140px;
    top:80px;
    width: 280px;
    bottom: 80px;
    /*background-color: white;*/
    text-align: left;
  }

   ul{list-style-type:none; margin:0px}

  .content{
    display: inline-block;
    width: 280px;
    height: 50px;
  }
  .vote-text-title{
    margin-left: 5px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
     color: rgba(179,179,179,1);
   }
</style>
