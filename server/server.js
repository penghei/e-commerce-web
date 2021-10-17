const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(bodyParser.json({
  limit: '50mb' //nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb,改为10M
}));
app.use(bodyParser.urlencoded({
  limit: '50mb', //nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb,改为10M
  extended: true
}));


app
  .get("/userInfo",(req,res)=>{
    console.log("获取用户信息")
    fs.readFile("database.json","utf8",(err,data)=>{
      if(err) console.log(err)
      let list = JSON.parse(data);
      if(list !== [] || list !== [null]){
        let foundUser = list.find(obj=>{
          return obj.isOnline === true;
        })
        if(foundUser !== undefined){
          res.end(JSON.stringify(foundUser));
        }else{
          res.end('notfound')
        }
      }
    })
  })
  .get("/quit",(req,res)=>{
    console.log("退出登录");
    fs.readFile("database.json","utf8",(err,data)=>{
      if(err) console.log(err)
      let list = JSON.parse(data);
      if(list !== [] || list !== [null]){
        let foundUser = list.find(obj=>{
          return obj.isOnline === true;
        })
        if(foundUser !== undefined){//下线
          foundUser.isOnline = false;
          console.log(foundUser.isOnline,'quit')
          fs.writeFile("database.json",JSON.stringify(list),(err)=>{
            if(err) throw err;
            console.log("已写入");
            res.end("success");
          }) 
        }else{
          res.end('notfound')
        }
        let ifOnline = list.find(obj=>{//再次检查
          return obj.isOnline === true;
        })
        if(ifOnline !== undefined){
          console.log("多个账号在线,登录异常")
          ifOnline.isOnline = false;
        }
      }
    })
  })
  .post("/signin", (req, res) => {
    console.log("登录请求");
    let userinfo = req.body;
    let userList = [];
    fs.readFile("database.json", "utf8", (err, data) => {
      if (err) console.log(err);
      let list = JSON.parse(data);
      if (list === [] || list === [null]) {
        return;
      } else {
        userList = [...list];
        let foundUser = userList.find((obj) => {
          return obj.account.name === userinfo.account.name;
        });
        if (foundUser === undefined) {
          res.end("notfound");
        } else {
          if (foundUser.account.code !== userinfo.account.code) {
            res.end("codewrong");
          } else {
            foundUser.isOnline = true
            fs.writeFile("database.json",JSON.stringify(userList),(err)=>{
              if(err) throw err;
              console.log("已写入");
              res.end("success");
            }) 
          }
        }
      }
    });
  })
  .post("/register", (req, res) => {
    console.log("注册请求");
    let userinfo = req.body;
    let userList = [];
    fs.readFile("database.json", "utf8", (err, data) => {
      if (err) console.log(err);
      let list = JSON.parse(data);
      if (list === [] || list === [null]) {
        userList.push(userinfo);
        fs.writeFile("database.json", JSON.stringify(userList), (err) => {
          if (err) throw err;
          console.log("已写入");
          res.end("success");
        });
      } else {
        userList = [...list];
        let foundUser = userList.find((obj) => {
          return obj.account.name === userinfo.account.name;
        });
        if (foundUser !== undefined) {
          res.end("registered");
        } else {
          userList.push(userinfo);
          fs.writeFile("database.json", JSON.stringify(userList), (err) => {
            if (err) throw err;
            console.log("已写入");
            res.end("success");
          });
        }
      }
    });
  })
  .post('/shoppingCar',(req,res)=>{
    console.log('购物车绑定请求')
    let car = req.body;
    // let carList = []
    fs.readFile('database.json','utf8',(err,data)=>{
      if(err) console.log(err)
      let list = JSON.parse(data)
      if(list === [] || list === [null]){
        return;
      }else{
        let onlineUser = list.find(obj=>{
          return obj.isOnline === true
        })
        if(onlineUser !== undefined){//添加进购物车
          onlineUser.shopping.shoppingCar = [...car]
          fs.writeFile("database.json",JSON.stringify(list),(err)=>{
            if(err) throw err;
            console.log("已写入");
            res.end("success");
          }) 
        }else{
          res.end('error')
          console.log("多重在线,登录异常")
        }
      }
    })
  })
  .post('/avatar',(req,res)=>{
    console.log('获取用户头像')
    let picBase64 = req.body.picBase
    fs.readFile("database.json","utf8",(err,data)=>{
      if(err) console.log(err)
      let list = JSON.parse(data);
      if(list !== [] || list !== [null]){
        let foundUser = list.find(obj=>{
          return obj.isOnline === true;
        })
        if(foundUser !== undefined){//更换头像
          foundUser.privacy.avatar = picBase64;
          fs.writeFile("database.json",JSON.stringify(list),(err)=>{
            if(err) throw err;
            console.log("已更换头像");
            res.end("success");
          }) 
        }else{
          res.end('notfound')
        }
      }
    })
  })
  .post('/changeUserInfo',(req,res)=>{
    console.log("更改用户信息")
    let userInfo = req.body
    fs.readFile('database.json',"utf8",(err,data)=>{
      if(err) throw err;
      let list = JSON.parse(data)
      if(list !== [] || list !== [null]){
        let foundUser = list.find(obj=>{
          return obj.isOnline === true;
        })
        if(foundUser !== undefined){//更换头像
          foundUser.privacy.sex = userInfo.sex;
          foundUser.privacy.age = userInfo.age;
          foundUser.account.name = userInfo.name;
          fs.writeFile("database.json",JSON.stringify(list),(err)=>{
            if(err) throw err;
            console.log("已更换头像");
            res.end("success");
          }) 
        }else{
          res.end('notfound')
        }
      }
    })
  })
  .listen(7999, () => {
    console.log("服务器启动");
  });
