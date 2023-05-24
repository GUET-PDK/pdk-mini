/* 个人信息详情 */
const app = getApp()
const http = app.globalMethod()
import { isObjectValid } from '../../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: "请填写昵称(必填)",
      avatar: "",
    },
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
        // console.log(res.tempFiles.tempFilePath)
        that.setData({
          "userInfo.avatar": res.tempFiles[0].tempFilePath,
        });
      },
    });
  },

  /**
   * 提交用户信息更新
   */
  async updateInfo(e) {
    const params = e.detail.value;
    params["userAvator"] = this.data.userInfo.avatar;
    if (isObjectValid(params)) {
      const res = await http(
        "/user/updateName",
        "",
        "POST",
        wx.getStorageSync("token"),
      );
    }else {
      wx.showToast({
        title: '数据有空值',
        icon: 'error',
        duration: 1000
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
