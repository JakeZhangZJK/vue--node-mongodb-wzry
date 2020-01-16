<!---->
<template>
    <div>
        <!-- card component -->
        <div class="card bg-white px-4 mt-3">
            <div class="card-header d-flex  py-3">
                <i class="iconfont" :class="`icon-${icon}`"></i>
                <div class="text fs-xl flex-1 px-2">{{title}}</div>
                <i class="iconfont icon-moreread"></i>
            </div>
            <div class="card-body  pt-3">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            icon: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style lang='scss'>
@import '../myassets/scss/_variables';
    .card {
        border-bottom: 1px solid $border-color;

        .card-header {
            border-bottom: 1px solid $border-color;
        }
    }
</style>