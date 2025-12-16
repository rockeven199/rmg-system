const express = require("express");
const redis = require("redis");
const path = require("path");
const app = express();
const responseFormat = require("./method/responseFormat");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const mysqlConnention = mysql.createConnection({
  user: "root",
  password: "000000",
  database: "rmg_database",
  port: "3306",
  host: "localhost",
  connectTimeout: 600000,
});
mysqlConnention.connect();
const redisClient = redis.createClient();
redisClient.connect(6379, "127.0.0.1");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname) + "/static"));
app.set("views engine", "ejs");
app.set("views", path.resolve(__dirname) + "/views");

const ws = require("ws");
const wsServer = new ws.Server({ port: 1005 });
wsServer.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message);
  });
});

// 页面路由
app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.all("/user/*", function (req, res, next) {
  next();
});

// 首页
app.get("/user/index", (req, res) => {
  mysqlConnention.query(
    "select * from rmg_background_service",
    (error, results, fields) => {
      res.render("index.ejs", { list: results });
    }
  );
});

// 详情页面
app.get("/user/chat", (req, res) => {
  res.render("chat.ejs");
});

// 登录验证
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign(
    { username: username, password: password },
    "rockeven199",
    {
      expiresIn: "5d",
    }
  );

  const exists = await redisClient.HEXISTS("admin_user", username);
  if (exists === true) {
    const pwd = await redisClient.HGET("admin_user", username);
    if (pwd == password) {
      res.send(responseFormat(true, "登录成功", 200, token));
    } else {
      res.send(responseFormat(false, "用户名或密码错误", 300, false));
    }
  } else {
    res.send(responseFormat(false, "用户名或密码错误", 300, false));
  }
});

app.listen(8008);
