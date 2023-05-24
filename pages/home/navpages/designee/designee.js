// pages/home/navpages/designee/designee.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 外卖分数
    radios: [
      { id: 1, name: "书本", value: "小", check: "true", price: 1 },
      { id: 2, name: "顺风车", value: "中", price: 2 },
      { id: 3, name: "桶装水", value: "大", price: 3 },
    ],
    total: {
      price: 2,
      value: "小",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { },

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
})