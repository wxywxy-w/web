<template>
  <div class="about">
    <compabout/>
  </div>
</template>
<script>
// @ is an alias to /src
import compabout from '@/components/tixianComponent/compabout.vue'

export default {
  name: 'home',
  components: {
    compabout
  }
}
</script>