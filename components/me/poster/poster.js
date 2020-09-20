// components/me/poster/poster.js
const app=getApp()
var count=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallpaperList:app.globalData.wallPaperList,
    imgShow:false,
    CustomBar: app.globalData.CustomBar,
    loadProgress:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.towerSwiper();
    this.loadProgress();
     //获取主题色
     this.setData({
      themeColor:wx.getStorageSync('themeColor')
    })
  },
  //计算每张海报的zIndex和mleft,便于根据zIndex和mleft计算海报的大小和位置
  towerSwiper() {
    let list =app.globalData.wallPaperList
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      wallpaperList: list,
      maxZIndex:parseInt(list.length/2)+1
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.wallpaperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        wallpaperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        wallpaperList: list
      })
    }
  },
  //选择海报
  chooseWP(){
    
    let indexs
    this.data.wallpaperList.forEach((item,index)=>{
      if(item.zIndex==this.data.maxZIndex){
        wx.setStorageSync('paper',this.data.wallpaperList[index])
        console.log(wx.getStorageSync('paper'))
      }
    })
    wx.showToast({
      title: '选择成功',
      icon: 'success',
      duration: 1000,
      mask: true
    })
    setTimeout(()=>{
      wx.navigateBack({
        complete: (res) => {},
      })
    },1000)
   
    
  },
  videoPlay(ev){
    
  },
  //加载进度条的计算
  loadProgress(){
    this.setData({
      loadProgress: this.data.loadProgress+3
    })
    if (this.data.loadProgress<100){
      setTimeout(() => {
        this.loadProgress();
      }, 60)
    }else{
      this.setData({
        loadProgress: 0,
        imgShow:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})