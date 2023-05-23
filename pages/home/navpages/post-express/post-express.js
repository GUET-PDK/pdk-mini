import { request } from "../../../../utils/http";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _express: [
      { id: 1, val: "顺丰", name: "顺丰快递" },
      { id: 2, val: "中通", name: "中通快递" },
      { id: 3, val: "圆通", name: "圆通快递" },
      { id: 4, val: "韵达", name: "韵达快递" },
      { id: 5, val: "邮政", name: "邮政快递" },
    ],
    fromData: {
      shippingAddress: "F区36栋519室",
      recipientAddress: "C区22栋120室",
      type: "圆通",
      remark: "急件",
      courizer_size: "小",
      price: 10,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   *
   */
  async publish() {
    const params = this.data.fromData;
    // console.log(this.data.fromData)
    // const res = await request(
    //   "/user/sentPublishOrder",
    //   this.data.fromData,
    //   "POST",
    //   wx.getStorageSync('token')
    // );
    // console.log(res);
    wx.request({
      url: "http://pdk.usail.asia:88/user/sentPublishOrder",
      data: {
        shippingAddress: "F区36栋519室",
        recipientAddress: "17教学楼",
        type: "圆通",
        remark: "急急急",
        courizer_size: "小",
        price: 2.5,
      },
      method: "POST",
      header: {
        "content-type": "application/json",
        token: wx.getStorageSync("token"),
      },
      success(res) {
        console.log(res.data);
      },
      fail(err) {
        console.log(err)
      }
    });
  },
});
