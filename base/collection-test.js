var assert = require('assert')
describe('conllection', () => {

    it('list', () => {
        let list = ['a', 'b']
        list.push('c')

        assert.equal(list[2], 'c')

        // 遍历
        // for in: 索引
        for (let i in list) {
            console.log(`for in i:${i}`)
        }

        // for of: 值
        for (let i of list) {
            console.log(`for of i:${i}`)
        }

        // forEach: 值和索引都可以,索引可以省略
        list.forEach((v, i) => {
            console.log(`forEach i:${i},v:${v}`)
        })
    })


    // map
    it('map', () => {
        let map = { k1: 'v1', k2: 'v2' }
        // 使用map.key和map[key]都可以赋值
        map.k3 = 'v3'
        map['k4'] = 'v4'

        // 使用map.key和map[key]都可以取值
        assert.equal(map['k3'], 'v3')
        assert.equal(map.k4, 'v4')

        // 遍历
        for (let k in map) {
            console.log(`for in k:${k}, value:${map[k]}`)
        }

    })


    // set
    it('set', () => {
        let set = new Set()
        set.add('a')
        set.add('a')
        set.add('b')

        set.forEach(v => {
            console.log(`forEach: v:${v}`)
        })
    })

})