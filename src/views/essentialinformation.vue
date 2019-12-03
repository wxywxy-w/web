<!--基本信息-->
<template>
  <div class="infocom">
    <div class="info-com">
      <div class="infoimg">
        <img v-bind:src="this.$store.state.session.headImg" alt="妈的，链接失效了" />
        <h1>修改头像</h1>
      </div>
      <div class="prore">
        <div class="a">
          <span class="info">个人资料</span>
          <span class="info">修改密码</span>
        </div>
        <div class="b">
          <p>账户名:</p>
          <p>创建时间:</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.infoimg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.infoimg > img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.prore {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.a {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>