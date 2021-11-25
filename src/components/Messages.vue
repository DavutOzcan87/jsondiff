<template>
    <Message v-if="info.text" severity="success" :closable="false" :sticky="true">{{ info.text }}</Message>
    <Message v-for="msg of errors" :severity="info" :life="3000" :key="msg" :sticky="false">{{ info }} </Message>
</template>
<script>
import store from "./store";
import Message from "primevue/message";

export default {
    setup() {
        console.log("store", store);
    },
    data() {
        return {
            errors: store.state.messages.errors,
            info: store.info,
        };
    },

    beforeUpdate() {
        console.log("before update", this.errors, this.info);
    },

    components: {
        Message,
    },
};
</script>
    
<style>
</style>