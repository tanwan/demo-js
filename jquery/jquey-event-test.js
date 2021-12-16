// jquery 事件
describe('jquery event', () => {

    // 这边使用异步,See https://mochajs.org/#asynchronous-code
    beforeEach(async () => {
        const { JSDOM } = require('jsdom')
        // See https://github.com/jsdom/jsdom
        // runScripts: 执行文件中的script, resources允许加载文件中的外部脚本
        let options = { runScripts: "dangerously", resources: "usable" }
        // 这边使用相对路径,是相对于node的workdir(process.cwd())
        const jsdom = await JSDOM.fromFile('jquery/jquery-test.html', options)
        const { window } = jsdom
        global.document = window.document
        global.$ = global.jQuery = require('jquery')(window)
        global.MutationObserver = window.MutationObserver
    })

    // 鼠标事件的添加和触发
    it('bind/trigger mouse events', () => {
        let event = {}
        // click(点击事件)/dblclick(双击事件)/mouseover(鼠标位于元素上方)/mousedown(鼠标按下/左右键均可)/mouseup(鼠标松开/左右键均可)
        // 上面这边事件使用相同的函数添加和触发事件
        // 为元素添加事件
        // 事件处理函数有个入参Event Object
        $('#div1').click(e => event.trigger = true)
        // 触发元素的事件
        $('#div1').click()
        console.log(event)

        // hover(鼠标移动到元素上又移出去)比较不一样,它有两个事件mouseenter和mouseleave
        $('#div1').hover(() => event.mouseenter = true, () => event.mouseleave = true)
        // 触发mouseenter事件
        $('#div1').mouseenter()
        // 触发mouseleave事件
        $('#div1').mouseleave()
        console.log(event)
    })

    // form表单事件的添加和触发
    it('bind/trigger form events', () => {
        let event = {}
        // change(输入框失去焦点,输入框的值发生变化)/submit(提交事件)
        // 提交元素事件
        // 事件处理函数有个入参Event Object
        $('#input-text').change(e => event.trigger = true)
        // 触发元素事件
        $('#input-text').change()

        // change事件的话需要失去焦点,而input则是只要input的值有变动则会触发propertychange(id专属)
        $('#input-password').on('propertychange input', e => event.input = true)
        $('#input-password').trigger('input')
        console.log(event)
    })

    // load和ready事件
    // load:在带有url的元素加载之后触发,如果有缓存的话,可能不会触发
    // ready: 在DOM已经加载之后触发
    it('load ready events', () => {

    })

    // 元素添加事件
    it('node add event', (done) => {
        // 使用MutationObserver监听dom变化的事件
        const observer = new MutationObserver(mutations => {
            // mutations是多个事件的集合,可以遍历
            if (document.querySelector('#dynamic-p')) {
                console.log('MutationObserver:' + $('#dynamic-p').html())
                // addedNodes返回所有新增的节点
                console.log('MutationObserver addedNodes:' + $(mutations[0].addedNodes[0]).html())
                observer.disconnect();
            }
        })

        // 开始监听
        observer.observe(document.body, {
            // 监听属性
            attributes: true,
            // 监听节点
            childList: true,
            // 监听目标元素的所有子孙元素
            subtree: true
        })

        // 也可以使用DOMNodeInserted事件,现在已经不推荐使用了, 在jsdom也不会触发,可以直接使用浏览器打开jquery-test.html查看效果
        $('body').on('DOMNodeInserted', (e) => {
            console.log('addEventListener:' + $('#dynamic-p').html())
            console.log('addEventListener relatedNode:' + e.target)
        })

        // 等待添加元素
        setTimeout(() => { done() }, 2000)
    }).timeout(3000)// jsdom默认超时时间为2s
})