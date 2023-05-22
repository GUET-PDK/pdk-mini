// pages/home/page/pick-express/pick-express.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sum: 2.0,
    radios: [
      { id: 1, name: "小件", value: "small", price: 1.5 },
      { id: 2, name: "中小件", value: "middle", check: "true", price: 2.0 },
      { id: 3, name: "大件", value: "big", price: 3.0 },
    ],
    imgList: [],
    timeSel: "b",
    fromData: {
      shippingAddress: '',
      deliveryTime1: '',
      deliveryTime2: '',
      pickupCode: '',
      remark: '',
      totalPrice: '',
      courierSize: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
    });
  },

  /* 时间筛选 */
  selTime: function (e) {
    let time = e.currentTarget.dataset.name;
    // console.log(e.currentTarget.dataset);
    if (time == "b") {
      this.setData({
        timeSel: "b",
      });
    } else {
      this.setData({
        timeSel: "a",
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
    this.setData({
      sum: e.detail,
    });
  },

  publish: function (data) {
    console.log("@@@@@@@@@@")
    console.log(data)
    wx.request({
      url: 'http://pdk.usail.asia:88/user/substitutionPublishOrder',
      method: 'POST',
      data: {

      }
    })
  }
});
