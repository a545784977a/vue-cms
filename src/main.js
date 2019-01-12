//入口文件
import Vue from 'vue';

//导入路由的包
import VueRouter from 'vue-router';
Vue.use(VueRouter);//安装路由

//导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//导入MUI样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//导入router.js路由模块
import router from './router.js';


//导入mini-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);


//导入app组件
import app from './app.vue';

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router,
})