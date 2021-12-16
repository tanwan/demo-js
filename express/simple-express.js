var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()

// 解析body
app.use(bodyParser.json())
// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// cookie
app.use(cookieParser())


app.get('/rest/get/:pathParameters', (req, res) => {
    // send返回值
    res.send({
        method: 'get',
        // req.params可以获取地址参数
        pathParameters: req.params.pathParameters,
        // req.query获取地址栏参数 
        queryParameters: req.query['queryParameters']
    })
})

app.post('/rest/post', (req, res) => {
    // req.body获取请求体
    res.send({
        method: 'post',
        requestBody: req.body
    })
})

// x-www-form-urlencoded(普通的form请求)
app.post('/rest/form-urlencoded', (req, res) => {
    res.send({
        method: 'form-urlencoded',
        requestBody: req.body
    })
})

// 用来处理form-data,文件上传使用此格式
const multer = require('multer')
const upload = multer()
// form-data
app.post('/rest/form-data', upload.none(), (req, res) => {
    res.send({
        method: 'form-data',
        requestBody: req.body
    })
})

// put请求
app.put('/rest/put/:id', (req, res) => {
    res.send({
        method: 'put',
        id: req.params.id,
        requestBody: req.body
    })
})

// delete请求
app.delete('/rest/delete/:id', (req, res) => {
    res.send({
        method: 'delete',
        id: req.params.id,
        requestBody: req.body.k1
    })
})

// header操作
app.get('/rest/header', (req, res) => {
    // 添加header
    res.set('simple-header', 'simple-header override')
    res.send({
        method: 'header',
        header: req.headers
    })
})

// cookie操作
app.get('/rest/cookie', (req, res) => {
    // 添加cookie
    res.cookie('add_cookie', 'add_cookie value')
        .send({
            method: 'cookie',
            cookies: req.cookies
        })
})

app.listen(3000)