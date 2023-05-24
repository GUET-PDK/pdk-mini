// 代寄快递页面逻辑
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radios: [
      { id: 1, name: "小件", value: "小", price: 1 },
      { id: 2, name: "中小件", value: "中", check: "true", price: 2 },
      { id: 3, name: "大件", value: "大", price: 3 },
    ],
    imgList: [],
    timeSel: "b",
    fromData: {
      shippingAddress: '(姓名+电话+宿舍号)',// 配送地址
      deliveryTime1: '19:00',             // 配送时间1
      deliveryTime2: '22:00',             // 配送时间2
      recipientAddress: '',               // 收件人地址
      pickupCode: '',                     // 文件数组/取件码截图
      pickUpPositon: '',                  // 代取-外卖位置
      serviceDescription: '',             // 万能服务描述
      remark: '',
      price: 2,
      courierSize: '中'                   // 快递大小
    }
  },

  /**
   * changeInput 输入框变化 实现与对象的双向绑定
   */
  changeInput(e) {
    this.setData({
      "fromData.remark": e.detail.value
    })
  },

  // 上传事件
  upLoad: function () {
    const that = this;
    wx.chooseMedia({
      count: 3, //一次性最多选取三张
      mediaType: "image",
      sourceType: "album",
      success(res) {
        // console.log(res.tempFiles)

        // 更新imgList数组
        const { imgList = [] } = that.data;
        imgList.push(...res.tempFiles);
        that.setData({
          imgList,
          "fromData.pickupCode": imgList
        });
      },
    });
  },

  /* 删除图片函数 */
  delImage: function (e) {
    const imgs = this.data.imgList;
    // console.log(e.currentTarget.dataset)
    imgs.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: imgs,
      "fromData.pickupCode": imgs
    });
  },

  /* 时间筛选 */
  selTime: function (e) {
    let time = e.currentTarget.dataset.name;
    // console.log(e.currentTarget.dataset);
    if (time == "b") {
      this.setData({
        timeSel: "b",
        "fromData.deliveryTime1": "19:00",
        "fromData.deliveryTime2": "22:00",
      });
    } else {
      this.setData({
        timeSel: "a",
        "fromData.deliveryTime1": "12:00",
        "fromData.deliveryTime2": "14:00",
      });
    }
  },

  // 选择地址
  toSelAddr: function() {
    wx.navigateTo({
      url: '/pages/user/address/address',
    })
  },

  // 子组件事件传值
  onEvent: function (e) {
    // console.log(e)
    this.setData({
      "fromData.price": e.detail.price,
      "fromData.courierSize": e.detail.value
    });
  },

  /**
   * 监听页面显示
   */
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo.addr)
      this.setData({
        "fromData.shippingAddress": userInfo.addr
      })
  }
});
