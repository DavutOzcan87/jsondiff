<template>
  <div class="controlPanel">
      <button class="btn" v-on:click="loadSample" value="Sample" >Load Sample</button>
      <button class="btn" v-on:click="compare" >Compare</button>
  </div>
</template>

<script>
import {editorService} from './editorService'

export default {
    name:"ControlPanelComponent",
    methods:{
        loadSample: function(){
            editorService.loadSampleData();
        },
        compare:function(){
            editorService.compare();
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
        
    }
</style>