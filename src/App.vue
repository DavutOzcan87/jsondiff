<template>
    <Toast position="top-right" />
    <Header />
    <Messages />
    <MainComponent msg="Welcome to Your Vue.js App" />
</template>

<script>
import MainComponent from "./components/MainComponent.vue";
import Header from "./components/Header.vue";
import Messages from "./components/Messages.vue";
import Toast from "primevue/toast";
import { JsonParseException } from "./components/exceptions";
import store from "./components/store";
window._ = require("lodash");
window.mc = require("monaco-editor");
//window._editor = require('vs/editor/editor.main');

export default {
    name: "App",
    components: {
        MainComponent,
        Header,
        Toast,
        Messages,
    },

    errorCaptured(err, vm, info) {
        console.log("error captred", err, vm, info);
        // this.$toast.add({
        //     severity: "error",
        //     summary: "Something went wrong",
        //     detail: err,
        //     life: 3000,
        //     closable: false,
        // });
        if (err.msg != undefined) {
            store.onError(err.msg);
        }
        return false;
    },
};
</script>



<style>
#app {
    background-color: #d3d3d3;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

#app .p-message-info {
    background: #ffffffff;
    border: none;
}

#app .p-message-success {
    border: none;
}

body {
    margin: 0px;
}

.newLine {
    background: rgba(35, 155, 86, 0.4) !important;
}

.missingLine {
    background: rgba(255, 0, 0, 0.4) !important;
}

.valueChanged {
    background: rgba(197, 197, 26, 0.432) !important;
}

.p-messages {
    background: red;
    background-color: rebeccapurple;
}
</style>
