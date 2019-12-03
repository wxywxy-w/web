
<style lang="less">
.login{
    padding-top: 1005px;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/imges/login_bg.png');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        left: 56%;
        top: 55%;
        transform: translateY(-60%);
        min-width: 400px;
        h1{
            color:rgba(18,103,151,1);
            font-size:40px;
            margin-bottom: 50px;
            text-align: center;
            width: 100%;
        }
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}

</style>


<template>
  <div class="login">
    <div class="login-con">
      <div class="form-con">
        <h1>小绿蓝后台管理系统</h1>
        <login-form ></login-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
export default {

  data(){
    return{
      url:'/backstage/login/login',
      url2:'/backstage/label/auth/update',
    }
  },
  components: {
    LoginForm
  },
  mounted(){

  },


  methods: {
    // ...mapActions(["handleLogin", "getUserInfo"]),
    // handleSubmit( {userName, password} ) {
    //   if(userName==1){
    //       this.$router.push('/home')
    //   }
    // this.handleLogin({ userName, password }).then(res => {
        
    //   });
    // }

    //     ...mapActions([
    //   'handleLogin',
    //   'getUserInfo'
    // ]),
    // handleSubmit ({ userName, password }) {
    //   this.handleLogin({ userName, password }).then(res => {
    //     this.getUserInfo().then(res => {
    //       this.$router.push({
    //         name: this.$config.homeName
    //       })
    //     })
    //   })
    // }

  }
  
};
</script>

<style>
</style>
