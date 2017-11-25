function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
Page({
  data: {
    amountHasError: false,
    amount: false,
    isAgree: false,
  },
  onLoad: function(e) {
    this.setData({
      amount: parseFloat(e.amount)
    })
  },
  bindInputChange: function(e) {
    const v = e.detail.value
    if (!v) {
      this.setData({
        amountHasError: false,
      })
    } else if (isNumeric(v)) {
      this.setData({
        amount: parseFloat(e.detail.value),
        amountHasError: false,
      })
    } else {
      this.setData({
        amountHasError: '请输入正确的金额',
      })
    }
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length,
    })
  },
  pay: function(e) {
    wx.navigateTo({
      url: '/pages/purchase/purchase?amount=' + this.data.amount,
    })
  },
})
