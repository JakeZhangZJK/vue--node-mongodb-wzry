<template>
  <div>
    <Breadcrumb :breadcrumbItem="breadcrumbItem"></Breadcrumb>
    <el-card>
      <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="名称">
          <el-input class="el-input-width" v-model="model.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="广告">
          <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="24" v-for="(item,i) in model.items" :key="i">
              <el-form-item label="跳转链接" style="margin-top:1rem">
                <el-input class="el-input-width" v-model="item.url" clearable></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:1rem">
                <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()"
                  :show-file-list="false" :on-success="res => $set(item,'image',res.url) ">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" style="margin-left:5rem;" @click="model.items.splice(i,1)">删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:5rem;" native-type="submit">保存</el-button>
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
        model: {
          items: [],
        },
        breadcrumbItem: ['运营管理', '广告管理', `${this.id ? '编辑广告':'新建广告'}`],
      };
    },
    methods: {
      // 编辑/保存数据
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/ads/${this.id}`, this.model);
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/ads', this.model)
          this.model = res.data;
        }
        this.$router.push('/ads/list')
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
        const res = await this.$http.get(`rest/ads/${this.id}`);
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