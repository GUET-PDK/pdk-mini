// components/nav-common/nav-common.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radios: Array, // 父组件传递的数据
    type: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    def_num: 1,
    def_price: 2.0,
    formData: {}
  },

  /**
   * 组件的方法
   */
  methods: {
    // 数量选择器——加、减方法
    // addNum() {
    //   let tmp = this.data.def_num;
    //   if (tmp < 5) {
    //     tmp++;
    //     this.setData({
    //       def_num: tmp,
    //     });
    //   } else {
    //     wx.showToast({
    //       title: "再多马车都装不完啦!",
    //       icon: "none",
    //       duration: 1000,
    //     });
    //   }
    // },
    // subNum() {
    //   let tmp = this.data.def_num;
    //   if (tmp > 1) {
    //     tmp--;
    //     this.setData({
    //       def_num: tmp,
    //     });
    //   } else {
    //     wx.showToast({
    //       title: "最少一个哟!",
    //       icon: "none",
    //       duration: 1000,
    //     });
    //   }
    // },

    // 快递规格单选监听
    radioChange(e) {
      // console.log(e.detail.value);
      const items = this.data.radios;
      for (let i = 0; i < items.length; i++) {
        if ((items[i].check = items[i].value === e.detail.value)) {
          this.setData({
            def_price: items[i].price,
            "formData.price": items[i].price,
            "formData.courizerSize": items[i].value
          });
        }
      }
    },
  },

  // 监听数据变化 同 watch
  observers: {
    def_price: function (new_price) {
      this.triggerEvent("totalEvent", this.data.formData);
    },
  },
});
