<template>
  <div>
    <breadcrumb text="分类列表" />
    <el-card>
      <el-button   type="primary" icon="el-icon-plus" @click="addCate">添加分类</el-button>
      <tree-table
        :data="cateList"
        show-index
        index-text="序号"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
      >
        <template slot="operate" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editCateClick(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteCateClick(scope.row)">删除</el-button>
        </template>
      </tree-table>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @closed="addDialogClose">
      <el-form label-width="80px">
        <el-form-item label="分类名称">
          <el-input maxlength="10" v-model.trim="newModel.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input maxlength="20" v-model.trim="newModel.desc"></el-input>
        </el-form-item>
        <el-form-item label="选择分类">
          <el-cascader
            :props="cateProps"
            :options="cateList"
            v-model="newModel.parent"
            clearable
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button   type="primary" @click="okAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="50%">
      <el-form label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input maxlength="20" v-model.trim="model.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
// 导入网络请求函数
import { createCate, getCate, updateCate, getCateList, deleteCate } from 'network/admin/category'

import Breadcrumb from '../../components/commom/Breadcrumb'

export default {
  name: "CategoryEdit",
  components: {
    Breadcrumb
  },
  data() {
    return {
      newModel: {},
      model: {},
      //分类列表数据
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: '_id',
        label: 'name',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      },
      columns: [
        {
          label: '分类名称',
          prop: 'name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center'
        }
      ],
      id: '',
      editDialogVisible: false,
      addDialogVisible: false
    }
  },
  methods: {
    //获取分类列表
    async getCateList() {
      const res = await getCateList()
      const data = res.data
      // 处理分类数据
      for (let item1 of data) {
        // 第一层
        if (item1.children && item1.children.length === 0) {
          item1.children = null
          continue
        }

        for (let item2 of item1.children) {
          // 第二层
          if (item2.children && item2.children.length === 0) {
            item2.children = null
            continue
          }

          for (let item3 of item2.children) {
            // 第三层
            item3.children = null
            item3.disabled = true
          }
        }
      }

      // console.log(data);

      this.cateList = data

    },
    handleChange() {
      // console.log(this.model.parent);
    },
    //添加分类
    addCate() {
      this.addDialogVisible = true
    },
    async okAdd() {
      const res = await createCate(this.newModel)
      if (!res) return 
      this.$message.success('添加分类成功')
      this.getCateList()
      this.addDialogVisible = false
    },
    addDialogClose() {
      this.newModel = {}
    },
    //编辑分类
    async editCateClick(row) {
      this.id = row._id
      const res = await getCate(row._id)
      // console.log(res.data);
      this.model = res.data
      this.editDialogVisible = true
    },
    async okEdit() {
      const res = await updateCate(this.id, this.model)
      if (!res) return 
      this.$message.success('编辑分类成功')
      this.getCateList()
      this.editDialogVisible = false
    },
    //删除分类
    async deleteCateClick(row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        if (row.children && row.children.length > 0) return this.$message.error('无法删除包含子分类的父级分类')

        const res = await deleteCate(row._id)
        if (!res) return 
        this.$message.success('删除分类成功')
        this.getCateList()
      } catch (error) {
        this.$message.info('已取消删除')
      }
    }
  },
  created() {
    this.getCateList()
  }
}
</script>
 
<style scoped>
</style>