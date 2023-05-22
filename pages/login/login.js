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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  onProfile() {
    wx.getUserProfile({
      desc: '获取你的昵称、头像',
      success: (res) => {
        let {nickName,avatarUrl} = res.userInfo
        const userInfo = {
          name: nickName,
          avatar: avatarUrl,
          addr: '张三 14777562431 花江36#511',
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
        // url: "http://pdk.usail.asia:88/wechat/login?code=" + code,
        // url: "http://117.50.177.54:8080/wechat/login?code=" + code,
        url: "http://43.138.225.254:8080/wechat/login?code=" + code,
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
