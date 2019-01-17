<template>
  <div class="goodslist-container">

    <!-- 第一个卡片视图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :idFull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
          </p>
          <p>购买数量:<numbox></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsInfo.goods_no }}</p>
          <p>库存情况:{{ goodsInfo.stock_quantity }}</p>
          <p>上架时间:{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>

</template>

<script>
  import swiper from '../subcomponents/swiper.vue'
  import numbox from '../subcomponents/goodsinfo_numbox.vue'

  export default {
    data () {
      return {
        id: this.$route.params.id,
        lunbotu: [],
        goodsInfo: {},
      }
    },

    created () {
      this.getLunbotu();
      this.getGoodsInfo();
    },

    methods: {
      getLunbotu () {
        this.$http.get('api/getthumimages/' + this.id).then(result => {
          if (result.body.status === 0) {
            result.body.message.forEach(item => {
              item.img = item.src
            })
            this.lunbotu = result.body.message
          } else {
            console.log('goodsinfo轮播图获取失败...')
          }
        });
      },

      getGoodsInfo () {
        this.$http.get('api/goods/getinfo/' + this.id).then(result => {
          if (result.body.status === 0) {
            this.goodsInfo = result.body.message[0];
          } else {
            console.log('goodsInfo获取失败...')
          }
        })
      },

      goDesc (id) {
        this.$router.push('/home/goodsdesc/' + id);
      },

      goComment (id) {
        this.$router.push('/home/goodscomment/' + id);
      }
    },

    components: {
      swiper,
      numbox
    }
  }
</script>

<style lang="scss" scoped>
  .goodslist-container {
    background-color: #eee;

    .now_price {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }

    .mui-card-footer {
      display: block;

      button {
        margin: 15px 0;
      }
    }
  }
</style>