// 获取数据渲染列表 提前封装,会有添加删除的业务
function getList() {
    $.ajax({
        url:'/my/article/cates',
        success: function (res) {
            // 对获取到的数据进行判断
            if (res.data.length != 0) {
                var str = ""
                $.each(res.data, function (index, ele) {
                    str += `<tr>
                        <td>${ele.name}</td>
                        <td>${ele.alias}</td>
                        <td>
                            <button myid="${ele.Id}" data-name="${ele.name}" data-alias="${ele.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
    
                              <button myid="${ele.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                        </td>
                      </tr>`;
                })
                //把组合后的HTML标签放到指定位置
                $('tbody').html(str)
            }
        }
    })
}
getList()

// ------------------------------------------------添加
// 步骤:
//      1.注册点击事件
//      2.弹出层,里面有form表单
//      3.form表单注册点击事件
//              收集数据
//              提交ajax,提示框
//              获取成功渲染列表,关闭弹出层
var add_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
  </form>`;
$('.add').on('click', function () {
    layer.open({
        type:1,
        title: '添加类别'
        ,content: add_str,
        area: ['500px', '300px'],
        //层创建完毕时    success会携带两个参数，分别是当前层DOM当前层索引
        success: function (layero, index) {
            //index:number值 layer专门关闭用
            //注册提交事件
            add_sub(index)
        }
    }); 
    
})

//步骤1:
// $('form').on('submit', function (e) {
//     e.preventDefault()
//     // 问题:不能把提交事件放在外面注册
//     // 原因:代码执行到这,就是现在就要给$("#add_form")注册提交事件
//     //      但是:现在的页面没有$("#add_form")
//     // 解决: 等待form出来后,才能获取,然后再次注册提交事件
//     // 代码:layer.open(success里面注册提交事件)
// })

//步骤2:
// 注册事件放在  layer.open(success 里面注册提交事件)
// 测试是否生效  生效 但是代码变得不容易维护  
// 解决 封装

// 步骤3
function add_sub(numb) {
    $("#add_form").on('submit', function (e) {
        e.preventDefault()
    
        // 1.收集数据
        var data = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                //无论成功还是失败,都给提示
                layer.msg(res.message)
                if (res.status == 0) {
                    getList()
                    //关闭弹出层
                    layer.close(numb)
                }
            }
        })
    })
}