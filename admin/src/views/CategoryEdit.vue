<!--新建和编辑分类公用一个页面-->
<template>
  <div>
    <Breadcrumb :breadcrumbItem="breadcrumbItem"></Breadcrumb>
    <el-card>
      <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="上级分类">
          <el-select v-model="model.parent">
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input class="el-input-width" v-model="model.name" clearable maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="title">
          <el-input class="el-input-width" v-model="model.title" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Banner图">
          <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()" :show-file-list="false"
            :on-success="res => model.banner = res.url" :before-upload="beforeAvatarUpload">
            <img v-if="model.banner" :src="model.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        parents: [],
        breadcrumbItem: ['内容管理', '分类管理', `${this.id ? '编辑分类':'新建分类'}`],
      };
    },
    methods: {
      afterUpload(res) {
        this.model.banner = res.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 编辑/保存数据
      async save() {
        let res
        if (this.id) { // 通过判断id是否存在跳转至添加或者编辑页面
          res = await this.$http.put(`rest/categories/${this.id}`, this.model);
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/categories', this.model)
          this.model = res.data;
        }
        this.$router.push('/categories/list')
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
        const res = await this.$http.get(`rest/categories/${this.id}`);
        this.model = res.data;
      },
      // 获取父级分类列表
      async fetchParents() {
        const res = await this.$http.get(`rest/categories`);
        this.parents = res.data;
      }
    },
    created() {
      this.fetchParents();
      this.id && this.fetch(); // 

    }
  };
</script>
<style lang='less' scoped>
</style>