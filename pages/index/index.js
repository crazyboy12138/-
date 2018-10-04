//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  begin: function(){
    wx.navigateTo({
      url: '../unit/unit'
    })
  },
  onLoad: function(){
    var that = this
    wx.getUserInfo({
      success: res=>{
        console.log(res)
        var avatar = res.userInfo.avatarUrl
        that.setData({
          avatarUrl: avatar
        })
      }
    })
  }
})
