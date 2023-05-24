// pages/order/order.js
const app = getApp();
const http = app.globalMethod();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    tabs: [
      { id: 1, title: "全部" },
      { id: 2, title: "待接单" },
      { id: 3, title: "配送中" },
      { id: 4, title: "已完成" },
    ],
    list: [],
    scrollHeight: 0,
    tmp: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrder();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 动态计算屏幕高度并设定 swiper 高度
    this.setData({
      scrollHeight:
        wx.getSystemInfoSync().windowHeight *
          (750 / wx.getSystemInfoSync().windowWidth) -
        70,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 用户点击订单标签切换页面
   */
  tabSwitch: function (e) {
    // console.log(e.currentTarget.dataset)
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
    });
  },

  swiperSwitch: function (e) {
    // console.log(e.detail.current)
    let swiper_index = e.detail.current;
    this.setData({
      currentIndex: swiper_index,
    });
  },

  /**
   * 获取用户订单
   * @params 0 待接单，1 配送中，2 已完成，空 全部
   * @method GET
   */
  async getOrder() {
    const res = await http(
      "/user/selectOrder",
      0,
      "GET",
      wx.getStorageSync("token")
    );
    console.log(res);
  },
});
