<template>
    <div id="home">
      <mt-header title="首页" fixed>
        <mt-button  slot="left" @click="handleClose">关闭</mt-button>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
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
  },
  methods:{
    handleClose:()=>{
      window.opener=null;
      window.open('','_self');
      window.close();
    }
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