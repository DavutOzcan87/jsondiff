<template>
    <Message severity="success" :closable="false" :life="3000" :sticky="false">Order Submitted</Message>
    <Message v-for="msg of errors" :severity="warn" :life="3000" :key="msg" :sticky="false">{{ msg }} </Message>
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
        };
    },
    components: {
        Message,
    },
};
</script>