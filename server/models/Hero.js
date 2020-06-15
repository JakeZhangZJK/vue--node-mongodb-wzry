const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  photo:{ type: String },// 图文介绍
  //类型,如：坦克，射手等
  cate: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  //难度等级等
  scores: {
    difficulty: { type: Number, default: 0 },
    skill: { type: Number, default: 0 },
    attack: { type: Number, default: 0 },
    survive: { type: Number, default: 0 }
  },
  shipin: {
    title: { type: String, default: '' },
    video: { type: String, default: ''},
    submit: { type: Number, default: 0 },
    fan: { type: Number, default: 0 },
    view:{type:Number, default: 0}
  },
  
  //皮肤
  skins: [{
    img: { type: String },
    name: { type: String }
  }],

  // 技能
  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    desc: { type: String },
    tips: { type: String }
  }],
  //顺风出装
  downWind: {
    equipment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    tips: { type: String }
  },
  //逆风出装
  upWind: {
    equipment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    tips: { type: String }
  },
  //使用技巧
  usageTips: { type: String },
  //对抗技巧
  battleTips: { type: String },
  //团战思路
  teamTips: { type: String },
  //最佳搭档
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    desc: { type: String },
  }],
  //被谁克制
  restrained: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    desc: { type: String },
  }],
  //克制谁
  restraint: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    desc: { type: String },
  }]
})

const Hero = mongoose.model('Hero', heroSchema)

module.exports = Hero