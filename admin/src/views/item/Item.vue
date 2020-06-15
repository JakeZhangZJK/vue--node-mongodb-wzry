<template>
  <div>
    <breadcrumb text="装备列表" />
    <el-card>
      <el-button   type="primary" icon="el-icon-plus" @click="addItemClick">添加装备</el-button>
      <!-- 列表 -->
      <el-table :data="itemList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>{{scope.row.desc}}</div>
            <div class="item-detail">{{scope.row.detail}}</div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="装备名称" prop="name"></el-table-column>
        <el-table-column label="图标">
          <template slot-scope="scope">
            <img class="item-icon" :src="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column label="星级" prop="star"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="_delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pagenum"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="pageParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      :title="!this.formData._id?'添加装备':'编辑装备'"
      :visible.sync="dialogVisible"
      width="50%"
      @closed="dialogClose"
    >
      <el-form label-width="80px">
        <!-- 物品名称 -->
        <el-form-item label="物品名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <!-- 物品图标 -->
        <el-form-item label="物品图标">
          <el-upload
            class="avatar-uploader"
            :action="action+'item'"
            :headers="token"
            :show-file-list="false"
            :on-success="res=>$set(formData,'icon',res.url)"
          >
            <img v-if="formData.icon" :src="formData.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="星级">
          <el-rate show-score :max="3" v-model="formData.star"></el-rate>
        </el-form-item>
        <el-form-item label="物品简介">
          <el-input v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="物品详情">
          <el-input v-model="formData.detail"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button   type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
//导入网络请求函数
import axios from 'axios'

import { getItemList, createItem, getItem, updateItem, deleteItem } from 'network/admin/item'

import { uploadMixin } from '../../common/mixins'

import Breadcrumb from '../../components/commom/Breadcrumb'

export default {
  name: "ItemList",
  mixins: [uploadMixin],
  data() {
    return {
      //分类列表数据
      itemList: [],
      dialogVisible: false,
      // 添加表单数据
      formData: {},
      id: '',
      // 分页数据
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    //请求物品列表数据
    async getItemList() {
      const res = await getItemList(this.pageParams)
      this.total = res.data.total
      this.itemList = res.data.data
    },
    //监听编辑物品按钮
    async edit(row) {
      this.id = row._id
      const res = await getItem(row._id)
      if (!res) return
      res.data.star = Number(res.data.star)
      this.formData = res.data
      this.dialogVisible = true
    },
    //监听删除物品按钮
    async _delete(row) {
      try {

        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await deleteItem(row._id)
        if (!res) return 
        this.$message.success(res.data.message)
        this.getItemList()

      } catch (error) {
        this.$message.info('已取消删除')
      }

    },
    //添加装备
    async addItemClick() {
      this.dialogVisible = true
    },
    async ok() {

      if (!this.formData._id) {
        const res = await createItem(this.formData)
        if (!res) return this.$message.error('装备添加失败')
        this.$message.success('装备添加成功')
        this.getItemList()
        this.dialogVisible = false
      } else {
        const res = await updateItem(this.id, this.formData)
        if (!res) return this.$message.error('装备编辑失败')
        this.$message.success('装备编辑成功')
        this.getItemList()
        this.dialogVisible = false
      }
    },
    dialogClose() {
      this.formData = {}
    },
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getItemList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getItemList()
    }
  },
  created() {
    this.getItemList()
  }
}
</script>
 
<style scoped>
.item-icon {
  width: 45px;
  height: 45px;
}
.item-detail {
  padding-top: 10px;
}
</style>