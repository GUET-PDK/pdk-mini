const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    _express: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    formData: {
      shippingAddress: "(姓名+电话+宿舍号)", // 配送地址
      deliveryTime1: "19:00", // 配送时间1
      deliveryTime2: "22:00", // 配送时间2
      recipientAddress: "", // 收件人地址
      pickupCode: [], // 文件数组/取件码截图
      pickUpPositon: "", // 代取-外卖位置
      serviceDescription: "", // 万能服务描述
      remark: "",
      price: 2,
      courierSize: "",
    },
    remarkHolder: "",
  },

  /**
   * 组件的生命周期函数
   */
  lifetimes: {
    // 组件布局完成后触发
    ready() {
      this.updateRemark(this.data.type);
    },
  },
  /**
   * 组件的方法
   */
  methods: {
    // 更新备注内容
    updateRemark: function (val) {
      switch (val) {
        case "post":
          val = "如物品贵重";
          break;
        case "take":
          val = "如送达时间";
          break;
        case "buy":
          val = "如配送时间,是否急需";
          break;
        case "designee":
          val = "如送达时间";
          break;
        case "universal":
          val = "如紧急性";
          break;
        default:
          break;
      }
      this.setData({
        remarkHolder: val,
      });
    },

    // 去选择地址
    toSelAddr: function () {
      wx.navigateTo({
        url: "/pages/user/address/address",
      });
    },

    // 更新选中的地址
    refreshAddr: function () {
      const userInfo = wx.getStorageSync("userInfo");
      if (userInfo.addr)
        this.setData({
          "formData.shippingAddress": userInfo.addr,
        });
    },

    // 输入框监听
    changeInputs: function (e) {
      //console.log(e.target.dataset.name);
      const name = e.target.dataset.name;
      const value = e.detail.value;
      //console.log(e.detail.value);
      this.setData({
        [`formData.${name}`]: value
      })
      //console.log(this.data.formData)
      app.globalData.formData = this.data.formData
      // console.log(app.globalData.formData)
    },
  },

  // 监听数据变化 同 watch
  observers: {},
});
