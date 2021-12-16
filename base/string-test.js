var assert = require('assert')
describe('conllection', () => {

    // 字符串
    it('string', () => {
        let str = 'aabcdefg'

        // startsWith: 开头
        assert(str.startsWith('aab'))
        // endsWith: 结尾
        assert(str.endsWith('efg'))
        // includes: 包含 
        assert(str.includes('cde'))
        // replace: 只替换第一个
        console.log(`replace:${str.replace('a','b')}`)
        console.log(`replaceAll:${str.replaceAll('a','b')}`)
    })



    // 正则表达式
    it('regex', () => {
        let str = 'This is the text used to test the regex'
        // /regex/modifier(可省略): i:不区分大小写,m:多行匹配,g: 全局匹配(不加这个只会匹配一个)
        let regex = /(.*) text (.*?) .*/im
        let wordRegex = /te([x|s]t)/
        // test: 判断是否匹配此正则
        assert(regex.test(str))
        assert(wordRegex.test(str))

        // 正则替换
        str = 'This is the text used to test the regex#用于正则替换'
        let newStr = str.replace(/#.*$/g, '^_^')
        console.log(`newStr:${newStr}`)
    })
})