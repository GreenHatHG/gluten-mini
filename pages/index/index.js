//index.js

const { wx_login } = require("../../utils/request")

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用Gluten',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    const _this = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        _this.uploadUserInfo(res.userInfo, res.iv, res.encryptedData)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    this.uploadUserInfo(e.detail.userInfo, e.detail.iv, e.detail.encryptedData)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  uploadUserInfo : function (userInfo, iv, encryptedData){
    let uploadData = {}
    wx.login({
      success (res) {
        if (res.code) {
          uploadData['avatarUrl'] = userInfo.avatarUrl
          uploadData['city'] = userInfo.city
          uploadData['country'] = userInfo.country
          uploadData['nickName'] = userInfo.nickName
          uploadData['province'] = userInfo.province
          uploadData['encryptedData'] = encryptedData
          uploadData['iv'] = iv
          uploadData['code'] = res.code
          wx_login(uploadData)
        } else {
          wx.showToast({title: '登录失败！请检查网络', icon: 'none', duration: 4000, mask:true})
        }
      }
    })
  }
})
