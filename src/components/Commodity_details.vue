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
      <ul class="commodityInfo">
        <li><p class="favorablePrice"><span>&#165;{{favorablePrice}}</span> 大促销</p></li>
        <li><p class="priceStyle">原价<span class="price">&#165;{{price}}</span></p></li>
        <li><h4 class="commodityTit">{{commodityTit}}</h4></li>
        <li>
          <ul class="tip clearfix">
            <li>快递<span v-text="favorablePrice>=12?'免运费':'运费20'"></span></li>
            <li>月销量<span>{{SalesVolume}}</span></li>
            <li>销售地<span>{{saleSites}}</span></li>
          </ul>
        </li>
        <li><p class=""><span class="promotionIcon">促销</span><span>满99元，享部分地区包邮</span></p></li>
        <li><p class="clearfix"><span class="color_gray fl">优惠</span><span class="bgColor_red fl">店铺优惠券</span><span class="fl">领取优惠券</span><a href="javascript:;" class="fr"><span class="color_gray">领取&nbsp;&gt;</span></a></p></li>
        <li><p class="clearfix"><span class="color_gray fl">促销</span><span class="color_red fl">积分</span><span class="fl">购买可得100积分</span><a href="javascript:;" class="fr"><span class="color_gray">&nbsp;&gt;</span></a></p></li>
        <li><p class="clearfix" @click="showModal(1)"><span class="color_gray fl">服务</span><span class=" fl">急速退货</span><span class="fl">·&nbsp;&nbsp;急速退款</span><span class="fl">·&nbsp;&nbsp;赠运费险</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="clearfix" @click="showModal(2)"><span class="color_gray fl">选择</span><span class=" fl">请选择 颜色分类/尺寸</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="clearfix" @click="showModal(3)"><span class="color_gray fl">参数</span><span class=" fl">品牌</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="personNumberStyle">已有{{personNumber}}万人拼单</p></li>
        <li><mt-button type="danger" size="small" class="colorWhite">去<span class="fontSizeB">拼单</span></mt-button></li>
      </ul>
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
        <mt-popup 
          v-model="popupShow"
          position="bottom"
          class="modal-dialog"
        >
          <div class="modal-content" v-if="popupType==1">
            <h4 class="modal-header">基础保障</h4>
            <ul class="modal-body">
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>正品保证</h5>
                <p>商品支持正品保证服务</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="popupShow=false">确定</mt-button>
          </div>
          <div class="modal-content" v-if="popupType==2">
            <h4 class="modal-header clearfix">
              <div class="fl clearfix">
                <img src="../assets/logo.png" alt="" title=""  class="commodityImg fl"/>
                <ul class="commodityTip fr">
                  <li>
                    <p class="color_red">&#165;{{favorablePrice}}</p>
                  </li>
                  <li>
                    <p>库存 8000 件</p>
                  </li>
                  <li>
                    <p>请选择: 颜色分类 尺寸</p>
                  </li>
                </ul>
              </div>
              <i class="closeBtn_icon fr" @click="popupShow=false">
                <img src="../assets/closeBtn_icon.png" slot="icon" alt="" />
              </i>
            </h4>
            <ul class="modal-body">
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>正品保证</h5>
                <p>商品支持正品保证服务</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="popupShow=false">确定</mt-button>
          </div>
          <div class="modal-content" v-if="popupType==3">
            <h4 class="modal-header">基础保障</h4>
            <ul class="modal-body">
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>正品保证</h5>
                <p>商品支持正品保证服务</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
              <li>
                <h5><img slot="icon" src="../assets/icon.jpg" alt="" title="" class="smallIcon_24"/>赠保价险</h5>
                <p>活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见天猫【帮助中心-聚划算保价险服务】</p>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="popupShow=false">确定</mt-button>
          </div>
        </mt-popup>
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
        'favorablePrice':12,
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
      info:'自购机日起（以购机发票为准），如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，30日内换货，30日以上在质保期内享受免费保修等三包服务！注：单独购买手机配件产品的用户，请完好保存配件外包装以及发票原件，如无法提供上述凭证的，将无法进行正常的配件保修或更换。',
      SalesVolume:'20',
      saleSites:'北京 北京',
      popupShow:false,
      popupType:'1'  
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
    },
    showModal(type){
      if(type&&this.popupShow!=true){
        this.popupType=type;
        this.popupShow=true;
      }
      else{
        return;
      }
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
.favorablePrice{
  color:#f00;
  font-size: .75rem;
}
.favorablePrice  span{
  font-size: 1.125rem;
}
.commodityInfo .priceStyle{
  color: #999;
}
.commodityInfo .priceStyle .price{
  text-decoration: line-through;
  margin-left: .625rem;
}
.tip{
  color:#999;
  display: -webkit-flex;
  display: flex;
}
.tip li{
  flex: 1 1 35%;
}
.tip span{
  margin-left: .625rem;
}
.commodityInfo li p>span{
  margin-right: .625rem;
}
.commodityInfo li p a{
  text-decoration: none;
}
.modal-dialog{
  width:99%;
  line-height: 1.25rem;
  text-align: left;
}
.modal-dialog h4,.modal-dialog h5,.modal-dialog p{
  margin:0;
  padding:0;
}
.modal-dialog .modal-header{
  color:#ff0033;
  line-height: 2.5rem;
  text-align: center;
  margin-bottom: .625rem;
}
.modal-dialog .modal-header .closeBtn_icon{
  margin-right:.625rem;
  margin-top:.625rem;
  width:1.5rem;
  height:1.5rem;
  line-height: 1.5rem;
  text-align: center;
}
.commodityImg{
  width:6.25rem;
  height: 6.25rem;
  border:1px solid #ccc;
  border-radius: .125rem;
  padding:2px;
  margin:-28px 10px 0 10px;
  background-color: #fff;
}
.commodityTip{
  text-align: left;
  color: #000;
}
.modal-header .commodityTip p{
  line-height:1.25rem;
}
.modal-body{
  max-height: 18.75rem;
  overflow-y: auto;
  margin-bottom: 20px;
}
.modal-body li{
  width:16.25rem;
}
.modal-body li h5,.modal-body li p{
  margin-bottom: .25rem;
}
.modal-body li h5 img{
  margin:0 .875rem;
}
.smallIcon_24{
  width:.8125rem;
  height:.75rem;
}
.modal-body p{
  color: #999;
  padding-left: 2.5rem;
}
.closeBtn {
  width:100%;
}
.color_gray{color:#ccc;}
.color_red{
  color:#ff0033;
}
.bgColor_red{
  background-color:#ff0033;
  color: #fff;
  padding:0 .25rem;
  border-radius: .125rem;
}
.commodityInfo li p .mr0{margin-right:0;}
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