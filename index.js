module.exports = function (rows_, opts) {                  //暴露的函数作为第三方模块引用,参数为数组rows_，对象opts
    if (!opts) opts = {};                                  //判断opts是否存在,不存在，则赋值一个空对象
    var hsep = opts.hsep === undefined ? '  ' : opts.hsep; //列之间的分隔符，没有定义就默认为' ',
    var align = opts.align || [];                          //列的对齐类型数组，没有定义就是空数组
    var stringLength = opts.stringLength || function (s) { return String(s).length; } ;
                                                          //字符串长度，没有定义就计算字符串长度并返回。
    
    
    //主要是按要求存储数组中每一项的长度，并返回一个数组
    var dotsizes = reduce(rows_, function (acc, row) {
        forEach(row, function (c, ix) {
            var n = dotindex(c);
            if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
    }, []);
    
   //如果是点匹配方式，先计算出所需匹配的分隔符数量，然后返回本身字符串加上分隔符数组
    var rows = map(rows_, function (row) {
        return map(row, function (c_, ix) {
            var c = String(c_);
            if (align[ix] === '.') {
                var index = dotindex(c);
                var size = dotsizes[ix] + (/\./.test(c) ? 1 : 2) - (stringLength(c) - index) ;
                return c + Array(size).join(' ');
            }
            else return c;
        });
    });
    
    //存储数组中每一项的长度
    var sizes = reduce(rows, function (acc, row) {
        forEach(row, function (c, ix) {
            var n = stringLength(c);
            if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
    }, []);
    
    //是对l/r/c格式化的处理过程，通过判断，添加每列之间的分隔符,返回一个处理完成的文本表。
    return map(rows, function (row) {
        return map(row, function (c, ix) {
            var n = (sizes[ix] - stringLength(c)) || 0;
            var s = Array(Math.max(n + 1, 1)).join(' ');
            if (align[ix] === 'r' || align[ix] === '.') {
                return s + c;
            }
            if (align[ix] === 'c') {
                return Array(Math.ceil(n / 2 + 1)).join(' ') + c + Array(Math.floor(n / 2 + 1)).join(' ') ;
            }
            
            return c+ s;
        }).join(hsep).replace(/\s+$/, '');
    }).join('\n');
};

function dotindex (c) {
    var m = /\.[^.]*$/.exec(c);            //正则表达式匹配
    return m ? m.index + 1 : c.length;     //m存在，返回匹配项索引值的下一位，如果不存在，返回传入数组的长度。
}

function reduce (xs, f, init) {            
    if (xs.reduce) return xs.reduce(f, init);     //判断数组对象是否有 reduce 方法，有就直接调用原生的 reduce 方法，没有就执行下面
    var i = 0;
    var acc = arguments.length >= 3 ? init : xs[i++];   //如果传入实参个数大于等于3，则等于init,否则等于xs[i++]
    for (; i < xs.length; i++) {
        f(acc, xs[i], i);                           //遍历数组xs,每一项调用f函数方法
    }
    return acc;
}

function forEach (xs, f) {
    if (xs.forEach) return xs.forEach(f);        //判断数组对象是否有forEach方法，有就直接调用原生的forEach方法，没有就执行下面数组xs的遍历
    for (var i = 0; i < xs.length; i++) {
        f.call(xs, xs[i], i);                    //数组遍历，每一项调用f函数方法
    }
}

function map (xs, f) {        
    if (xs.map) return xs.map(f);             //首先判断数组对象是否有map方法，有就直接调用原生的map方法，没有就执行下面
    var res = [];                             //定义新的数组res
    for (var i = 0; i < xs.length; i++) {
        res.push(f.call(xs, xs[i], i));      //将数组xs边遍历边处理,每一项调用f函数方法，并将结果写入新数组res中
    }
    return res;
}
