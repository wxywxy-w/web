<template>
  <div id="app3">
    <div id="nav">
      <router-link to="/index">活动详情</router-link> |
      <router-link to="/about">审核</router-link> |
      <router-link to="/revie">转账</router-link>|
    </div>
    <router-view/>
      <router-link class="return" to="/">返回</router-link>
  </div>
</template>

<style>

#app3 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app3>a{
  font-weight: bold;
  color: #2c3e50;
  font-size: 22px;
  /* line-height:10px; */
  text-decoration:underline;
}
#nav {
  padding: 30px;
  font-size: 22px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav:nth-child(4){
  float:right;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
