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
              <li>
                <ul class="rateBox">
                  <li class="clearfix">
                    <p class="fl">宝贝描述:</p>
                    <el-rate
                      v-model="rateCount1"
                      show-text
                      :texts="rateText"  
                      class="fl"
                    >
                    </el-rate>
                  </li>
                  <li class="clearfix rateBox">
                    <p class="fl">卖家服务:</p>
                    <el-rate
                      v-model="rateCount2"
                      show-text
                      :texts="rateText"  
                      class="fl"
                    >
                    </el-rate>
                  </li>
                  <li class="clearfix rateBox">
                    <p class="fl">物流服务:</p>
                    <el-rate
                      v-model="rateCount3"
                      show-text
                      :texts="rateText"  
                      class="fl"
                    >
                    </el-rate>
                  </li>
                </ul>
              </li>
              <li v-for="(item,index) in list.url" :key="index">
                <img v-lazy="item">
                <p>{{info}}</p>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <ul class="evaluationList">
              <li v-for="(item,index) in evaluation" :key="index" v-cloak>
                <div class="clearfix evaluationInfo">
                  <div class="userInfo fl">
                      <img src="../assets/logo.png" />
                      <p>{{item.userName}}</p>
                  </div>
                  <div class="fl userEvaluation">
                    <el-rate
                      v-model="item.rateCount"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    >
                    </el-rate>
                    <h5>{{item.content}}</h5>
                  </div>
                </div>
                
                <div class="clearfix color_gray">
                  <span class="fl">{{item.time | getNowTime}}</span>
                  <p class="fr clearfix evaluationCount">
                    <span v-if="item.up>99" class="clearfix fl">
                      <mt-button  type="default" class="fl" size="small" @click.native="addUp(1,index)">顶</mt-button><mt-badge size="small" class="fl" type="success">99+</mt-badge>
                    </span>
                    <span v-if="item.up<=99" class="clearfix fl">
                      <mt-button  type="default" size="small" class="fl" @click.native="addUp(1,index)">顶</mt-button><mt-badge class="fl" size="small" type="success">{{item.up}}</mt-badge>
                    </span>
                    <span v-if="item.down>99" class="clearfix fl">
                      <mt-button  type="default" class="fl" size="small" @click.native="addUp(2,indx)">踩</mt-button><mt-badge size="small" class="fl" type="error">99+</mt-badge>
                    </span>
                    <span v-if="item.down<=99" class="clearfix fl">
                      <mt-button  type="default"class="fl"  size="small" @click.native="addUp(2,index)">踩</mt-button><mt-badge size="small" class="fl" type="error">{{item.down}}</mt-badge>
                    </span>
                  </p>
                </div>
              </li>
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
                  <mt-button type="default" size="small" :disabled="isDisabled1" @click.native="getCoupon(1)">{{couponStatus1}}</mt-button>
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
                  <mt-button type="default" size="small" :disabled="isDisabled2" @click.native="getCoupon(2)">{{couponStatus2}}</mt-button>
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
            <ul class="modal-body selTypeBox">
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
            <h4 class="modal-header infoHeader">基本信息</h4>
            <ul class="modal-body infoBox">
              <li>
                <h5>主体参数</h5>
                <p>
                  <mt-cell title="产品品牌">小米（MI）</mt-cell>
                  <mt-cell title="认证型号">L55M5-AD</mt-cell>
                  <mt-cell title="产品型号">L55M5-AD</mt-cell>
                  <mt-cell title="产品颜色">亚光黑</mt-cell>
                  <mt-cell title="产品类型">4K超清电视；人工智能电视</mt-cell>
                  <mt-cell title="推荐观看距离(米)">2.5m-3m（46-55英寸）</mt-cell>
                  <mt-cell title="上市日期">2017.3</mt-cell>
                  <mt-cell title="能效等级">3级</mt-cell>
                </p>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="popupShow=false">确定</mt-button>
          </div>
          <div class="modal-content" v-if="popupType==5">
            <h4 class="modal-header">送至</h4>
            <ul class="modal-body">
              <li class="adress">
                <h3 v-text="adressInfo" class="adressInfo"></h3>
                <mt-picker :slots="slots" @change="selAdress" value-key="name"></mt-picker>
              </li>
            </ul>
            <mt-button class="closeBtn" type="danger" @click="addAdress">确定</mt-button>
          </div>
        </mt-popup>
      </div>
    </div>
</template>
<script type="text/javascript">
import Axios from 'axios'
import {Toast,picker} from 'mint-ui'
/* const dataJson= ()=>import('../assets/data.json') 
const aJson= ()=>import('../assets/a.json') */
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
      evaluation:[
        {
          'id':1,
          'up':1111,
          'down':1,
          'content':'评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名用户名用户名'
        },
        {
          'id':2,
          'up':1222,
          'down':1,
          'content':'评价内容1299993',
          'time':Date.now(),
          'rateCount':3,
          'userName':'用户名'
        },
        {
          'id':3,
          'up':1,
          'down':1,
          'content':'评价内容1888823',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':4,
          'up':1,
          'down':13333,
          'content':'评价内容1777723',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':5,
          'up':133,
          'down':1,
          'content':'评价内容1666623',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':6,
          'up':1,
          'down':1,
          'content':'评价内容1555523',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':7,
          'up':1,
          'down':1,
          'content':'评价内容1444423',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':8,
          'up':1,
          'down':1,
          'content':'评价内容1233333',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':9,
          'up':1,
          'down':1,
          'content':'评价内容1222223',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        },
        {
          'id':10,
          'up':1,
          'down':1,
          'content':'评价内容1111123',
          'time':Date.now(),
          'rateCount':5,
          'userName':'用户名'
        }
      ],
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
      isDisabled1:false,
      isDisabled2:false,
      couponStatus1:'立即领取',
      couponStatus2:'立即领取',
      rateText:['差评','失望','一般','满意','惊喜'],
      rateCount1:5,
      rateCount2:5,
      rateCount3:5,
      /* slots: [],  */
      adress:'北京市-大兴区',
      adressInfo:'',
      regionInit:false,
      threeLevelAddress:[]/* adress:{
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
    Axios({
      method:'get',
      url:'dist/data/data.json',
      data:{}
    }).then((res)=>{
      console.log(res.data);
      this.threeLevelAddress=res.data;
      this.regionInit=true;
    });
    
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
          url:'dist/data/a.json',
          data:{
            'commodityId':this.commodityId,
            'selCount':this.selCount,
            'selMemories':this.selMemories,
            'selColor':this.selColor
          }
        }).then(function(res){
          console.log(res.data);
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
    getCoupon(id){
      if(this.isDisabled1!=true&&id==1){
        this.couponStatus1='已领取';
        this.isDisabled1=true;
      }else if(this.isDisabled2!=true&&id==2){
        this.couponStatus2='已领取';
        this.isDisabled2=true;
      }else{
        this.popupShow=false;
        Toast({
          message:'已经领取过，请不要重复领取！'
        });
        return;
      }
      
    },
    addAdress(){
      this.popupShow=false;
      console.log(this.adressInfo);
      this.adress=this.adressInfo;
    },
    selAdress(picker, values){
      //console.log(picker);
      //console.log(values);
      if (this.regionInit){
          //取值并赋值
        /* this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
        this.province = values[0]["name"];
        this.city = values[1]["name"];
        this.county = values[2]["name"];
        this.provinceCode = values[0]["code"];
        this.cityCode = values[1]["code"];
        this.countyCode = values[2]["code"]; */

        //console.log(picker.getSlotValue(0));
        //console.table(picker.getSlotValues(0));
        //console.table(picker.getValues());
          //给市、县赋值
        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
        picker.setSlotValues(2, this.getDistrictArr(values[0]["name"], values[1]["name"]));
        picker.setSlotValues(3, this.getStreetArr(values[0]["name"], values[1]["name"],values[2]["name"]));
        let arr=[];
        picker.getValues().forEach((item)=>{
          arr.push(item.name);
        });
        this.adressInfo=arr.join('-');
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
    },
    addUp(addType,index){
      //localStorage.clear();
      if(localStorage.getItem(this.evaluation[index].id)){
        if((JSON.parse(localStorage.getItem(this.evaluation[index].id)).up)<(this.evaluation[index].up)&&addType==1){
          Toast({
              message: '已经赞过，请不要重复提交!'
          });
          return;
        }
        else if((JSON.parse(localStorage.getItem(this.evaluation[index].id)).down)<(this.evaluation[index].down)&&addType==2){
          Toast({
              message: '已经踩过，请不要重复提交!'
          });
          return;
        }else{
          if(addType==1){
            let oldCount=this.evaluation[index].up;
            this.evaluation[index].up=oldCount+1;
            console.log(localStorage.getItem(this.evaluation[index].id));
          }
          else if(addType==2){
            let oldCount=this.evaluation[index].down;
            this.evaluation[index].down=oldCount+1;
            console.log(localStorage.getItem(this.evaluation[index].id));
          }
        }
      }else{
        let obj={};
        obj.up=this.evaluation[index].up;
        obj.down=this.evaluation[index].down;
        localStorage.setItem(this.evaluation[index].id,JSON.stringify(obj));
        if(addType==1){
          let oldCount=this.evaluation[index].up;
          this.evaluation[index].up=oldCount+1;
        }
        else if(addType==2){
          let oldCount=this.evaluation[index].down;
          this.evaluation[index].down=oldCount+1;
        }
      }
      
    }
  },
  filters:{
    'getNowTime'(input){
        let oDate=new Date(input);
        const MM=(oDate.getMonth()+1)<10? '0'+(oDate.getMonth()+1):(oDate.getMonth()+1);
        const DD=oDate.getDate()<10?'0'+oDate.getDate():oDate.getDate();
        const hh=oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours();
        const mm=oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes();
        const ss=oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds();
        return oDate.getFullYear()+'-'+MM+'-'+DD+' '+hh+':'+mm+':'+ss;
    }

  },
  computed: {
    slots(){
        return [
          {
            'flex': 1,
            'values': this.getProvinceArr(),  //省,
            'className': 'province',
            'textAlign': 'left'
          }, 
          {
            'divider': true,
            'content': '-',
            'className': 'divider'
          }, 
          {
            'flex': 1,
            'values': this.getCityArr('北京市'),
            'className': 'city',
            'textAlign': 'left'
          }, 
          {
            'divider': true,
            'content': '-',
            'className': 'divider'
          }, 
          {
            'flex': 1,
            'values': this.getDistrictArr('北京市','北京市'),
            'className': 'district',
            'textAlign': 'left'
          }, 
          {
            'divider': true,
          'content': '-',
            'className': 'divider'
          }, 
          {
            'flex': 1,
            'values': this.getStreetArr('北京市','北京市','大兴区'),
            'className': 'street',
            'textAlign': 'left'
          }
        ]
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
.commodity_details{
  margin:.5rem;
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
.rateBox{
  margin-bottom:.625rem;
}
.commodityListTab .mint-tab-container-item .rateBox .el-rate{
  margin-top:.25rem;
}
.commodityListTab .mint-tab-container-item .rateBox p{
  text-indent:0;
  margin: 0 .625rem;
  line-height:1.875rem;
}
.selTypeBox .mint-radiolist-label{
  font-size:.75rem;
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
.modal-body .coupon .coupon_l{
  width:13.125rem;
}
.modal-body .coupon .coupon_r{
  background-color: #ff6501;
  height:4.125rem;
  vertical-align: middle;
  border-radius: 0 .125rem .125rem 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  width:3.75rem;
  justify-content:center;
}
.coupon_r .mint-button--small{
  font-size:.75rem;
  padding:0 .375rem;
  width:3.75rem;
}
.adress>.adressInfo{
  text-align: center;
  line-height: 1.5rem;
  margin: 0;
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
.modal-dialog .modal-header.infoHeader{
  margin-bottom:0;
  padding-bottom:0;
}
.infoBox h5{
  font-size:.75rem;
}
.infoBox p{
  padding-left:0;
  font-size:.75rem;
}
.infoBox .mint-cell-wrapper{
  font-size:.75rem;
}
.evaluationList li{
  line-height:1.625rem;
}
.evaluationList li h5{
  margin:0 0 .375rem 0; 
  max-height:6.5em;
  overflow:hidden;
  text-overflow:ellipsis;
  position:relative;
}
.evaluationList li h5::after{
  position:absolute;
  content:'...';
  right:0;
  bottom:0;
  padding-left:40px;
}
.evaluationList p{
  margin:0;
}
.commodityListTab .evaluationList .mint-badge{
  text-indent:0;
  width:1.875rem;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.evaluationInfo{
  display:-webkit-flex;
  display:flex;
  align-items: center;
}
.commodityListTab .evaluationList li{
  padding-bottom:.625rem;
  margin-bottom:.625rem;
  border-bottom:1px solid #ccc;
}
.commodityListTab .evaluationList li:last-child{
  border-bottom:none;
}
.userInfo{
  flex:1 1 5rem;
  text-align:center;
}
.commodityListTab .userInfo img{
  width:3.125rem;
  height:3.125rem;
  background-color:#fff;
  padding:.125rem;
  border-radius:.25rem;
  border:1px solid #000;
}
.commodityListTab .userInfo p{
  text-indent:0;
}
.userEvaluation{
  flex:2 2 13.75rem;
  margin-left:.625rem;
}
.evaluationCount>span>button{
  height:1.5rem;
  margin:0 .375rem;
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