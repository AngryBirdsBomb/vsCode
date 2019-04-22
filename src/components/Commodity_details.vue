<template>
    <div id="commodity_details" class="commodity_details">
      <mt-header title="商品详情" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
          <!-- <mt-button icon="more" slot="right"></mt-button> -->
      </mt-header>
      <mt-swipe :auto="4000" class="imgList" @change="handleChange">
        <mt-swipe-item v-for="(url,index) in list.url" :key="index"><img v-lazy="url" alt="" /></mt-swipe-item>
        <span class="imgNumber">{{imgNumber}}/{{list.url.length}}</span>
      </mt-swipe>
      <div class="commodityInfo">
        <h4 class="commodityTit">{{commodityTit}}</h4>
        <p><span class="promotionIcon">促销</span><span>满99元，享部分地区包邮</span></p>
        <p class="personNumberStyle">已有{{personNumber}}万人拼单</p>
        <p><mt-button type="danger" size="small" class="colorWhite">去<span class="fontSizeB">拼单</span>&#165;{{favorablePrice}}</mt-button><span class="priceStyle">&#165;{{price}}</span></p>
      </div>
      <div class="commodityListTab">
        <mt-navbar v-model="sel">
          <mt-tab-item id="1">商品</mt-tab-item>
          <mt-tab-item id="2">评价</mt-tab-item>
          <mt-tab-item id="3">详情</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="sel">
          <mt-tab-container-item id="1">
            <ul>
              <li v-for="(item,index) in list.url" :key="index">
                <img v-lazy="item">
                <p>{{info}}</p>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <ul>
              <li v-for="(item,index) in list.url" :key="index"><img v-lazy="item" alt="" /></li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <ul>
              <li v-for="(item,index) in list.url" :key="index"><img v-lazy="item" alt=""/></li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      
      
    </div>
</template>
<script type="text/javascript">
export default {
  name: "commodity_details",
  data () {
    return {
      list:{
        'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
        'price':11,
        'personNumber':222,
        'favorablePrice':1,
        'commodityTit':'蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123蓝牙耳机123',
        'favorable':1
      },
      commodityTit:'',
      price:'',
      personNumber:'',
      favorablePrice:'',
      favorable:'',
      imgNumber:'1',
      sel:'1',
      info:'自购机日起（以购机发票为准），如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，30日内换货，30日以上在质保期内享受免费保修等三包服务！注：单独购买手机配件产品的用户，请完好保存配件外包装以及发票原件，如无法提供上述凭证的，将无法进行正常的配件保修或更换。'
        
    };
  },
  mounted(){
    this.commodityTit=this.list.commodityTit;
    this.price=this.list.price;
    this.personNumber=this.list.personNumber;
    this.favorablePrice=this.list.favorablePrice;
  },
  methods:{
    handleChange(index){
      this.imgNumber=index+1;
    }
  }
}
</script>
<style lang="" >
ul,li{
  margin:0;
  padding:0;
  list-style: none;
}
.commodityListTab{
  background-color: #fdfdfd;
  overflow-y:auto; 
}
.commodityListTab .mint-navbar{
  margin:.375rem 0;
}
.commodityListTab .mint-tab-container{
  display:-webkit-flex;
  display:flex;
  text-align: left;
  margin-bottom: 3.125rem;
}
.commodityListTab .mint-tab-container-item li{
  flex: 1 1 18.75rem;
  margin:0 auto;
}
.commodityListTab .mint-tab-container-item img{
  width:100%;
  height:18.75rem;
}
.commodityListTab .mint-tab-container-item p{
  text-indent: 2em;
  line-height: 1.25rem;
  font-size: .875rem;
}
.imgList{
  height: 12.5rem;
  width:100%;
  display: -webkit-flex;
  display:flex;
  border: 1px solid #000;
}
.imgList img{
  width: 100%;
  height: 100%;
  flex: 1 1 18.125rem;
}
.imgList .mint-swipe-items-wrap{
  width: 100%;
}
.imgList .mint-swipe-indicator.is-active{
  background-color: #f00;
  opacity: 0.6;
  filter: alpha(opacity=60);
}
.commodityInfo{
  text-align: left;
}
.commodityInfo .commodityTit{
  font-size: .875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;;
  height:1.25rem;
  line-height: 1.25rem;
  margin:.375rem 0;
}
.commodityInfo .personNumberStyle{
  background-color: rgba(255,0,0,0.3);
  width:40%;
  line-height: 1.875rem;
  padding-left: .625rem;
  color: #f00;
  border-radius: .25rem;
}
.commodityInfo .priceStyle{
  margin-left: .625rem;
  text-decoration: line-through;
  color: #999;
  font-size: .875rem;
}
.imgNumber{
  position: absolute;
  right:10px;
  bottom: 10px;
  color: #fff;
  background-color: rgba(0,0,0,0.6);
  width:1.875rem;
  height:1.125rem;
  line-height: 1.125rem;
  border-radius: .375rem;
}
.promotionIcon{
  padding: 0 2px;
  border:1px solid #f00;
  color: #f00;
  margin-right: .625rem;
  border-radius: .125rem;
}
</style>