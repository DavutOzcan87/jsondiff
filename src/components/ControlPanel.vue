<template>
    <div class="controlPanel">
        <div class="top-area">
            <Button class="btn p-button-secondary" v-on:click="loadSample" value="Sample">Sample 1</Button>
            <Button class="btn p-button-secondary" v-on:click="loadSample2" value="Sample">Sample 2</Button>
            <Button class="btn p-button-secondary" v-on:click="loadSample3" value="Sample">Sample 3</Button>
            <Button class="btn p-button-secondary" v-on:click="compare">Compare</Button>
            <Button class="btn p-button-secondary" v-on:click="clear">Clear</Button>
        </div>
        <div class="bottom-area">
            <legend-component />
        </div>
    </div>
</template>

<script>
import { editorService } from "./editorService";
import store from "./store";
import LegendComponent from "./LegendComponent.vue";
export default {
    components: { LegendComponent },
    name: "ControlPanelComponent",
    methods: {
        loadSample: function () {
            editorService.loadSampleData(0);
        },
        loadSample2: function () {
            editorService.loadSampleData(1);
        },
        loadSample3: function () {
            editorService.loadSampleData(2);
        },
        compare: function () {
            store.clear();
            editorService.compare();
            if (editorService.diffCount == 0) {
                store.onNoDiffFound();
            }
        },
        clear: function () {
            editorService.clear();
            store.clear();
        },
    },
};
</script>

<style scoped>
.controlPanel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-top: 10px;
    height: 80%;
}
.btn {
    margin-top: 1em;
    min-width: 150px;
}

.top-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.bottom-area {
}
</style>