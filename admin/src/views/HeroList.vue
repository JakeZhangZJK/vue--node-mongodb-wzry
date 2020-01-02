<!---->
<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="heroes" border  stripe>
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
       <el-table-column prop="avatar" label="英雄头像">
          <template slot-scope="scope">
        <img :src="scope.row.avatar" alt=""  style="height:3rem;">
      </template>
       </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small"
         @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>

          <el-button type="text" size="small"
         @click="remove(scope.row)">删除</el-button>
      </template>
      
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
    data() {
        return{
            heroes:[]
        }
    },
    methods:{

      // 获取分类列表
      async  fetch(){
            const res = await this.$http.get('rest/heroes');
            this.heroes = res.data;
},
     // 删除分类
     async remove (row) {
        this.$confirm(`是否删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/heroes/${row._id}`)
          
          res 

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
<style lang='less' scoped>
</style>