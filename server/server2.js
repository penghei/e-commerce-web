const express = require("express");
const app = express();

app
.get('/test',(req,res)=>{
    res.end('test')
})
.post('/register',(req,res)=>{
    console.log(req)
    res.end('success')
})
.listen(7999,()=>{
    console.log('start')
})
