//app.js
App({
  onLaunch: function () {
    var that = this
    that.getUnits()
    that.getQuestions()
    setTimeout(function(){
      console.log('questions', that.globalData.questions)
    }, 2000)
  },
  getUnits: function(){
    var that = this
    wx.request({
      url: that.globalData.urlPrefix + '/unit/listAll',
      success: function(res){
        that.globalData.units = res.data
        console.log('units', that.globalData.units)
      }
    })
  },
  getQuestions: function () {
    var that = this
    var arr = []
    for(var i = 1; i <= 3; i++){
      arr.push(that.createPromise(i))
    }
    Promise.all(arr)
  },
  createPromise: function(count){
    var data = this.globalData
    var p = new Promise(function (resolve, reject) {
      wx.request({
        url: data.urlPrefix + '/question/listQuestionByUnitId?unitId=' + (count - 1),
        success: function (res) {
          console.log('unit' + count, res)
          for (var obj in res.data) {
            var temp = res.data[obj]
            temp.options = JSON.parse(temp.options)
            if(temp.urls){
              temp.urls = JSON.parse(temp.urls)
            }
            data.questions['arr' + count].push(temp)
          }
          count++
        },
        fail: function (res) {
          wx.showModal({
            title: '错误',
            content: '网络连接错误',
            showCancel: false
          })
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    // urlPrefix: 'http://127.0.0.1:8003',
    urlPrefix: 'https://ruanjiangongcheng2.xyz:8443/mathexam',
    // urlPrefix: 'https://119.29.9.243:8443/mathexam',
    questions:{
      arr1: [],
      arr2: [],
      arr3: []
    },
    choose: {
      arr1: [],
      arr2: [],
      arr3: []
    },
    units: []
  }
})