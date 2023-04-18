// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("***** " + res.code)
      }
    })
  },

  /**
   * 授权
   * scope.userInfo wx.getUserInfo  用户信息
      scope.userLocation    wx.getLocation, wx.chooseLocation   地理位置
      scope.address wx.chooseAddress    通讯地址
      scope.invoiceTitle    wx.chooseInvoiceTitle   发票抬头
      scope.werun   wx.getWeRunData 微信运动步数
      scope.record  wx.startRecord  录音功能
      scope.writePhotosAlbum    wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum    保存到相册
      scope.camera      摄像头
   */
  checkAuthorize(scope) {
    wx.getSetting({
      success: (res) => {
        //console.log(res.authSetting[scope])
        if (!res.authSetting[scope]) {
          wx.showModal({
            title: '用户未授权',
            content: '拒绝授权将不能体验小程序完整功能，点击确定开启授权',
            success: (res) => {
              console.log(res)
              if (res.confirm) {
                wx.openSetting({})
              }
            }
          })
        }
      }
    })
  },

  globalData: {},
})
