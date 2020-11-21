// ----------------------------------------------------------基本信息获取

//  声明form表单
var form = layui.form;

// 表单赋值
//  思路:
//      发送ajax请求,获取用户信息
//      设置表单各项(每个输入框)的value值

$.ajax({
    url: '/my/userinfo',
    success: function (res) {
        layer.msg(res.message)
     if (res.status==0) {
            console.log(res);
        // 慢方法 ---  属性选择器
        // $('input[name=username]').val(res.data.username);
        // $('input[name=nickname]').val(res.data.nickname);
        // $('input[name=email]').val(res.data.email);

        // LayUI 内置快速填充的方法的要求：
        // 先设置表单各项的 name属性（username/nickname/email/id）和接口的参数名对应
        // 为form表单设置 `lay-filter="user"` ；值随便定义，我这里使用的是 user
        // 调用方法
        form.val('user',res.data)
     }
    }
})


// ----------------------------------------------------------更新数据
//步骤:
// 1.注册点击事件
// 2.阻止默认行为
// 3.点击提交
//      收集表单数据，使用 $('form').serialize() 。（id、nickname、email）
//      发送ajax请求，完成更新；
//      更新成功之后，调用父页面的 `get()` 重新渲染index页面的用户信息；
$('form').on('submit', function (e) {
    e.preventDefault()

    // 1.收集数据
    var params=$(this).serialize();
    // 2.发送数据
    
    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: params,
        success: function (res) {
            layer.msg(res.message)
            if (res.status == 0) {
                //业务设计:
                // uesrInfo页面虽然看起来和index在一个页面中;其实这是两个页面
                // 通知外层  JS代码  重新获取用户信息
                window.parent.get();

            }
        }
    })
})