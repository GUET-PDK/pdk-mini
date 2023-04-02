const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addrData: [
      {
        id: 0,
        name: "张三",
        phone: "15324582440",
        addr: "桂林电子科技大学1",
        flag: true,
      },
      {
        id: 1,
        name: "李四",
        phone: "15324582440",
        addr: "桂林电子科技大学2",
        flag: false,
      },
      {
        id: 2,
        name: "王五",
        phone: "15324582440",
        addr: "桂林电子科技大学3",
        flag: false,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
   * 新增用户地址
   */
  toAddAddr: function () {
    wx.navigateTo({
      url: "../addAddr/addAddr",
    });
  },

  /**
   * 导入微信地址
   */
  toWxAddr: function () {
    wx.chooseAddress({
      success: (res) => {
        console.log(res);
        let addrs = this.data.addrData;
        addrs.push({
          name: res.userName,
          phone: res.telNumber,
          addr:
            res.provinceName + res.cityName + res.countyName + res.detailInfo,
          flag: false,
        });
        this.setData({
          addrData: addrs,
        });
      },
      fail: (error) => {
        console.log(error);
        app.checkAuthorize("scope.address");
      },
    });
  },

  /**
   * 查看 / 修改现有地址
   */
  toDetail: function (e) {
    let nowdata = e.currentTarget.dataset.nowdata;
    //将对象转为string
    var queryBean = JSON.stringify(nowdata)
    wx.navigateTo({
      url: "../addAddr/addAddr?queryBean=" + queryBean,
    });
  },

  /**
   * 修改默认地址
   */
  setDefault: function (e) {
    // console.log(e.currentTarget.dataset.index);
    let i = e.currentTarget.dataset.i;
    let addr = this.data.addrData;
    for (const key in addr) {
      if (i == key) {
        addr[key].flag = !addr[key].flag;
      } else {
        addr[key].flag = false;
      }
    }
    this.setData({
      addrData: addr,
    });
  },

  /**
   * 删除地址
   */
  delAddr: function (e) {
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let addr = this.data.addrData;
    for (const key in addr) {
      if (id == key) {
        addr.pop(key);
      }
    }
    this.setData({
      addrData: addr,
    });
    wx.showToast({
      title: "删除",
    });
  },
});
