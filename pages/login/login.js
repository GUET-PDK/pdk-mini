Page({
  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onProfile() {
    wx.getUserProfile({
      desc: '获取你的昵称、头像',
      success: (res) => {
        let {nickName,avatarUrl} = res.userInfo
        const userInfo = {
          name: nickName,
          avatar: avatarUrl,
          addr: '',
        }
        wx.setStorageSync('userInfo', userInfo)
        // 去登陆
        this.login()
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  /**
   * 测试登录方法
   */
  async login() {
    let code = (await wx.login()).code;
    if (code) {
      wx.request({
        url: "http://pdk.usail.asia:88/wechat/login?code=" + code,
        success: (res) => {
          wx.setStorageSync('token', res.header.token)
          console.log(res)
          wx.reLaunch({
            url: '/pages/home/index/index',
          })
        },
      })
    }
  },
});
