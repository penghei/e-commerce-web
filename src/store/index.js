import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex);

export default new vuex.Store({
  state: {
    checkSelect:1,
    goodsList: [],
    selectedGoods:{},
    username:'',
    useravatarUrl:'',
    cascaderValue:[],
    shoppingCar:[],
    selectedFromCar:{}
  },
  mutations: {
    setCheck(state,data){
      state.checkSelect = data;
    },
    setGoodsList(state, data) {
      state.goodsList = data;
    },
    setSelectedGoodsInfo(state,data){
      state.selectedGoods = {...data}
    },
    emptySelectedGoods(state){
      state.selectedGoods = {};
    },
    setSelectedGoodsNum(state,data){
      state.selectedGoods["number"]=data
    },
    selectFromCar(state,data){
      state.selectedFromCar = data
    },
    setUserName(state,data){
      state.username = data
    },
    setavatar(state,data){
      state.useravatarUrl = data;
    },
    setCascader(state,data){
      state.cascaderValue = [...data];
    },
    emptyCascaderValue(state){
      state.cascaderValue = []
    },
    addShoppingCar(state,data){
      let foundGoods = state.shoppingCar.find(obj=>{
        return data.name === obj.name
      })
      if(foundGoods !== undefined){
        foundGoods.number += data.number
      }else{
        state.shoppingCar.push(data)
      }
    },
    changeShoppingCar(state,data){
      let newcar = state.shoppingCar.filter(obj=>{
        return obj.name !== data;
      })
      state.shoppingCar = [...newcar];
    },
    allPushShoppingCar(state,data){
      state.shoppingCar = [...data]
    }
  },
});
