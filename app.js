//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.loadFontFace({
    //   family: 'SimKai',
    //   global:'true',
    //   source: 'url("https://746f-tomato-lb031-1302024354.tcb.qcloud.la/kaishu.ttf?sign=52d55ae0b2a6ed2ad5c26f6495b658ab&t=1590675113")',
    //   success: console.log
    // })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //为了引入colorUI的导航界面获取系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    ColorList: [{
        title:'渐变蓝色',
        name: 'bg-gradual-blue',
      },
      {
        title: '墨黑',
        name: 'bg-black',
      },
      {
        title:'渐变紫色',
        name: 'bg-gradual-purple',
      },
      {
        title:'橙色',
        name: 'bg-orange',
      },
      {
        title: '森绿',
        name: 'bg-green',
      },
      {
        title: '天青',
        name: 'bg-cyan',
      },
      {
        title: '海蓝',
        name: 'bg-blue',
      },
      {
        title: '木槿',
        name: 'bg-mauve',
      },
      
      {
        title: '桃粉',
        name: 'bg-pink',
      },
      {
        title: '姹紫',
        name: 'bg-purple',
      },
    
      {
        title: '棕褐',
        name: 'bg-brown',
      },
      {
        title: '玄灰',
        name: 'bg-grey',
      },
      {
        title: '草灰',
        name: 'bg-gray',
      },
      
      {
        title: '雅白',
        name: 'bg-white',
      },
    ],
    wallPaperList:[
   {
     id:0,
     type:'image',
     url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/e.jpg',
   },
   {
    id:1,
    type:'image',
    url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/a.jpg',
  },
  {
    id:2,
    type:'image',
    url:  'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/b.jpg',
  },
  {
    id:3,
    type:'image',
    url:  'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/c.jpg',
  },
  {
    id:4,
    type:'video',
    url:  'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/dusk.mp4',
  },
  {
    id:5,
    type:'image',
    url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/d.jpg',
  },
  {
    id:6,
    type:'image',
    url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/f.jpg',
  },
  {
    id:7,
    type:'image',
    url:'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/g.jpg',
  },
  {
    id:8,
    type:'image',
    url:'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/h.jpg',
  },
  {
    id:9,
    type:'video',
    url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/dusk_2.mp4',
  },
  {
    id:10,
    type:'image',
    url:'cloud://tomato-lb031.746f-tomato-lb031-1302024354/wallpaper/i.jpg',
  },
  {
    id:11,
    type:'video',
    url: 'cloud://tomato-lb031.746f-tomato-lb031-1302024354/night.mp4' 
  },
   
    ]
  }

})