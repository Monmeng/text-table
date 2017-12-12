# text-table代码解读
### 名称：text-table
### 功能介绍：生成适合打印到标准输出的无边界文本表字符串
### 解读流程：
### 一．代码仓库展示
### 地址：https://github.com/Monmeng/text-table
### 仓库中文件介绍：
####    index.js
        项目主文件，也是项目的入口文件，暴露的函数作为第三方模块引用
####    readme.markdown
        对项目的说明
####    package.json
        描述npm包的所有相关信息，比如项目的依赖项等项目配置信息。
        其中包括：main字段：index.js指定了主文件，即加载的入口文件。
              项目的依赖项：
                  tap:任何协议库测试工具
                  tape:为节点和浏览器提供点击生成测试工具
                  cli-color:控制台的颜色，格式和其他工具
####     LICENSE
         文件统一使用MIT共享协议
####     .travis.yml
         travis-ci持续集成工具的配置文件
####     example文件夹
         示例文件，包括左中右点对齐模式
####     test文件夹
         测试文件
### 二、readme.markdown文件解读
     方法：var table=require(‘text-table’);
          var s = table(rows, opts={})；
          从数组rows和一些选项opts中返回一个格式化的表字符串s
          rows 应该是包含字符串、数字或其他可打印值的数组的数组。
          opts有:
                opts.hsep - 列之间使用的分隔符，默认 ' '
                opts.align -  每列对齐类型的数组，默认 ['l','l',...]
                opts.stringLength - 计算字符串长度时使用的回调函数
         对齐方式有：'l' - left     'r' - right     'c' - center        '.' - decimal
### 三、index.js文件解读
#### 1.暴露的函数作为第三方模块引用,参数为数组rows_，对象opts

判断opts是否存在
列之间的分隔符，没有定义就默认为’’,
列的对齐类型数组，没有定义就是空数组，
字符串长度，没有定义就计算字符串长度并返回。
#### 2.四个基本工具函数：
##### dotindex()函数：
           通过一个正则表达式的匹配，如果存在，返回匹配项的下标值的下一位，如果不存在，返回传入数组的长度。
##### reduce()函数:
           首先判断数组对象是否有 reduce 方法，有就直接调用原生的 reduce 方法，没有就执行下面，定义acc,如果传入实参大于等于3，则等于init，否则xs[i++],遍历xs数组,返回acc
##### forEach()函数：
           首先判断数组对象是否有forEach方法，有就直接调用原生的forEach方法，没有就执行下面数组xs的遍历，调用传入进来的f方法。
##### map()函数：
           首先判断数组对象是否有map方法，有就直接调用原生的map方法，没有就执行下面,定义新的数组res，将数组xs边遍历边处理，并将结果写入新数组res中,返回res


Dotsizes,reduce函数，调用forEach函数，里面调用dotindex函数，并将返回结果赋值给n，

第一个map中参数rows是整个矩阵，第二个map参数row是每一行，里面是对l/r/c格式化的处理过程，通过判断，添加每列之间的分隔符,，返回一个处理完成的文本表。
数据类型：字符串、数组、对象
### 四、执行效果

![pic](https://github.com/Monmeng/text-table/blob/master/imgs/1.png)

![pic](https://github.com/Monmeng/text-table/blob/master/imgs/2.png)

![pic](https://github.com/Monmeng/text-table/blob/master/imgs/3.png)
### 五、测试效果：

![pic](https://github.com/Monmeng/text-table/blob/master/imgs/4.png)

![pic](https://github.com/Monmeng/text-table/blob/master/imgs/5.png)
