// pages/unit/unit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  unit: function(data){
    var unitId = data.target.dataset.unitid
    wx.navigateTo({
      url: '../test/test?unitId=' + unitId,
    })
  }
})