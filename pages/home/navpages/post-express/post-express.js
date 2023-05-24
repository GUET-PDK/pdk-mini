const app = getApp();
const request = app.globalMethod();
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
    // 快递规格
    radios: [
      { id: 1, name: "小件", value: "小", check: "true", price: 3 },
      { id: 2, name: "中小件", value: "中", price: 4 },
      { id: 3, name: "大件", value: "大", price: 5 },
    ],
    fromData: {
      shippingAddress: "(姓名+电话+宿舍号)",
      recipientAddress: "17教",
      type: "圆通",
      remark: "急件",
      courizer_size: "小",
      price: 50,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 监听页面显示
   */
  onShow() {
    const component = this.selectComponent("#main")
    // 调用 Component 组件的 refreshData 方法刷新数据
    component.refreshAddr();
  },

  /**
   *
   */
  async publish() {
    const res = await request(
      "/user/sentPublishOrder",
      this.data.fromData,
      "POST",
      wx.getStorageSync("token")
    );
  },
});
