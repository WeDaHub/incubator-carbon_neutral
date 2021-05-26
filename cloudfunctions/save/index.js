// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { openid, count } = event

  const userDB = db.collection('user');
  // 查询用户数据
  const data = userDB.where({
    openid
  }).update({
    data: {
      count
    }
  }).then((res) => {
    return res;
  })

  return {
    data
  }
}


