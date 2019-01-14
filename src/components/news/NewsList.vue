<template>
  <div>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
          <router-link to="/home/newsinfo">
            <img class="mui-media-object mui-pull-left" src="#">
            <div class="mui-media-body">
              <h1>幸福</h1>
              <p class='mui-ellipsis'>
                <span>发表时间:2018-08-08 08:08:08</span>
                <span>点击:0次</span>
              </p>
            </div>
          </router-link>
        </li>

      </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      getNewsList () {
        // 未获取数据
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mui-table-view {
    li {
      h1 {font-size: 14px;}
      .mui-ellipsis {
        font-size: 12px;
        color: blue;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>