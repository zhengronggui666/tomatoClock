// components/me/plan/plan.js
const app = getApp()
const util=require("../../../utils/util")
const mins = []
for (let i = 5; i <= 180; i=i+5) {
  mins.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plans:[],
    loading: true,
    modalName: false,
    mins,
    min:-1,
    value: [9999, 1, 1],
    inputValue:"",
    isPlans:true,
    plansId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var p= wx.getStorageSync('plans') || []
    this.setData({
      themeColor:wx.getStorageSync('themeColor')
    })
    let pLen = p.length
    for(var i = 0;i<pLen;i++){
      if(p[i].time != this.getDate()){
        p.splice(i,1)
        pLen = pLen - 1
        i = i - 1
        continue
      }
    }
    var l = wx.getStorageSync('logs') || []
    if(pLen == 0){
      this.setData({isPlans:false})
    }
    var pl = []
    var lo = []
    var cTime = new Date(Date.parse(new Date()))
    var ccTime = this.getDate()
    for(var j=0;j<pLen;j++){
      if(p[j].time == ccTime){
        pl.push(p[j])
      }
    }
    for(var i=0;i<l.length;i++){
      let logTime = new Date(l[i].startTime)
      if(logTime.getFullYear()==cTime.getFullYear() && logTime.getMonth()==cTime.getMonth() && logTime.getDate()==cTime.getDate() && l[i].completed){
        lo.push(l[i])
      }
    }
    var e = {}
    for(var k=0;k<lo.length;k++){
      if(Object.keys(e).length == 0){
        e[lo[k].event] = parseInt(lo[k].keepTime)/1000/60
        continue;
      }
      for(var i in e){
        if(lo[k].event==i){
          e[lo[k].event] = e[lo[k].event] + parseInt(lo[k].keepTime)/1000/60
        }else{
          e[lo[k].event] = parseInt(lo[k].keepTime)/1000/60
        }
      }
    }
    var pla = []
    for(var o = 0;o<pl.length;o++){
      for(var i in e){
        if(i == pl[o].event){
          var per = parseFloat((e[i]/pl[o].duration*100).toFixed(1))
        }else{
          var per = 0
        }
      }
      var t = parseFloat(((1-per/100)*pl[o].duration).toFixed(1))
      if(per>=100){
        per = 100
      }
      if(t<=0){
        t=0
      }
      var temp = {
        event:pl[o].event,
        duration:pl[o].duration,
        percentage:per,
        time : this.getDate(),
        remainTime: t,
      }
      if(Number.isNaN(temp.remainTime)){
        temp.remainTime = temp.duration
      }
      pla.push(temp)
    }
    this.setData({plans:pla})
  },

  /**
   * 获取当前时间
   */
  getDate: function () {
    return util.formatDate(new Date())
  },

  /**
   * 添加计划
   */
  addPlan:function(){
    this.setData({isPlans:true})
    this.setData({showPlan:false})
    var p = wx.getStorageSync('plans') || []
    this.setData({plans:p})
    if(this.data.min==-1){
      this.setData({min:35})
    }
    var plan = {
      duration : (this.data.min+1)*5,
      event : this.data.inputValue,
      time : this.getDate()
    }
    p.push(plan)
    wx.setStorageSync('plans', p)
    this.setData({
      modalName: null
    })
    this.onLoad();
  },


  /**
   * 删除计划
   */
  deletePlan:function(){
    var tPlans = wx.getStorageSync('plans') || []
    var tPlan = this.data.plans[this.data.plansId]
    let len = tPlans.length
    for(var i = 0;i<len;i++){
      if(tPlans[i].time != this.getDate()){
        tPlans.splice(i,1)
        len = len - 1
        i = i - 1
        continue
      }else{
        if(tPlans[i].event == tPlan.event && tPlans[i].duration == tPlan.duration){
          tPlans.splice(i,1)
          len = len - 1
          i = i - 1
          continue
        }
      }
    }
    this.setData({
      modalName: null
    })
    wx.setStorageSync('plans', tPlans)
    this.onLoad();
  },

  /**
   * 模态框选择
   * @param {*} e 
   */
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      plansId: e.currentTarget.dataset.id,
    })

  },

  /**
   * 关闭模态框
   * @param {*} e 
   */
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  /**
   * 选择条picker-view的min数据
   * @param {*} e 
   */
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      min:val[0]
    })
  },

  /**
   * 输入框数据
   * @param {*} e 
   */
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
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