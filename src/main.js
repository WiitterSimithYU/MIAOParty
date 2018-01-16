// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import Vuerouter from 'vue-router'
// import reset from '../static/css/reset.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = true

// 注册组件
Vue.use(Vuerouter)
// 数据请求
Vue.use(VueResource)
// 状态管理
Vue.use(Vuex)

Vue.prototype.HOST = '/api'
//Vuex配置
var store = new Vuex.Store({
  state: {
    domain:'http://192.168.1.77', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    loginPath:'',
    userInfo: { //保存用户信息
      username: null,
      username: null,
    }
  },
  mutations: {
    //更新用户信息
    // updateUserInfo(state, newUserInfo) {
    //   state.userInfo = newUserInfo;
    // }
  }
})

// router.beforeEach(({meta, path}, from, next) => {
//   var { auth = true } = meta;
//   var isLogin = Boolean(store.state.login.token) //true用户已登录， false用户未登录
//
//   if (auth && !isLogin && path !== '/login') {
//     return next({ path: '/login' })
//   }
//   if(isLogin && (path == '/login' || path == '/reg')){
//     return next({ path: '/person' })
//   }
//   next()
// });


//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


//vue实例
new Vue({
  el: '#app',
  router,
  store,
  data:{},
  created(){
    // this.checkLogin();
  },
  methods:{
    checkLogin(){
      //检查是否存在session
      if(!this.getCookie('session')){
        this.$router.push('/login');
      }else{
       if(this.$store.loginPath == '/shake'){
           this.$router.push('/shake');
       }else {
           this.$router.push('/vote');
       }

      }
    }
  },
  template: '<App/>',
  components: { App }

})
