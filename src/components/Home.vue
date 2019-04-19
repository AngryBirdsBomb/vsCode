<template>
    <div id="home">
      <mt-header title="电脑数码" fixed>
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <!-- <mt-button @click="handleClose" slot="right">关闭</mt-button> -->
        <mt-button  slot="right">关闭</mt-button>
      </mt-header>
      <mt-swipe :auto="4000">
        <mt-swipe-item><img src="../assets/1.jpeg" alt="" /></mt-swipe-item>
        <mt-swipe-item><img src="../assets/2.jpeg" alt="" /></mt-swipe-item>
        <mt-swipe-item><img src="../assets/3.jpeg" alt="" /></mt-swipe-item>
      </mt-swipe>
      <commodityList id="commodityList"></commodityList>  
    </div>
</template>
<script type="text/javascript">
import CommodityList from './Commodity_list.vue'
export default {
  name: "home",
  data () {
    return {
    };
  },
  components:{
    'commodityList':CommodityList
  }
}
</script>
<style lang="" scoped>
#home{
  height:12.5rem;
  border-bottom: .0625rem solid #000;
  margin-bottom: 1.25rem;
}
.mint-swipe-item img{
  width:100%;
  height:100%;
}
</style>