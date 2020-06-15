<template>
  <div>
    <breadcrumb text="英雄列表" />
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input  maxlength="8" clearable placeholder="请输入英雄名称" v-model="heroQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left:20px" type="primary" icon="el-icon-search" @click="searchHero">搜索</el-button>
        </el-col>
        <el-col :span="4" >
          <el-button type="primary" icon="el-icon-plus" @click="addHeroClick">添加英雄</el-button>
        </el-col>
      </el-row>
      
      <el-table :data="heroList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="skills" v-for="item in scope.row.skills" :key="item._id">
              <div class="skill">
                <img class="skill-icon" :src="item.icon" />
                <h3>{{item.name}}</h3>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="英雄名称" prop="name"></el-table-column>
        <el-table-column label="英雄称号" prop="title"></el-table-column>
        <el-table-column label="所属分类" border stripe>
          <template slot-scope="scope">
            <span>{{scope.row.cate.map(item => item.name).join('/')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img class="hero-avatar" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="_delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>
 
<script>
//导入网络请求函数
import { deleteHero, getHeroList, getHero } from 'network/admin/hero'

import Breadcrumb from '../../components/commom/Breadcrumb'

export default {
  name: "HeroList",
  components: {
    Breadcrumb
  },
  data() {
    return {
      //英雄列表数据
      heroList: [],
      // 分页数据
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      heroQuery: ''
    }
  },
  methods: {
    //请求英雄列表数据
    async getHeroList() {
      const res = await getHeroList(this.pageParams)
      this.total = res.data.total
      this.heroList = res.data.data
    },
    // 添加英雄
    addHeroClick() {
      this.$router.push('/hero/create')
    },
    //监听编辑英雄按钮
    async edit(row) {
      const res = await getHero(row._id)
      this.$router.push(`/hero/edit/${row._id}`)
    },
    //监听删除英雄按钮
    async _delete(row) {
      try {

        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await deleteHero(row._id)
        if(!res) return
        this.$message.success(res.data.message)
        this.getHeroList()

      } catch (error) {
        this.$message.info('已取消删除')
      }

    },
    async searchHero() {
      this.pageParams.query = this.heroQuery
      this.pageParams.pagenum = 1
      this.getHeroList(this.pageParams)
    },
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getHeroList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getHeroList()
    }
  },
  created() {
    this.getHeroList()
  }
}
</script>
 
<style scoped>
.hero-avatar {
  width: 50px;
  height: 50px;
}
.skills {
  padding: 0 50px;
  width: 485px;
  margin: 0 auto;
}
.skill {
  float: left;
  margin: 0 20px;
  font-size: 12px;
}
.skill h3 {
  font-weight: normal;
  margin: 10px 0;
}
.skill-icon {
  width: 50px;
  height: 50px;
}
</style>