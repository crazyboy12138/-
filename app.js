//app.js
App({
  onLaunch: function () {
    var that = this
    that.getQuestions()
    setTimeout(function(){
      console.log('questions', that.globalData.questions)
    }, 2000)
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
        url: data.urlPrefix + '/listQuestionByUnitId?unitId=' + (count - 1),
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
    address: 'http://119.29.9.243/question/question/',
    urlPrefix: 'http://127.0.0.1:8003/question',
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
    historyScore: {
      unit1: 0,
      unit2: 0,
      unit3: 0
    }
  }
})