

<template>
    <div class="main">
        <editor-component title="left-component" editorId="editor-left" />
        <control-panel-component></control-panel-component>
        <editor-component title="right-component" editorId="editor-right" />
    </div>
</template>



<script>
import EditorComponent from "./EditorComponent.vue";
import ControlPanelComponent from "./ControlPanel.vue";

export default {
    name: "MainComponent",
    props: {
        msg: String,
    },
    components: {
        EditorComponent,
        ControlPanelComponent,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
    margin-top: 1em;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>
