<!--面包屑导航组件-->
<template>
    <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,i) in breadcrumbItem" :key="i">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>
<script>
export default {
  name:'Breadcrumb',
  props:['breadcrumbItem'],
    data() {
        return{}
    },
    methods:{}
}
</script>
<style lang='less' scoped>

</style>