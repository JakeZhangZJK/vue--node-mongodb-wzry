<!--新建和编辑分类公用这一个页面-->
<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{
    id:{}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    // 编辑/保存数据
  async save(){
    let res
    if(this.id){
       res = await this.$http.put(`categories/${this.id}`, this.model);
       this.model = res.data;

    }else{
      res = await this.$http.post('categories', this.model)
      this.model = res.data;

    }
      
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
// 向后台请求需要编辑的数据
   async fetch(){
     const res = await this.$http.get(`categories/${this.id}`);
     this.model = res.data;


    }
  },
  created(){
    this.id && this.fetch(); // 
  }
};
</script>
<style lang='less' scoped>
</style>