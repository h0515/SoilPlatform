<template>
  <div>
    <div class="banner">
      <div class="title">
        <i class="el-icon-refresh"></i>
        <span>土壤墒情监测平台</span>
        <span class="timeScreen">{{ datetime }}</span>
        <span class="weekScreen">{{ weektime }}</span>
      </div>
      <div class="userInfo">
       
          <p>欢 迎：{{ UserName }}
            <el-tooltip class="item" effect="dark" content="点击修改密码" placement="bottom">
               <i class="el-icon-user" @click="open"></i>
            </el-tooltip>
          </p>
      
        <p>|</p>
        <p @click="LogOff" class="addBorder">注 销<i class="el-icon-warning-outline"></i></p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { changePwd } from '@/request/api/home';
export default {
  data() {
    return {
      UserName: '',
      UserPwd:'',
      timer: '',
      datetime: '',
      weektime: '',
      weekArray:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },
  methods: {
    open(){
        this.$prompt('请输入新密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {    
          changePwd(this.UserName,this.UserPwd,value).then(res=>{
            this.$message({
            type: 'success',
            message: '修改成功，请重新登录'
          });
          this.LogOff()
          }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    LogOff() {
      sessionStorage.clear()
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted() {
    this.UserName = JSON.parse(sessionStorage.getItem('UserName'))
    this.UserPwd = JSON.parse(sessionStorage.getItem('UserPwd'))
    this.timer = setInterval(() => {
        this.datetime = dayjs().format("YYYY-MM-DD HH:mm:ss")
        this.weektime = this.weekArray[dayjs().format("d")]
      }, 1000)
  },
  beforeDestroy() {
      if(this.timer){
        clearInterval(this.timer);
      }
    }
}
</script>
<style lang="less" scoped>
  /deep/  .el-icon-user:before{
      cursor: pointer;
      content: "\e6e3";
    }

.banner{
  height: 0.8rem;
  background-color: #409EFF;
  display: flex;
  flex-direction: row;
  .title{
    color: #fff;
    width: 9.6rem;
    font-size: 0.4rem;
    line-height: 0.8rem;
    margin-left: 0.4rem;
    i{
      margin-right: .15rem;
    }

    .timeScreen{
      margin: auto 0.5rem;
      margin-right: 0.15rem;
      font-size: 0.32rem;
      color: #c9ce37;  
    }
    .weekScreen{
      margin: auto 0.5rem;
      margin-left: 0;
      font-size: 0.32rem;
      color: #c9ce37;  
    }
  }
  .userInfo{
    color: #fff;
    width: 4rem;
    font-size: 0.24rem;
    //line-height: 0.8rem;
    //text-align: right;
    margin-right: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .addBorder{
      cursor: pointer;
    }
    .addBorder:hover{
        color: red;
      }
    
  }
  .title i,.userInfo i{
    margin-left: .15rem;
  }
}
</style>
