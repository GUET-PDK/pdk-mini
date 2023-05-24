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
      let bodys = this.data.params;
      if (this.data.url !== "/user/substitutionPublishOrder") {
        bodys = app.globalData.formData;
        bodys["price"] = this.data.params["price"];
        bodys["courizerSize"] = this.data.params["courizerSize"];
      }
      console.log("提交数据如下:", bodys);
      const res = await http(
        this.data.url,
        bodys,
        "POST",
        wx.getStorageSync("token")
      );
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
