<template>
    <div class="controlPanel">
        <div class="top-area">
            <Button class="btn p-button-secondary" v-on:click="loadSample" value="Sample">Sample 1</Button>
            <Button class="btn p-button-secondary" v-on:click="loadSample2" value="Sample">Sample 2</Button>
            <Button class="btn p-button-secondary" v-on:click="loadSample3" value="Sample">Sample 3</Button>
            <Button class="btn p-button-secondary" v-on:click="compare">Compare</Button>
            <Button class="btn p-button-secondary" v-on:click="clear">Clear</Button>
            <Button
                class="btn p-button-secondary"
                v-on:click="onShowOnDiffClicked"
                :disabled="!compareClicked"
                :label="showOnlyChnagesLabel"
            ></Button>
        </div>
        <div class="bottom-area">
            <legend-component
                :additionCount="additionCount"
                :removalCount="removalCount"
                :valueChangeCount="valueChangeCount"
            />
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
    data() {
        return {
            compareClicked: false,
            additionCount: 0,
            removalCount: 0,
            valueChangeCount: 0,
            showOnlyChnagesLabel: "Show Only Diffs",
            onlyDiffShowed: false,
        };
    },
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
            this.$data.additionCount = this.$data.additionCount + 1;
            console.log("data", this.$data);
            this.$data.compareClicked = true;
            store.clear();
            editorService.compare();
            if (editorService.diffCount == 0) {
                store.onNoDiffFound();
            }
            const counts = editorService.getCounts();
            this.$data.additionCount = counts.adds;
            this.$data.removalCount = counts.removes;
            this.$data.valueChangeCount = counts.valueChanges;
        },
        clear: function () {
            editorService.clear();
            store.clear();
            editorService.showOriginalValues();
            this.$data.compareClicked = false;
            this.$data.additionCount = 0;
            this.$data.removalCount = 0;
            this.$data.valueChangeCount = 0;
            this.$data.onlyDiffShowed = false;
        },
        onShowOnDiffClicked() {
            editorService.showDiff();
            if (this.$data.onlyDiffShowed) {
                editorService.showOriginal();
            } else {
                editorService.showDiff();
            }

            this.$data.onlyDiffShowed = !this.$data.onlyDiffShowed;
            if (this.$data.onlyDiffShowed === true) {
                this.$data.showOnlyChnagesLabel = "Show Original";
            } else {
                this.$data.showOnlyChnagesLabel = "Show Only Diffs";
            }
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