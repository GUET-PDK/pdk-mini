const app = getApp();
const http = app.globalMethod();
const FormData = app.globalData.formData
import { isObjectValid } from "../../../utils/util";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    params: Object,
    url: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    formData: FormData
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async publish() {
      console.log("提交数据如下:",this.data.params);
      const temp = delete this.data.params.remark
      if (isObjectValid(temp)) {
        var res = await http(
          this.data.url,
          this.data.params,
          "POST",
          wx.getStorageSync("token")
        );
      } else {
        wx.showToast({
          title: "数据有空值",
          icon: "error",
          duration: 1000,
        });
      }
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
    
  },
});
