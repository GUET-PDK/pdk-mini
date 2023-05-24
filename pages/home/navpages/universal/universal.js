// pages/home/page/universal/universal.js
Page({
  data: {
    // 服务类别
    radios: [
      { id: 1, name: "打印", value: "小", price: 1 },
      { id: 2, name: "软件安装", value: "小", check: "true", price: 2 },
      { id: 3, name: "游戏陪玩", value: "中", price: 3 },
      
    ],
    total: {
      courizerSize: "小",
      price: 3,
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
