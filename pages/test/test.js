// pages/test/test.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   index: 0,
   yourAnswers: []
  },

  onLoad: function(data){
    var unitId = data.unitId
    var that = this
    var question = app.globalData.questions['arr' + unitId]
    var options = []
    for(var p in question){
      var temp = []
      var count = 0
      var a = String.fromCharCode(65 + count)
      while(question[p].options[a]){
        temp.push(question[p].options[a])
        count++
        a = String.fromCharCode(65 + count)
      }
      options.push(temp)
    }
    console.log('options', options)
    var charset = []
    for(var i = 0; i < 26; i++){
      charset.push(String.fromCharCode(65 + i))
    }
    that.setData({
      length: question.length,
      question: question,
      options: options,
      charset: charset,
      unitId: unitId
    })
  },
  choose: function(data){
    var index = this.data.index
    this.data.yourAnswers.push(String.fromCharCode(65 + data.target.dataset.index))
    console.log('index: ' + index + ', length: ' + this.data.length)
    if(index < this.data.length - 1){
      this.setData({
        index: index + 1
      })
    } else{
      this.submit()
    }
   
  },
  submit: function(){
    var unitId = this.data.unitId
    app.globalData.choose['arr' + unitId] = this.data.yourAnswers
    console.log('yourAnswers', this.data.yourAnswers)
    console.log('result2', app.globalData.choose['arr2'])
    wx.navigateTo({
      url: '../result/result?unitId=' + unitId,
    })
  },
  showImage: function(data){
    var urls = this.data.question[this.data.index].urls
    wx.previewImage({
      urls: urls,
      current: urls[data.target.dataset.index]
    })
  }
})