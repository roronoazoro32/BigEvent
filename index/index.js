// 首先判断本地是否有token,避免直接登录到首页
if (!localStorage.getItem('token')) {
  location.href='/login.html'
}



// ----------------------------------------------------请求个人信息
$.ajax({
    url: "/my/userinfo",
    
    //请求成功后调用
    success: function(res) {
      // console.log(res);
      if (res.status == 0) {
        // 名称：有昵称就昵称、不然就是用户名；
        var name = res.data.nickname || res.data.username;
        $(".username").text(name);
  
        // 测试代码：
        // res.data.user_pic = undefined;
        // name = "aaa";
  
        // 头像：如果有头像数据 
        if (res.data.user_pic) {
          // 
          $(".layui-nav-img").show().attr("src", res.data.user_pic);
          $(".avatar").hide();
        }
        // 测试：没有头像数据的时候
        else {
          // 截取name名字上第一个字符；
          var t = name.substr(0, 1);
          // 英文字符：小写变为大写：字符串.toUpperCase()
          t = t.toUpperCase();
  
          // show:会让元素变为行内元素；
          $(".avatar").show().css("display", "inline-block").text(t);
          $(".layui-nav-img").hide()
        }
  
      }
  },
    
    //请求失败后调用
    // fail:function(){}
})

// ----------------------------------------------------退出
/*
  1.点击退出注册点击事件
  2.优化问题:询问是否退出
  3.确认
      清空本地token
      回到登录页面
*/
$('#logout').on('click', function () {
    layer.confirm('你确定退出吗?', {icon: 3, title:'提示'}, function(index){
      //清空本地token
      localStorage.removeItem('token')
  
      //回到登录页面
      location.href = './login.html'
      
       // index: number值  用户关闭窗口(场景:假如打开多个弹窗,index会去匹配到相对应的弹窗)
      layer.close(index);
      
    });
  })
  
  

  