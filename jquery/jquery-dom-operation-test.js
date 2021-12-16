
// jquery对象(比如使用$(selector)的对象)的方法会作用于它的所有元素上,也就是如果jquery对象包含有多个dom,那么这个方法就会在它的所有dom上执行
// 所以要注意是不是要应用到所有的元素上
// 但是如果方法是获取返回值的话,可能只会获取第一个元素的值
describe('jquery dom operation', () => {

    beforeEach(() => {
        const fs = require('fs')
        const path = require('path')
        // __dirname:当前的脚本目录,process.cwd(): node的工作目录
        const testHTML = fs.readFileSync(path.join(__dirname, 'jquery-test.html')).toString()
        const { JSDOM } = require('jsdom')
        const jsdom = new JSDOM(testHTML)
        const { window } = jsdom
        global.$ = global.jQuery = require('jquery')(window)
    })

    // 获取和设置html的内容: text/html/val/atrr
    it('html content', () => {
        // text: 设置或返回所选元素的文本内容(包括子孙节点),tag会变转义
        $('#div2').text('<p>div override</p>')
        console.log('text:' + $('#div2').text())

        // html: 设置或返回所选元素的内容(包括HTML tag,也是包括子孙节点),tag不会被转义
        $('#div1').html('<p>div override</p>')
        console.log('html:' + $('#div1').html())

        // val: 设置或返回表单字段的值
        $('#input-text').val('text override')
        console.log('val:' + $('#input-text').val())

        // attr('attr'): 设置或返回属性的值
        // attr可以传map,一次性设置多个属性
        $('a:first').attr('href', 'href override')
        console.log('attr:' + $('a:first').attr('href'))

        // text/html/val/asst都可以传入函数,i为当前元素在选择器的索引,origin为原始值
        $('#div3').text((i, origin) => {
            // 返回值为设置的新值
            return `${i} ${origin} override`
        })
        console.log('text function:' + $('#div3').html())
    })

    // 添加内容: append/prepend/after/before
    it('add content', () => {
        // append/prepend/after/before都可以直接添加文本,html,jquery对象,也能同时添加多个元素

        // append: 在被选元素的结尾插入内容
        $('#div1').append('append text', '<div>append html</div>', $('<div>append jquery object</div>'));
        console.log('append:' + $('#div1').html())

        // prepend: 在被选元素的开头插入内容
        $('#div1').prepend($('<div>prepend jquery object</div>'));
        console.log('prepend:' + $('#div1').html())

        // after: 在被选元素之后插入内容
        $('#div1 > p:first').after($('<div>after jquery object</div>'));
        console.log('after:' + $('#div1').html())

        // before: 在被选元素之前插入内容
        $('#div1 > p:first').before($('<div>before jquery object</div>'));
        console.log('before:' + $('#div1').html())
    })

    // 删除内容: remove/empty
    it('delete content', () => {
        // remove: 删除元素(包括子孙元素)
        $('#div6 > div:first').remove()
        console.log('remove:' + $('#div6').html())

        // empty: 删除子孙元素
        $('#div1 > p').empty()
        console.log('empty:' + $('#div1').html())
    })

    // 操作css: addClass/removeClass/toggleClass/css
    it('css', () => {
        // addClass: 添加class,多个class使用空格分隔,重复的只会添加一次
        $('#div1').addClass('add-class1 add-class1 add-class2')
        console.log('addClass:' + $('#div1').attr('class'))

        // removeClass: 删除class
        $('#div1').removeClass('add-class1 add-class2')
        console.log('removeClass:' + $('#div1').attr('class'))

        // toggleClass:不存在添加class,存在就删除
        $('#div1').toggleClass('div-class1')
        console.log('toggleClass:' + $('#div1').attr('class'))
        $('#div1').toggleClass('div-class1')
        console.log('toggleClass:' + $('#div1').attr('class'))

        // css: 设置或返回样式属性,传入map可以同时设置多个样式
        $('#div1').css('background-color', 'yellow')
        console.log('css:' + $('#div1').css('background-color') + ',style:' + $('#div1').attr('style'))
    })
})