<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" clearable maxlength="25"></el-input>
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
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/articles/${this.id}`, this.model)
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/articles', this.model)
          this.model = res.data;
        }
        this.$router.push('/articles/list')
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
      async fetch() {
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.model = res.data
      },
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