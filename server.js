/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const server = jsonServer.create()
const router = jsonServer.router('./mock/db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')

const KEY = '1234'
// 创建token
const createToken = (playload) => {
  return jwt.sign(playload, KEY, {
    expiresIn: '1h',
  })
}
// 验证token
const verifyToken = (token) => {
  jwt.verify(token, KEY)
}

// 添加前缀
const rewriter = jsonServer.rewriter({
  '/api/*': '/$1',
})

// 解析body为json
server.use(bodyParser.json())
server.use(rewriter)
server.use(middlewares)

const checkAuth = (req, res, next) => {
  const errorResp = {
    erroron: 1200,
    rspMsg: '登录校验失败',
  }
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.json(errorResp)
    return
  }
  try {
    verifyToken(authHeader.split(' ')[1])
    next()
  } catch {
    res.json(errorResp)
  }
}

// 添加works 验证token 中间件
server.use('/works', checkAuth)

// 自定义接口生成token
server.post('/users/loginByPhoneNumber', (req, res) => {
  const { phoneNumber, veriCode } = req.body
  const token = createToken({ phoneNumber, veriCode })
  res.status(200).json({
    data: {
      token,
    },
  })
})

server.post('/user/login', (req, res) => {
  const { userName, passWord } = req.body
  if (userName === 'admin' && passWord === '123') {
    const token = createToken({ userName, passWord })
    res.status(200).json({
      errorno: 0,
      data: {
        token,
      },
    })
  } else {
    res.status(200).json({
      errorno: 200001,
      rspMsg: '用户名或密码错误',
    })
  }
})

server.use('/user/fetchCurrentUser', checkAuth)
server.post('/user/fetchCurrentUser', (req, res) => {
  const { token } = req
  res.status(200).json({
    userName: 'admin',
    token,
    errorno: 0,
  })
})

// 修改数据结构
router.render = (req, res) => {
  res.json({
    errorno: 0,
    data: {
      list: res.locals.data,
      count: res.locals.data.length,
    },
  })
}

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
