<template>
  <div class="editor">
      <span>Editor Component</span>
      <div id="myeditor" class="myeditor" />
  </div>
 
</template>

<script>
import {onMounted} from 'vue'
export default {
    name:"EditorComponent",
    setup(){
        onMounted(()=>{
            console.log("editor mounted");
            window.mc.editor.create(document.getElementById('myeditor'), {
					value: '{}',
					language: 'json'
				});
        })
    }
}


</script>

<style scoped>
    .editor{
        background: red;
        width: 40vw;
        /* height: 200px; */
    }

    .myeditor{
        width: 640px;
        height: 480px;
        background: yellow;
    }
</style>>