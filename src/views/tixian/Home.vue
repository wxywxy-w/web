<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/tixianComponent/comphome.vue'

export default {
  name: 'index',
  components: {
    HelloWorld
  }
}
</script>
