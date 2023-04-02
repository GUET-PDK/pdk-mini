// pages/user/addAddr/addAddr.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ["广西壮族自治区", "桂林市", "灵川县"],
    default: {name:'请输入姓名',phone:'请输入手机号码',addr:'请输入详细地址',flag:false},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // todo 为避免报错 地址采用本地缓存 页面传递id即可
    if (JSON !== "") {
      var queryBean = JSON.parse(options.queryBean);
      this.setData({
        default: queryBean,
      });
      // console.log(this.data.default);
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

  switch1Change: function (e) {
    //console.log("switch1 发生 change 事件，携带值为", e.detail.value);
  },
  bindRegionChange: function (e) {
    //console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      region: e.detail.value,
    });
  },

  /**
   * 新增地址
   */
  newAddr: function (e) {
    // console.log(e.detail)
  },
});
