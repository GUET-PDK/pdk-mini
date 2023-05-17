const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 获取token函数
 */
const getToken = () => {
  // 异步获取,不会阻塞线程
  wx.getStorageSync({
    key: "token",
    success: (res) => {
      //console.log(res.data)
      this.globalData.token = res.data;
    },
    fail: (err) => {
      //console.log(err);
    },
  });
};

module.exports = {
  formatTime, getToken
};
