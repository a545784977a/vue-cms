<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">新闻标题</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:</span>
      <span>点击:0次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content">123</div>

    <!-- 评论子组件区域 -->
    <comment-box></comment-box>
  </div>
</template>

<script>
  // 导入评论子组件
  import comment from '../subcomponents/comment.vue'

  export default {
    data () {
      return {
        // id: this.$route.params.id
      }
    },
    methods: {
      getNewsList () {
        // 未获取数据
      }
    },
    components: {
      'comment-box': comment
    }
  }
</script>

<style lang="scss" scoped>
  .newsinfo-container {
    padding: 0 4px;

    .title {
      font-size: 16pz;
      text-align: center;
      margin: 15px 0;
      color: red;
    }

    .subtitle {
      font-size: 13px;
      color: blue;
      display: flex;
      justify-content: space-between;
    }

    .content {

    }
  }
</style>