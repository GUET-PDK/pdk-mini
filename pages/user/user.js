// pages/user/user.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
        url: "/pages/user/",
      },
      {
        id: 4,
        name: "分享好友",
        icon: "/static/image/user_ic/share.png",
        url: "",
      },
      {
        id: 5,
        name: "意见反馈",
        icon: "/static/image/user_ic/opinion.png",
        url: "",
      },
      {
        id: 6,
        name: "关于我们",
        icon: "/static/image/user_ic/about.png",
        url: "/pages/user/about/about",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
    var id = e.currentTarget.dataset.id;
    var toUrl;
    if (id > 0 && id < 7) {
      toUrl = e.currentTarget.dataset.url;
    } else {
      switch (id) {
        case "0":
          toUrl = "../user/info/info";
          break;
        case "7":
          toUrl = "../user/info/info";
          break;
        case "8": 
          toUrl = ""
          break;
        default: break;
      }
    }
    wx.navigateTo({
      url: toUrl,
    });
  },
});
