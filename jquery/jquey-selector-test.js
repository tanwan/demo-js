// jquery 选择器
describe('jquery selector', () => {
    before(() => {
        const fs = require('fs')
        const path = require('path')
        // __dirname:当前的脚本目录,process.cwd(): node的工作目录
        const testHTML = fs.readFileSync(path.join(__dirname, 'jquery-test.html')).toString()
        const { JSDOM } = require('jsdom')
        const jsdom = new JSDOM(testHTML)
        const { window } = jsdom
        // 在浏览器中,全局作用域就是window, 而在nodejs, 全局作用域是这个模块本身
        // 这边不能将window绑定到global,否则会报错
        global.$ = global.jQuery = require('jquery')(window)
    })

    // id,tag,class,multiple选择器
    it('basic selector', () => {
        // $('#id'): 选择id="id"的元素
        console.log('id selector:' + $('#div2').html())

        // $('tag'): 所有<tag>元素, 使用function可以使用this(HTML DOM Element,可以用$()包装成jquery对象), 选择器存在多个元素的话,html()只会返回第一个元素
        $('p').each(function () { console.log('tag selector:' + $(this).html()) })

        // $('.class'): 所有class="class"的元素,each的第1个参数是索引,第二个参数是HTML DOM Element
        $('.div-class1').each((i, el) => console.log('class selector:' + $(el).html()))

        // $('selector1,selector2'): 选择selector1和selector2的元素
        $('#div1,#div2').each((i, el) => console.log('multiple selector:' + $(el).html()))

        // $('*'): 表示所有元素
        $('#div1 *').each((i, el) => console.log('*:' + $(el).html()))
    })

    // 层级选择器
    it('hierarchy selector', () => {
        // $('parentSelector > childSelector'): 在parentSelector选择的元素的直接子元素使用childSelector选择
        $('#div6>p').each((i, el) => console.log('#div6>p:' + $(el).html()))

        // $('ancestorSelector  descendantSelector'): 在ancestorSelector选择的元素的子孙元素使用descendantSelector选择
        $('#div6 p').each((i, el) => console.log('#div6 p:' + $(el).html()))
    })


    // class选择器
    it('class selector', () => {
        // $('.class1.class2'): 所有class="class1 class2"的元素
        $('.div-class1.div-class2').each((i, el) => console.log('class selector:' + $(el).html()))
    })

    // attribute
    it('attribute selector', () => {
        //  $('[attr]'): 所有带有attr属性的元素
        $('[href]').each((i, el) => console.log('[href]:' + $(el).html()))
        //  $('[attr="attr value"]'): 所有attr属性等于attr value的元素
        $('[href="#"]').each((i, el) => console.log('[href=”#“]:' + $(el).html()))
        //  $('[attr$="attr value"]'): 所有attr属性以attr value结尾的元素
        $('[href$=".jpg"]').each((i, el) => console.log('[href=$”.jpg“]:' + $(el).html()))

        //  $('[attr^="attr value"]'): 所有attr属性以attr value开头的元素
        $('[href^="http"]').each((i, el) => console.log('[href=^”http“]:' + $(el).html()))
    })


    // :first,:last,:even,:odd,:eq,:gt,:lt
    // :input,:text,:password,:radio,:checkbox,:submit,:reset,:button,:file
    // 这些是jquery扩展的选择器,不是CSS规范的,因此直接使用不能获得较好的性能
    // 所以应当先使用CSS规范的选择器,再在filter函数使用这些选择器
    it('jquery extensions selector', () => {
        // $('selector:first'): 第一个选择器元素
        console.log(":first:" + $('div:first').html())

        // $('selector:last'): 最后一个选择器元素
        console.log(":last:" + $('.div-class1.div-class2:last').html())

        // $('selector:even'): 所有偶数选择器元素
        $('div:even').each((i, el) => console.log(':even:' + $(el).html()))

        // $('selector:odd'): 所有奇数选择器元素
        $('div:odd').each((i, el) => console.log(':odd:' + $(el).html()))

        // $('selector:eq(i)'): 选择器第i(从0开始)个元素
        console.log(':eq:' + $('div:eq(2)').html())

        // $('selector:gt(i)'): 所有选择器>i(从0开始)个元素
        $('div:gt(1)').each((i, el) => console.log(':gt:' + $(el).html()))

        // $('selector:lt(i)'): 所有选择器<i(从0开始)个元素
        $('div:lt(2)').each((i, el) => console.log(':lt:' + $(el).html()))

        // $(':input'): 所有input元素,包括submit和reset
        $(':input').each((i, el) => console.log(':input:' + $(el).val()))

        // $('input:text'): 所有type="text"的input元素
        $('input:text').each((i, el) => console.log('input:text:' + $(el).val()))

        // $('input:password'): 所有type="password"的input元素
        $('input:password').each((i, el) => console.log('input:password:' + $(el).val()))

        // $('input:radio'): 所有type="radio"的input元素
        $('input:radio').each((i, el) => console.log('input:radio:' + $(el).val()))

        // $('input:checkbox'): 所有type="checkbox"的input元素
        $('input:checkbox').each((i, el) => console.log('input:checkbox:' + $(el).val()))

        // $(':submit'): 所有submit元素
        $(':submit').each((i, el) => console.log(':submit:' + $(el).html()))

        // $('div:reset'): 所有reset元素
        $(':reset').each((i, el) => console.log(':reset:' + $(el).html()))

        // $(':button'): 所有button元素
        $(':button').each((i, el) => console.log(':button:' + $(el).html()))

        // $('input:checked'): 所有checked的元素
        $('input:checked').each((i, el) => console.log('input:checked:' + $(el).val()))

        //  $('option:selected'): 所有selected的元素
        $('option:selected').each((i, el) => console.log('option:selected:' + $(el).html()))
    })

    // :contains
    it('content filter selector', () => {
        // $('selector:contains("content")'): 所有选择器的内容包含content的元素
        $('div:contains("div1")').each((i, el) => console.log('div:contains("div1"):' + $(el).html()))
    })

});