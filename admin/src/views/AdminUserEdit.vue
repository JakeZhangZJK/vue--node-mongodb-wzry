<template>
  <div>
    <!-- 导航区 -->
    <Breadcrumb :breadcrumbItem="breadcrumbItem"></Breadcrumb>
    <el-card style="width:50%">
      <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="用户名">
          <el-input v-model="model.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import Breadcrumb from '../components/Breadcrumb'
  export default {
    components: {
      Breadcrumb
    },
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        breadcrumbItem: ['系统设置', '管理员', `${this.id ? '编辑管理员':'新建管理员'}`],
      };
    },
    methods: {
      // 编辑/保存数据
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/admin_users', this.model)
          this.model = res.data;
        }
        this.$router.push('/admin_users/list')
        if (this.id) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      },
      // 向后台请求需要编辑的数据
      async fetch() {
        const res = await this.$http.get(`rest/admin_users/${this.id}`);
        this.model = res.data;
      },
    },
    created() {
      this.id && this.fetch();
    }
  };
</script>
<style lang='less' scoped>
</style>