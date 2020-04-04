const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  index:{ type: Number },
  name: { type: String },// 名称
  avatar: { type: String },// 头像
  title: { type: String },// 称号
  banner: { type: String },// 背景图
  photo:{ type: String },// 图文介绍
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],// 所属分类
  scores: {// 英雄评分
    difficult: { type: Number },// 难度
    skills: { type: Number },// 技能
    attack: { type: Number },// 攻击
    survive: { type: Number },// 生存
  },

  skills: [{// 技能
    icon: { type: String },//图标
    name: { type: String },// 名称
    delay: { type: String },// 冷却值
    cost: { type: String },// 消耗
    description: { type: String },// 技能描述
    tips: { type: String },// 小提示
  }],
  skins: [{// 皮肤
    name: { type: String },// 名称
    photo: { type: String },//图片
  }],

  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],// 顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],// 逆风出装

  usageTips: { type: String },// 使用技巧
  battleTips: { type: String },// 对抗技巧
  teamTips: { type: String },// 团战思路
  partners: [{// 最佳搭档
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },// 搭档英雄
    description: {type:String},// 搭档英雄的描述
  }],
  restrained: [{// 被谁克制
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },// 英雄
    description: {type:String},// 英雄的描述
  }],
  restraints: [{// 克制谁
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: {type:String},// 英雄的描述
  }],
  introductions: [{// 介绍视频
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },// 英雄
    title:{type:String},// 视频标题
    video:{ type: String },// 
    submit: { type: String },// 投稿
    fan: { type: String },// 粉丝
    view:{type:String}// 观看次数
  }],
  heroGuides: [{// 英雄攻略视频
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },// 英雄
    title: { type: String },// 视频标题
    cover:{type:String},
    video:{ type: String },// 视频
    submit: { type: String },// 投稿
    fan: { type: String },// 粉丝
    view: { type: String },// 观看次数
  }],
})

module.exports = mongoose.model('Hero', schema,'heroes')