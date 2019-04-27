<template>
    <div id="login" class="login">
      <mt-header title="登录页" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
      </mt-header>
      <div class="loginBox">
        <div class="userOptionBox">
          <i class="el-icon-message messageBtn">
            <mt-badge type="error" size="small" class="messageTip">99+</mt-badge>
          </i>
          <i class="el-icon-setting"></i>
        </div>
        <div class="registerUserInfo">
          <mt-field label="用户名" placeholder="字母，数字，下划线，减号" v-model="username" :state="usernameStatus" @blur.native.capture="checkUsername"></mt-field>
          <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" :state="emailStatus" @blur.native.capture="checkEmail"></mt-field>
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" :state="phoneStatus" @blur.native.capture="checkPhone"></mt-field>
          <mt-field label="密码" placeholder="包含大小写字母、特殊符号，数字" type="password" v-model="password" :state="passwordStatus" @blur.native.capture="checkPassword"></mt-field>
          <mt-field label="验证码" v-model="captcha">
            <img src="../assets/logo.png" height="45px" width="100px">
          </mt-field>
          <div class="submitBox">
            <mt-button type="primary" size="small" @click.native="checkRegisterInfo">登录</mt-button>
            <mt-button type="danger" size="small">清除</mt-button>
          </div>
          <div class="helpBox clearfix">
            <router-link to="/register" class="fr">注册</router-link>
            <a href="javascript:;" class="fr">忘记密码?</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
export default {
  name: "login",
  data () {
    return {
      username:'',
      password:'',
      email:'',
      phone:'',
      captcha:'',
      checkStatus:{}
    };
  },
  methods:{
    checkEmail(){
      if(this.email!=''){
        const isOk=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.email);
        if(isOk){
          this.checkStatus.email=true;
        }else{
          this.checkStatus.email=false;
        }
      }
    },
    checkPassword(){
      if(this.password!=''){
        const isOk=/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(this.password);
        if(isOk){
          this.checkStatus.password=true;
        }else{
          this.checkStatus.password=false;
        }
      }
    },
    checkUsername(){
      if(this.username!=''){
        const isOk=/^[a-zA-Z0-9_-]{6,16}$/.test(this.username);
        if(isOk){
          this.checkStatus.username=true;
        }else{
          this.checkStatus.username=false;
        }
      }
      console.log('=>'+this.checkStatus.username);
    },
    checkPhone(){
      if(this.phone!=''){
        const isOk=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(this.phone);
        if(isOk){
          this.checkStatus.phone=true;
        }else{
          this.checkStatus.phone=false;
        }
      }
    },
    checkRegisterInfo(){
      //console.log(this.checkStatus);
      for(let key in this.checkStatus){
        if(this.checkStatus.key==false){
          Toast({
            message:'格式不符合要求,请修改!'
          });
          return;
        }else{
          Toast({
            message:'提交成功!'
          });
        }
      }
    }
  },
  computed: {
    emailStatus(){
      if(this.checkStatus.email==true){
        return 'success';
      }
      else if(this.checkStatus.email==false){
        return 'error';
      }
      else{
        return '';
      }
    },
    phoneStatus(){
      if(this.checkStatus.phone==true){
        return 'success';
      }
      else if(this.checkStatus.phone==false){
        return 'error';
      }
      else{
        return '';
      }
    },
    passwordStatus(){
      if(this.checkStatus.password==true){
        return 'success';
      }
      else if(this.checkStatus.password==false){
        return 'error';
      }
      else{
        return '';
      }
    },
    usernameStatus(){
      console.log(this.checkStatus.username);
      if(this.checkStatus.username==true){
        return 'success';
      }
      else if(this.checkStatus.username==false){
        return 'error';
      }
      else{
        return '';
      }  
    }
  }
}
</script>
<style lang="" >
.loginBox{
  margin-bottom: 3.75rem;
  position:relative;
}
.userOptionBox{
  position:absolute;
  right:1.25rem;
  top:.625rem;
}
.userOptionBox i{
  margin-left: 1.875rem;
  font-size: 1.25rem;
  color: #fff;
  cursor: pointer;
}
.messageBtn{
  position: relative;
}
.messageBtn .messageTip{
  position:absolute;
  left:1rem;
  top:-0.5rem;
}
.userInfo{
    margin:0;
    padding:0;
}
.userInfo{
  background-color: #171717;
  color: #fff;
}
.userImg{
  padding-top:2.5rem;
}
.userImg img{
  width:6.25rem;
  cursor: pointer;
  border-radius: 50%;
}
.userName{
  line-height: 1.875rem;
}
.userName p{
  margin:0;
}
.userOtherInfo{
  display:-webkit-flex;
  display:flex;
}
.registerUserInfo{
  height: 29rem;
  margin-bottom: 3.75rem;
}
.registerUserInfo .mint-cell-wrapper{
  font-size: .875rem;
}
.submitBox{
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  margin:1.25rem auto 0;
  width:16.25rem;
}
.submitBox button{
  flex: 1 1 5rem;
  margin: 0 .625rem;
}
.helpBox{
  margin:1.75rem 2.5rem 1.75rem 0;
}
.helpBox a{
  line-height:1.875rem;
  margin-left: 2.5rem; 
  color:blue;
  font-size: .875rem;
  text-decoration:none;
}
</style>