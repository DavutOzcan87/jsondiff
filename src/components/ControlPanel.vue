<template>
  <div class="controlPanel">
      <button class="btn" v-on:click="loadSample" value="Sample" >Sample 1</button>
      <button class="btn" v-on:click="loadSample2" value="Sample" >Sample 2</button>
      <button class="btn" v-on:click="loadSample3" value="Sample" >Sample 3</button>
      <button class="btn" v-on:click="compare" >Compare</button>
      <button class="btn" v-on:click="clear" >Clear</button>
  </div>
</template>

<script>
import {editorService} from './editorService'

export default {
    name:"ControlPanelComponent",
    methods:{
        loadSample: function(){
            editorService.loadSampleData(0);
        },
        loadSample2: function(){
            editorService.loadSampleData(1);
        },
        loadSample3: function(){
            editorService.loadSampleData(2);
        },
        compare:function(){
            editorService.compare();
        },
        clear: function () {
            editorService.clear();
        }
    }
}
</script>

<style scoped>
    .controlPanel{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .btn{
        margin-top: 1em;
        min-width: 250px;
    }
</style>