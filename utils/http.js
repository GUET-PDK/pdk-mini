// url请求前缀
const BaseUrl = "http://pdk.usail.asia:88";
let header = {
  "content-type": "application/json;charset=utf-8",
};

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 * @useToken 是否使用token（不使用token调用时填入任意参数即可  如1）
 */
export function request(url, params, method, token) {
  // 请求拦截器，判断token
  token == null || token == "undefined"
    ? wx.showToast({
        title: "请先登录",
      })
    : (header["token"] = token);
  wx.showLoading({
    title: "正在加载中...",
  });
  return new Promise((reslove, reject) => {
    wx.request({
      url: BaseUrl + url,
      data: params,
      method: method,
      header: header,
      success: (res) => {
        wx.hideLoading();
        console.log("响应：", res.data);
        if (res.header.token) {
          wx.setStorageSync("token", res.header.token);
        }
        reslove(res);
      },
      fail: (err) => {
        console.log("失败：", err);
        wx.showLoading({
          title: "网络连接失败",
        });
        setTimeout(() => {
          wx.hideLoading();
        }, 1000);
        reject(err);
      },
    });
  });
}
