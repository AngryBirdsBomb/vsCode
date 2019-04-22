<template>
    <div id="carts">
      <mt-header title="购物车" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
          <!-- <mt-button @click="handleClose" slot="right">关闭</mt-button> -->
          <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <mt-cell-swipe
        title="标题文字"
        :right="[
          {
            content: 'Delete',
            style: { background: 'red', color: '#fff' },
            handler: () => this.$messagebox('删除')
          }
        ]">
      </mt-cell-swipe>
    </div>
</template>
<script type="text/javascript">
export default {
  name: "carts",
  data () {
    return {
    };
  },
  components:{}
}
</script>
<style lang="" scoped>
</style>