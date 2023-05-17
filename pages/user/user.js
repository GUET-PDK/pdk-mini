// pages/user/user.js
const app = getApp();
import { getToken } from '../../utils/util'
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
    const userInfo = wx.getStorageSync("userInfo");
    const token = wx.getStorageSync('token')
    if (userInfo && token) {
      this.setData({
        userInfo: userInfo,
        token: token
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  /**
   * 列表项
   */
  toOpen: function (e) {
    //console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    let toUrl;
    if (id > 0 && id < 7) {
      toUrl = e.currentTarget.dataset.url;
    } else {
      switch (id) {
        case "0":
          if (this.data.token) {
            // console.log("@@@@@@@@@");
            const userInfo = encodeURIComponent(JSON.stringify(this.data.userInfo));
            toUrl = "../user/info/info?user=" + userInfo;
          } else {
            console.log("去登陆");
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
});
