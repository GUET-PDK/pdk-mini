// pages/home/page/pick-express/pick-express.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number: 1,
        price: 1.0,
        total: 0,
        radios: [
            {id: 1, name: '小件', value: 'small', price: 1.0},
            {id: 2, name: '中小件', value: 'middle', check: 'true', price: 1.5},
            {id: 3, name: '大件', value: 'big', price: 2.0}
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
        const query = wx.createSelectorQuery();
        query.select('#test').boundingClientRect(function (res) {
            console.log(res)
        }).exec()
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
        this.setData({
            number: 1
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },
    
    // 数量选择器——加、减方法
    addNum:function() {
        let tmp = this.data.number
        if(tmp < 5) {
            tmp++
            this.setData({
                number:tmp
            })
        }else {
            wx.showToast({
              title: '再多马车都装不完啦!',
              icon: 'none',
              duration: 1000
            })
        }
    },
    subNum:function() {
        let tmp = this.data.number
        if(tmp > 1) {
            tmp--
            this.setData({
                number:tmp
            })
        }else {
            wx.showToast({
              title: '最少一个哟!',
              icon: 'none',
              duration: 1000
            })
        }
    },
   
    // 快递大小单选监听
    radioChange:function(e) {
        console.log(e.detail.value)
        const items = this.data.radios
        for(let i = 0; i < items.length; i++) {
            if(items[i].check = (items[i].value === e.detail.value)) {
                this.setData({
                    price: items[i].price
                })
            }
        }
    },
})