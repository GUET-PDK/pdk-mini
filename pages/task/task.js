const app = getApp();
const http = app.globalMethod();
let _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseTab: "task",
    currentIndex: 0,
    currentId: 0,
    taskTabTitle: [
      // { index: 0, title: "全部" },
      { index: 0, title: "代取快递" },
      { index: 1, title: "代寄快递" },
      { index: 2, title: "代领外卖" },
      { index: 3, title: "其他" },
    ],
    mytaskTabTitle: [
      { index: 0, title: "全部" },
      { index: 1, title: "进行中" },
      { index: 2, title: "已完成" },
      { index: 3, title: "评价" },
    ],
    taskList: [],
    taskDetail: [],
    mytaskList: [],
    scrollHeight: 0,
    showPage: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    _this = this;
    // 动态计算屏幕高度并设定 swiper 高度
    this.setData({
      scrollHeight:
        wx.getSystemInfoSync().windowHeight *
          (750 / wx.getSystemInfoSync().windowWidth) -
        130,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAllTask(this.data.currentIndex);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 切换顶部 Tab 标签
   */
  changeTab: function (e) {
    const name = e.currentTarget.dataset.name;
    // console.log(name)
    this.setData({
      chooseTab: name,
      currentIndex: 0,
    });
    if (name == "mytask") {
      this.getMyTask(this.data.currentIndex);
    }
  },

  /**
   * 子标签切换 - 任务类别 / 状态
   */
  taskSwitch: function (e) {
    const id = e.currentTarget.dataset.id;
    //console.log("tabsIndex:",id);
    this.setData({
      currentIndex: id,
    });
  },

  /**
   * 左右滑动
   */
  swiperSwitch: function (e) {
    const swiper_index = e.detail.current;
    //console.log("swiperIndex:",swiper_index);
    this.setData({
      currentIndex: swiper_index,
    });
    if (this.data.chooseTab == "mytask") {
      this.getMyTask(swiper_index);
    }
    this.getAllTask(swiper_index);
  },

  /**
   * 去查看详情
   */
  toDetail(e) {
    this.setData({
      showPage: true,
      currentId: e.currentTarget.dataset.id,
    });
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
   * 点击接单请求
   */
  async confirmTask(e) {
    // console.log(e.currentTarget.dataset)
    const orderId = e.currentTarget.dataset.id;
    const param = { orderId };
    const res = await http(
      "/runner/confirmOrder",
      param,
      "POST",
      wx.getStorageSync("token")
    );
    if (res.code == 403) {
      wx.showModal({
        title: "权限不足",
        content: "你还未通过骑手申请",
        confirmText: "去认证",
        complete: (res) => {
          if (res.cancel) {
            this.setData({
              showPage: false,
            });
          }

          if (res.confirm) {
            wx.reLaunch({
              url: "/pages/login/login",
            });

            this.setData({
              showPage: false,
            });
          }
        },
      });
    } else if (res.code == 200) {
      wx.showToast({
        title: "接单成功",
        icon: "none",
        duration: 1000,
      });
      this.setData({
        showPage: false,
        chooseTab: "mytask",
        currentIndex: 1,
      });
      this.getMyTask(1, true);
      this.getAllTask(this.data.currentIndex, true);
    }
  },

  /**
   *获取任务详情
   */
  async getTaskDetail(e) {
    const orderId = this.data.currentId;
    // console.log(orderId);
    const res = await http(
      `/runner/orderMessage?orderId=${orderId}`,
      "",
      "GET",
      wx.getStorageSync("token")
    );

    if (res.code == 200) {
      const taskDetail = res.data;
      const Category = {
        0: "代取快递",
        1: "代寄快递",
        2: "代领外卖",
        3: "其他服务",
      }[taskDetail.orderType];

      taskDetail.orderCategory = Category;

      this.setData({
        taskDetail: taskDetail,
      });
    }
  },

  /**
   * 获取所有的跑腿任务 即所有未接单的订单
   * @param shouldUpdate 是否应该绕过缓存更新数据
   * @param i 订单类别
   * @method GET
   */
  async getAllTask(i, shouldUpdate) {
    //console.log(i)
    // 先尝试从缓存中获取订单数据
    let cacheTasks = wx.getStorageSync("cacheTasks") || [];
    // 如果缓存中存在对应订单状态的数据，则直接使用缓存数据
    if (cacheTasks[i] && !shouldUpdate) {
      this.setData({
        taskList: cacheTasks[i],
      });
      //console.log(this.data.taskList);
      return;
    }

    // 如果缓存中不存在对应订单状态的数据，则从后端接口获取数据
    const url = `/runner/getOrder?orderType=${""}`;
    const res = await http(url, "", "GET", wx.getStorageSync("token"));

    if (res.code == 200) {
      const list = res.data;

      // 按 category 将数据分组存进缓存数组当中
      const updateList = list.reduce((acc, item) => {
        const category = {
          0: "代取快递",
          1: "代寄快递",
          2: "代领外卖",
          3: "其他服务",
        }[item.orderType];

        if (!acc[item.orderType]) {
          acc[item.orderType] = [];
        }
        acc[item.orderType].push({
          ...item,
          orderCategory: category,
        });

        return acc;
      }, {});

      const indexedUpdateList = Object.values(updateList).sort(
        (a, b) => a[0].orderType - b[0].orderType
      );

      // 更新缓存数据
      cacheTasks = indexedUpdateList;
      //console.log(indexedUpdateList);
      wx.setStorageSync("cacheTasks", cacheTasks);
      this.setData({
        taskList: indexedUpdateList[i],
      });
    }
  },

  /**
   * 获取我的全部接单任务
   */
  async getMyTask(i, shouldUpdate) {
    // console.log("i为",i)
    // 先尝试从缓存中获取订单数据
    let cacheMyTasks = wx.getStorageSync("cacheMyTasks") || [];
    // 如果缓存中存在对应订单状态的数据，则直接使用缓存数据
    if (cacheMyTasks[i] && !shouldUpdate) {
      this.setData({
        mytaskList: cacheMyTasks[i],
      });
      //console.log(this.data.taskList);
      return;
    }

    // 如果缓存中不存在对应订单状态的数据，则从后端接口获取数据
    let url;
    if (i == 0 || i == 3) {
      url = `/runner/selectNowOrder?orderStatus=${""}`;
    } else {
      url = `/runner/selectNowOrder?orderStatus=${i}`;
    }
    const res = await http(url, "", "GET", wx.getStorageSync("token"));

    if (res.code == 200 && res.data) {
      const list = res.data;

      const updateList = list.map((item) => {
        const category = {
          0: "代取快递",
          1: "代寄快递",
          2: "代领外卖",
          3: "其他服务",
        }[item.orderType];
        const status = {
          1: "进行中",
          2: "已完成",
        }[i];

        return {
          ...item,
          orderStatus: status,
          orderCategory: category,
        };
      }, {});

      // 更新缓存数据
      cacheMyTasks[i] = updateList;
      console.log(updateList);
      wx.setStorageSync("cacheMyTasks", cacheMyTasks);
      this.setData({
        mytaskList: updateList,
      });
    } else if (res.code == 200) {
      wx.showToast({
        title: `${res.msg}`,
        icon: "none",
      });
      this.setData({
        mytaskList: [],
      });
      //console.log(this.data.mytaskList.length)
    }
  },
});
