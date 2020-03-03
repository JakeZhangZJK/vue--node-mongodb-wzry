<template>
  <div class="about">
    <!-- 导航区 -->
    <Breadcrumb :breadcrumbItem="breadcrumbItem"></Breadcrumb>
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
            <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()" :show-file-list="false"
              :on-success="afterUpload" :before-upload="beforeAvatarUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()" :show-file-list="false"
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
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="model.usageTips" clearable
              maxlength="500" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="model.battleTips" clearable
              maxlength="500" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="model.teamTips" clearable
              maxlength="500" show-word-limit></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 英雄介绍tab -->
        <el-tab-pane label="英雄初识" name="introductions">
          <el-tabs value="basic">
            <el-tab-pane label="图文介绍" name="basic">
              <el-form-item label="图文介绍">
                <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()"
                  :show-file-list="false" :on-success="res => $set(model, 'photo', res.url)">
                  <img v-if="model.photo" :src="model.photo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="视频介绍" name="videos">
              <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.introductions.push({})"><i
                  class="el-icon-plus"></i>添加英雄介绍视频</el-button>
              <el-row type="flex" style="flex-wrap:wrap;">
                <el-col v-for="(item,i) in model.introductions" :key="i">
                  <el-form-item label="英雄：">
                    <el-select v-model="item.hero" filterable>
                      <el-option v-for="hero of heroes" :key="hero._id" :label="hero.name" :value="hero._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="标题：">
                    <el-input v-model="item.title" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="视频：">
                    <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="item.video">
                    </vue-editor>
                  </el-form-item>
                  <el-form-item label="投稿：">
                    <el-input v-model="item.submit" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="粉丝：">
                    <el-input v-model="item.fan" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="观看次数：">
                    <el-input v-model="item.view" clearable></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.introductions.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="英雄皮肤" name="skins">
              <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.skins.push({})"><i
                  class="el-icon-plus"></i>添加皮肤</el-button>
              <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :md="12" v-for="(item,i) in model.skins" :key="i">
                  <el-form-item label="皮肤名称">
                    <el-input v-model="item.name" clearable maxlength="8" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="皮肤图片">
                    <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()"
                      :show-file-list="false" :on-success="res => $set(item, 'photo', res.url)">
                      <img v-if="item.photo" :src="item.photo" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.skins.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- 技能tab -->
        <el-tab-pane label="英雄技能" name="skills">
          <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.skills.push({})"><i
              class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称：">
                <el-input v-model="item.name" clearable maxlength="8" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="图标：">
                <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()"
                  :show-file-list="false" :on-success="res => $set(item, 'icon', res.url)">
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
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="item.description" clearable
                  maxlength="1000" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="小提示：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="item.tips" clearable
                  maxlength="200" show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="partners">
          <el-tabs value="basic">
            <el-tab-pane label="最佳搭档" name="basic">
              <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.partners.push({})"><i
                  class="el-icon-plus"></i>最佳搭档</el-button>
              <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
                  <el-form-item label="英雄：">
                    <el-select v-model="item.hero" filterable>
                      <el-option v-for="hero of heroes" :key="hero._id" :label="hero.name" :value="hero._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="item.description"
                      clearable maxlength="1000" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.partners.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="被谁克制" name="restrained">
              <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.restrained.push({})"><i
                  class="el-icon-plus"></i>被谁克制</el-button>
              <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :md="12" v-for="(item,i) in model.restrained" :key="i">
                  <el-form-item label="英雄：">
                    <el-select v-model="item.hero" filterable>
                      <el-option v-for="hero of heroes" :key="hero._id" :label="hero.name" :value="hero._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="item.description"
                      clearable maxlength="1000" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.restrained.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="克制谁" name="restraints">
              <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.restraints.push({})"><i
                  class="el-icon-plus"></i>克制谁</el-button>
              <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :md="12" v-for="(item,i) in model.restraints" :key="i">
                  <el-form-item label="英雄：">
                    <el-select v-model="item.hero" filterable>
                      <el-option v-for="hero of heroes" :key="hero._id" :label="hero.name" :value="hero._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="item.description"
                      clearable maxlength="1000" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="danger" @click="model.restraints.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- 英雄攻略tab -->
        <el-tab-pane label="英雄攻略" name="raiders">
          <el-button style="margin-bottom:5px" type="primary" size="small" @click="model.heroGuides.push({})"><i
              class="el-icon-plus"></i>添加英雄攻略</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col v-for="(item,i) in model.heroGuides" :key="i">
              <el-form-item label="标题：">
                <el-input v-model="item.title" clearable></el-input>
              </el-form-item>
              <el-form-item label="英雄：">
                <el-select v-model="item.hero" filterable>
                  <el-option v-for="hero of heroes" :key="hero._id" :label="hero.name" :value="hero._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="封面图">
                <el-upload class="avatar-uploader" :action="upLoadUrl" :headers="getAuthHeaders()"
                  :show-file-list="false" :on-success="res => $set(item, 'cover', res.url)">
                  <img v-if="item.cover" :src="item.cover" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="视频：">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="item.video"
                  class="video-container-style">
                </vue-editor>
              </el-form-item>
              <el-form-item label="投稿：">
                <el-input v-model="item.submit" clearable></el-input>
              </el-form-item>
              <el-form-item label="粉丝：">
                <el-input v-model="item.fan" clearable></el-input>
              </el-form-item>
              <el-form-item label="观看次数：">
                <el-input v-model="item.view" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.heroGuides.splice(i,1)">删除</el-button>
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
  import Breadcrumb from '../components/Breadcrumb'
  // 导入富文本编辑器
  import {
    VueEditor
  } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor,
      Breadcrumb,
    },
    data() {
      return {
        items: [], // 装备列表
        heroes: [], //英雄列表
        categories: [], // 英雄分类
        breadcrumbItem: ['内容管理', '英雄管理', `${this.id ? '编辑英雄':'新建英雄'}`],
        model: {
          name: '',
          avatar: '',
          banner: '',
          photo: '',
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0
          },
          skills: [],
          partners: [{
            hero: null, // 搭档英雄
            description: '', // 搭档英
          }],
          restraints: [{
            hero: null, // 搭档英雄
            description: '', // 搭档英
          }],
          restrainted: [{
            hero: null, // 搭档英雄
            description: '', // 搭档英
          }],
          introductions: [{ // 介绍视频
            hero: null, // 英雄
            video: '', // 
            submit: '', // 投稿
            fan: '' // 粉丝
          }],
          heroGuides: [{
            hero: null,
            title: '',
            cover: '',
            video: '',
            submit: '',
            fan: '',
            see: '',
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
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post("upload", formData);
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      }
    },
    created() {
      this.getItems();
      this.getCategories();
      this.id && this.fetch(); // 
      this.getHeroes()
    }
  };
</script>
<style>
  /* // 富文本编辑器里面的播放器样式 */
  .video-container-style iframe {
    width: 100%;
    height: auto;
  }
</style>