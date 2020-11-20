//---------------------------------------------------请求个人信息
/*
  业务设计:
    默认状态:头像和文字不显示
    加载后,开始请求用户数据;
    获取到用户数据后:
        1.名字:如果有用户昵称,则设置昵称,不然显示用户名
        2.头像:如果有头像,显示头像,没有就显示名字的首字符,注意英文字母大写
*/
//首页加载后,请求加载用户信息
$.ajax({
  url: "http://ajax.frontend.itheima.net/my/userinfo",
  //设置请求头
  headers: {
    "Authorization":localStorage.getItem('token'),
  },
  //请求成功后调用
  success: function (res) {
    // console.log(res);
    if (res.status == 0) {
      //名称:有就显示名称,没有就显示用户名
      var name = res.data.nickname || res.data.username;
      $('.username').text(name);

      // 测试代码：
      // res.data.user_pic = undefined;
      // name = "aaa";

      if (res.data.user_pic) {
        //头像:如果有头像,更改img的src属性为传过来的参数,让替代文字隐藏
        $('.layui-nav-img').show().attr('src', res.data.user_pic)
        //让替代文字隐藏
        $('.avatar').hide()
      }
      //
      else {
        // 截取name名字上的第一个字符,如果是英文字符小写变大写 方法toUpperCase()
        var t = name.substr(0, 1);
        t = t.toUpperCase()
        
        //show会让元素变为行内元素,让替代文字显示,让图片元素隐藏
        $('.avatar').show().css('display', "inline-block").text(t)
        $('.layui-nav-img').hide()
      }
    }
  }
})

