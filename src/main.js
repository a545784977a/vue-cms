// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter);// 安装路由

// 导入时间插件
import moment from 'moment'

// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD hh:mm:ss') {
  return moment(dataStr).format(pattern)
});

// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据组织格式
Vue.http.options.emulateJSON = true

// 导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入router.js路由模块
import router from './router.js'


// 导入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

// Vue preview plugin
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 导入app组件
import app from './app.vue'

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router,
})