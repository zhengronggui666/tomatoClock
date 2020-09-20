//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    PageCur: 'home',
    isRunning:false,
    ScreenBrightness:0.5,
    themeColor:'blue'
  },
  onLoad:function(){
    //初始化配置
   wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          ScreenBrightness:res.value
        })
      },
    })
    if(!wx.getStorageSync('themeColor')){
      wx.setStorageSync('themeColor',app.globalData.ColorList[0].name)
    }
    this.setData({
      themeColor:wx.getStorageSync('themeColor')
    })
  },
  //设置亮度
  setScreenOn(){
    if(this.data.isRunning==true){
      wx.setScreenBrightness({
        value: this.data.ScreenBrightness,
      })
  }
},
  //改变Running状态,由home.js触发
  stateChange(flag){
    this.setData({
      isRunning:flag.detail.isRunning
    })
    console.log("stateChange",flag)
  },
  //改变主题色,由me.js触发
  themeChange(flag){
    this.setData({
      themeColor:flag.detail.themeColor
    })
    console.log("themeChange")
  },
  //改变页面
  NavChange(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur,
      })
  },
 
})
