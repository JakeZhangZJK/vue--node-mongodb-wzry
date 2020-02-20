<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}攻略</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" >
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" clearable ></el-input>
      </el-form-item>
       <el-form-item label="封面图">
            <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()" :show-file-list="false"
              :on-success="res => model.image = res.url" :before-upload="beforeAvatarUpload">
              <img v-if="model.image" :src="model.image" class="avatar">

              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
      <el-form-item label="正文">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 导入富文本编辑器
  import {
    VueEditor
  } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        model: {},
        categories: [],
      }
    },
    methods: {
        afterUpload(res) {
        this.model.image = res.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传封面图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 编辑/保存数据
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/guides/${this.id}`, this.model)
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/guides', this.model)
          this.model = res.data;
        }
        this.$router.push('/guides/list')
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
      // 获取数据列表
      async fetch() {
        const res = await this.$http.get(`rest/guides/${this.id}`)
        this.model = res.data
      },
      // 获取分类列表
      async fetchCatgories() {
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      },
      //在富文本编辑中上传图片
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post("upload", formData);
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      }
    },
    created() {
      this.fetchCatgories()
      this.id && this.fetch()
    }
  }
</script>