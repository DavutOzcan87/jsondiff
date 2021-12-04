<template>
    <div class="legendcontainer">
        <span>Legends</span>
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
                <td><span>value changed</span></td>
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
    align-self: center;
}
.rectangle {
    height: 20px;
    width: 20px;
}
</style>