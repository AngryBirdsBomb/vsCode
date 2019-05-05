<template>
    <div id="person_center">
      <mt-header title="个人中心" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
      </mt-header>
      <div class="personCenterListBox" v-if="userId==1">
        <div class="userOptionBox">
          <i class="el-icon-message messageBtn">
            <mt-badge type="error" size="small" class="messageTip">99+</mt-badge>
          </i>
          <i class="el-icon-setting" @click="lookResult"></i>
        </div>
        <ul class="userInfo">
          <li  class="userImg">
            <img src="../assets/userImg.png" alt="" @click="login(1)"/>
          </li>
          <li  class="userName">
            <p><router-link :to="{path:'/person_center',query:{userId:132,userName:'456'}}">{{userInfo[0].name}}get</router-link></p>
            <p><router-link :to="{name:'person_center',params:{userId:123,userName:'456'}}">{{userInfo[1].name}}post</router-link></p>
          </li>
          <li class="userOtherInfo">
            <p>
              <span>{{userInfo[0].subscribe}}</span>
              <span>订阅</span>
            </p>
            <p>
                <span>{{userInfo[0].focus}}</span>
                <span>关注</span>
            </p>
            <p>
              <span v-text="userInfo[0].fans"></span>  
              <span>粉丝</span>
            </p>
          </li>
        </ul>
        <ul class="personCenterList">
          <li class="personCenterItem">
            <mt-cell title="我的通知" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
              <mt-badge type="error" size="small">99+</mt-badge>
            </mt-cell>
          </li>
          <li class="personCenterItem">
            <mt-cell title="我的收藏" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
          <li class="personCenterItem">
            <mt-cell title="帐号管理" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
          <li class="personCenterItem">
            <mt-cell title="帐号信息" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
          <li class="personCenterItem">
            <mt-cell title="意见反馈" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
          <li class="personCenterItem">
            <mt-cell title="关于我们" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
        </ul>
      </div>
      <div class="personCenterListBox" v-else>
        <div class="userOptionBox">
          <i class="el-icon-message messageBtn">
            <mt-badge type="error" size="small" class="messageTip">99+</mt-badge>
          </i>
          <i class="el-icon-setting" @click="lookResult"></i>
        </div>
        <ul class="userInfo">
          <li  class="userImg">
            <img src="../assets/userImg.png" alt="" @click="login(1)"/>
          </li>
          <li  class="userName">
            <p><router-link :to="{path:'/person_center',query:{userId:132,userName:'456'}}">点击登录</router-link></p>
            <p><router-link :to="{name:'person_center',params:{userId:123,userName:'456'}}">点击登录</router-link></p>
          </li>
        </ul>
        <ul class="personCenterList">
          <li class="personCenterItem">
            <mt-cell title="意见反馈" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
          <li class="personCenterItem">
            <mt-cell title="关于我们" is-link to="/person_center/">
              <img slot="icon" src="../assets/icon-nav-001.png" alt="" />
            </mt-cell>
          </li>
        </ul>
      </div>
    </div>
</template>
<script type="text/javascript">
export default {
  name: "person_center",
  data () {
    return {
      userInfo:[
        {
          id:'101',
          name:'用户一',
          nickname:'一二三',
          subscribe:20,
          fans:33,
          focus:12,
          status:true
        },
        {
          id:'102',
          name:'用户二',
          nickname:'一二三',
          subscribe:20,
          fans:33,
          focus:12,
          status:false
        }
      ]
    };
  },
  props:{
    userId:Number,
    userName:String
  },
  methods:{
    login(loginType){
      console.log(1);
      if(loginType==1){
        this.$router.replace({path:'/login'});
      }else{
        this.$router.replace({path:'/register'});
      }
    },
    lookResult(){
      console.log(this.userId+'<=>'+this.userName);
    }
  }
}
</script>
<style lang="" >
.personCenterListBox{
  margin-bottom: 3.125rem;
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
.personCenterList,.userInfo{
    margin:0;
    padding:0;
}
.userInfo{
  background-color: #171717;
  color: #fff;
  min-height: 13.75rem;
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
  width: 5rem;
  margin: 0 auto;
}
.userName>p>a{
  color: #fff;
  text-decoration: none;
}
.userOtherInfo{
  display:-webkit-flex;
  display:flex;
}
.userOtherInfo p{
  flex:1 1 33%;
  max-width: 33%;
  overflow: hidden;
  margin:.25rem 0;
}
.userOtherInfo p>span{
  display: block;
  text-align: center;
  line-height: 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding:0 .25rem;
}
.personCenterList{
  margin:.5rem;
  height:15.125rem;
  overflow-y: auto;
}
.personCenterItem{
  text-align: left;
}
.personCenterItem img{
  width:1.25rem;
}
.personCenterItem .mint-cell{
  background:none;
}
.personCenterItem:last-child{
  background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
</style>