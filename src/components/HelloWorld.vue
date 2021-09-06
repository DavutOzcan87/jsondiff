

<template>
  <div class="hello">
   <span>Hello world controller works</span>
   <editor-component/>
   <editor-component/>
   <editor-component/>
  </div>
</template>



<script>

import EditorComponent from './EditorComponent.vue'

export default {
  name: 'HelloWorld',
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
