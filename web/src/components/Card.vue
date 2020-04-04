<!---->
<template>
    <div>
        <!-- card component -->
        <div class="card bg-white px-4 mt-3">
            <div class="card-header ai-center d-flex pt-3 pb-2 border-bottom">
                <i class="iconfont" :class="`icon-${icon}`"></i>
                <div class="text fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
                <i class="iconfont icon-moreread" v-if="!plain"></i>
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
            plain: {
                type: Boolean,
            },
        },
        data() {
            return {
            }
        },
        methods: {}
    }
</script>
<style lang='scss'>
@import '../assets/scss/_variables';
    .card {
        border-bottom: 1px solid $border-color;

       
    }
</style>