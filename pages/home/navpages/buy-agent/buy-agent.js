// pages/home/page/buy-agent/buy-agent.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 外卖分数
    radios: [
      { id: 1, name: "生活日用", value: "小", check: "true", price: 2 },
      { id: 2, name: "零食水果", value: "大", price: 3 },
    ],
    total: {
      price: 2,
      value: "小",
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
    const component = this.selectComponent("#main");
    // 调用 Component 组件的 refreshData 方法刷新数据
    component.refreshAddr();
  },

  /**
   * 父组件接收子组件的触发事件
   */
  onEvent(e) {
    // console.log(e.detail)
    this.setData({
      "total.courizerSize": e.detail.courizerSize,
      "total.price": e.detail.price,
    });
  },
});
