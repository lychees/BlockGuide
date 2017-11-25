function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
Page({
  data: {
    amountHasError: false,
    creditHasError: false,
    amount: 0,
    credit: 0,
    isAgree: false,
  },
  onLoad: function(e) {
    this.setData({
      amount:  parseFloat(e.amount),
      credit: 0,
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
  bindInputChange2: function (e) {
    const v = e.detail.value
    console.log(parseInt(v), this.data.amount);
    if (!v) {
      this.setData({
        creditHasError: false,
      })
    } else if (!isNumeric(v) || parseInt(v) > this.data.amount) {
      this.setData({
        creditHasError: '请输入正确的金额',
      })
    } else {
      this.setData({
        credit: parseFloat(e.detail.value),
        creditHasError: false,
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
