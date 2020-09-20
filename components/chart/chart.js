// components/chart.js
const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');


//数据准备
var columnChart = null;
var lineChart = null;
var totalTimes=0;
var totalTime=0;
var todayTimes=0;
var todayTime=0;
var failTimes=0;
var perTime=0;
var minutes = 1000 * 60;
var hours = minutes * 60;
var days = hours * 24;
var columnData=[0,0,0,0,0,0];
var columnData1=[0,0,0,0];
var columnData2=[0,0,0,0];
var columnData3=[0,0,0,0];
var columnData4=[0,0,0,0];
var columnData5=[0,0,0,0];
var columnData6=[0,0,0,0];
var chartData = {
    main: {
        title: '一日专注时长分布图',
        data: columnData,
        categories: ['0~4时', '4~8时', '8~12时', '12~16时','16~20时', '20~24时','','']
    },
    sub: [{
      title: '0:00~4:00专注时长',
      data: columnData1,
      categories: ['1', '2', '3', '4','']
  }, {
      title: '4:00~8:00专注时长',
      data: columnData2,
      categories: ['1', '2', '3', '4','']
  }, {
      title: '8:00~12:00专注时长',
      data: columnData3,
      categories: ['1', '2', '3', '4','']         
  }, {
      title: '12:00~16:00专注时长',
      data: columnData4,
      categories: ['1', '2', '3', '4','']      
  }, {
      title: '16:00~20:00专注时长',
      data: columnData5,
      categories: ['1', '2', '3', '4','']      
  }, {
      title: '20:00~24:00专注时长',
      data: columnData6,
      categories: ['1', '2', '3', '4','']      
  }]
  };

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ScreenBrightness:{
        type:Number,
        value:0.1,
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,  
    chartTitle: '专注时长分布表',
    isMainChartDisplay: true,
    totalTimes:Math.round(totalTimes),
    totalTime:Math.round(totalTime),
    todayTimes:Math.round(todayTimes),
    todayTime:Math.round(todayTime),
    perTime:Math.round(perTime),
    failTimes:Math.round(failTimes),
    chartData:chartData
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      //获取主题色
      this.setData({
        themeColor:wx.getStorageSync('themeColor')
      })
      var logs = wx.getStorageSync('logs') || []
      var mydate=new Date();
      var columnData=[0,0,0,0,0,0];
      var columnData1=[0,0,0,0];
      var columnData2=[0,0,0,0];
      var columnData3=[0,0,0,0];
      var columnData4=[0,0,0,0];
      var columnData5=[0,0,0,0];
      var columnData6=[0,0,0,0];
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var totalTimes=0;
      var totalTime=0;
      var todayTimes=0;
      var todayTime=0;
      var failTimes=0;

      for(var i=0;i<logs.length;i++){
          let log=logs[i];
          if(log.completed){
          totalTimes+=1;
          totalTime+=log.keepTime/minutes;
          var tempDate=new Date(log.startTime);
          if(tempDate.getDay()==mydate.getDay()){
              todayTimes+=1;
              var keepTime=log.keepTime/minutes;
              todayTime+=log.keepTime/minutes;
          switch(tempDate.getHours()){
              case 0:
                  columnData[0]+=keepTime;
                  columnData1[0]+=keepTime;
                  break;
              case 1:
                  columnData[0]+=keepTime;
                  columnData1[1]+=keepTime;
                  break;
              case 2:
                  columnData[0]+=keepTime;
                  columnData1[2]+=keepTime;
                  break;
              case 3:
                  columnData[0]+=keepTime;
                  columnData1[3]+=keepTime;
                  break;
              case 4:
                  columnData[1]+=keepTime;
                  columnData2[0]+=keepTime;
                  break;
              case 5:
                  columnData[1]+=keepTime;
                  columnData2[1]+=keepTime;
                  break;
              case 6:
                  columnData[1]+=keepTime;
                  columnData2[2]+=keepTime;
                  break;
              case 7:
                  columnData[1]+=keepTime;
                  columnData2[3]+=keepTime;
                  break;
              case 8:
                  columnData[2]+=keepTime;
                  columnData3[0]+=keepTime;
                  break;
              case 9:
                  columnData[2]+=keepTime;
                  columnData3[1]+=keepTime;
                  break;
              case 10:
                  columnData[2]+=keepTime;
                  columnData3[2]+=keepTime;
                  break;
              case 11:
                  columnData[2]+=keepTime;
                  columnData3[3]+=keepTime;
                  break;
              case 12:
                  columnData[3]+=keepTime;
                  columnData4[0]+=keepTime;
                  break;
              case 13:
                  columnData[3]+=keepTime;
                  columnData4[1]+=keepTime;
                  break;
              case 14:
                  columnData[3]+=keepTime;
                  columnData4[2]+=keepTime;
                  break;
              case 15:
                  columnData[3]+=keepTime;
                  columnData4[3]+=keepTime;
                  break;
              case 16:
                  columnData[4]+=keepTime;
                  columnData5[0]+=keepTime;
                  break;
              case 17:
                  columnData[4]+=keepTime;
                  columnData5[1]+=keepTime;
                  break;
              case 18:
                  columnData[4]+=keepTime;
                  columnData5[2]+=keepTime;
                  break;
              case 19:
                  columnData[4]+=keepTime;
                  columnData5[3]+=keepTime;
                  break;
              case 20:
                  columnData[5]+=keepTime;
                  columnData6[0]+=keepTime;
                  break;
              case 21:
                  columnData[5]+=keepTime;
                  columnData6[1]+=keepTime;
                  break;
              case 22:
                  columnData[5]+=keepTime;
                  columnData6[2]+=keepTime;
                  break;
              case 23:
                  columnData[5]+=keepTime;
                  columnData6[3]+=keepTime;
                  break;
          }
          
          }
        }
        else{
            failTimes+=1;
        }
      }

      var perTime=0;
      if(totalTimes!=0)
          perTime=totalTime/totalTimes;

      var chartData = {
        main: {
            title: '一日专注时长分布图',
            data: columnData,
            categories: ['0~4时', '4~8时', '8~12时', '12~16时','16~20时', '20~24时','','']
        },
        sub: [{
          title: '0:00~4:00专注时长',
          data: columnData1,
          categories: ['0', '1', '2', '3','']
      }, {
          title: '4:00~8:00专注时长',
          data: columnData2,
          categories: ['4', '5', '6', '7','']
      }, {
          title: '8:00~12:00专注时长',
          data: columnData3,
          categories: ['8', '9', '10', '11','']         
      }, {
          title: '12:00~16:00专注时长',
          data: columnData4,
          categories: ['12', '13', '14', '15','']      
      }, {
          title: '16:00~20:00专注时长',
          data: columnData5,
          categories: ['16', '17', '18', '19','']      
      }, {
          title: '20:00~24:00专注时长',
          data: columnData6,
          categories: ['20', '21', '22', '23','']      
      }]
      };

      var windowWidth = 320;
      try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
      } catch (e) {
          console.error('getSystemInfoSync failed!');
      }
     
      var simulationData = this.createSimulationData();
      lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: simulationData.categories,
          animation: false,
          series: [{
              name: '专注时长',
              data: simulationData.data,
              format: function (val, name) {
                  return val.toFixed(2) + 'h';
              }
          }],
          xAxis: {
              disableGrid: false
          },
          yAxis: {
              title: '当日专注时段 (h)',
              format: function (val) {
                  return val.toFixed(2);
              },
              min: 0
          },
          width: windowWidth,
          height: 200,
          dataLabel: true,
          dataPointShape: true,
          enableScroll: true,
          extra: {
              lineStyle: 'curve'
          }
      },this);

      var windowWidth = 320;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
  
      columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: chartData.main.categories,
          series: [{
              name: '专注时长',
              data: chartData.main.data,
              format: function (val, name) {
                  return (val).toFixed(0) + '';
              }
          }],
          yAxis: {
              format: function (val) {
                  return (val).toFixed(0) + 'min';
              },
              title: '',
              min: 0
          },
          xAxis: {
              disableGrid: false,
              type: 'calibration'
          },
          extra: {
              column: {
                  width: 15
              }
          },
          width: windowWidth,
          height: 200,
          
      },this);

      
      this.setData({
        totalTimes:totalTimes
      })
      this.setData({
        totalTime:Math.round(totalTime)  
      })
      this.setData({
        perTime:Math.round(perTime)
      })
      this.setData({
        todayTimes:todayTimes  
      })
      this.setData({
        todayTime:Math.round(todayTime)  
      })
      this.setData({
        failTimes:Math.round(failTimes)  
      })
      this.setData({
          chartData:chartData
      })

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
  /**
   * 副表返回主表
   */
  backToMainChart: function () {
    this.setData({
        chartTitle: this.data.chartData.main.title,
        isMainChartDisplay: true
    });
    columnChart.updateData({
        categories: this.data.chartData.main.categories,
        series: [{
            name: '专注时长',
            data: this.data.chartData.main.data,
            format: function (val, name) {
                return (val).toFixed(0) + '';
            }
        }]
    });
},

/**
 * 点击事件查找副表 
 */
touchHandler: function (e) {
  var index = columnChart.getCurrentDataIndex(e);
  if (index > -1 && index < this.data.chartData.sub.length && this.data.isMainChartDisplay) {      

      this.setData({
          chartTitle: this.data.chartData.sub[index].title,
          isMainChartDisplay: false,
      });
      columnChart.updateData({
          categories: this.data.chartData.sub[index].categories,
          series: [{
              name: '专注时长',
              data: this.data.chartData.sub[index].data,
              format: function (val, name) {
                  return (val).toFixed(0) + '';
              }
          }]
      });

  }
},
/**
 * 拖动划窗
 */
touchScrollHandler: function (e) {
    lineChart.scrollStart(e);
},
/**
 * 划窗移动 
 */

moveHandler: function (e) {
    lineChart.scroll(e);
},
/**
 * 结束滑动
 */
touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
        format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data 
        }
    });        
},
/**
 * 创建折线表数据
 */
createSimulationData: function () {
    var categories = [];
    var data = [];
    var localTime=new Date();
    var year=localTime.getFullYear();
    var days=0;
    var Febrary;
    if((year%4==0&&year%100!=0) || year%400==0)
        Febrary=29;
    else
        Febrary=28;
    switch(localTime.getMonth()){
        case 0:
            days=31;
            break;
        case 1:
            days=Febrary;
            break;
        case 2:
            days=31;
            break;
        case 3:
            days=30;
            break;
        case 4:
            days=31;
            break;
        case 5:
            days=30;
            break;
        case 6:
            days=31;
            break;
        case 7:
            days=31;
            break;
        case 8:
            days=30;
            break;
        case 9:
            days=31;
            break;
        case 10:
            days=30;
            break;
        case 11:
            days=31;
            break;
    }
    
    var logs = wx.getStorageSync('logs') || []
    for (var i = 0; i < days; i++) {
        categories.push(localTime.getFullYear()+'.'+(localTime.getMonth()+1)+'.' + (i + 1));
        var sum=0;
        for(var j=0;j<logs.length;j++){
            var insideTime=new Date(logs[j].startTime);
            if(insideTime.getFullYear()==localTime.getFullYear()&&insideTime.getMonth()==localTime.getMonth()&&insideTime.getDate()==i+1){
                if(logs[j].completed)
                sum+=logs[j].keepTime/hours;
            }

        }
        data.push(sum);

    }
    return {
        categories: categories,
        data: data
    }
},
  }
})
