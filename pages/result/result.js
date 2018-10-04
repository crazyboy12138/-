// pages/result/result.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (res) {
    console.log('res', res)
    var unitId = res.unitId
    var result = app.globalData.choose['arr' + unitId]
    console.log('result', result)
    var question = app.globalData.questions['arr' + unitId]
    var standar = []
    for(var p in question){
      standar.push(question[p].answer)
    }
   
    var wrong = []
    var countOfRight = 0

    for(var i = 0; i < result.length; i++){
      wrong.push(result[i] != standar[i])
      countOfRight += (result[i] == standar[i]) ? 1 : 0
    }
    console.log('standar', standar)
    console.log('wrong', wrong)

    var curScore = Math.round(100 * (countOfRight / result.length))
    var maxScore = app.globalData.historyScore['unit' + unitId]
    maxScore = (curScore > maxScore) ? curScore : maxScore

    this.setData({
      standar: standar,
      yours: result,
      wrong: wrong,
      curScore: curScore,
      maxScore: maxScore
    })
  },

  back: function(){
   
    console.log('question in back')
    console.log(getApp().globalData.question)
    wx.navigateBack({
      delta: 2
    })
  }
})