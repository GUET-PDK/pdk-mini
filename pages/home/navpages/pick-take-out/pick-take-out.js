// pages/home/page/pick-take-out/pick-take-out.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 
   */
  publish() {
    wx.request({
      url: 'http://pdk.usail.asia:88/user/takeawayPublishOrder',
      method: "POST",
      data: {
        shippingAddress: "A区",
        pickUpPositon: "B区",
        remark: "测试",
        price: 20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: wx.getStorageSync('token')
      },
      success: res => {
        wx.setStorageSync('token', res.header.token)
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  }
});
