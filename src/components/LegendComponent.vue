<template>
    <div class="legendcontainer">
        <table>
            <tr>
                <td><div class="rectangle missingLine"></div></td>
                <td><span>property removal</span></td>
            </tr>
            <tr>
                <td><div class="rectangle newLine"></div></td>
                <td><span>property addition</span></td>
            </tr>
            <tr>
                <td><div class="rectangle valueChanged"></div></td>
                <td><span>value change</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "LevendComponent",
    setup() {},
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