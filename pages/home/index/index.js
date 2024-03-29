Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [
      { id: 0, imgSrc: "/static/image/banner1.jpg" },
      { id: 1, imgSrc: "/static/image/banner2.jpg" },
      { id: 2, imgSrc: "/static/image/banner3.jpg" },
    ],
    tabData: [
      {
        index: 0,
        name: "代取快递",
        iconSrc: "/static/image/kuaidi.png",
        url: "../navpages/pick-express/pick-express",
      },
      {
        index: 1,
        name: "代寄快递",
        iconSrc: "/static/image/daiji.png",
        url: "../navpages/post-express/post-express",
      },
      {
        index: 2,
        name: "代领外卖",
        iconSrc: "/static/image/waimai.png",
        url: "../navpages/pick-take-out/pick-take-out",
      },
      {
        index: 3,
        name: "代购",
        iconSrc: "/static/image/daigou.png",
        url: "../navpages/buy-agent/buy-agent",
      },
      {
        index: 4,
        name: "代送",
        iconSrc: "/static/image/daisong.png",
        url: "../navpages/designee/designee",
      },
      {
        index: 5,
        name: "其他服务",
        iconSrc: "/static/image/wanN.png",
        url: "../navpages/universal/universal",
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

});
