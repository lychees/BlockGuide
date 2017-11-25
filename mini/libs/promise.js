var url = 'http://40.83.120.93:4937'

var request = ({ path, success, fail, timeout }) => {
  wx_request(
    {
      url: url + path,
      success,
      fail,
    },
    timeout
  )
}

var wx_request = (options, timeout) => {
  setTimeout(options.success, timeout)
}

module.exports.request = request
