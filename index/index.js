// 首先判断本地是否有token,避免直接登录到首页
if (!localStorage.getItem('token')) {
  location.href='/login.html'
}



// ----------------------------------------------------请求个人信息
$.ajax({
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    // 设置请求头：
    headers: {
      "Authorization": localStorage.getItem("token"),
  },
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

    // 完成后调用:不管成功还是失败,都会执行这个函数
  complete: function (xhr) {
      //xhr:经过JQ封装后,xhr对象   --------这里xhr没有特别的意思,就是为了想用ajax的方法
      //原生xhr  找出返回的数据: xhr.reponseText
      //xhr.responseJSON
    // console.log(xhr.responseJSON);
      if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
        // 比较好的方式：就是清空
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    }
})
  
