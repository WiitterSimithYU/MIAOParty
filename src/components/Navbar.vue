<template>
  <div>
    <router-link to="/">登录</router-link>
    <router-link to="/shake">摇一摇</router-link>
    <router-link to="/vote" v-if="!user">投票</router-link>
  </div>
</template>
<script>
//  import { mapGetters ,mapActions } from 'vuex'
//
//  export default {
//    computed: {
//      ...mapGetters({
//        UserInfo:"UserInfo"
//      }),
//      ...mapActions({
//        UserLogout:"UserLogout"
//      }),
//      user(){
//        return this.UserInfo
//      }
//    },
//    methods:{
//      logout(){
//        this.$store.dispatch('UserLogout');
//      }
//    }
//  }
</script>
