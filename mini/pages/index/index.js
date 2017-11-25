var amapFile = require('../../libs/amap-wx.js')
var config = require('../../libs/config.js')

var dataMap = {}
var markersData = []
var poisData = []
var key = config.Config.key
var myAmapFun = new amapFile.AMapWX({ key: key })

const marketData = (item, marked) => {
  let icons = {
    auth: {
      iconPath: '../../img/xin.png',
      height: 32,
      width: 32,
    },
    normal: {
      iconPath: '../../img/marker.png',
      height: item.height,
      width: item.width,
    },
    marked: {
      iconPath: '../../img/marker_checked.png',
      height: item.height,
      width: item.width,
    },
    authMarked: {
      iconPath: '../../img/xin.png',
      height: 48,
      width: 48,
    },
  }
  let icon = icons.normal
  if (item.auth) {
    icon = icons.auth
  }
  if (marked) {
    if (item.auth) {
      icon = icons.authMarked
    } else {
      icon = icons.marked
    }
  }
  return Object.assign(
    {
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      auth: item.auth,
    },
    icon
  )
}
Page({
  data: {
    isReady: false,
    markers: [],
    latitude: '',
    longitude: '',
    textData: undefined,
    city: '',
  },
  makertap: function(e) {
    var id = e.markerId
    var that = this
    that.showMarkerInfo(poisData, markersData, id)
    that.changeMarkerColor(markersData, id)
  },
  loadPoi: function({ location, keywords }) {
    var that = this
    var params = {
      iconPathSelected: '../../img/marker_checked.png',
      iconPath: '../../img/marker.png',
      success: function(data) {
        markersData = data.markers
        poisData = data.poisData
        var markers_new = []
        markersData.forEach(function(item, index) {
          var star = Math.floor(Math.random() * 5) + 1
          var auth = false
          if (!dataMap[poisData[item.id].id]) {
            // console.log(poisData[item.id].id)
            auth = Boolean(Math.round(Math.random()))
            dataMap[poisData[item.id].id] = {
              star: '★★★★★☆☆☆☆☆'.slice(5 - star, 10 - star) + ': ' + star,
              commentNum: Math.floor(Math.random() * (1000 + 1)),
              starNum: star,
              isAuthen: auth,
              iconPath: auth ? '../../img/xin.png' : '../../img/marker.ng',
            }
          } else {
            auth = dataMap[poisData[item.id].id].isAuthen
          }
          item.auth = auth
          markers_new.push(marketData(item))
        })
        wx.setStorageSync('datamap', dataMap)
        if (markersData.length > 0) {
          that.setData({
            markers: markers_new,
          })
          that.setData({
            city: poisData[0].cityname || '',
          })
          if (!location) {
            that.setData({
              latitude: markersData[0].latitude,
            })
            that.setData({
              longitude: markersData[0].longitude,
            })
          }
          // that.showMarkerInfo(markersData, 0)
        } else {
          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: '',
            },
          })
        }
      },
      fail: function(info) {
        // wx.showModal({title:info.errMsg})
      },
    }
    if (keywords) {
      params.querykeywords = keywords
    }
    if (location) {
      params.location = location
    } else {
      params.location = '121.375873,31.176083'
    }

    myAmapFun.getPoiAround(params)
  },
  onLoad: function(e) {
    var that = this
    this.dataMap = wx.getStorage({
      key: 'datamap',
      success: function(res) {
        console.log(res.data)
      },
    })
    this.setData({
      isReady: true,
    })
    if (!dataMap) {
      dataMap = {}
    }
    this.loadPoi({
      keywords: e.keywords,
    })
    // wx.navigateTo({ url: '/pages/menu/menu' })
  },
  getLngLat: function(cb) {
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.getCenterLocation({
      success: function(res) {
        if (cb) cb(res)
      },
    })
  },
  bindRegionChange: function(e) {
    if (e.type == 'end') {
      this.getLngLat(res => {
        this.loadPoi({
          location: [res.latitude, res.longitude].join(','),
        })
      })
    }
    // var that = this
    // that.loadPoi({
    //   location: [res.latitude, res.longitude].join(','),
    // })
  },
  bindOrient: function(e) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
        })
        that.setData({
          longitude: res.longitude,
        })
        that.setData({
          city: '北京市',
        })
        that.loadPoi({
          location: [res.latitude, res.longitude].join(','),
        })
      },
      fail: function() {
        that.setData({
          textData: {
            name: '抱歉，未找到结果',
            desc: '',
          },
        })
      },
    })
  },
  bindInput: function(e) {
    var that = this
    var url = '../inputtips/input'
    if (
      e.target.dataset.latitude &&
      e.target.dataset.longitude &&
      e.target.dataset.city
    ) {
      var dataset = e.target.dataset
      url =
        url +
        '?lonlat=' +
        dataset.longitude +
        ',' +
        dataset.latitude +
        '&city=' +
        dataset.city
    }
    wx.redirectTo({
      url: url,
    })
  },
  showMarkerInfo: function(data, markersData, i) {
    var that = this
    var star = Math.floor(Math.random() * 5) + 1
    if (!dataMap[data[i].id]) {
      var auth = Boolean(Math.round(Math.random()))
      dataMap[data[i].id] = {
        star: '★★★★★☆☆☆☆☆'.slice(5 - star, 10 - star) + ': ' + star,
        starNum: star,
        commentNum: Math.floor(Math.random() * (1000 + 1)),
        isAuthen: auth,
        iconPath: auth ? '../../img/xin.png.png' : '../../img/marker.png',
      }
      try {
        wx.setStorageSync('datamap', dataMap)
      } catch (e) {
        throw e
      }
    }
    that.setData({
      textData: {
        name: markersData[i].name,
        desc: markersData[i].address,
        id: data[i].id,
        star: dataMap[data[i].id].star,
        commentNum: dataMap[data[i].id].commentNum,
        isAuthen: dataMap[data[i].id].isAuthen,
        starNum: dataMap[data[i].id].starNum,
      },
    })
  },
  changeMarkerColor: function(data, i) {
    var that = this
    var markers = []
    for (var j = 0; j < data.length; j++) {
      markers.push(marketData(data[j], j == i))
    }
    that.setData({
      markers: markers,
    })
  },
  bindNavigateMenu: function(e) {
    if (this.data.textData.isAuthen) {
      debugger
      wx.navigateTo({
        url: `../menu/menu?id=${this.data.textData.id}`,
      })
    } else {
      wx.showToast({
        title: '商家未加入中信联盟认证',
        image: '/img/warning.png',
        duration: 3000,
      })
    }
  },
})
