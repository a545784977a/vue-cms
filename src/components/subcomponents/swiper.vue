<template>
  <!-- 轮播图子组件 -->
  <div>

    <mt-swipe :auto="4000">
      <!-- 使用此轮播图组件,需传递轮播图 list -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
  export default {
    props: ["lunbotuList", "isfull"]
  }
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;

      img {
        height: 100%;
      }
    }
  }

  .full {
    width: 100%;
  }
</style>