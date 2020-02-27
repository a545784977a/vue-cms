<template>
  <div class="shopcar-container">
    <div class="goods-list">

    <!-- 商品列表区域 -->
    <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">

          <mt-switch
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div class="info">
            <h1>{{ item.title }}</h1>
            <p>
              <span class="price">￥{{ item.sell_price }}</span>
              <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
              <a href="#" @click.prevent="remove(item.id, i)">删除</a>
            </p>
          </div>

        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计</p>
            <p>已勾选 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件, 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import numbox from '../subcomponents/shopcar_numbox.vue';
  export default {
    data () {
      return {
        goodsList: []
      }
    },
    created () {
      this.getGoodsList()
    },

    methods: {
      getGoodsList () {
        var idArr = []
        this.$store.state.car.forEach(item => {
          idArr.push(item.id)
        })
        if (idArr.length <= 0) {
          return
        }

        this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
          if (result.body.status === 0) {
            this.goodsList = result.body.message
          }
        })

      },

      remove (id, index) {
        // 删除列表中的数据
        this.goodsList.splice(index, 1)
        // 删除 store 中的数据
        this.$store.commit('removeFromCar', id)

      },

      selectedChanged (id, val) {
        this.$store.commit('updateGoodsSelected', {id, selected: val})
      },
    },
    components: {
      numbox
    }
  }
</script>

<style lang="scss" scoped>
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;

    .goods-list {
      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }
      img {
        width: 60px;
        height: 60px;
      }
      h1 {
        font-size: 13px;
        margin-bottom: 10px;
      }
      .info {
        padding-left: 7px;

        .price {
          color: red;
          font-weight: bold;
        }
      }
    }

    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>