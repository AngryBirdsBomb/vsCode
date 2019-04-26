import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
let state={};
const mutations={
    
};
const actions={

};
const getters={
    searchItem:({state})=>(data)=>{
        let arr=[];
        data.list.forEach(element => {
            if(element.commodityTit.indexOf(data.key)!=-1){
                arr.push(element);
            }
        });
        //console.log(arr);
        return arr;
    }
};
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});