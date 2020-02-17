<!--视频列表-->
<!---->
<template>
  <div>
    <h1>装备列表</h1>
    <el-table :data="videos" border  stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="title" label="视频标题"></el-table-column>
       <el-table-column prop="image" label="封面图">
          <template slot-scope="scope">
        <img :src="scope.row.image" alt=""  style="height:3rem;">
      </template>
       </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="small"  circle
         @click="$router.push(`/videos/edit/${scope.row._id}`)"></el-button>

          <el-button type="danger" icon="el-icon-delete" size="small"  circle
         @click="remove(scope.row)"></el-button>
      </template>
      
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
    data() {
        return{
            videos:[]
        }
    },
    methods:{
      // 获取列表
      async  fetch(){
            const res = await this.$http.get('rest/videos');
            this.videos = res.data;
},
     // 删除
     async remove (row) {
        this.$confirm(`是否删除视频"${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/videos/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();// 刷新列表
        }).catch(() => {
                  
        });
     }
    },
    created(){
        this.fetch();// 在列表组件渲染成功后自动执行该方法获取数据库数据
    }
}
</script>
<style lang='scss' scoped>
</style>