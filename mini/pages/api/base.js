// FE cache for transaction
const key = 'datamap'
let _data = undefined
let _commentData = [
    {
        "name": "zhangsan",
        "content": "真特么好吃",
        "time": "2017-01-01 01:01:09"
    },
    {
        "name": "lisi",
        "content": "太特么好吃",
        "time": "2017-01-01 01:01:09"
    },
    {
        "name": "xiaodao",
        "content": "太咸了不推荐",
        "time": "2017-01-01 01:01:09"
    },
    {
        "name": "zhaungtianyi",
        "content": "好吃，就是很贵",
        "time": "2017-01-01 01:01:09"
    },
    {
        "name": "guodafeng",
        "content": "贵的一逼啊",
        "time": "2017-01-01 01:01:09"
    },
    {
        "name": "huangyibo",
        "content": "下次带妹纸来吃",
        "time": "2017-01-01 01:01:09"
    }, 


]

const Transactions = {
  load: () => {
    try {
      var value = wx.getStorageSync(key)
      console.log(value)
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

  getCommentList: () => {
    return _commentData
  },

  post: (params) => {

  }
}

module.exports.Transactions = Transactions