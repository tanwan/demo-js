// 调用simple-express.js的启动的后端

describe('jquery ajax', () => {
    before(() => {
        const { JSDOM } = require('jsdom')
        const { window } = new JSDOM(null, {
            // 相当于设置url
            url: 'http://127.0.0.1:3000'
        })
        // cookie需要将document暴露给global
        global.document = window.document
        global.$ = global.jQuery = require('jquery')(window)
    })

    // get请求
    it('get', async () => {
        // 使用get
        await $.get('/rest/get/path?queryParameters=query value').done((data, status) => {
            console.log(`get:${JSON.stringify(data)},status:${status}`)
        })
        // 使用ajax,指定method
        await $.ajax({
            url: '/rest/get/path?queryParameters=query value',
            method: 'GET'
        }).done((data, status) => {
            console.log(`ajax get:${JSON.stringify(data)},status:${status}`)
        })
    })

    // post请求
    it('post', async () => {
        // 使用ajax,指定method
        await $.ajax({
            url: '/rest/post',
            method: 'POST',
            // json需要指定contentType
            contentType: 'application/json',
            // 需要转为string
            data: JSON.stringify({ k1: 'v1', k2: 'v2' })
        }).done((data, status) => {
            console.log(`ajax post:${JSON.stringify(data)},status:${status}`)
        })
    })

    // post x-www-form-urlencoded请求(普通的form请求)
    it('post x-www-form-urlencoded', async () => {
        // 可以使用$.post
        await $.post('/rest/form-urlencoded', { k1: 'v1', k2: 'v2' }).done((data, status) => {
            console.log(`post x-www-form-urlencoded:${JSON.stringify(data)},status:${status}`)
        })
        // 使用$.ajax
        await $.ajax({
            url: '/rest/form-urlencoded',
            method: 'POST',
            // data直接转对象
            data: { k1: 'v1', k2: 'v2' }
        }).done((data, status) => {
            console.log(`ajax post x-www-form-urlencoded:${JSON.stringify(data)},status:${status}`)
        })
    })

    // post form-data请求(文件上传使用此格式)
    it('post form-data', async () => {
        // 在浏览器运行可以直接使用FormData
        FormData = require('form-data')
        let data = new FormData()
        data.append('k1', 'v1')
        data.append('k2', 'v2')
        await $.ajax({
            url: '/rest/form-data',
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: data
        }).done((data, status) => {
            console.log(`ajax post form-data:${JSON.stringify(data)},status:${status}`)
        })
    })

    // put请求
    it('put', async () => {
        await $.ajax({
            url: '/rest/put/3',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ k1: 'v1', k2: 'v2' })
        }).done((data, status) => {
            console.log(`ajax put:${JSON.stringify(data)},status:${status}`)
        })
    })

    // delete请求
    it('delete', async () => {
        await $.ajax({
            url: '/rest/delete/3',
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ k1: 'v1', k2: 'v2' })
        }).done((data, status) => {
            console.log(`ajax delete:${JSON.stringify(data)},status:${status}`)
        })
    })

    // 带header
    it('header', async () => {
        await $.ajax({
            url: '/rest/header',
            method: 'GET',
            headers: {
                'simple-header': 'simple-header'
            },
        }).done((data, status, response) => {
            console.log(`ajax header:${JSON.stringify(data)},status:${status}`)
            // 使用getResponseHeader获取响应的header, response.getAllResponseHeaders(): 获取所有响应header
            console.log(`response header:${response.getResponseHeader('simple-header')}`)
        })
    })

    // 带cookie
    it('cookie', async () => {
        // 使用js-cookie来操作cookie
        const Cookies = require('js-cookie')
        Cookies.set('cookie-use-js-cookie', 'cookie-use-js-cookie value')
        await $.ajax({
            url: '/rest/cookie',
            method: 'GET'
        }).done((data, status, response) => {
            console.log(`ajax cookie:${JSON.stringify(data)},status:${status}`)
            console.log(`cookie:${Cookies.get('add_cookie')}`)
        })
    })
})