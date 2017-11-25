Page({
  data: {
    stage: 'paying',
  },
  onLoad: function(e) {
    setTimeout(() => {
      this.setData({
        stage: 'paid',
        point: parseInt(e.amount, 10),
      })
    }, (Math.floor(Math.random() * 5) + 5) * 1000)
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
