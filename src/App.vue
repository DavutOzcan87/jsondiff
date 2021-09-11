<template>
  <MainComponent msg="Welcome to Your Vue.js App" />
</template>

<script>
import MainComponent from "./components/MainComponent.vue";
window._ = require('lodash');
window.mc=require('monaco-editor');
//window._editor = require('vs/editor/editor.main');

export default {
  name: "App",
  components: {
    MainComponent,
  },
};
</script>



<style>
#app {
}
</style>
