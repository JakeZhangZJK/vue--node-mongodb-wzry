<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <el-breadcrumb-item>{{text}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
 
<script>
export default {
  name: "Breadcrumb",
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
 
<style scoped>
</style>