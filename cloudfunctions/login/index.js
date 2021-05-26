const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let count = 0;

  // 获取小程序 openid
  const openid = wxContext.OPENID;

  const userDB = db.collection('user');

  // 查询用户数据
  let data = await userDB.where({
    openid
  }).get().then(res => {
    return res.data;
  });

  if (!data || data.length === 0) {
    // 新增一条记录
    userDB.add({
      data: {
        openid,
        count: 0
      }
    });
  } else {
    // 返回用户数
    count = data[0].count;
  }

  return {
    count,
    openid,
  }
}


