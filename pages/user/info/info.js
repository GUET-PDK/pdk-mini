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
