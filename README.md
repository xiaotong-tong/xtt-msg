# 字符处理库

xtt-msg 为自用字符串解析器。传入一些字符串，会按照书写格式返回解析后的字符串结果。

想查看效果请运行 `npm run build` 后查看 [demo](/demo//demo.html)

## 使用

### browser

在浏览器中可以直接应用 showText.js 文件，然后使用 showText 全局变量即可。

```html
<script src="dist/showText.js"></script>
<script>
	showText.showTextBrowser("【随机数】")；
</script>
```

### module

使用打包文件可以运行 `npm install xtt-msg`，然后引入 showText 变量即可。

```javascript
import showText from "xtt-msg";

showText.showTextBrowser("【随机数】")；
```

### commonjs

```javascript
const { showTextBrowser } = require("xtt-msg");

showTextBrowser("【随机数】")；
```
