<template>
  <div>
    <breadcrumb :text="id?'编辑英雄':'添加英雄'" />
    <el-card>
      <el-form label-width="100px">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <!-- 英雄名称 -->
            <el-form-item label="英雄名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <!-- 英雄称号 -->
            <el-form-item label="英雄称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>
            <!-- 英雄类型 -->
            <el-form-item label="英雄定位" v-if="heroCateList">
              <el-select v-model="model.cate" placeholder="请选择英雄分类" multiple>
                <el-option v-for="item in heroCateList" :label="item.name" :key="item._id" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 难度 -->
            <el-form-item label="难度">
              <el-rate show-score :max="10" v-model="model.scores.difficulty"></el-rate>
            </el-form-item>
            <!-- 技能 -->
            <el-form-item label="技能">
              <el-rate show-score :max="10" v-model="model.scores.skill"></el-rate>
            </el-form-item>
            <!-- 攻击 -->
            <el-form-item label="攻击">
              <el-rate show-score :max="10" v-model="model.scores.attack"></el-rate>
            </el-form-item>
            <!-- 生存 -->
            <el-form-item label="生存">
              <el-rate show-score :max="10" v-model="model.scores.survive"></el-rate>
            </el-form-item>
            <!-- 英雄头像 -->
            <el-form-item label="英雄头像">
              <el-upload class="avatar-uploader" :action="action+'hero'" :headers="token" :show-file-list="false"
                :on-success="res=>$set(model,'avatar',res.url)" :on-error="uploadErrHandler">
                <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 背景图片 -->
            <el-form-item label="背景图片">
              <el-upload class="avatar-uploader" :action="action+'hero'" :headers="token" :show-file-list="false"
                :on-success="res=>$set(model, 'banner', res.url)" :on-error="uploadErrHandler">
                <img v-if="model.banner" :src="model.banner" class="banner" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 图文介绍 -->
            <el-form-item label="图文介绍">
              <el-upload class="avatar-uploader" :action="action+'hero'" :headers="token" :show-file-list="false"
                :on-success="res=>$set(model, 'photo', res.url)" :on-error="uploadErrHandler">
                <img v-if="model.photo" :src="model.photo" class="banner" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

          </el-tab-pane>

          <el-tab-pane label="英雄皮肤">
            <el-button type="primary" size="small" @click="addSkins">+ 添加皮肤</el-button>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col v-for="(item,i) in model.skins" :key="i" :span="12">
                <el-card>
                  <el-tag>皮肤{{i+1}}</el-tag>
                  <el-form-item label="皮肤名称" label-width="80px">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="皮肤图片" label-width="80px">
                    <el-upload class="avatar-uploader" :action="action+'skin'" :headers="token" :show-file-list="false"
                      :on-success="res => $set(item, 'img', res.url)" :on-error="uploadErrHandler">
                      <img v-if="item.img" :src="item.img" class="banner" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-button type="danger" @click="deleteSkin(i)">删除皮肤</el-button>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="介绍视频">
            <el-form-item label="标题">
              <el-input v-model="model.shipin.title" clearable></el-input>
            </el-form-item>
            <el-form-item label="视频">
              <el-upload  class="avatar-uploader" :action="action+'introduction'" :headers="token" :show-file-list="false"
                :on-success="res => $set(model.shipin, 'video', res.url)" :on-error="uploadErrHandler">
                <video class="banner" controls  v-if="model.shipin.video" :src="model.shipin.video"/>
               <i v-else class="el-icon-upload avatar-uploader-icon"></i>  
               
              </el-upload>
            </el-form-item>
            <el-form-item label="投稿">
              <el-input v-model="model.shipin.submit" clearable></el-input>
            </el-form-item>
            <el-form-item label="粉丝">
              <el-input v-model="model.shipin.fan" clearable></el-input>
            </el-form-item>
            <el-form-item label="观看次数">
              <el-input v-model="model.shipin.view" clearable></el-input>
            </el-form-item>


          </el-tab-pane>

          <el-tab-pane label="出装推荐">
            <!-- 顺风出装 -->
            <el-form-item label="顺风出装">
              <el-select filterable v-model="model.downWind.equipment" placeholder="请选择顺风出装" multiple>
                <el-option v-for="item in itemList" :key="item._id" :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="顺风技巧">
              <el-input v-model="model.downWind.tips" type="textarea"></el-input>
            </el-form-item>
            <!-- 逆风出装 -->
            <el-form-item label="逆风出装">
              <el-select filterable v-model="model.upWind.equipment" placeholder="请选择逆风出装" multiple>
                <el-option v-for="item in itemList" :key="item._id" :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风技巧">
              <el-input v-model="model.upWind.tips" type="textarea"></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="使用技巧">
            <!-- 使用技巧 -->
            <el-form-item label="使用技巧">
              <el-input v-model="model.usageTips" type="textarea"></el-input>
            </el-form-item>
            <!-- 对抗技巧 -->
            <el-form-item label="对抗技巧">
              <el-input v-model="model.battleTips" type="textarea"></el-input>
            </el-form-item>
            <!-- 团战思路 -->
            <el-form-item label="团战思路">
              <el-input v-model="model.teamTips" type="textarea"></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="技能管理">
            <el-button type="primary" size="small" @click="addSkills">+ 添加技能</el-button>

            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col v-for="(item,i) in model.skills" :key="i" :span="12">
                <el-card>
                  <el-tag>技能{{i+1}}</el-tag>
                  <el-form-item label="技能名称" label-width="80px">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="技能图标" label-width="80px">
                    <el-upload class="avatar-uploader" :action="action+'skill'" :headers="token" :show-file-list="false"
                      :on-success="res => $set(item, 'icon', res.url)" :on-error="uploadErrHandler">
                      <img v-if="item.icon" :src="item.icon" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="冷却值" label-width="80px">
                    <el-input type="text" v-model="item.delay"></el-input>
                  </el-form-item>
                  <el-form-item label="消耗" label-width="80px">
                    <el-input type="text" v-model="item.cost"></el-input>
                  </el-form-item>
                  <el-form-item label="技能描述" label-width="80px">
                    <el-input type="textarea" v-model="item.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="小提示" label-width="80px">
                    <el-input type="textarea" v-model="item.tips"></el-input>
                  </el-form-item>
                  <el-button type="danger" @click="deleteSkill(i)">删除技能</el-button>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="英雄关系">
            <el-tabs value="basic">
              <el-tab-pane label="最佳搭档" name="basic">
                <el-button type="primary" size="small" @click="model.partners.push({})">+ 添加英雄</el-button>
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
                  <el-col v-for="(item,i) in model.partners" :key="i" :span="12">
                    <el-card>
                      <el-tag>英雄{{i+1}}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px">
                        <el-select v-model="item.hero" filterable placeholder="请选择英雄">
                          <el-option v-for="item in heroList" :key="item._id" :label="item.name" :value="item._id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="item.desc"></el-input>
                      </el-form-item>
                      <el-button type="danger" @click="delPartner(i)">删除</el-button>
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="被谁克制">
                <el-button type="primary" size="small" @click="model.restrained.push({})">+ 添加英雄</el-button>
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
                  <el-col v-for="(item,i) in model.restrained" :key="i" :span="12">
                    <el-card>
                      <el-tag>英雄{{i+1}}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px">
                        <el-select v-model="item.hero" filterable placeholder="请选择英雄">
                          <el-option v-for="item in heroList" :key="item._id" :label="item.name" :value="item._id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="item.desc"></el-input>
                      </el-form-item>
                      <el-button type="danger" @click="delRestrained(i)">删除</el-button>
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="克制谁">
                <el-button type="primary" size="small" @click="model.restraint.push({})">+ 添加英雄</el-button>
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
                  <el-col v-for="(item,i) in model.restraint" :key="i" :span="12">
                    <el-card>
                      <el-tag>英雄{{i+1}}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px">
                        <el-select v-model="item.hero" filterable placeholder="请选择英雄">
                          <el-option v-for="item in heroList" :key="item._id" :label="item.name" :value="item._id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="item.desc"></el-input>
                      </el-form-item>
                      <el-button type="danger" @click="delRestraint(i)">删除</el-button>
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>

        </el-tabs>
      </el-form>
      <el-button style="margin-top:15px" type="primary" @click="save">保存</el-button>
    </el-card>
  </div>
</template>

<script>
  // 导入网络请求函数
  import {
    createHero,
    getHero,
    updateHero,
    getHeroList
  } from 'network/admin/hero'
  import {
    getCateList
  } from 'network/admin/category'
  import {
    getItemList
  } from 'network/admin/item'

  import {
    uploadMixin
  } from '../../common/mixins'

  import Breadcrumb from '../../components/commom/Breadcrumb'

  export default {
    name: "HeroEdit",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    components: {
      Breadcrumb
    },
    mixins: [uploadMixin],
    data() {
      return {
        value: [],
        //英雄数据
        model: {
          avatar: '',
          photo: '',
          scores: {},
          shipin: {},
         
          skills: [],
          downWind: {},
          upWind: {},
          partners: [],
          restrained: [],
          restraint: []
        },
        heroCateList: null,
        itemList: [],
        heroList: []
      }
    },
    methods: {
      // 保存新建或者编辑的英雄
      async save() {
        if (!this.id) {
          const res = await createHero(this.model)
          if (!res) return
          this.$message.success('新建英雄成功')
          this.$router.push('/hero/list')
        } else {
          const res = await updateHero(this.id, this.model)
          if (!res) return
          this.$message.success('编辑英雄成功')
          this.$router.push('/hero/list')
        }
      },
      //处于编辑模式下，通过id查找需要编辑的英雄
      async getHero() {
        const res = await getHero(this.id)
        this.model = res.data
      },
      async edit(row) {
        const res = await getHero(row._id)
        // console.log(res.data);
        this.$router.push(`/hero/edit/${row._id}`)
      },
      // 获取分类列表数据
      async getCateList() {
        const res = await getCateList()
        for (let item of res.data) {
          if (item.name === '英雄列表') {
            this.heroCateList = item.children
            break
          }
        }
      },
      //获取物品列表数据
      async getItemList() {
        const res = await getItemList()
        this.itemList = res.data
      },
      //监听添加技能按钮
      addSkills() {
        this.model.skills.push({})
      },
      deleteSkill(i) {
        this.model.skills.splice(i, 1)
      },
      //监听添加皮肤按钮
      addSkins() {
        this.model.skins.push({})
      },
      deleteSkin(i) {
        this.model.skins.splice(i, 1)
      },
      //监听添加皮肤按钮
      addVideos() {
        this.model.skins.push({})
      },
      deleteVideo(i) {
        this.model.skins.splice(i, 1)
      },
      // 获取英雄列表
      async getHeroList() {
        const res = await getHeroList()
        if (!res) return
        this.heroList = res.data
      },
      bannerHanderler(res) {
        this.$set(this.model, 'banner', res.url)
      },
      delPartner(i) {
        this.model.partners.splice(i, 1)
      },
      delRestrained(i) {
        this.model.restrained.splice(i, 1)
      },
      delRestraint(i) {
        // console.log(i);
        this.model.restraint.splice(i, 1)
      }
    },
    created() {
      this.id && this.getHero()
      this.getCateList()
      this.getItemList()
      this.getHeroList()
    }
  }
</script>

<style scoped>
  .save-btn {
    position: absolute;
    top: 15px;
    right: 35px;
  }

  .el-tag {
    margin: 10px;
  }

  .skill-card {
    max-width: 40%;
  }

  .banner {
    width: 300px;
    vertical-align: middle;
  }
</style>