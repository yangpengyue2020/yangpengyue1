<template>
  <div class = 'login'>
    <el-form :model="ruleForm"  :rules="rules"  class="demo-ruleForm">
      <h3 class = title>Login Form</h3>
      <el-form-item  prop="user">
        <el-input type="text" v-model="ruleForm.user" placeholder='请输入用户名'  class = 'inp' ><i slot="prefix" class="el-input__icon el-icon-user-solid"></i></el-input>
 
      </el-form-item>
      <el-form-item  prop="psw">
        <el-input type="password" v-model="ruleForm.psw" placeholder='请输入密码' class = 'inp'><i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class = 'btn' @click = submitfn()>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/api'
export default {
  name: 'loginPage',
  data() {
      var validateUser = (rule, value, callback) => {
        const ureg = /^\w{5,10}$/
        if (value === '') {
          callback(new Error('用户名不能为空'));
        }
        if(ureg.test(value)) return 
        return callback(new Error('用户民格式错误!'));
        
      };
      var validatePass = (rule, value, callback) => {
        const preg = /^\w{6,10}$/
        if (value === '') {
          callback(new Error('密码不能为空'));
        }
        if(preg.test(value)) return 
        return callback(new Error('密码格式错误!'));
      };
    return {
      ruleForm: {
          user: '',
          psw: '',
        },
        rules: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          psw: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
    };
  },

  mounted() {
    
  },

  methods: {
    //点击提交
    submitfn(){
      this.getData()     
    },
    //获取mock数据
    async getData(){
      const {user,psw} = this.ruleForm
      console.log(user,psw)
      const {data} = await request.post('/login',{user,psw})
      console.log(data)
      let token = data.data.token
      const message = data.message;
      console.log(token,message)
      if(message == "success"){
        //登录成功后，将token添加到本地存储中
        localStorage.setItem('token',token)
        this.$message({
          message: '登录成功',
          type: 'success',
          onClose:()=>{
            this.$router.push({path:"/"})
          }
        });
      }else{
         this.$message.error('用户名或账户错误');
      }
    } 
    
  },
};
</script>

<style  scoped>
.login{
  width:100vw;
  height:100vh;
  background:#2d3a4b;
}
.demo-ruleForm{
  width:500px;
  /*  class = 'inp' */
  position:fixed;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%)
}
.title{
  margin:30px 0;
  text-align:center;
  color:#fff;
}
.btn{
  width:100%;
  background: #409EFF;
  color:#fff;
}
.inp{
  background: #303133;
}
</style>