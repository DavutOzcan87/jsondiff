<template>
  <div class="controlPanel">
      <button value="Sample" >Load Sample</button>
      <span>Sample</span>
      <span>Sample</span>
      <span>Sample</span>
      <span>Sample</span>
  </div>
</template>

<script>
export default {
    name:"ControlPanelComponent"
}
</script>

<style scoped>
    .controlPanel{
        display: flex;
        flex-direction: column;
        background:#7F00FF;
    }
</style>