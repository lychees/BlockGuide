Page({
  data: {
    balance: 0,
  },
  onLoad(e) {
    let balance = wx.getStorageSync('balance');
    if (!balance) {
      balance = 0.2 + Math.random() * 0.8;
      balance = parseInt(balance * 100) / 100;
      wx.setStorageSync('balance', balance);
    }

    this.setData({
      balance: balance,
    });
  }
})
