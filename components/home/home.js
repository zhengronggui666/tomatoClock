// components/home/home.js
const util = require('../../utils/util.js')
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()

//时钟初始的角度
const initDeg = {
  left: 45,
  right: -45,
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //亮度,由index的页面传过来
    ScreenBrightness: {
      type: Number,
      value: 0.1
    },
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      //初始化配置,获得Storage里的themeColor,workTime,paper,plans
      this.setData({
        themeColor:wx.getStorageSync('themeColor')
      })
      if (!wx.getStorageSync('workTime')) {
        wx.setStorageSync('workTime','25')
      }
      if (!wx.getStorageSync('paper')) {
        wx.setStorageSync('paper', app.globalData.wallPaperList[0])
      }
      this.loadFontFace()
      
      let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
      this.mottoChange()
      let arr = []
      // let obarr = []
      for (let i = 5; i <= 90; i = i + 5) {
        let a = util.formatTime(i, 'MM')
        arr.push(a)
      }
      let plans = []
      let allplans = []
      let emptyPlan = true
     
      let date=this.getDate()
      if (wx.getStorageSync('plans')) {
        allplans = wx.getStorageSync('plans')    
        for (let i = 0; i < allplans.length; i++) {  
          if (allplans[i].time ==date) {
            emptyPlan = false
            plans.push(allplans[i])
          }
        }
        if(plans.length!=0){
          plans.unshift({duration:0,event:'无',time:date})
        }
        
      }
      let paper = wx.getStorageSync('paper')
      this.setData({
        workTime: workTime,
        remainTimeText: workTime + ':00',
        array: arr,
        paper: paper,
        emptyPlan: emptyPlan,
        plans: plans
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    inputValue: "",
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
    skin: 'red',
    motto: '种一棵树\n最好的时候是十年前\n其次\n是现在',
    paperIndex: 0,
    paper: {},
    array: [],
    objectArray: [],
    modalName: '',
    emptyPlan: true,
    plans: [],
    event:'',
    eventchange:false,
    musicItems: [
      { name: 'Love', color: 'blue', url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/music/audio_love.aac' },
      { name: 'Memory', color: 'cyan', url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/music/audio_memory.aac' },
      { name: 'Dymatic', color: 'green', url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/music/audio_dynamic.aac' },
      { name: 'Rock', color: 'olive', url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/music/audio_rock.aac' },
      { name: 'Young', color: 'yellow', url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/music/audio_young.aac' },
      { name: 'None', color: 'red', url: '' },
    ],
    screenOn: false,
    mottos: ['我看到\n那些岁月如何奔驰\n挨过了冬季\n便迎来了春天\n--《瓦尔登湖》',
      '时间的步伐有三种\n未来姗姗来迟\n现在像箭一样飞逝\n过往永远静立不动',
      '时间\n给空想者痛苦\n给创造者财富',
      '抛弃今天的人\n不会有明天\n而昨天\n不过是行去流水']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //提前下载好字体
    loadFontFace() {
      const self = this
      wx.loadFontFace({
        family: 'SimKai',
        source: 'url("https://zhengronggui666.github.io/kaishu.ttf")',
        success(res) {
        },
        fail: function(res) {
        },
        complete: function(res) {
        }
      });
    },
    //获得当天时间,格式:2020/06/24
    getDate: function () {
      return util.formatDate(new Date())
    },
    //修改计时时长
    bindPickerChange: function (e) {
      let tmp=util.formatTime(this.data.array[e.detail.value], "MM")
      this.setData({
        workTime: tmp,
        remainTimeText: tmp + ":00"
      })
      wx.setStorageSync('workTime',tmp)

    },
    //开始计时
    startTimer: function () {
      let startTime = Date.now()
      let isRuning = this.data.isRuning
      let showTime = this.data['workTime']
      let keepTime = showTime * 60 * 1000
      if (!isRuning) {
        this.timer = setInterval((function () {
          this.updateTimer()
        }).bind(this), 1000)
        let flag = { isRunning: true }
        this.triggerEvent("stateChange", flag)
        this.setData({
          startTime: startTime
        })
        this.data.log = {
          startTime: startTime,
          keepTime: keepTime,
          endTime: keepTime + startTime,
        }
        this.set_data(true, false)
        this.setScreenBright()
      }
    },
    //取消计时
    cancelTimer: function () {
      var that = this
      wx.showModal({
        title: '提示',
        content: '提前终止将会失去这次的时长,\n你确定要终止吗?',
        success(res) {
          if (res.confirm) {
            that.stopTimer()
            that.set_data(false, false)
          } else if (res.cancel) { }
        }
      })
    },
    //设置时钟的data
    set_data(isRuning, completed) {
      this.setData({
        isRuning: isRuning,
        completed: completed,
        remainTimeText: this.data.workTime + ':00',
      })
    },
    //设置屏幕常亮并在30秒后变暗
    setScreenBright: function () {
      if (this.data.isRuning == true) {
        wx.setKeepScreenOn({
          keepScreenOn: true,
        })
        this.screenTimer = setInterval(function () {
          wx.setScreenBrightness({
            value: 0,
          })
        }, 30000)
      }
    },
    //停止计时器并重置变量
    stopTimer: function () {
      wx.setScreenBrightness({
        value: Number(this.properties.ScreenBrightness),
      })
      wx.setKeepScreenOn({
        keepScreenOn: false,
      })
      //重置时钟和恢复一些变量默认值
      this.setData({
        leftDeg: initDeg.left,
        rightDeg: initDeg.right,
        screenOn: false,
        eventchange:false
      })
      backgroundAudioManager.stop()
      let stopTime = Date.now()
      this.data.log = {
        ...this.data.log,
        actualTime: stopTime - this.data.startTime,
        completed: this.data.completed,
        event:this.data.event
      }
      this.saveLog(this.data.log)
      //清除计时器
      this.timer && clearInterval(this.timer)
      this.screenTimer && clearInterval(this.screenTimer)
      let flag = { isRunning: false }
      this.triggerEvent("stateChange", flag)
      if (this.data.completed) {
        wx.vibrateLong({
          complete: (res) => { },
        })
      }
    },
    //每隔一秒执行一次更新计时器
    updateTimer: function () {
      let log = this.data.log
      let now = Date.now()
      let remainingTime = Math.round((log.endTime - now) / 1000)
      let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
      let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
      let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
      let halfTime
      //判断计时是否结束
      if (remainingTime > 0) {
        let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
        this.setData({
          remainTimeText: remainTimeText
        })
      } else if (remainingTime == 0) {
        this.set_data(false, true)

        this.stopTimer()
        return
      }
      //更新时钟圈
      halfTime = log.keepTime / 2
      if ((remainingTime * 1000) > halfTime) {
        this.setData({
          leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
        })

      } else {
        this.setData({
          leftDeg: -135
        })
        this.setData({
          rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
        })

      }
    },
    //设置屏幕亮度
    setScreen: function () {
      this.setData({
        screenOn: !this.data.screenOn
      })
      if (this.data.screenOn == true) {
        this.screenTimer && clearInterval(this.screenTimer)
        wx.setScreenBrightness({
          value: Number(this.data.ScreenBrightness)
        })
        wx.setKeepScreenOn({
          keepScreenOn: true,
        })
      } else {
        this.setScreenBright()
      }
    },
    //几个modal的开和闭
    showModal(e) {
      if (e.currentTarget.dataset.target == 'affairModal' && this.data.emptyPlan) {
        this.startTimer()
      }
      else if(e.currentTarget.dataset.target == 'affairCModal' && this.data.emptyPlan){
       this.showtip()
      }
      else if(e.currentTarget.dataset.target == 'affairCModal' && this.data.eventchange){
       }
      else{
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      }
     
    },
    hideModal(e) {
      this.setData({
        modalName: ''
      })
    },
    //显示"暂无事件"的tip
    showtip() {
      wx.showToast({
        title: '暂无事件',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    },
    //选择事件
    selectEvent(e) {
      let index=e.currentTarget.dataset.index
      if(index!=0){
        this.setData({
          event:this.data.plans[index].event,
          modalName: ''
        })
      }else{
        this.hideModal()
      }
      this.startTimer()   
    },
    //更换事件
    changeEvent(e) {
      let index=e.currentTarget.dataset.index
      if(index!=0){
        this.setData({
          event:this.data.plans[index].event,
          eventchange:true,
          modalName: ''
        })
      }else{
        this.setData({
          event:'',
          eventchange:true,
          modalName: ''
        })
      }
    },
    //选择音乐
    musicSelect: function (e) {
      let id = e.currentTarget.dataset.id
      this.audioPlay(this.data.musicItems[id])
      this.hideModal()
    },
    //音频播放
    audioPlay: function (item) {

      if (item.url !== '') {
        backgroundAudioManager.stop()
        backgroundAudioManager.title = item.name
        backgroundAudioManager.src = item.url
        backgroundAudioManager.play()
        backgroundAudioManager.onEnded(() => {
          backgroundAudioManager.title = item.name
          backgroundAudioManager.src = item.url
          backgroundAudioManager.play()
        })
      }
      else {
        backgroundAudioManager.stop()
        // backgroundAudioManager.src=''
      }
    },
    //座右铭更换
    mottoChange: function () {
      let len = this.data.mottos.length
      let index = parseInt(Math.random() * (len), 10)
      while (this.data.mottos[index] == this.data.motto) {
        index = parseInt(Math.random() * (len), 10)
      }
      this.setData({
        motto: this.data.mottos[index]
      })
    },
    //保存log
    saveLog: function (log) {
      var logs = wx.getStorageSync('logs') || []
      logs.push(log)
      wx.setStorageSync('logs', logs)
      // var logs_=wx.getStorageSync('logs') || []
      // let log_=logs_[0]
      // console.log("log",log_.startTime)
    }
  }
})
