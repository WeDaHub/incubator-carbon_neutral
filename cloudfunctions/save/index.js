const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { openid, count } = event
  const userDB = db.collection('user');

  // 更新用户数
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


