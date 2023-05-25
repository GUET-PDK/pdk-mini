import { request } from "../../../utils/http";
import { validateIdCard, validateStuNumber } from "../../../utils/util";
let _this, userInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardImage: "",
    idImage: "",
    applyStatus: 1, // 当前的认证状态 0表示申请中，1表示未通过，2表示已同意
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
    userInfo = wx.getStorageSync("userInfo");
    if (userInfo.status) {
      // this.formSubmit(userInfo.applyData)
      // if (userInfo.status == 2) {
      //   this.setData({
      //     applyStatus: userInfo.status,
      //   });
      // } else if(userInfo.status == 1){
      //   this.setData
      // }
      this.setData({
        applyStatus: status
      })
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
    } else if (params.idNumber == "" || !validateStuNumber(params.idNumber)) {
      wx.showToast({
        title: "学号有误",
        icon: "error",
        duration: 1000,
      });
    } else if (params.cardNumber == "" || !validateIdCard(params.cardNumber)) {
      wx.showToast({
        title: "身份证号有误",
        icon: "error",
        duration: 1000,
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
        wx.getStorageSync("token")
      );
      console.log("申请：",res.data)
      if (res.code == 200) {
        // const userInfo = wx.getStorageSync('userInfo')
        userInfo.status = {
          "申请已提交，待审核": 0,
          "审核失败": 1,
          "审核通过": 2,
        }[res.msg] || userInfo.status;
        // userInfo.applyData = params;
        wx.setStorageSync("userInfo", userInfo);
        wx.navigateBack({
          delta: 1,
        });
      }
    }
  },
});
