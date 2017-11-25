const { request } = require('../../libs/promise')

Page({
  data: {
    stage: 'paying',
  },
  onLoad: function(e) {
    request({
      path: '/transactions',
      method: 'POST',
      data: e, // pass query param object
      success: () => {
        this.setData({
          stage: 'paid',
          point: parseInt(e.amount, 10),
        })
      },
      timeout: 5000,
    })
  },
  bindRate: () => {
    wx.navigateTo({
      url: '/pages/purchase/rate',
    })
  },
  bindNavigateHome: () => {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
})
