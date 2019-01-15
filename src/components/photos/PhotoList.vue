<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
              推荐
            </a>
            <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
              热点
            </a>
            <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
              北京
            </a>
            <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
              社会
            </a>
            <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
              娱乐
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  // 导入 mui 包
  import mui from '../../lib/mui/js/mui.min.js'
  // 初始化 mui 滑动控件

  export default {
    data () {
      return {
        cates: []
      };
    },
    created () {
      this.getAllCategory();
    },
    mounted () {
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
      });
    },
    methods: {
      getAllCategory () {
        // 获取所有的图片分类
        // this.$http.get("www.liulongbing.top:3005/api/getimgcategory").then(result => {
        //   if (result.body.status === 0) {
        //     result.body.message.unshift({ title: "全部", id: 0 });
        //     this.cates = result.body.message;
        //   }
        // });
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    touch-action: pan-y;
  }
</style>