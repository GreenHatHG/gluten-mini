//index.js
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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

  uploadUserInfo : function (userInfo){
    const _this = this
    wx.request({
      url: 'http://localhost:8090/user_info/action/login',
      method: 'POST',
      data: userInfo,
      success(res){
        console.log(res)
        if(res.code === 0){
          app.globalData.userInfo = e.detail.userInfo
          _this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
           wx.showToast({title: '登录成功', mask:true})
        }else{
        }
      },
      fail(res){
        console.log(res)
        wx.showToast({title: '登录失败！' + res.errMsg, icon: 'none', duration: 4000, mask:true})
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    const _this = this
    let uploadData = {}
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res)
          uploadData['avatarUrl'] = e.detail.userInfo.avatarUrl
          uploadData['city'] = e.detail.userInfo.city
          uploadData['country'] = e.detail.userInfo.country
          uploadData['nickName'] = e.detail.userInfo.nickName
          uploadData['province'] = e.detail.userInfo.province
          uploadData['encryptedData'] = e.detail.encryptedData
          uploadData['iv'] = e.detail.iv
          uploadData['code'] = res.code
          console.log(uploadData)
          _this.uploadUserInfo(uploadData)
        } else {
          wx.showToast({title: '登录失败！' + res.errMsg, icon: 'none', duration: 4000, mask:true})
        }
      }
    })
  }
})
