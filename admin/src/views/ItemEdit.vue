<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}装备</h1>
    <el-form label-width="80px" @submit.native.prevent="save">

      <el-form-item label="名称">
        <el-input v-model="model.name" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" 
          :action="$http.defaults.baseURL + '/upload'" 
          :show-file-list="false"
          :on-success="afterUpload" 
          :before-upload="beforeAvatarUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">

          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
      };
    },
    methods: {
      afterUpload(res) {
        this.$set(this.model,'icon',res.url)
       
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 编辑/保存数据
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/items/${this.id}`, this.model);
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/items', this.model)
          this.model = res.data;
        }
        this.$router.push('/items/list')
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
        const res = await this.$http.get(`rest/items/${this.id}`);
        this.model = res.data;
      },
    },
    created() {
      this.id && this.fetch(); // 
    }
  };
</script>