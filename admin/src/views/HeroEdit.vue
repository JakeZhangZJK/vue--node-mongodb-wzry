<template>
  <div class="about">
    <h1>{{id?'编辑':'添加'}}英雄</h1>
    <el-form label-width="80px" @submit.native.prevent="save">

      <el-tabs value="basic" type="border-card">
        <!-- 基本信息tab -->
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name" clearable maxlength="4" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title" clearable maxlength="4" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="定位">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader"  
             :action="upLoadUrl" 
             :headers="getAuthHeaders()"
             :show-file-list="false"
             :on-success="afterUpload" :before-upload="beforeAvatarUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">

              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
           <el-form-item label="背景图">
            <el-upload class="avatar-uploader"  
             :action="upLoadUrl" 
             :headers="getAuthHeaders()"
             :show-file-list="false"
             :on-success="res => model.banner = res.url" :before-upload="beforeAvatarUpload">
              <img v-if="model.banner" :src="model.banner" class="avatar">

              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max='9' show-score v-model="model.scores.difficult" style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max='9' show-score v-model="model.scores.skills" style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max='9' show-score v-model="model.scores.attack" style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max='9' show-score v-model="model.scores.survive" style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="model.usageTips" clearable maxlength="500" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="model.battleTips" clearable maxlength="500" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="model.teamTips" clearable maxlength="500" show-word-limit></el-input>
          </el-form-item>

        </el-tab-pane>
        <!-- 技能tab -->
        <el-tab-pane label="技能" name="skills">
          <el-button style="margin-bottom:5px" size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称：">
                <el-input v-model="item.name" clearable maxlength="8" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="图标：">
                <el-upload class="avatar-uploader"
              :action="upLoadUrl" 
             :headers="getAuthHeaders()"
             :show-file-list="false"
             :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">

                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却：">
            <el-input v-model="item.delay" clearable maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="消耗：">
            <el-input v-model="item.cost" clearable maxlength="4" show-word-limit></el-input>
          </el-form-item>
              <el-form-item label="描述：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="item.description" clearable maxlength="1000" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="小提示：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="item.tips" clearable maxlength="200" show-word-limit></el-input>
              </el-form-item>
              <el-form-item >
               <el-button size="small" type="danger"
               @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>


        <!-- 英雄关系tab -->
        <el-tab-pane label="英雄关系" name="partners">
          <el-button style="margin-bottom:5px" size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i>最佳搭档</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
              <el-form-item label="英雄：">
                <el-select v-model="item.hero" filterable>
              <el-option v-for="hero of heroes" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
            </el-select>
              </el-form-item>
              
              <el-form-item label="描述：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="item.description" clearable maxlength="1000" show-word-limit></el-input>
              </el-form-item>
              
              <el-form-item >
               <el-button size="small" type="danger"
               @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>


      </el-tabs>


      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top:1rem;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        items: [], // 装备列表
        heroes:[],//英雄列表
        categories: [], // 英雄分类
        model: {
          name: '',
          avatar: '',
          banner: '',
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0
          },
          skills:[

          ],
          partners:[{
             hero:null,// 搭档英雄
             description: '',// 搭档英
          }]
        },
      };
    },
    methods: {
      afterUpload(res) {
        this.model.avatar = res.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 编辑/保存数据
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
          this.model = res.data;
        } else {
          res = await this.$http.post('rest/heroes', this.model)
          this.model = res.data;
        }
        this.$router.push('/heroes/list')
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
        const res = await this.$http.get(`rest/heroes/${this.id}`);
        this.model = res.data;
      },
      // 获取英雄分类列表（后期做优化）
      async getCategories() {
        const res = await this.$http.get(`rest/categories`);
        this.categories = res.data;
      },
      // 获取装备列表（后期做优化）
      async getItems() {
        const res = await this.$http.get(`rest/items`);
        this.items = res.data;
      },
       // 获取英雄列表（后期做优化）
      async getHeroes() {
        const res = await this.$http.get(`rest/heroes`);
        this.heroes = res.data;
      },
    },
    created() {
      this.getItems();
      this.getCategories();
      this.id && this.fetch(); // 
      this.getHeroes()
    }
  };
</script>