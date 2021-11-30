<template>
    <Message v-if="info.text" severity="success" :closable="false" :sticky="true">{{ info.text }}</Message>
    <Message v-for="err of error.objs" severity="warn" :life="3000" :key="err.key" :sticky="false"
        >{{ err.text }}
    </Message>
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
            error: store.error,
            info: store.info,
        };
    },

    beforeUpdate() {
        console.log("before update", this.error, this.info);
    },

    components: {
        Message,
    },
};
</script>
    
<style>
</style>