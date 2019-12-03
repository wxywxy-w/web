
<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit2" :label-width="80">
    <FormItem prop="userName" label="用户名">
      <Input v-model="form.userName" placeholder="请输入用户名">
      </Input>
    </FormItem>
    <FormItem prop="password" label="密码">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit2" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>

<script>
import { handleLogin,loginTest } from '@/api/index.js'
import { async } from 'q'
// import { mapActions } from "vuex";

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '111',
        password: '111'
      },
      obj:{
        ss:1,
        bb:"ss",
        // cc:"撒"
      },

    }
  },  
  created(){
          document.title="小绿蓝-Login"
  },
  mounted(){
    loginTest({
      method:'post',
      qs:true
    }).then(res=>{
      console.log(res)
    })
  },

  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit2 () {
      // var that=this
      // // function setMessage(){
      //      const msg=that.$Message.loading({
      //      content: 'Loading...',
      //      duration: 0
      //      });
      // }
      // setMessage().then(res=>{
      //   this.$Message.loading({
      //     content:'登录超时',
      //     // duration:0
      //   })
      // })
       
      //  setTimeout(msg, 3000);
      //  window.clearTimeout(msg,function(){
      //    alert("登录超时")
      //  });
      handleLogin({
        method:'post',
        data:{account: this.form.userName,password:this.form.password},
        qs:true
      }).then(response =>{
        // clearTimeout(msg);
        console.log(response)
        if(response.code==0){
          this.$Message.success('登录成功');
          let data=response.data
          sessionStorage.setItem("data", data);
          setTimeout(() => {
            console.log("before-push")
            // alert("登录成功")
            this.$router.push('/')
            console.log("after-push")
          }, 1000);
        }if(response.code==1){
          this.$Message.warning(response.message)
          console.log(-1)
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>