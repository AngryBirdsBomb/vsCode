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
        <li><p class="clearfix" @click="showModal(1)"><span class="color_gray fl">优惠</span><span class="bgColor_red fl">店铺优惠券</span><span class="fl">领取优惠券</span><a href="javascript:;" class="fr"><span class="color_gray">领取&nbsp;&gt;</span></a></p></li>
        <li><p class="clearfix"><span class="color_gray fl">促销</span><span class="color_red fl">积分</span><span class="fl">购买可得100积分</span><a href="javascript:;" class="fr"><span class="color_gray">&nbsp;&gt;</span></a></p></li>
        <li><p class="clearfix" @click="showModal(2)"><span class="color_gray fl">服务</span><span class=" fl">急速退货</span><span class="fl">·&nbsp;&nbsp;急速退款</span><span class="fl">·&nbsp;&nbsp;赠运费险</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="clearfix" @click="showModal(3)"><span class="color_gray fl">选择</span><span class=" fl">请选择 颜色分类/尺寸</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="clearfix" @click="showModal(4)"><span class="color_gray fl">参数</span><span class=" fl">品牌</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="clearfix" @click="showModal(5)"><span class="color_gray fl">送至</span><span class=" fl">{{adress}}</span><span class="color_gray fr mr0">&nbsp;&gt;</span></p></li>
        <li><p class="personNumberStyle">已有{{personNumber}}万人拼单</p></li>
        <li><mt-button type="danger" size="small" class="colorWhite" @click="showModal(3)">立刻购买</mt-button></li>
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
            <h4 class="modal-header">优惠券</h4>
            <ul class="modal-body">
              <li class="clearfix coupon">
                <div class="fl clearfix coupon_l">
                  <img src="../assets/logo.png" alt="" class="fl"/>
                  <div class="fl">
                    <p>50元优惠券</p>
                    <span>2018.01.01-2018.02.02</span>
                  </div>
                </div>
                <div class="fl clearfix coupon_r">
                  <mt-button type="default" size="small" :disabled="isDisabled" @click.native="getCoupon">{{couponStatus}}</mt-button>
                </div>
                
              </li>
              <li class="clearfix coupon">
                <div class="fl clearfix coupon_l">
                  <img src="../assets/logo.png" alt="" class="fl"/>
                  <div class="fl">
                    <p>50元优惠券</p>
                    <span>2018.01.01-2018.02.02</span>
                  </div>
                </div>
                <div class="fl clearfix coupon_r">
                  <mt-button type="default" size="small" :disabled="isDisabled" @click.native="getCoupon">{{couponStatus}}</mt-button>
                </div>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="popupShow=false">确定</mt-button>
          </div>
          <div class="modal-content" v-if="popupType==2">
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
          <div class="modal-content" v-if="popupType==3">
            <h4 class="modal-header clearfix borB">
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
                <mt-radio
                  title="颜色分类"
                  v-model="selColor" 
                  :options="[
                    '蓝色',
                    '黑色',
                    '白色'
                  ]"
                
                
                >

                </mt-radio>
              </li>
              <li>
                <mt-radio
                  title="内存"
                  v-model="selMemories" 
                  :options="[
                    '32g',
                    '64g',
                    '128g'
                  ]"
                
                
                >

                </mt-radio>
              </li>
              <li class="clearfix buyCount borB">
                <h5 class="fl">购买数量&nbsp;{{selCount}}</h5>
                <mt-range 
                  v-model="selCount" 
                  :min="1"
                  :max="10"
                  :step="1"
                  :bar-height="2"
                >
                <span slot="start">1</span>
                <span slot="end">10</span>
                </mt-range>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="addCommodity">加入购物车</mt-button>
          </div>
          <div class="modal-content" v-if="popupType==4">
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
          <div class="modal-content" v-if="popupType==5">
            <h4 class="modal-header">基础保障</h4>
            <ul class="modal-body">
              <li class="adress">
                <mt-picker :slots="slots" @change="selAdress" value-key="name"></mt-picker>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="popupShow=false">确定</mt-button>
          </div>
        </mt-popup>
      </div>
    </div>
</template>
<script type="text/javascript">
import Axios from 'axios'
import {Toast} from 'mint-ui'
export default {
  name: "commodity_details",
  data () {
    return {
      list:{
        'id':'10001',
        'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
        'price':11,
        'personNumber':222,
        'favorablePrice':12,
        'commodityTit':'小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
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
      popupType:'1'  ,
      selColor:'蓝色',
      selMemories:'64g',
      selCount:1,
      commodityId:'',
      url:'./src/assets/a.txt',
      isDisabled:false,
      couponStatus:'未领取',
      slots: [
        {
          flex: 1,
          values: this.getProvinceArr(),  //省,
          className: 'province',
          textAlign: 'left'
        }, 
        {
          divider: true,
          content: '-',
          className: 'divider'
        }, 
        {
          flex: 1,
          values: this.getCityArr('北京'),
          className: 'city',
          textAlign: 'left'
        }, 
        {
          divider: true,
          content: '-',
          className: 'divider'
        }, 
        {
          flex: 1,
          values: this.getDistrictArr('北京','北京市'),
          className: 'district',
          textAlign: 'left'
        }, 
        {
          divider: true,
          content: '-',
          className: 'divider'
        }, 
        {
          flex: 1,
          values: this.getStreetArr('北京','北京','大兴区'),
          className: 'street',
          textAlign: 'left'
        }
      ],
      adress:'北京大兴',
      regionInit:false,
      threeLevelAddress:[
        {
          "code": "110000",
          "name": "北京市",
          "children": [
            {
              "code": "110100",
              "name": "北京市",
              "children": [
                {
                  "code": "110101",
                  "name": "东城区",
                  "children":[
                    {
                      'code':'1111111111',
                      'name':'清源街道'
                    },
                    {
                      'code':'222222222',
                      'name':'兴丰街道'
                    },
                    {
                      'code':'333333333',
                      'name':'林校路街道'
                    },
                    {
                      'code':'444444444',
                      'name':'观音寺街道'
                    },
                    {
                      'code':'555555555',
                      'name':'天宫院街道'
                    },
                    {
                      'code':'666666666',
                      'name':'高米店街道'
                    },
                    {
                      'code':'777777777',
                      'name':'荣华街道'
                    },
                    {
                      'code':'888888888',
                      'name':'博兴街道'
                    }
                  ]
                },
                {
                  "code": "110102",
                  "name": "西城区"
                },
                {
                  "code": "110105",
                  "name": "朝阳区"
                },
                {
                  "code": "110106",
                  "name": "丰台区"
                },
                {
                  "code": "110107",
                  "name": "石景山区"
                },
                {
                  "code": "110108",
                  "name": "海淀区"
                },
                {
                  "code": "110109",
                  "name": "门头沟区"
                },
                {
                  "code": "110111",
                  "name": "房山区"
                },
                {
                  "code": "110112",
                  "name": "通州区"
                },
                {
                  "code": "110113",
                  "name": "顺义区"
                },
                {
                  "code": "110114",
                  "name": "昌平区"
                },
                {
                  "code": "110115",
                  "name": "大兴区"
                },
                {
                  "code": "110116",
                  "name": "怀柔区"
                },
                {
                  "code": "110117",
                  "name": "平谷区"
                },
                {
                  "code": "110128",
                  "name": "密云县"
                },
                {
                  "code": "110129",
                  "name": "延庆县"
                }
              ]
            }
          ]
        },
        {
          "code": "120000",
          "name": "天津市",
          "children": [
            {
              "code": "120100",
              "name": "天津市",
              "children": [
                {
                  "code": "120101",
                  "name": "和平区",
                  "children":[
                    {
                      'code':'1111111111',
                      'name':'清源街道'
                    },
                    {
                      'code':'222222222',
                      'name':'兴丰街道'
                    },
                    {
                      'code':'333333333',
                      'name':'林校路街道'
                    },
                    {
                      'code':'444444444',
                      'name':'观音寺街道'
                    },
                    {
                      'code':'555555555',
                      'name':'天宫院街道'
                    },
                    {
                      'code':'666666666',
                      'name':'高米店街道'
                    },
                    {
                      'code':'777777777',
                      'name':'荣华街道'
                    },
                    {
                      'code':'888888888',
                      'name':'博兴街道'
                    }
                  ]
                },
                {
                  "code": "120102",
                  "name": "河东区"
                },
                {
                  "code": "120103",
                  "name": "河西区"
                },
                {
                  "code": "120104",
                  "name": "南开区"
                },
                {
                  "code": "120105",
                  "name": "河北区"
                },
                {
                  "code": "120106",
                  "name": "红桥区"
                },
                {
                  "code": "120110",
                  "name": "东丽区"
                },
                {
                  "code": "120111",
                  "name": "西青区"
                },
                {
                  "code": "120112",
                  "name": "津南区"
                },
                {
                  "code": "120113",
                  "name": "北辰区"
                },
                {
                  "code": "120114",
                  "name": "武清区"
                },
                {
                  "code": "120115",
                  "name": "宝坻区"
                },
                {
                  "code": "120116",
                  "name": "滨海新区"
                },
                {
                  "code": "120121",
                  "name": "宁河县"
                },
                {
                  "code": "120123",
                  "name": "静海县"
                },
                {
                  "code": "120125",
                  "name": "蓟县"
                }
              ]
            }
          ]
        }
      ]
      /* adress:{
        'province':['北京','上海','广东'],  //省
        'city':[
          ['北京'],     //市
          ['上海'],
          ['广州','深圳','佛山']
        ],
        'district':[    //区
          ['大兴区','东城区','西城区','丰台区','朝阳区','海淀区'],
          ['黄浦区','徐汇区','长宁区'],
          ['越秀','海珠','荔湾','天河']
        ],  
        'street':[    //街道
          ['清源街道','兴丰街道','林校路街道','观音寺街道','天宫院街道','高米店街道','荣华街道','博兴街道'],
          ['南京东路','外滩','瑞金二路','淮海中路','豫园','打浦桥','老西门','小东门','五里桥','半淞园路'],
          ['洪桥街道','北京街道','六榕街道','流花街道','光塔街道','人民街道','东山街道']
        ]    
      }*/ 
    };
  },
  mounted(){
    this.commodityTit=this.list.commodityTit;
    this.price=this.list.price;
    this.personNumber=this.list.personNumber;
    this.favorablePrice=this.list.favorablePrice;
    this.commodityId=this.list.id;
    console.log(this.threeLevelAddress);
  },
  methods:{
    handleChange(index){
      this.imgNumber=index+1;
    },
    showModal(type){
      if(this.popupShow!=true){
        if(type==1){
          this.popupType=type;
          this.popupShow=true;
        }
        else{
          this.popupType=type;
          this.popupShow=true;
        }
      }
    },
    addCommodity(){
      console.log(this.commodityId+'=>'+this.selCount+'=>'+this.selMemories+'=>'+this.selColor);
      let _this=this;
      if(this.commodityId!=''&&this.selColor!=''&&this.selMemories!=''&&this.selCount!=''){
        Axios({
          method:'get',
          url:this.url,
          data:{
            'commodityId':this.commodityId,
            'selCount':this.selCount,
            'selMemories':this.selMemories,
            'selColor':this.selColor
          }
        }).then(function(res){
          console.log(res.data);
          console.error(res.data.dataS);
          _this.popupShow=false;
          if(res.data.dataS=='ok'){
            Toast({
              message: '提交数据成功',
              iconClass: 'icon icon-success'
            });
          }else{
            Toast({
              message: '提交数据失败'
            });
          }
        }).catch(function(error){
          console.log(error);
        });
      }else{
        console.log("添加商品信息出错");
      }
      
    },
    getCoupon(){
      if(this.isDisabled!=true){
        this.couponStatus='已领取';
        this.isDisabled=true;
      }else{
        return;
      }
      
    },
    selAdress(picker, values){
      console.log(picker);
      console.log(values);
      if (this.regionInit){
          //取值并赋值
        /* this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
        this.province = values[0]["name"];
        this.city = values[1]["name"];
        this.county = values[2]["name"];
        this.provinceCode = values[0]["code"];
        this.cityCode = values[1]["code"];
        this.countyCode = values[2]["code"]; */

        console.log(picker.getSlotValue(0));
        console.table(picker.getSlotValues(0));
        console.table(picker.getValues());
          //给市、县赋值
        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
        picker.setSlotValues(2, this.getDistrictArr(values[0]["name"], values[1]["name"]));
        picker.setSlotValues(3, this.getStreetArr(values[0]["name"], values[1]["name"],values[2]["name"]));
      }else {
        this.regionInit = true;
      }
    },
      //遍历json，返回省级对象数组
    getProvinceArr() {
      let provinceArr = [];
      this.threeLevelAddress.forEach(function (item) {
        let obj = {};
        obj.name = item.name;
        obj.code = item.code;
        provinceArr.push(obj);
      });
      return provinceArr;
    },
      //遍历json，返回市级对象数组
    getCityArr(province) {
      // console.log("省：" + province);
      let cityArr = [];
      this.threeLevelAddress.forEach(function (item) {
        if (item.name === province) {
          item.children.forEach(function (args) {
            let obj = {};
            obj.name = args.name;
            obj.code = args.code;
            cityArr.push(obj);
          });
        }
      });
      return cityArr;
    },
      //遍历json，返回县级对象数组
    getDistrictArr(province,city){
      let districtArr = [];
      this.threeLevelAddress.forEach(function(item){
        if (item.name === province){
          item.children.forEach(function (args) {
            if (args.name === city){
              args.children.forEach(function (param) {
                let obj = {};
                obj.name=param.name;
                obj.code=param.code;
                districtArr.push(obj);
              })
            }
          });
        }
      });
      // console.log(countyArr);
      return districtArr;
    },
    getStreetArr(province,city,district){
      let streetArr = [];
      this.threeLevelAddress.forEach(function(item){
        if (item.name === province){
          item.children.forEach(function (args) {
            if (args.name === city){
              args.children.forEach(function (param) {
                if(param.name===district){
                  param.children.forEach(function(str){
                    let obj = {};
                    obj.name=str.name;
                    obj.code=str.code;
                    streetArr.push(obj);
                  });
                }
              })
            }
          });
        }
      });
      // console.log(countyArr);
      return streetArr;
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
.modal-content{
  margin:0 .625rem;
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
  padding-bottom: .375rem;
}
.modal-dialog .modal-header .closeBtn_icon{
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
  margin:-28px 10px 0 0;
  background-color: #fff;
}
.commodityTip{
  text-align: left;
  color: #000;
  margin-top:.625rem;
}
.modal-header .commodityTip p{
  line-height:1.25rem;
}
.modal-body{
  max-height: 18.75rem;
  overflow-y: auto;
  margin-bottom: 20px;
}
.modal-body li h5,.modal-body li p{
  margin-bottom: .25rem;
}
.modal-body .coupon{
  margin-bottom: .625rem;
}
.modal-body .coupon>div{
  padding:6px;
  background-color: #fdf1e3;
  border-radius: .125rem;
}
.modal-body .coupon .coupon_r{
  background-color: #ff6501;
  height:4.125rem;
  vertical-align: middle;
  border-radius: 0 .125rem .125rem 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.adress .picker-slot{
  font-size: .75rem;
}
.modal-body .coupon p{color:#000;}
.modal-body .coupon span{color:#999;}
.modal-body .coupon p,.modal-body .coupon span{
  padding: 0;
  margin-left:.625rem;

}
.modal-body .coupon img{
  width:4.125rem;
  height:3.75rem;
  border:1px solid #000;
  padding:.125rem;
  border-radius: .125rem;
  background-color: #fff;
}
.buyCount{
  padding:.625rem 0;
}
.buyCount h5{
  line-height: 1.875rem;
  margin-right:.625rem;
  width:4.0625rem;
}
.buyCount .mt-range>span{
  margin:0 1.25rem;
  display: inline-block;
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
.borB{
  border-bottom: 1px solid #ccc;
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