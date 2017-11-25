function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
Page({
  data: {
    comment: '',
    submitted: false,
  },
  onLoad: function (e) {

  },
  bindInputChange: function (e) {
    this.setData({comment: e.detail.value});
  },
  bindSubmit(e) {
    console.log(this.data.comment);
    this.setData({submitted: true});
    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' });
    }, 200);
  }
})
