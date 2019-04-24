<template>
  <div id="app">
    <div class=""><router-view></router-view></div>
    <mt-tabbar fixed>
      <mt-tab-item id="主页"><router-link to="/home"><i class="homeIcon"></i><span>主页</span></router-link></mt-tab-item>
      <mt-tab-item id="购物车"><router-link to="/carts"><i class="cartsIcon"></i><span>购物车</span></router-link></mt-tab-item>
      <mt-tab-item id="个人中心"><router-link to="/person_center/1"><i class="personCenterIcon"></i><span>个人中心</span></router-link></mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
/* 底部按钮样式 */
.mint-tab-item-label>a{
  display: block;
  text-decoration: none;
  color: #5c606c;
}
.mint-tab-item-label>a.router-link-active{
  color:#f33d3c;
}
.homeIcon,.cartsIcon,.personCenterIcon{
  width:1.25rem;
  height:1.25rem;
  display:block;
  margin: 0 auto;
  background-size: cover;
}
.homeIcon{
  background-image: url('./assets/home.png');
}
.cartsIcon{
  background-image: url('./assets/carts.png');
}
.personCenterIcon{
  background-image: url('./assets/personCenter.png');
}
.router-link-active .homeIcon{
  background-image: url('./assets/home2.png');
}
.router-link-active .cartsIcon{
  background-image: url('./assets/carts2.png');
}
.router-link-active .personCenterIcon{
  background-image: url('./assets/personCenter2.png');
}
/* App样式 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 2.625rem;
  font-size: .75rem;
}
ul,li{list-style: none;margin:0;}
.clearfix:after{
  clear: both;
  content: "";
  visibility: hidden;
  display: block;
}
.clearfix{
  zoom: 1;
}
.fl{
  float: left;
  display: inline;
}
.fr{
  float: right;
  display: inline;
}
</style>
