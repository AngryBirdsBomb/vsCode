<template>
    <div id="commodityList">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">手机配件</mt-tab-item>
        <mt-tab-item id="2">智能数码</mt-tab-item>
        <mt-tab-item id="3">电脑办公</mt-tab-item>
        <mt-tab-item id="4">图书音像</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul class="clearfix" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="200"
            v-if="selected==1"
          >
            <li v-for="(item,index) in list" :key="index">
              <img v-lazy="item.url">
              <h4 class="commodityTit" :title="item.commodityTit">{{item.commodityTit}}</h4>
              <p class="personNumberStyle">已有{{item.personNumber}}万人拼单</p>
              <p><mt-button type="danger" size="small" class="colorWhite">去<span class="fontSizeB">拼单</span>&#165;{{item.favorablePrice}}</mt-button><span class="priceStyle">&#165;{{item.price}}</span></p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="clearfix" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="200"
            v-if="selected==2"
          >
            <li v-for="(item,index) in list" :key="index">
              <img v-lazy="item.url">
              <h4 class="commodityTit" :title="item.commodityTit">{{item.commodityTit}}</h4>
              <p class="personNumberStyle">已有{{item.personNumber}}万人拼单</p>
              <p><mt-button type="danger" size="small" class="colorWhite">去<span class="fontSizeB">拼单</span>&#165;{{item.favorablePrice}}</mt-button><span class="priceStyle">&#165;{{item.price}}</span></p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <ul class="clearfix" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="200"
            v-if="selected==3"
          >
            <li v-for="(item,index) in list" :key="index">
              <img v-lazy="item.url">
              <h4 class="commodityTit" :title="item.commodityTit">{{item.commodityTit}}</h4>
              <p class="personNumberStyle">已有{{item.personNumber}}万人拼单</p>
              <p><mt-button type="danger" size="small" class="colorWhite">去<span class="fontSizeB">拼单</span>&#165;{{item.favorablePrice}}</mt-button><span class="priceStyle">&#165;{{item.price}}</span></p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <ul class="clearfix" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="200"
            v-if="selected==4"
          >
            <li v-for="(item,index) in list" :key="index">
              <img v-lazy="item.url">
              <h4 class="commodityTit" :title="item.commodityTit">{{item.commodityTit}}</h4>
              <p class="personNumberStyle">已有{{item.personNumber}}万人拼单</p>
              <p><mt-button type="danger" size="small" class="colorWhite">去<span class="fontSizeB">拼单</span>&#165;{{item.favorablePrice}}</mt-button><span class="priceStyle">&#165;{{item.price}}</span></p>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade"
        >
        更新了{{uploadCount}}条信息!
      </mt-popup>
    </div>
</template>
<script type="text/javascript">
import {Indicator} from 'mint-ui'
export default {
  name: "home",
  data () {
    return {
        list:[
          {'url':'./src/assets/1.jpeg','price':11,'personNumber':222,'favorablePrice':1,'commodityTit':'蓝牙耳机123蓝牙耳机123蓝牙耳机123','favorable':1},
          {'url':'./src/assets/2.jpeg','price':11,'personNumber':333,'favorablePrice':11,'commodityTit':'蓝牙耳机333','favorable':2},
          {'url':'./src/assets/3.jpeg','price':11,'personNumber':111,'favorablePrice':1,'commodityTit':'蓝牙耳机444','favorable':1},
          {'url':'./src/assets/4.jpeg','price':11,'personNumber':888,'favorablePrice':13,'commodityTit':'蓝牙耳机111','favorable':1},
          {'url':'./src/assets/1.jpeg','price':11,'personNumber':3383,'favorablePrice':17,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/2.jpeg','price':11,'personNumber':666,'favorablePrice':16,'commodityTit':'蓝牙耳机','favorable':2},
          {'url':'./src/assets/3.jpeg','price':11,'personNumber':777,'favorablePrice':15,'commodityTit':'蓝牙耳机','favorable':1} ,
          {'url':'./src/assets/4.jpeg','price':11,'personNumber':444,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/1.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/2.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':2},
          {'url':'./src/assets/3.jpeg','price':11,'personNumber':333,'favorablePrice':14,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/4.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/1.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/2.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/3.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/4.jpeg','price':11,'personNumber':333,'favorablePrice':11,'commodityTit':'蓝牙耳机','favorable':2},
          {'url':'./src/assets/1.jpeg','price':11,'personNumber':333,'favorablePrice':12,'commodityTit':'蓝牙耳机','favorable':1},
          {'url':'./src/assets/2.jpeg','price':11,'personNumber':222,'favorablePrice':13,'commodityTit':'蓝牙耳机','favorable':1}
        ],
        selected:'1',
        loading:false,
        popupVisible:false,
        uploadCount:'',
        oldLength:''
    }
  },
  methods: {
    loadMore(){
        this.loading=true;
        Indicator.open({
          text: '信息加载中...',
          spinnerType: 'fading-circle'
        });
        this.oldLength=this.list.length+1;
        setTimeout(()=>{
          for(let i=0;i<2;i++){
            let j=i%3+1;
            this.list.push(
              {'url':'./src/assets/'+j+'.jpeg','price':11,'personNumber':333,'favorablePrice':1,'commodityTit':'蓝牙耳机','favorable':1}
            );
          }
          this.loading=false;
          this.popupVisible=true;
          this.uploadCount=this.list.length+1-this.oldLength;
          setTimeout(()=>{
            this.popupVisible=false;
          },3000);
          Indicator.close();
          console.log(this.list.length+1-this.oldLength);
        },2000);
        
    }
  }
}
</script>
<style lang="" >
ul,li{list-style: none}
li{margin-bottom: .625rem;}
.clearfix:after{
  clear: both;
  content: "";
  visibility: hidden;
  display: block;
}
.clearfix{
  zoom: 1;
}
#commodityList{
  background-color: #f4f5f7;
  margin-bottom:2.875rem;
}
.mint-navbar .mint-tab-item.is-selected{
  z-index: 1000;
}
.mint-tab-container{
  margin-bottom:2.875rem;
  height:14.5rem;
  overflow-y: auto;
}
.mint-tab-container-item{
  overflow: hidden;
}
.mint-tab-container-item ul{
  padding:0;
  margin-left: -0.35rem;
  /* height: 13.5rem; */
  justify-content:center;
  display: -webkit-flex;
  display:flex;
  width: 100%;
  flex-wrap:wrap;
}
.mint-tab-container-item li{
  margin-left: .75rem;
  margin-bottom: 1rem;
  overflow: hidden;
  background-color: #fff;
  flex:1 1 130px;
  border-radius: .125rem;
}
.mint-tab-container-item li img{
  width:100%;
  height:6.5rem;
}
.mint-tab-container-item li p,.mint-tab-container-item li h4{
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.colorWhite{color: #fff;}
.fontSizeB{font-size: 1rem;}
.priceStyle{
  color:#ccc;
  text-decoration: line-through;
  font-size: 1rem;
  margin-left: .625rem;
}
.mint-tab-container-item .personNumberStyle{
  background-color: rgba(255,0,0,0.1);
  line-height: 1.25rem;
  margin:0 .75rem;
  color: #f00;
  width:5.3125rem;
  white-space:normal;
  overflow:auto;
  text-overflow: unset;
  border-radius: .125rem;
}
.mint-popup{
  background:none;
  color: #fff;
  line-height: 2.5rem;
  padding:0 1.25rem;
  border-radius: .25rem;
  font-size: .875rem;
}
</style>