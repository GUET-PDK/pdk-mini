// pages/user/user.js
const app = getApp();
const http = app.globalMethod();
let userInfo = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    userInfo: {
      name: "",
      phone: "",
      avatar: "/static/image/icon/avatar.png",
      publishCount: 0,
      accessCount: 0,
      earnings: 0,
    },
    userList: [
      {
        id: 1,
        name: "申请接单",
        icon: "/static/image/user_ic/person_ifon.png",
        url: "/pages/user/apply/apply",
      },
      {
        id: 2,
        name: "我的地址",
        icon: "/static/image/user_ic/addr.png",
        url: "/pages/user/address/address",
      },
      {
        id: 3,
        name: "用户协议",
        icon: "/static/image/user_ic/deal.png",
        url: "/pages/user/agreement/agreement",
      },
      {
        id: 4,
        name: "意见反馈",
        icon: "/static/image/user_ic/opinion.png",
        url: "/pages/user/opinion/opinion",
      },
      {
        id: 5,
        name: "关于我们",
        icon: "/static/image/user_ic/about.png",
        url: "/pages/user/about/about",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    userInfo = wx.getStorageSync("userInfo");
    const token = wx.getStorageSync("token");
    if (userInfo && token) {
      this.setData({
        userInfo: userInfo,
        token: token,
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCount();
  },

  /**
   * 列表项
   */
  toOpen: function (e) {
    //console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    let toUrl;
    if (id > 0 && id < 7) {
      toUrl = e.currentTarget.dataset.url;
      if (id == 1) {
        toUrl = toUrl + "?avatar=" + this.data.userInfo.avatar;
      }
    } else {
      switch (id) {
        case "0":
          if (this.data.token) {
            // console.log("@@@@@@@@@");
            const userInfo = encodeURIComponent(
              JSON.stringify(this.data.userInfo)
            );
            toUrl = "../user/info/info?user=" + userInfo;
          } else {
            // console.log("去登陆");
            this.toLogin();
          }
          break;
        case "7":
          toUrl = "../user/info/info";
          break;
        case "8":
          toUrl = "";
          break;
        default:
          break;
      }
    }
    wx.navigateTo({
      url: toUrl,
    });
  },

  /**
   * 登录
   */
  toLogin: function () {
    wx.reLaunch({
      url: "/pages/login/login",
    });
  },

  /**
   * 获取发布、接到的订单数量以及收益
   */
  async getCount() {
    // 获取用户发布的所有订单数量
    const publishResponse = await http(
      "/user/getPublishCount",
      "",
      "GET",
      wx.getStorageSync("token")
    );
    const publishCount = publishResponse.data.count;
    //console.log("我发布的订单数量：", publishCount);

    // 获取用户成为骑手接过的订单
    const accessResponse = await http(
      "/runner/getAccessCount",
      "",
      "GET",
      wx.getStorageSync("token")
    );
    const accessCount = accessResponse.data.count;
    //console.log("我接拦的订单数量：", accessCount);

    // 获取用户成为骑手累计收益
    const earningsResponse = await http(
      "/runner/getMyEarnings",
      "",
      "GET",
      wx.getStorageSync("token")
    );
    const earnings = earningsResponse.data.earning;

    if (
      publishCount !== this.data.userInfo.publishCount ||
      accessCount !== this.data.userInfo.accessCount ||
      earnings !== this.data.userInfo.earnings
    ) {
      this.setData({
        "userInfo.publishCount": publishCount,
        "userInfo.accessCount": accessCount,
        "userInfo.earnings": earnings,
      });
      wx.setStorageSync("userInfo", this.data.userInfo);
      // console.log(this.data.userInfo)
    }
  },
});
