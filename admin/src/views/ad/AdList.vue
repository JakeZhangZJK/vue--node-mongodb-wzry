<template>
  <div>
    <Breadcrumb text="广告位列表" />

    <el-card>
      <el-button  type="primary" icon="el-icon-plus" @click="addAd">添加广告位</el-button>
      <el-table :data="adList" border stripe>
        <el-table-column label="广告位名称" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="_delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      class="add-ad-dialog"
      :title="!this.model._id?'添加广告位':'编辑广告位'"
      :visible.sync="dialogVisible"
      @closed="dialogClose"
    >
      <el-form label-width="86px">
        <el-form-item label="广告位名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-button  type="primary" icon="el-icon-plus" size="itemssmall" @click="addAds">添加广告位信息</el-button>
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
          <el-col v-for="(item,i) in model.items" :key="i" :span="12" class="skill-item">
            <el-card>
              <el-tag>广告位{{i+1}}</el-tag>
              <el-form-item label="图片:" label-width="80px">
                <el-upload
                  class="avatar-uploader"
                  :action="action+'ad'"
                  :headers="token"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'img', res.url)"
                  :on-error="uploadErrHandler"
                >
                  <img class="ad-img" v-if="item.img" :src="item.img" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="跳转链接:" label-width="80px">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-button type="danger" @click="deleteAdInfo(i)">删除</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import Breadcrumb from '../../components/commom/Breadcrumb'

//导入网络请求函数
import { createAd, deleteAd, getAdList, getAd, updateAd } from 'network/admin/ad'


import { uploadMixin } from '../../common/mixins'

export default {
  name: "AdList",
  mixins: [uploadMixin],
  data() {
    return {
      //广告位列表数据
      adList: [],
      dialogVisible: false,
      //广告位数据
      model: {
        items: []
      },
      id: ''
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    //请求广告位列表数据
    async getAdList() {
      const res = await getAdList()
      this.adList = res.data
    },
    //监听编辑广告位按钮
    async edit(row) {
      this.id = row._id
      const res = await getAd(this.id)
      this.model = res.data
      this.dialogVisible = true
    },
    //监听删除广告位按钮
    async _delete(row) {
      try {

        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await deleteAd(row._id)
        if(!res) return
        this.$message.success('删除成功')
        this.getAdList()

      } catch (error) {
        this.$message.info('已取消删除')
      }

    },
    addAd() {
      this.dialogVisible = true
    },
    addAds() {
      this.model.items.push({})
    },
    async ok() {
      if (!this.model._id) {
        const res = await createAd(this.model)
        if (!res) return
        this.$message.success('创建广告位成功')
        this.getAdList()
        this.dialogVisible = false
      } else {
        const res = await updateAd(this.id, this.model)
        if (!res) return
        this.$message.success('编辑成功')
        this.getAdList()
        this.dialogVisible = false
      }
    },
    dialogClose() {
      this.model = { items: [] }
    },
    deleteAdInfo(i) {
      this.model.items.splice(i, 1)
    }
  },
  created() {
    this.getAdList()
  }
}
</script>
 
<style>
.ad-img {
  width: 280px;
  vertical-align: middle;
}
.el-tag {
  margin-bottom: 18px;
}
.el-card {
  padding: 10px 0;
}
.add-ad-dialog .el-dialog {
  width: 1000px;
}
</style>