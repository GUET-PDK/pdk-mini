import { request } from "../../../utils/http";
let _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardImage: "",
    idImage: "",
    show: true, // todo 判断当前的认证状态
    avatar: "/static/image/icon/avatar.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    _this = this;
    try {
      this.setData({
        avatar: options.avatar,
      });
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * 用户上传校园卡、身份证
   */
  choose: function (e) {
    let name = e.currentTarget.dataset.name;
    wx.chooseMedia({
      count: 1, //一次性最多选取三张
      mediaType: "image",
      sourceType: ["album", "camera"],
      camera: "back",
      success(res) {
        // console.log(res.tempFiles.tempFilePath)
        const tempFilePaths = res.tempFiles;
        if (name == "cardImage") {
          _this.setData({
            cardImage: tempFilePaths[0].tempFilePath,
          });
        } else {
          _this.setData({
            idImage: tempFilePaths[0].tempFilePath,
          });
        }
      },
    });
  },

  /**
   * 表单上传认证
   */
  async formSubmit(e) {
    const params = e.detail.value;
    if (params.name == "") {
      wx.showToast({
        title: "请输入姓名",
        icon: "none",
      });
    } else if (params.idNumber == "") {
      wx.showToast({
        title: "请输入学号",
        icon: "none",
      });
    } else if (params.cardNumber == "") {
      wx.showToast({
        title: "请输入身份证号",
        icon: "none",
      });
    } else if (this.data.idImage == "") {
      wx.showToast({
        title: "请上传校园卡",
        icon: "none",
      });
    } else if (this.data.cardImage == "") {
      wx.showToast({
        title: "请上传身份证",
        icon: "none",
      });
    } else {
      params.idImage = this.data.idImage;
      params.cardImage = this.data.cardImage;
      const res = await request(
        "/user/beRunner",
        params,
        "POST",
        wx.getStorageSync("token"),
        "json"
      );
      console.log(res);
    }
  },
});
