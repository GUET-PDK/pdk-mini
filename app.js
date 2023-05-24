import { request } from "./utils/http";
App({
  /**
   * 全局变量
   */
  globalData: {
    formData: {
      shippingAddress: '(姓名+电话+宿舍号)',// 配送地址
      deliveryTime1: '19:00',             // 配送时间1
      deliveryTime2: '22:00',             // 配送时间2
      recipientAddress: '',               // 收件人地址
      pickupCode: [],                     // 文件数组/取件码截图
      pickUpPositon: '',                  // 代取-外卖位置
      serviceDescription: '',             // 万能服务描述
      remark: '',
      price: 2,
      courierSize: ''                   // 快递大小
    }
  },

  onLaunch() { },

  /**
   * 获取用户授权
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
            title: "用户未授权",
            content: "拒绝授权将不能体验小程序完整功能，点击确定开启授权",
            success: (res) => {
              console.log(res);
              if (res.confirm) {
                wx.openSetting({});
              }
            },
          });
        }
      },
    });
  },

  /**
   * 全局路由跳转
   */
  redirectTo(url) {
    if (!this.globalData.token) {
      wx.redirectTo({
        url: "/pages/login/login",
      });
    } else {
      wx.redirectTo({
        url,
      });
    }
  },

  /**
   * 全局方法注册
   */
  globalMethod: function() {
    return request
  }
});
