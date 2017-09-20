## 前端图片压缩工具

> 安装

```
npm install smaller-web
```

> 使用

1. 引用
```
import Smaller from 'smaller-web'
```
或
```
<script src="smaller-web/dist/Smaller.js"></script>
```
2. 创建Smaller对象
```
    new Smaller({
      src: src,                 // 要压缩的图片地址(可选)
      file: file,               // 要压缩的图片对象(可选)
      el: el,                   // input[file]节点(可选)
      scale: 0.4,               // 压缩比例 0-1 (默认1)
      success: function (data)  {
        // 压缩成功回调函数,data:{file: 压缩后文件地址, url：压缩后图片地址}
      }
    })
```