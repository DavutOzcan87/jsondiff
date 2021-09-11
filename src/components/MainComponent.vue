

<template>
  <div class="main">
   <editor-component/>
   <editor-component/>
  </div>
</template>



<script>

import EditorComponent from './EditorComponent.vue'

export default {
  name: 'MainComponent',
  props: {
    msg: String
  },
  components:{
    EditorComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  display: flex;
  justify-content: space-around;
}
</style>
