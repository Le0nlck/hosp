<template>
    <tr class="view-table-item">

    </tr>
</template>

<script>
    export default {
        name: 'ViewTableItem',
        props: {
            doctor: Object,
            number: String
        }
    }
</script>

<style scoped lang="scss">
    .view-table-item{
        display: flex;
    }
</style>
