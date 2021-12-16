// jquery对象(比如使用$(selector)的对象)的方法会作用于它的所有元素上,也就是如果jquery对象包含有多个dom,那么这个方法就会在它的所有dom上执行
// 所以要注意是不是要应用到所有的元素上
// 但是如果方法是获取返回值的话,可能只会获取第一个元素的值
describe('jquery traversing', () => {

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

    // 父节点,子节点遍历: parent/children/find
    it('parent children', () => {
        // parent: 直接父元素
        console.log('parent:' + $('#div1>p:first').parent().html())

        // children: 所有直接子元素
        $('#div1').children().each((i, el) => console.log('children:' + $(el).html()))

        // children也可以添加选择器
        console.log('children with selector:' + $('#div1').children('p:last').html())

        // find: 在所有子孙元素中查找
        console.log('find:' + $('#div7').find('.option-class').html())
    })

    // 兄弟节点遍历: siblings/next/nextAll/nextUntil/prev/prevAll/prevUntil
    it('siblings', () => {
        // siblings: 所有兄弟节点
        $('a[href="#"]').siblings().each((i, el) => console.log('siblings:' + $(el).html()))

        // next: 下一个兄弟节点
        console.log('next:' + $('a[href="#"]').next().html())

        // nextAll: 下面的所有兄弟节点
        $('a[href="#"]').nextAll().each((i, el) => console.log('nextAll:' + $(el).html()))

        // nextUntil(selector): 下面的所有兄弟节点直到selector的节点(不包括)
        $('#a1').nextUntil('#a3').each((i, el) => console.log('nextUntil:' + $(el).html()))

        // prev: 上一个兄弟节点
        console.log('prev:' + $('a[href="#"]').prev().html())

        // prevAll: 上面的所有兄弟节点
        $('#a3').prevAll().each((i, el) => console.log('prevAll:' + $(el).html()))

        // prevUntil(selector): 下面的所有兄弟节点直到selector的节点(不包括)
        $('#a4').prevUntil('#a2').each((i, el) => console.log('prevUntil:' + $(el).html()))

    })

    // 过滤: first/last/eq/filter/not
    it('filter', () => {
        // first: 第一个元素
        console.log('first:' + $('a').first().html())

        // last: 最后一个元素
        console.log('last:' + $('a').last().html())
        
        // eq: 选择指定索引的元素
        console.log('eq:' + $('a').eq(1).html())

        // filter(selector): 使用selector过滤
        $('a').filter('[href^="http"]').each((i, el) => console.log('filter:' + $(el).html()))

        // not(selector): 不匹配selector的所有元素
        $('a').not('[href^="http"]').each((i, el) => console.log('not:' + $(el).html()))

    })



})