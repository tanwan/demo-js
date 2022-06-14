describe('MutationObserver', () => {

    // 这边使用异步,See https://mochajs.org/#asynchronous-code
    beforeEach(async () => {
        const { JSDOM } = require('jsdom')
        // See https://github.com/jsdom/jsdom
        // runScripts: 执行文件中的script, resources允许加载文件中的外部脚本
        let options = { runScripts: "dangerously", resources: "usable" }
        // 这边使用相对路径,是相对于node的workdir(process.cwd())
        const jsdom = await JSDOM.fromFile('dom/mutation-observer.html', options)
        const { window } = jsdom
        global.document = window.document
        global.$ = global.jQuery = require('jquery')(window)
        global.MutationObserver = window.MutationObserver
        global.window = window
    })

    // 元素添加事件, done用来通知mochajs测试结束
    it('node add event', (done) => {
        // 使用MutationObserver监听dom变化的事件
        const observer = new MutationObserver(mutations => {
            // mutations是多个事件的集合,可以遍历
            mutations.forEach(mutation=>{
                // addedNodes返回所有新增的节点
                console.log('MutationObserver addedNodes:' + mutation.addedNodes[0])
            })
            // 取消监听
            observer.disconnect()
        })
        
        // ,但是不同的MutationObserver的对象重复调用就相当于多次监听
        let option = {
            // 监听属性
            attributes: true,
            // 监听节点
            childList: true,
            // 监听目标元素的所有子孙元素
            subtree: true
        }
        // 开始监听
        observer.observe(document.body, option)
        // 同一个MutationObserver对象重复调用observe是没有关系的
        observer.observe(document.body, option)

        // 当html加载完后,再去调用script的方法,如果没有加载完,script的可能还没执行完毕
        window.document.addEventListener('DOMContentLoaded', () => {
            window.addDynamicP()
            // 调用done表示此测试结束
            done()
          
        });
    }).timeout(3000)// mochajs默认超时时间为2s,这边调整为3s


    it('multiple MutationObserver', () => {
        let option = {attributes: true, childList: true, subtree: true }
        new MutationObserver(mutations => {
            mutations.forEach(mutation=>{
                console.log('MutationObserver addedNodes:' + mutation.addedNodes[0])
            })
        }).observe(document.body, option)

        // 不同的MutationObserver的对象重复调用就相当于多次监听
        new MutationObserver(mutations => {
            mutations.forEach(mutation=>{
                console.log('MutationObserver addedNodes:' + mutation.addedNodes[0])
            })
        }).observe(document.body, option)

        $('#div').append($('<p id="dynamic-p" class="dynamic-p-class">dynamic p</p>'))
    })
})











