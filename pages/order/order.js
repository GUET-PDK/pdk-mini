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
      { id: 0, title: "全部" },
      { id: 1, title: "待接单" },
      { id: 2, title: "配送中" },
      { id: 3, title: "已完成" },
    ],
    orderList: [],
    scrollHeight: 0,
    showPage: false,
    pageHeight: 300,
    currentId: "",
    orderDetail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrder(0);
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
      pageHeight:
        wx.getSystemInfoSync().windowHeight *
          (750 / wx.getSystemInfoSync().windowWidth) -
        60,
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
    // console.log(e)
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
    });
    this.getOrder(index);
  },

  swiperSwitch: function (e) {
    // console.log(e.detail.current)
    let swiper_index = e.detail.current;
    this.setData({
      currentIndex: swiper_index,
    });
  },

  /**
   * 打开弹窗查看订单详情
   */
  toOrderdDetail: function (e) {
    this.setData({
      showPage: true,
      currentId: e.currentTarget.dataset.id,
    });
    // console.log(e.currentTarget.dataset.id)
  },

  /**
   * 弹窗进入中触发
   */
  async getOrderDetail() {
    const orderId = this.data.currentId;
    console.log(orderId);
    const res = await http(
      `/user/getOrderDetail?orderId=${orderId}`,
      "",
      "GET",
      wx.getStorageSync("token")
    );
    // console.log(res)
    if (res.code == 200) {
      const orderDetail = res.data;
      let orderCategory, orderStatus
      switch (orderDetail.orderType) {
        case 0:
          orderCategory = "代取快递";
          break;
        case 1:
          orderCategory = "代寄快递";
          break;
        case 2:
          orderCategory = "代领外卖";
          break;
        case 3:
          orderCategory = "其他服务";
          break;
      }
      switch (orderDetail.orderStatus) {
        case 0:
          orderStatus = "待接单";
          break;
        case 1:
          orderStatus = "配送中";
          break;
        case 2:
          orderStatus = "已完成";
          break;
        default:
          break;
      }
      orderDetail.orderCategory = orderCategory;
      orderDetail.orderStatus = orderStatus;
      // orderDetail.createTime = orderDetail.createTime.replace(/T/g, " ");
      // orderDetail.updateTime = orderDetail.updateTime.replace(/T/g, " ");
      this.setData({
        orderDetail: orderDetail
      })
    }
  },

  /**
   * 获取用户订单
   * @params 0 待接单，1 配送中，2 已完成，空 全部
   * @method GET
   */
  async getOrder(i) {
    let url;
    if (i == 0) {
      url = `/user/selectOrder?orderStatus=${""}`;
    } else {
      url = `/user/selectOrder?orderStatus=${i - 1}`;
    }
    const res = await http(url, "", "GET", wx.getStorageSync("token"));
    if (res.code == 200) {
      const list = res.data;
      let order_category, type;
      switch (i) {
        case 1:
          type = "待接单";
          break;
        case 2:
          type = "配送中";
          break;
        case 3:
          type = "已完成";
          break;
        default:
          break;
      }
      list.forEach((list) => {
        switch (list.order_type) {
          case 0:
            order_category = "代取快递";
            break;
          case 1:
            order_category = "代寄快递";
            break;
          case 2:
            order_category = "代领外卖";
            break;
          case 3:
            order_category = "其他服务";
            break;
        }
        list.order_category = order_category;
        list.order_type = type;
        // console.log(type)
        list.createTime = list.createTime.replace(/T/g, " ");
      });
      this.setData({
        orderList: list,
      });
    }
  },
});
