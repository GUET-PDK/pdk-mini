/* 个人信息详情 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: "请填写昵称(必填)",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userStr = decodeURIComponent(options.user);
    try {
      this.setData({
        userInfo: JSON.parse(userStr),
      });
    } catch (e) {
      console.error("parse profile error:", e);
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
   * 点击更新用户头像
   */
  changAvatar: function () {
    wx.chooseMedia({
      count: 1, //一次性最多选取三张
      mediaType: "image",
      sourceType: ["album", "camera"],
      camera: "front",
      success(res) {
        // console.log(res.tempFiles.tempFilePath)
        this.setData({
          "userInfo.avatar": res.tempFiles[0].tempFilePath,
        });
      },
    });
  },
});
