// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        tabs: [
            {id:1, title: '全部'},
            {id:2, title: '待接单'},
            {id:3, title: '已接单'},
            {id:4, title: '已完成'},
        ],
        list: [
            {id:1, val: "第1快"},
            {id:2, val: "第2快"},
            {id:3, val: "第3快"},
            {id:4, val: "第4快"},
            {id:5, val: "第5快"},
            {id:6, val: "第6快"},
            {id:7, val: "第7快"},
            {id:8, val: "第8快"},
            {id:9, val: "第9快"},
            {id:10, val: "第10快"}
        ],
        scrollHeight: 0,
        tmp: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        // 动态计算屏幕高度并设定 swiper 高度
        this.setData({
            scrollHeight:wx.getSystemInfoSync().windowHeight* (750 / wx.getSystemInfoSync().windowWidth)-70
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    /**
     * 用户点击订单标签切换页面
     */
    tabSwitch: function(e) {
        // console.log(e.currentTarget.dataset)
        let index = e.currentTarget.dataset.index
        this.setData({
            currentIndex: index
        })
    },

    swiperSwitch: function(e) {
        // console.log(e.detail.current)
        let swiper_index = e.detail.current
        this.setData({
            currentIndex: swiper_index
        })
    },
})