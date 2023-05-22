// pages/user/addAddr/addAddr.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ["花江校区", "金鸡岭校区", "六合路校区"],
    selcompus: "花江校区",
    default: {
      name: "请输入姓名",
      phone: "请输入手机号码",
      addr: "请输入详细地址",
      flag: false,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // todo 为避免报错 地址采用本地缓存 页面传递id即可
    if (JSON !== "") {
      try {
        const queryBean = JSON.parse(options.queryBean);
        this.setData({
          default: queryBean,
        });
      } catch(err) {
        //console.log(err)
      }
    }
  },

  bindRegionChange: function (e) {
    //console.log("picker发送选择改变，携带值为", e.detail.value);
    // console.log(e.detail.value)
    let index = e.detail.value;
    this.setData({
      selcompus: this.data.region[index],
    });
  },

  /**
   * 新增地址
   */
  newAddr: function (e) {
    console.log(e.detail.value);
  },
});
