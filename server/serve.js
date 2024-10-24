const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

// JWT 密钥
const JWT_SECRET = 'your_jwt_secret_key';

// 模拟用户数据
const users = {
  'user1': { usrname: 'user1', passwd: 'password1', taskList: [] },
  'user2': { usrname: 'user2', passwd: 'password2', taskList: [] },
};

// 中间件 - 处理 CORS
app.use(cors());

// 中间件 - 解析请求体
app.use(bodyParser());

// 路由 - 表单提交
router.post('/api/login', (ctx) => {
  const formData = ctx.request.body;
  if (!formData.usrname || !formData.passwd) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'Username and password are required',
    };
    return;
  }

  // 验证用户信息
  const user = users[formData.usrname];
  if (!user || user.passwd !== formData.passwd) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'Invalid username or password',
    };
    return;
  }

  // 创建 JWT token
  const token = jwt.sign({ usrname: formData.usrname }, JWT_SECRET, { expiresIn: '1h' });
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: 'Form submitted successfully',
    token,
  };
});

// 路由 - 验证 JWT
router.get('/api/protected', (ctx) => {
  const authHeader = ctx.headers['authorization'];
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { success: false, message: 'Authorization header missing' };
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { success: false, message: 'Token missing' };
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.status = 200;
    ctx.body = { success: true, message: 'Access granted', user: decoded };
  } catch (error) {
    ctx.status = 403;
    ctx.body = { success: false, message: 'Invalid or expired token' };
  }
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
