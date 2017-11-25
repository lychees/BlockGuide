function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
Page({
  data: {
    amountHasError: false,
    creditHasError: false,
    amount: 0,
    credit: 0,
    balance: 0,
    isAgree: false,
  },
  onLoad: function(e) {
    let balance = wx.getStorageSync('balance');
    if (!balance) {
      balance = 0.2 + Math.random() * 0.8;
      balance = parseInt(balance * 100) / 100;
      wx.setStorageSync('balance', balance);
    }

    const amount = parseFloat(e.amount);

    this.setData({
      amount,
      credit: Math.min(amount, balance),
      balance: balance,
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
    } else if (!isNumeric(v) || parseFloat(v) > this.data.amount || parseFloat(v) > this.data.balance) {
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
    let balance = this.data.balance;
    balance -= this.data.credit;
    balance = parseInt(balance * 100) / 100;
    if (balance >= 0) {
      wx.setStorageSync('balance', balance);
      wx.navigateTo({
        url: '/pages/purchase/purchase?amount=' + this.data.amount,
      });
    }
  },
})
