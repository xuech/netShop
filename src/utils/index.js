function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const host = 'https://miniapp.you.163.com/xhr/';
export {
  host
}
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve,reject) => {
    wx.request({
      url:host + url,
      method:method,
      data:data,
      header:{
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.code === "200"){
          resolve(res.data.data)
        } else {
          console.log('网络请求错误')
        }
      },
      fail: function(err) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })

}

export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}
export function getOpenid() {
  wx.login({
    success: res => {
      if (res.code) {
        https.get()
        // const param = {
        //   code: res.code,
        //   encryptedData: res_user.encryptedData,
        //   iv: res_user.iv
        // };
        // console.log(param)
        // https.post("https://app.yan2piao.com/mis-api/user/wx_openid", param).then(res => {
        //   console.log(res)
        //   // wx.setStorageSync('openId', res);
        // }).catch(err => {
        //
        // })
      } else {
        console.log('登录失败！' + res.errMsg)
      }

    },
    fail: (err) => {
      console.log(err)
    },
    complete: (c) => {
      // console.log("comp",c)
    }
  });
}

export default {
  formatNumber,
  formatTime
}
