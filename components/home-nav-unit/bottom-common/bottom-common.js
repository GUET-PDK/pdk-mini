const app = getApp();
const http = app.globalMethod();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    params: Object,
    url: String,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    async publish() {
      const { url, params } = this.data;
      let bodys = params;
      let errorMsg = "";

      switch (url) {
        case "/user/substitutionPublishOrder":
          if (!bodys["pickupCode"]) {
            errorMsg = "请上传取件码";
          }
          break;
        case "/user/sentPublishOrder":
          if (
            !bodys["shippingAddress"] ||
            !bodys["recipientAddress"] ||
            !bodys["type"]
          ) {
            errorMsg = "请填写完整信息";
          }
          break;
        case "/user/takeawayPublishOrder":
          if (!bodys["shippingAddress"] || !bodys["pickUpPositon"]) {
            errorMsg = "请填写完整信息";
          }
          break;
        case "/user/universalServicePublishOrder":
          if (!bodys["serviceDescription"]) {
            errorMsg = "请填写具体事项";
          }
          break;
        default:
          break;
      }

      if (errorMsg) {
        wx.showToast({
          title: errorMsg,
          icon: "none",
        });
        return { msg: errorMsg };
      }

      console.log("提交数据如下:", bodys);
      const res = await http(url, bodys, "POST", wx.getStorageSync("token"));
      if (res.msg == "发布成功") {
        wx.navigateBack({
          delta: 1,
        });
        wx.showToast({
          title: "发布成功",
          icon: "none",
          duration: 1000,
        });
      }
    },
  },
  observers: {
    price: function (newprice) {
      app.globalData.formData.price = newprice;
    },
  },
});
