//需求
//      1.配置根路径
//      2.设置请求头
//      3.complete:验证在token后台的有效性


//aja提前过滤,提前拿到配置数据
$.ajaxPrefilter(function (data) {
    // console.log(data);
    //1. data是个啥? 每次发送ajax请求之前,拿到ajax传入的这些配置项

    //2.拿到配置对象,有啥用?
    //  对对象进行修改配置

    //2.1 配置根路径
    var base = "http://ajax.frontend.itheima.net"
    data.url = base + data.url
    

    
    // 判断url里是否包含my ,my路径开头才会执行下面
    if (data.url.indexOf('/my/') != -1) { //-不等于-1是指
        
        //2.2 请求头
        data.headers = {
            "Authorization": localStorage.getItem("token"),
        }

        //2.3 判断token是否有效的回调

        // 现在是不执行这个函数的,要等ajax发出请求完成后才执行
           // 完成后调用:不管成功还是失败,都会执行这个函数
           data.complete=function (xhr) {
            //xhr:原生xhr对象   --------这里xhr没有特别的意思,就是为了想用ajax的方法
            //原生xhr  找出返回的数据: xhr.reponseText --  返回的是个JSON字符串
            //xhr.responseJSON   ----返回的是解析后的结果,是个对象
            // console.log(xhr.responseJSON);
            if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
              // 比较好的方式：就是清空
              localStorage.removeItem("token");
              location.href = "/login.html";
            }
          }
    }
})