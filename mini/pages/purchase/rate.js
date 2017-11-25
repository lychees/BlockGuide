Page({
  data: {
    comment: '',
  },
  onLoad: function (e) {

  },
  bindInputChange: function (e) {
    this.setData({comment: e.detail.value});
  },
  bindSubmit(e) {
    if (this.data.comment) {
      wx.showToast({
        title: '评价成功',
        icon: 'success',
        duration: 3000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({ url: '/pages/index/index' });
          }, 1500);
        }
      }); 
    }
  }
})
