const app = getApp();
const http = app.globalMethod();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addrData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAddress();
  },

  /**
   *
   */
  onShow() {
    this.getAddress();
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
          addressName: res.userName,
          addressPhone: res.telNumber,
          addressDescription:
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
    var queryBean = JSON.stringify(nowdata);
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
        const { addressId } = addr[key];
        const param = { addressId };
        // console.log(param)
        await http(
          "/user/deleteAddress",
          param,
          "POST",
          wx.getStorageSync("token")
        );
        addr.pop(key);
      }
    }
    this.setData({
      addrData: addr,
    });
    this.getAddress();
  },

  /**
   * 获取用户的所有地址
   */
  async getAddress() {
    const res = await http(
      "/user/getAllAddress",
      "",
      "GET",
      wx.getStorageSync("token")
    );
    console.log("所有地址如下：", res.data);
    if (res.data.length != null)
      this.setData({
        addrData: res.data,
      });
  },

  /**
   * 选择地址
   */
  chooseAddr(e) {
    // 获取当前页面栈的信息
    const pages = getCurrentPages();
    // 获取前一个页面的路由
    const previousPage = pages.length >= 2 ? pages[pages.length - 2].route : "";
    // 判断前一个页面的路由是否包含 "/home"
    if (previousPage.includes("/home")) {
      // 前一个页面的路由包含 "/home"，执行相应的地址选择逻辑
      console.log(e.currentTarget.dataset.nowdata);
      const nowData = e.currentTarget.dataset.nowdata
      const userInfo = wx.getStorageSync('userInfo')
      userInfo.addr = nowData.addressDescription + ',' + nowData.addressPhone.slice(-4)
      console.log(userInfo)
      wx.setStorageSync('userInfo', userInfo)
      wx.navigateBack({
        delta: 1
      })
    }
  },
});
