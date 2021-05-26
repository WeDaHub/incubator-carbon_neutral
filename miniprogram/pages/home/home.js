//index.js
const app = getApp()

Page({
  data: {
    removeList: [],
    gasNums: 0,
    openid: '',

    receiveGif: false,
  },

  onShow: function() {
    console.log('111111');
    this.setData({
      removeList: []
    })
  },

  onLoad: function () {
    this.onGetOpenid();
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        console.log('[云函数] [login] user openid: ', res)
        const data = res.result;
        this.setData({
          gasNums: data.count,
          openid: data.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  saveSum: function () {
    const {openid, gasNums} = this.data;
    wx.cloud.callFunction({
      name: 'save',
      data: {
        openid,
        count: gasNums
      },
      success: (res) => {
        console.log('[云函数] [save] ', res)
      },
      fail: err => {
        console.error('[云函数] [save] 调用失败', err)
      }
    })
  },

  onClickGas(e) {
    const {id} = e.target.dataset;
    if (id === undefined) return;

    const {removeList, gasNums} = this.data;
    removeList.push(Number(id));
    const sum = gasNums + 1
    this.setData({
      removeList: removeList,
      gasNums: sum
    });
    this.saveSum();

    if (removeList.length >= 3) {
      wx.showModal({
        title: '碳中和',
        content: '消除二氧化碳完成，下次再来！'
      })
    } else {
      this.setData({
        receiveGif: true
      });
      setTimeout(() => {
        this.setData({
          receiveGif: false
        });
      }, 1500);
    }
  }
})
