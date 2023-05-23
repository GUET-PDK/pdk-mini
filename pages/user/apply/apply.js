import {request} from '../../../utils/http'
let _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardImage: "",
    idImage: "",
    show: true, // todo 判断当前的认证状态
    avatar: '/static/image/icon/avatar.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    _this = this;
    try {
      this.setData({
        avatar:options.avatar
      })
    }catch (err) {
      console.log(err)
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
  formSubmit: function (e) {
    let value = e.detail.value;
    if (value.name == "") {
      wx.showToast({
        title: "请输入姓名",
        icon: "none",
      });
    } else if (value.idNumber == "") {
      wx.showToast({
        title: "请输入学号",
        icon: "none",
      });
    } else if (value.cardNumber == "") {
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
    }
  },

  /**
   * 申请成为骑手
   */
  async formSubmit(e) {
    const params = e.detail.value
    params.idImage = this.data.idImage
    params.cardImage = this.data.cardImage
    console.log(params)
    const res = await request("/user/beRunner",
    params,
    "POST",
    wx.getStorageSync('token'))
    console.log(res)
    // wx.request({
    //   url: 'http://pdk.usail.asia:88/user/beRunner',
    //   data: params,
    //   method: "POST",
    //   header: {
    //     "token": wx.getStorageSync('token')
    //   },
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  }
});
