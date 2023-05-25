import FormData from "./formData";
import { isObjectValid } from "./util";
// url请求前缀
// http://117.50.177.54:8080
// http://43.138.225.254:8080
// http://pdk.usail.asia:88
const BaseUrl = "http://pdk.usail.asia:88";
const header = {
  "content-type": "application/json",
};

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @token 传入token
 */
export function request(url, params, method, token) {
  // 请求拦截器，判断token
  token == null || token == "undefined"
    ? wx.showToast({
        title: "请先登录",
      })
    : (header["token"] = token);
  if (isObjectValid(params) == false) {
    wx.showToast({
      title: "请补充必要信息",
      icon: "error",
      duration: 1500,
    });
    return {msg:"参数不能为空"}
  }
  // if (url.includes("Count") || url.includes("Earnings")) {
  // } else {
  //   wx.showLoading({
  //     title: "正在加载中...",
  //   });
  // }
  if (method == "POST") {
    // console.log("请求传参：");
    // console.log(params);
    const formData = createFormData(params);
    header["content-type"] = formData.contentType;
    params = formData.buffer;
    // console.log(token);
  }
  // 将请求数据序列化为 JSON 字符串
  // const datas = JSON.stringify(params)
  return new Promise((reslove, reject) => {
    wx.request({
      url: BaseUrl + url,
      data: params,
      method: method,
      header: header,
      success: (res) => {
        // wx.hideLoading();
        console.log("响应：", res.data);
        if (res.header.token) {
          wx.setStorageSync("token", res.header.token);
        }
        reslove(res.data);
      },
      fail: (err) => {
        console.log("失败：", err);
        wx.showToast({
          title: "网络连接失败",
          icon: 'error',
          duration: 1500,
        });
        reject(err);
      },
    });
  });
}

/**
 * 手动构造 form-data 数据格式
 */
function createFormData(obj) {
  let formData = new FormData();
  for (let name in obj) {
    if (name == "pickupCode") {
      obj[name].forEach((file) => {
        formData.appendFile(name, file.tempFilePath);
      });
    } else if (name == "idImage" || name == "cardImage") {
      formData.appendFile(name, obj[name]);
    } else {
      formData.append(name, obj[name]);
    }
  }
  return formData.getData();
}
