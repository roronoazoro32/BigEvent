// ------------------------------------------------------------  创建剪裁区
// - 调用cropper方法，创建剪裁区
$('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
});
  
// ------------------------------------------------------------  点击事件
// 为啥要把file隐藏,因为样式一般
$('.select').click(function () {
    $('#file').click()
})

//选择图片
//     1.事件:change  文件被选择的时候
//     2.选择某个图片以后,确实可以得到文件信息的对象!但是我们需要图片src地址
//          uRL内置对象  URL.createObjectURL(文件信息的对象) ----->可以得到临时文件地址
//     3.得到地址后不能直接替换img src地址; 需要查文档  cropper
$('#file').change(function () {
    // 1.文件对象
    var obj = this.files[0] //返回伪数组,得到文件信息的对象
    console.log(obj);
    
    // 2.URL内置对象  创建临时地址 (前端页面老刷新)
    var src = URL.createObjectURL(obj)
    
    // 3.替换:使用cropper方法,查文档
    $('#image').cropper('replace',src)
})

  // 确认裁剪
$('.sure').click(function() {
    // 1.使用插件的方法，得到canvas对象；
    var canvas = $('#image').cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    });
  
    // 2  canvas把裁剪出来图片信息 toDataURL 转为Base64 字符串；
    //    意见：小图片使用base64，后台给！
    var base64 = canvas.toDataURL('image/png');
  
    // 3. ajax提交url编码 提交字符串，完成更新
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: { avatar: base64 },
      success: function(res) {
        layer.msg(res.message);
        if (res.status === 0) {
          // 重新获取用户信息
          window.parent.get();
        }
      }
    });
  });
  