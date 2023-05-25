// components/order/custom-dialog/custom-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    closeDialog: function () {
      // 关闭对话框的逻辑
      this.triggerEvent("closeDialog"); // 触发自定义事件，通知父组件关闭对话框
    },
  },
});
