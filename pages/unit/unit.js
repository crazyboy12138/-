// pages/unit/unit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nums: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      units: app.globalData.units
    })
  },

  unit: function(data){
    var unitId = data.target.dataset.unitid
    wx.navigateTo({
      url: '../test/test?unitId=' + unitId,
    })
  }
})