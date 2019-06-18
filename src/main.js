// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter);// 安装路由

// veux
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car // 将购物车中的商品数据用数组存起来
  },

  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar (state, goodsinfo) { // 点击加入购物车,把商品信息保存到 car 中
      // 假设 car 中没有数据
      var flag = false

      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 将数据写入本地存储 localStoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    updateGoodsInfo (state, goodsinfo) { // 更新购物车中的商品数量
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })

      // 将数据写入本地存储 localStoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    removeFromCar (state, id) { // 根据 id 从 store 中删除数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })

      // 将数据写入本地存储 localStoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    updateGoodsSelected (state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })

      // 将数据写入本地存储 localStoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },

  getters: { // this.$store.getters.***
    getAllCount (state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })

      return c
    },

    getGoodsCount (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },

    getGoodsSelected (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },

    getGoodsCountAndAmount (state) {
      var o = {
        count: 0,
        amount: 0
      }

      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

import moment from 'moment'

// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD hh:mm:ss') {
  return moment(dataStr).format(pattern)
});

import VueResource from 'vue-resource'
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据组织格式
Vue.http.options.emulateJSON = true

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import router from './router.js'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import app from './app.vue'

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router,
  store
})