// components/stickyNotes/stickyNotes.js
var util = require('../../utils/util')

Component({
  /**
   * 组件的属性列表
   */

  properties: {

  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    colors: [
      "red", "orange", "olive", "green",
      "cyan", "mauve", "purple"
    ],
    currentDate: "",
    currentLoc: 0,
    Notes: [],
    words:'*'
  },
  

  lifetimes: {
    attached: function () {
      this.getCached()
       //获取主题色
       this.setData({
        themeColor:wx.getStorageSync('themeColor')
      })
    },
    detached:function(){
      this.setCached()
    }
  },
  

  /**
   * 组件的方法列表
   */
  methods: {

    getDate: function () {
      return util.formatDate(new Date())
    },

    addInput: function () {// 添加便签逻辑
      //点击添加便签按钮后，会调用该方法
      var lists = this.data.Notes
      var nowDate = this.getDate()
      if (nowDate !== this.currentDate) {
        // 该时段创建的第一个便签，则添加一个时间项
        this.currentDate = nowDate
        var element = {
          value: nowDate,
          iconStyle: "cu-time",
          cardStyle: "",
          noteShake: false,
        }
        lists.push(element)
      }
      var randomColor = this.data.colors[Math.floor(Math.random() * this.data.colors.length)]
      // 创建随机颜色的便签
      var element = {
        value: "新的标签",
        iconStyle: "cu-item",
        cardStyle: randomColor,
        noteShake: false,
        lock: false
      }
      lists.push(element)
      this.setData({
        Notes: lists,
      })
    },

    shakeNote: function (event) {
      // 便签锁定时的抖动逻辑
      var that = this
      var index = event.currentTarget.dataset.id
      var notes = this.data.Notes
      //设为允许抖动
      notes[index].noteShake = true
      that.setData({
        Notes: notes
      })
      setTimeout(function () {
        notes[index].noteShake = false
        that.setData({
          Notes: notes
        })
      }, 1000)
    },

    lockNote: function (event) {
      // 锁定便签
      var that = this
      var notes = this.data.Notes
      var index = event.currentTarget.dataset.id
      notes[index].lock = (!notes[index].lock)
      // 便签样式设定为锁定或解锁
      notes[index].iconStyle = notes[index].lock ? 'cu-item cuIcon-lock' : 'cu-item cuIcon-unlock'
      that.setData({
        Notes: notes
      })
    },

    showCuNote: function (event) {
      // 点击标签，将会展示便签细节
      var that = this
      var index = event.currentTarget.dataset.id
      that.setData({
        currentLoc: index
      })
      //缓存页面信息
      wx.setStorageSync('currentLoc', this.data.currentLoc)
      wx.setStorageSync('Notes', this.data.Notes)
      //跳转到便签详情界面
      wx.navigateTo({
        url: '../../pages/noteDetails/noteDetails',
      })
    },

    getCached: function(){
      // 获取缓存的便签数据
      let cachedNotes=this.data.Notes.concat(
        wx.getStorageSync('Notes')
      )
      this.setData({
        Notes:cachedNotes
      })
    },
    
    updateCached: function(){
      // 更新页面上的便签数据
      this.setData({
        Notes:wx.getStorageSync('Notes')
      })
    },

    setCached: function(){
      // 缓存当前的便签数据
      wx.setStorageSync('Notes', this.data.Notes)
      wx.setStorageSync('currentLoc', this.data.currentLoc)
    }

  }
})