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
      shippingAddress: "",
      recipientAddress: "",
      type: "",
      remark: "",
      courizer_size: "",
      price: null,
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
    const res = await request(
      "/user/sentPublishOrder",
      this.data.fromData,
      "POST",
      wx.getStorageSync('token')
    );
    console.log(res);
  },
});