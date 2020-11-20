// 切换事件:点击按钮,让当前盒子隐藏,让另外一个盒子显示
$('#goto-register').on('click', function () {
    $('#login').hide()
    .siblings().show()
})

$('#goto-login').on('click', function () {
    $('#register').hide()
    .siblings().show()
})

// --------------------------------------------------------- 注册
  // 验证:记录下来,提供开发效果
  var form=layui.form
  form.verify({
      //规则名:[正则,不符合正则提醒信息]
      changdu: [/^\S{6,12}$/, '不满足长度要求'],
      
      //规则名:函数.必须有return  不符合正则提醒信息
      same: function (val) {
          //第一次输入,直接获取;HTML结构上做一些简单类名补充,方便获取值
          //再次输入:val
          if ($('.pwd').val() != val) {
             return '两次输入密码不一致'
         }
      }
  })


// 给表单注册点击事件,因为表单有默认行为所以要阻止默认行为
// 利用表单的自动获取数据的特性获取表单数据
// ajax发送数据到服务器,优化成功或者失败信息,注意慎用this
$('#register .layui-form').on('submit', function (e) {
    //阻止默认行为
    e.preventDefault()

    //表单收集数据
    var params = $(this).serialize();

    $.ajax({
        type: 'post',
         url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: params,
        success: function (res) {
               // 弹窗：msg 简单弹窗、会自动消失；
        layer.msg(res.message);
        // 业务设计：
        if (res.status == 0) {
            $("#register").hide();
            $("#login").show();

            // 需求：原生方式；重置！
            //       注意慎重使用this;
           
            }
            // $(this)[0].reset(); -----这个方法错误,这里的this指向已经改变了
            $("#register .layui-form")[0].reset();
        }
    })

})

// --------------------------------------------------------- 登录
$('#login .layui-form').on('submit', function (e) {
    //1.阻止默认行为
    e.preventDefault()

    // 2.收集数据
    var params = $(this).serialize()
    
    // 3.发送请求
    $.ajax({
        type:'post',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: params,
        success: function (res) {
            console.log(res);
            // 无论成功还是失败,都要给弹窗提示
            layer.msg(res.message)

            if (res.status == 0) {
                //把token保存到本地存储
                localStorage.setItem('token', res.token);
                
                //跳转到首页
                location.href ="./index.html";
            }
        }
    })
})