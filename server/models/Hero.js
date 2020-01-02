const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },// 名称
  avatar: { type: String },// 头像
  title: { type: String },
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
    description: { type: String },// 技能描述
    tips: { type: String },// 小提示
  }],

  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],// 顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],// 逆风出装

  usageTips: { type: String },// 使用技巧
  battleTips: { type: String },// 对抗技巧
  teamTips: { type: String },// 团战思路
  partner: [{// 最佳搭档
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },// 搭档英雄
    description: {type:String},// 搭档英雄的描述
  }],
  
})

module.exports = mongoose.model('Hero', schema)