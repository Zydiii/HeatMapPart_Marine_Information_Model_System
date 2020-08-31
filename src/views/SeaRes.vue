<template>
  <div id="seapage">
    <SeaMap></SeaMap>
  </div>
</template>

<script>
import SeaMap from '@/components/SeaMap.vue'

export default {
  name: 'SeaRes',
  components: {
    SeaMap
  }
}
</script>

<style scoped>
#seapage {
  margin: auto;
}
</style>
