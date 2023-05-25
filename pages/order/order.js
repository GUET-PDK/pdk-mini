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
    showDialog: false,
    currentId: "",
    orderDetail: {},
    // 拟态框数据
    comment: "",
    stars: [0, 0, 0, 0, 0], // 星级数组，初始为0表示未选中
    grade: 0, // 当前评定的星级
  },

  /**
   * 拟态框插槽事件
   */
  closeDialog() {
    this.setData({ showDialog: false });
  },
  handleSubmit(e) {
    // 处理表单提交逻辑
    console.log("表单提交", e.detail.value);
    this.closeDialog();
  },
  handleInputChange(e) {
    // 处理输入框输入事件
    this.setData({ comment: e.detail.value });
  },
  selectStar(e) {
    const star = e.currentTarget.dataset.star; // 获取点击的星级
    //console.log(star)
    const stars = this.data.stars.map((item, index) => (index < star ? 1 : 0)); // 更新星级数组
    this.setData({
      stars,
      grade: star,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrder(0);
    //console.log(this.data.orderList)
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
    //console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
    });
    this.getOrder(index);
  },

  swiperSwitch: function (e) {
    //console.log(e.detail.current)
    let swiper_index = e.detail.current;
    this.setData({
      currentIndex: swiper_index,
    });
    //this.getOrder(swiper_index)
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
   * 查看原图
   */
  viewOriginalImage(event) {
    const originalImageUrl = event.currentTarget.dataset.src;
    // 这里可以设定例如显示弹窗、跳转页面等查看方式
    console.log("点击查看原图", originalImageUrl);
  },
  /**
   * 点击返回 - 隐藏底部弹出抽屉
   */
  backPage() {
    this.setData({
      showPage: false,
    });
  },
  /**
   * 点击确认完成订单
   */
  async confirmTask(e) {
    // console.log(e)
    this.setData({
      showDialog: true,
    });
    const { showDialog, grade, comment } = this.data;
    const orderId = e.currentTarget.dataset.id;

    if (grade && comment) {
      try {
        const res = await http(
          "/user/commentOrder",
          { orderId, grade, comment },
          "POST",
          wx.getStorageSync("token")
        );

        if (res.code === 200) {
          wx.showToast({
            title: "确认成功",
            icon: "none",
            duration: 1000,
          });

          this.setData({
            showPage: false,
            showDialog: false,
            currentIndex: 3,
          });

          this.getOrder(3, true);
          this.getOrder(0, true);
        }
      } catch (error) {
        // 处理异步操作的错误
        console.error(error);
      }
    }
  },

  /**
   * 弹窗进入中触发 - 查看详情
   */
  async getOrderDetail() {
    const orderId = this.data.currentId;
    // console.log(orderId);
    const res = await http(
      `/user/getOrderDetail?orderId=${orderId}`,
      "",
      "GET",
      wx.getStorageSync("token")
    );

    if (res.code == 200) {
      const orderDetail = res.data;
      const Category = {
        0: "代取快递",
        1: "代寄快递",
        2: "代领外卖",
        3: "其他服务",
      }[orderDetail.orderType];
      const Status = {
        0: "待接单",
        1: "配送中",
        2: "已完成",
      }[orderDetail.orderStatus];

      orderDetail.orderCategory = Category;
      orderDetail.orderStatus = Status;

      this.setData({
        orderDetail: orderDetail,
      });
    }
  },

  /**
   * 获取用户订单
   * @params 0 待接单，1 配送中，2 已完成，空 全部
   * @method GET
   */
  async getOrder(i, update) {
    // 先尝试从缓存中获取订单数据
    const cachedOrders = wx.getStorageSync("cachedOrders") || [];
    // 如果缓存中存在对应订单状态的数据，则直接使用缓存数据
    if (cachedOrders[i] && !update) {
      this.setData({
        orderList: cachedOrders[i],
      });
      return;
    }

    // 如果缓存中不存在对应订单状态的数据，则从后端接口获取数据
    let url;
    if (i == 0) {
      url = `/user/selectOrder?orderStatus=${""}`;
    } else {
      url = `/user/selectOrder?orderStatus=${i - 1}`;
    }
    const res = await http(url, "", "GET", wx.getStorageSync("token"));

    if (res.code == 200) {
      const list = res.data;
      const updateList = list.map((item) => {
        const Category = {
          0: "代取快递",
          1: "代寄快递",
          2: "代领外卖",
          3: "其他服务",
        }[item.order_type];
        const status = {
          1: "待接单",
          2: "配送中",
          3: "已完成",
        }[i];

        return {
          ...item,
          orderStatus: status,
          orderCategory: Category,
          createTime: item.createTime.replace(/T/g, " "),
        };
      });

      // 更新缓存数据
      cachedOrders[i] = updateList;
      wx.setStorageSync("cachedOrders", cachedOrders);
      // console.log(updateList);
      this.setData({
        orderList: updateList,
      });
    }
  },
});
