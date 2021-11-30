<template>
    <div class="editor">
        <div v-bind:id="editorId" class="myeditor" />
    </div>
</template>

<script>
import { onMounted } from "vue";
import { editorService } from "./editorService";
export default {
    name: "EditorComponent",
    setup(props) {
        onMounted(() => {
            console.log("editor mounted");
            var editor = window.mc.editor.create(document.getElementById(props.editorId), {
                value: "{}",
                language: "json",
                theme: "vs-light",
            });
            console.log("editorService", editorService);
            editorService.editors[props.editorId] = editor;
            console.log(props.editorId, editor);
        });
    },
    props: {
        title: String,
        editorId: String,
    },
};
</script>

<style scoped>
.editor {
    width: 40vw;
    /* height: 200px; */
    flex-grow: 4;
    align-self: stretch;
}

.myeditor {
    margin-top: 10px;
    width: 100%;
    height: 80%;
}
</style>>