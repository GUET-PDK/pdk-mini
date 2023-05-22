let _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cert: "",
    stu_card: "",
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
        if (name == "cert") {
          _this.setData({
            cert: tempFilePaths[0].tempFilePath,
          });
        } else {
          _this.setData({
            stu_card: tempFilePaths[0].tempFilePath,
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
    } else if (value.stu_num == "") {
      wx.showToast({
        title: "请输入学号",
        icon: "none",
      });
    } else if (value.card_num == "") {
      wx.showToast({
        title: "请输入身份证号",
        icon: "none",
      });
    } else if (this.data.stu_card == "") {
      wx.showToast({
        title: "请上传校园卡",
        icon: "none",
      });
    } else if (this.data.cert == "") {
      wx.showToast({
        title: "请上传身份证",
        icon: "none",
      });
    }
  },
});
