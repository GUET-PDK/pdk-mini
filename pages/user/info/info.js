/* 个人信息详情 */
const app = getApp();
const http = app.globalMethod();
import { validatePhoneNumber } from "../../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userName: "请填写昵称(必填)",
      userPhone: '请填写11位手机号(必填)',
    },
    userAvatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.hasOwnProperty("user")) {
      const userStr = decodeURIComponent(options.user);
      try {
        this.setData({
          userInfo: JSON.parse(userStr),
        });
      } catch (e) {
        console.error("parse profile error:", e);
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserInfo()
  },

  /**
   * 点击更新用户头像
   */
  changAvatar: function () {
    const that = this;
    wx.chooseMedia({
      count: 1, //一次性最多选取三张
      mediaType: "image",
      sourceType: ["album", "camera"],
      camera: "front",
      success(res) {
        // console.log(res.tempFiles)
        that.setData({
          "userAvatar": res.tempFiles[0].tempFilePath,
        });
      },
    });
  },

  /**
   * 提交用户信息更新
   */
  async updateInfo(e) {
    const params = e.detail.value;
    params["userAvator"] = this.data.userAvatar;
    if (validatePhoneNumber(params["userPhone"])) {
      const res = await http(
        "/user/updateName",
        params,
        "POST",
        wx.getStorageSync("token")
      )
    } else {
      wx.showToast({
        title: "手机号错误",
        icon: "error",
        duration: 1000,
      });
    }
  },

  /**
   * 获取用户当前信息
   */
  async getUserInfo() {
    const res = await http(
      "/user/getMessage",
      "",
      "GET",
      wx.getStorageSync("token")
    );
    if (res.msg == "查询成功") {
      console.log(res)
      this.setData({
        userInfo: res.data
      })
    }
  },

  /**
   * 取消返回
   */
  backUserPage: function () {
    wx.navigateBack({
      delta: 1, // 返回上一页
    });
  },
});
