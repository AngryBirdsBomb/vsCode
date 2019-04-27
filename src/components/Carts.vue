<template>
    <div id="carts" class="carts">
      <mt-header title="购物车" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
      </mt-header>
      <mt-search
        v-model="searchKey"
        cancel-text="取消"
        placeholder="搜索">
      </mt-search>
      <div class="cartsListBox">
        <ul class="cartsList">
          <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <li class="cartsListItem" v-for="(item,index) in searchResult" :key="item.id">
              <p v-if="lists.length<=0">购物车已空!</p>
              <mt-cell-swipe v-if="searchResult.length>0"
              :title="item.commodityTit"
              :right="[
                {
                  content: '删除',
                  style: { background: 'red', color: '#fff' },
                  handler: () => delItem(item.id)
                }
              ]"
              :label="'商品ID:'+item.id"
              is-link 
            >
              <div class="selCommodityCountBox">
                <mt-button type="default" size="small" @click.native="changeCommodityCount('down',index)">-</mt-button>
                <input type="number" v-model="item.count" min="1">
                <mt-button type="default" size="small" @click.native="changeCommodityCount('up',index)">+</mt-button>
              </div>
            </mt-cell-swipe>
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
export default {
  name: "carts",
  data () {
    return {
      lists:[
        {
          'id':'10001',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'11小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
          
        },
        {
          'id':'10002',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'12小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10003',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'13小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10004',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'14小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10005',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'15小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10006',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'16小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10007',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'17小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10008',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'18小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10009',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'19小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        },
        {
          'id':'10010',
          'url':['./src/assets/1.jpeg','./src/assets/2.jpeg','./src/assets/3.jpeg','./src/assets/4.jpeg'],
          'price':11,
          'personNumber':222,
          'favorablePrice':12,
          'commodityTit':'22小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机小米手机',
          'favorable':1,
          'count':1
        }
      ],
      searchKey:''
    };
  },
  computed: {
    ...mapGetters([
      'searchItem'
    ]),
    searchResult(){
      return this.searchItem({'key':this.searchKey,'list':this.lists});
    }
  },
  methods:{
    delItem(id){
      this.lists.forEach((item)=>{
        let itemIndex=this.lists.indexOf(item);
        if(id==item.id){
          console.log(itemIndex);
          this.$messagebox('第'+this.lists[itemIndex].id+'号商品已删除!');
          this.lists.splice(itemIndex,1);
        }
      });
      
    },
    changeCommodityCount(changeType,index){
      const oldCount= this.searchResult[index].count;
      console.log(index);
      if(changeType=='up'){
          this.searchResult[index].count=parseInt(oldCount)+1;
      }
      else if(changeType=='down'){
        if(oldCount<=1){
          return;
        }else{
          this.searchResult[index].count=parseInt(oldCount)-1;
        }
      }
    }
  }
}
</script>
<style lang="" >
.carts{
  margin:.5rem;
}
.carts .mint-search{
  height:auto;
}
.carts .mint-search-list{
  display: none;
}
.carts .mint-searchbar{
  background-color: #26a2ff;
}
.carts .mint-searchbar-cancel{
  color:#fff;
}
.cartsList{
  margin:0 0 2.5rem;
  padding:10px 0;
  height: 28.75rem;
  overflow-y: auto;
}
.cartsListItem{
  text-align: left;
  line-height: 1.625rem;
}
.cartsListItem .mint-cell{
  background:none;
}
.cartsListItem:last-child{
  background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
.cartsListItem>p{
  text-align: center;
  line-height: 2.5rem;
  font-size: 1.25rem;
  color:#ccc;
}
.cartsListItem .mint-cell-title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .75rem;
  max-height: 5rem;
  flex: 3;
}
.cartsListItem .mint-cell-value{
  flex: 2;
}
.cartsListItem .mint-cell-right{
  right:1px;
}
.selCommodityCountBox{
  display: flex;
  display: -webkit-flex;
}
.selCommodityCountBox>button,.selCommodityCountBox>input{
  flex: 1;
  margin-left: .375rem;
}
.selCommodityCountBox>input{
  width:2.5rem;
  padding:0 .375rem;
  border:1px solid #ccc;
}
</style>