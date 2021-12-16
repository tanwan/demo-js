describe('base', () => {

    // const: 常量
    // let: 块作用域
    // var: 函数作用域
    it('const let var',  () => {
        // const定义的变量不可以修改,而且必须初始化
        const constVar = 3

        // var定义的变量可以修改,如果不初始化会输出undefined,不会报错
        var varUndefined
        console.log(`varUndefined:${varUndefined}`)
        for (var i = 0; i < 2; i++) {
        }
        // 在块外面还能访问到var的变量
        console.log(`outer for,i:${i}`)

        for (let j = 0; j < 2; j++) {
        }
        // 在这边无法访问j

        for (var i = 0; i < 3; i++) {
            var j = i
            // j其实都是同一个
            setTimeout(function () {
                console.log(`use var:${j}`)
            }, 1);
        }

        for (var i = 0; i < 3; i++) {
            let j = i
            // 每次循环的j都是不同的
            setTimeout(function () {
                console.log(`use let:${j}`)
            }, 1);
        }
    })
}
)