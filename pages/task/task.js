let _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseTab: "task",
    currentIndex: 0,
    taskTabTitle: [
        {index: 0, title: '全部'},
        {index: 1, title: '代取快递'},
        {index: 2, title: '代寄快递'},
        {index: 3, title: '代拿快递'},
        {index: 4, title: '其他'},
    ],
    mytaskTabTitle: [
      {id: 0, title: '全部'},
      {id: 1, title: '进行中'},
      {id: 2, title: '待完成'},
      {id: 3, title: '待评价'}
    ],
    tmp: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    _this = this;
  },

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

  /**
   * 切换顶部 Tab 标签
   */
  changTab: function (e) {
    let name = e.currentTarget.dataset.name;
    // console.log(name)
    if (name == "task") {
      this.setData({
        chooseTab: name,
      });
    } else {
      this.setData({
        chooseTab: name,
      });
    }
  },

  /**
   * 子标签切换
   */
  taskSwitch: function(e) {
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    this.setData({
      currentIndex: id
    })
  },

  /**
   * 覆写搜索框原“取消”伸缩按钮
   */

});
