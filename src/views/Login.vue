<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>土壤墒情监测平台</span>
      </div>
      <div class="main">
        <form>
          <div class="inputBox" style="margin-top: .4rem;">
            <label for="username">账 号:</label>
            <el-input type="text" id="username" v-model="name"  class="fonts" clearable autofocus
              onkeyup="this.value=this.value.replace(/[ ]/g,'')"
            />
          </div>
          <div v-if="nameMessage" class="errorMessage">{{ nameMessage }}</div>
          <div class="inputBox">
            <label for="password">密  码:</label>
            <el-input type="password" id="password" v-model="pwd" class="fonts" show-password
              onkeyup="this.value=this.value.replace(/[ ]/g,'')"
            />
          </div>
          <div v-if="pwdMessage" class="errorMessage">{{ pwdMessage }}</div>
          <el-button @click.prevent="login"  type="primary" round class="btn">登录</el-button>
        </form>
      </div>
    </el-card>
 
  </div>
</template>
  
<script>
import {getLogin} from '../request/api/login'
export default {
    name: 'Login',
    data() {
        return {
            name: '',
            pwd: '',
            nameMessage:'',
            pwdMessage:'',
        }
    },
    methods: {
        login() {
            // 处理登录逻辑
            if (!this.name.trim()) {
              //this.errorMessage = 'Please enter username and password.';
              this.nameMessage = '请输入用户名';
              this.pwdMessage =''
              return;
            }
            this.nameMessage =''
            if (!this.pwd.trim()) {
              //this.errorMessage = 'Please enter username and password.';
              this.pwdMessage = '请输入密码';
              return;
            }
            this.pwdMessage ='' 
            const user={
                name:this.name,
                pwd:this.pwd
              }
            getLogin(user).then(res=>{
              //console.log(res);
              if(res&&res.data.IsSuccess){
                this.$message({
                    message: '登录成功',
                    center: true,
                    duration: 400,
                    type: 'success'
                  });
                setTimeout(()=>{
                  sessionStorage.setItem('UserID',JSON.stringify(res.data.UserID))
                  sessionStorage.setItem('token',JSON.stringify(res.data.UserID))
                  sessionStorage.setItem('UserName',JSON.stringify(this.name))
                  sessionStorage.setItem('UserPwd',JSON.stringify(this.pwd))
                  //console.log(this.name);
                  this.$router.push('/')
                },300)
              }else{
                  this.$message({
                    message: '账号或密码错误，请重新输入',
                    center: true,
                    duration: 2000,
                    type: 'error'
                  });
              }
            });
            
               
        }
    }
}
</script>
<style lang="less" scoped>
.login{
  height: 7.5rem;
  width: 15rem;
  max-width: 100%;
  max-height: 100vh;
  background-image: url('../assets/background.jpg'); /* 替换 'your-image-file.jpg' 为您下载的图片文件名 */
  background-size: cover; /* 让背景图片充满整个容器 */
  background-position: center; /* 将背景图片置于容器中央 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  overflow: hidden;
  .box-card {
    width: 8rem;
    height: 5rem;
    margin: 0.8rem auto;
    
    .clearfix {
      //margin: 0 auto;
      //float: center;
      display:flex;
      justify-content: center;
      span{
        font-size: 0.3rem;
        font-weight: bold;
        color: black;
      }
    }
    .main{
      width: 7rem;
      height: 4.5rem;
      //background-color: aqua;
      margin: .05rem auto .05rem;
      display: flex;
      justify-content: center;
      .inputBox{
        height: .75rem;
        width: 3.5rem;
        margin: .075rem auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        label{
          width: .75rem;
          font-size: 0.2rem;
          //font-weight: bold;
          color: black;
          //text-align: justify;
        }
        .fonts{
          font-size: 0.2rem;
          font-weight: bold;
          color: black;
        }
      }
      .btn{
        width: 3rem;  
        height: .6rem;
        margin: .5rem auto 0.75rem;
        text-align: center;
        align-items: center;
        font-size: 0.24rem;
        display: flex;
        justify-content: center;
      }
      .errorMessage{
        color: red;
        font-size: 0.2rem;
        font-weight: bold;
        margin-left: .75rem;
      }
    }

  }

  
}
/deep/ .el-card__header{
  background-color: aquamarine;
}
/deep/ .el-card__body{
  background-color: aliceblue;
}
</style>