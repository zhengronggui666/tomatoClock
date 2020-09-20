// components/me/history/history.js
const app = getApp()
const util=require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs : [],
    showLogs : false,
    formatLogs:[],
    showPlan: false,
    colors: [
      "red", "orange", "olive", "green",
      "cyan", "mauve", "purple"
    ],
    isLogs:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({showLogs:true})
    let l = wx.getStorageSync('logs') || []
    this.setData({
      themeColor:wx.getStorageSync('themeColor')
    })
    if(l.length == 0){
      this.setData({isLogs:false})
    }
    this.setData({logs : l})
    // let logs = this.data.test.map(item=>{
    //   return item+1;
    // })
    // console.log(logs)
    let fLogs = this.data.logs.map(item=> {
      let startTimeTemp = new Date(item.startTime);let endTimeTemp = new Date(item.startTime + item.actualTime);
      let a = startTimeTemp.getHours()+"";let b=startTimeTemp.getMinutes()+"";let c=startTimeTemp.getSeconds()+"";
      let d = endTimeTemp.getHours()+"";let e=endTimeTemp.getMinutes()+"";let f=endTimeTemp.getSeconds()+"";
      if(a.length==1){
        a="0"+a;
      }
      if(b.length==1){
        b="0"+b;
      }
      if(c.length==1){
        c="0"+c;
      }
      if(d.length==1){
        d="0"+d;
      }
      if(e.length==1){
        e="0"+e;
      }
      if(f.length==1){
        f="0"+f;}
      let startTimePart = a+" : "+b+" : "+c; 
      let endTimePart = d+" : "+e+" : "+f; 
      let bigRange = startTimeTemp.getFullYear()+"/"+(startTimeTemp.getMonth()+1)+"/" + startTimeTemp.getDate()
      let color = "gradual-green"
      let yu = "成功完成了一个番茄！^_^"
      if(!item.completed){
        color = "gradual-red"
        yu = "放弃了一个番茄!>_<"
      }
        return {
          big : bigRange,
          startTime: startTimePart,
          endTime: endTimePart,
          cardColor:color,
          sign:yu,
        };
    });
    this.setData({formatLogs:fLogs})

  },
  /**
   * 获取当前时间
   */
  getDate: function () {
    return util.formatDate(new Date())
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