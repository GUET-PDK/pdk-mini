const app = getApp();
const http = app.globalMethod()

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
        addr: "36栋211室",
        flag: true,
      },
      {
        id: 1,
        name: "李四",
        phone: "15324582440",
        addr: "36栋210室",
        flag: false,
      },
      {
        id: 2,
        name: "王五",
        phone: "15324582440",
        addr: "36栋212室",
        flag: false,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAddress()
  },

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
  async delAddr(e) {
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
    const res = await http(
      "/user/deleteAddress",
      "",
      "POST",
      wx.getStorageSync('token')
    )
  },

  /**
   * 获取用户的所有地址
   */
  async getAddress() {
    const res = await http(
      "/user/getAllAddress",
      "",
      "GET",
      wx.getStorageSync('token'),
      "json"
    )
    console.log("所有地址如下：",res)
  }
});
