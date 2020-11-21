// 1.新密码不能和旧密码一样
// 2.新密码  长度要求 6-12位
// 3.两次输入  新密码得一样

// 验证:记录下来,提供开发效果
var form=layui.form
form.verify({
    //   新密码 长度要求 6-12
      //规则名:[正则,不符合正则提醒信息]
    changdu: [/^\S{6,12}$/, '不满足长度要求'],
    

    //新密码
    diff: function (val) {
        // 原密码  .oldPwd
        //   新密码 val
      if ($('.oldPwd').val() == val) {
          return '新密码不能与原密码一样'
      }
    },
    //    两次输入  新密码  一样
      //规则名:函数.必须有return  不符合正则提醒信息
    same: function (val) {
          //第一次输入,直接获取;HTML结构上做一些简单类名补充,方便获取值
          //再次输入新密码:val
          if ($('.newPwd').val() != val) {
             return '两次输入密码不一致'
         }
    },
    
})
  
// ---------------------------------------------------------点击按钮
$('form').on('submit', function (e) {
    e.preventDefault()

    var params = $(this).serialize();
    $.post('/my/updatepwd', params, function (res) {
        layer.msg(res.message);
        if (res.status == 0) {
            $('form')[0].reset()
        }
    })
})