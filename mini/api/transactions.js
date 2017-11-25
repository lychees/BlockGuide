// FE cache for transaction
const key = 'Transactions'
let _data = undefined
const Transactions = {
  load: () => {
    try {
      var value = wx.getStorageSync(key)
      _data = value
    } catch (e) {
      // Do something when catch error
      throw e
    }
  },
  all: () => {
    return _data
  },
  getFromId: id => {
    if (_data[id]) {
      return _data[id]
    }
  },
}

module.export = Transactions
