<template>
  <div>
    <Breadcrumb text="用户列表" />

    <el-card>
      <el-button   type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
      <el-table :data="adminUserList" border stripe>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="权限等级" prop="level"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="_delete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="!this.model._id?'添加用户':'编辑用户'"
      :visible.sync="dialogVisible"
      width="50%"
      @closed="dialogClose"
    >
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item v-if="!this.model._id" label="权限等级">
          <el-input v-model="model.level"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
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
import Breadcrumb from '../../components/commom/Breadcrumb'

//导入网络请求函数
import { deleteAdminUser, getAdminUserList, createAdminUser, updateAdminUser, getAdminUser } from 'network/admin/adminUser'

export default {
  name: "AdminUserList",
  data() {
    return {
      //分类列表数据
      adminUserList: [],
      //数据
      model: {},
      dialogVisible: false
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    //请求物品列表数据
    async getAdminUserList() {
      const res = await getAdminUserList()
      this.adminUserList = res.data
    },
    addUser() {
      this.dialogVisible = true
    },
    //监听编辑用户按钮
    async edit(row) {
      this.id = row._id
      const res = await getAdminUser(this.id)
      this.model = res.data
      this.dialogVisible = true
    },
    async ok() {
      if (!this.model._id) {
        const res = await createAdminUser(this.model)
        if (!res) return
        this.$message.success('创建用户成功')
        this.getAdminUserList()
        this.dialogVisible = false
      } else {
        const res = await updateAdminUser(this.id, this.model)
        if (!res) return
        this.$message.success('编辑用户成功')
        this.getAdminUserList()
        this.dialogVisible = false
      }
    },
    //监听删除物品按钮
    async _delete(row) {
      try {

        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await deleteAdminUser(row._id)
        this.$message.success(res.data.message)
        this.getAdminUserList()

      } catch (error) {
        this.$message.info('已取消删除')
      }

    },
    dialogClose() {
      this.model = {}
    }
  },
  created() {
    this.getAdminUserList()
  }
}
</script>
 
<style scoped>
</style>