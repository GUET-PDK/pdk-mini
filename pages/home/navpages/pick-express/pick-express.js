// pages/home/page/pick-express/pick-express.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sum: 2.0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
//         const query = wx.createSelectorQuery();
//         query.select('#test').boundingClientRect(function (res) {
//             console.log(res)
//         }).exec()
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

    // 子组件事件传值
    onEvent:function(e) {
        this.setData({
            sum: e.detail
        })
    }

})