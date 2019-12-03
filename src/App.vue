<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
*{
  padding: 0px;
  margin:0px;
  border: 0px;
  
}
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
