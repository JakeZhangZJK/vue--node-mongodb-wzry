<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{id?'编辑':'创建'}}文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="所属分类">
          <el-select v-model="model.cate" placeholder="请选择所属分类" clearable multiple>
            <el-option
              v-for="item in cateList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button   type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
 
<script>
// 导入网络请求函数
import { createArticle, getArticle, updateArticle, getArticleList, articleImgUpload } from 'network/admin/article'
import { getCateList } from 'network/admin/category'

//导入富文本编辑器，需要注册组件
import { VueEditor } from 'vue2-editor'

export default {
  name: "ArticleEdit",
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      //文章数据
      model: {},
      //分类列表数据
      cateList: []
    }
  },
  methods: {
    // 保存新建或者编辑的文章
    async save() {
      if (!this.id) {
        const res = await createArticle(this.model)
        if(!res) return
        this.$message.success('创建文章成功')
        this.$router.push('/article/list')
      } else {
        const res = await updateArticle(this.id, this.model)
        if(!res) return
        this.$message.success('编辑文章成功')
        this.$router.push('/article/list')
      }
    },
    //处于编辑模式下，通过id查找需要编辑的文章
    async getArticle() {
      const res = await getArticle(this.id)
      this.model = res.data
    },
    //获取分类列表
    async getCateList() {
      const res = await getCateList()
      const data = res.data.find(item => item.name === '新闻资讯')
      this.cateList = data.children
      // console.log(data);

    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)

      const res = await articleImgUpload(formData)

      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader()

    }

  },
  created() {
    this.getCateList()
    this.id && this.getArticle()
  }
}
</script>
 
<style scoped>
</style>