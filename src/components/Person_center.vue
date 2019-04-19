<template>
    <div id="person_center">
      <mt-header title="电脑数码" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
          <!-- <mt-button @click="handleClose" slot="right">关闭</mt-button> -->
          <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
</template>
<script type="text/javascript">
export default {
  name: "person_center",
  data () {
    return {
    };
  }
}
</script>
<style lang="" scoped>
</style>