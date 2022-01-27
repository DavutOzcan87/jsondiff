<template>
    <div class="legendcontainer">
        <table>
            <tr>
                <td><div class="rectangle missingLine"></div></td>
                <td><span>property removal</span></td>
                <td><span v-text="removalCount"></span></td>
            </tr>
            <tr>
                <td><div class="rectangle newLine"></div></td>
                <td><span>property addition</span></td>
                <td><span v-text="additionCount"></span></td>
            </tr>
            <tr>
                <td><div class="rectangle valueChanged"></div></td>
                <td><span>value change</span></td>
                <td><span v-text="valueChangeCount"></span></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "LevendComponent",
    props: {
        additionCount: Number,
        removalCount: Number,
        valueChangeCount: Number,
    },
};
</script>

<style scoped>
.legendcontainer {
    font-size: small;
}
.rectangle {
    height: 1em;
    width: 1em;
}
</style>