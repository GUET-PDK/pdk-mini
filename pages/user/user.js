// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userDataBar: [
            {index:1, name:'我的订单', num:12},
            {index:2, name:'我的接单', num:111},
            {index:3, name:'我的评价', num:45},
            {index:4, name:'我的闲置', num:8}
        ],
        userList: [
            {id:1,name:"个人信息",icon:"/static/image/user_ic/person_ifon.png"},
            {id:2,name:"我的地址",icon:"/static/image/user_ic/addr.png"},
            {id:3,name:"分享好友",icon:"/static/image/user_ic/share.png"},
            {id:4,name:"意见反馈",icon:"/static/image/user_ic/opinion.png"},
            {id:5,name:"关于我们",icon:"/static/image/user_ic/about.png"}
        ]
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

    }
})