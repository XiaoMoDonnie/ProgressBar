## ProgressBar
 一个简单的进度条封装,本项目基于Jquery,如果您有需求可以自己修改为js版本

## 功能描述
  #### 1、普通的进度条
  #### 2、可以配置已经完成的进度显示
  #### 3、可以配置是否显示百分比的值和文本内容
  #### 4、可以配置百分比值
  #### 5、具体功能可以查看初始化配置参数和示例

## 在线演示
  [进度条在线示例传送门](https://evan925.github.io/ProgressBar/index.html)

## 初始化

### 在html中引用项目文件
```
  <link rel="stylesheet" href="./css/tzProgressBar.css">
  <script type="text/javascript" src="./libs/jquery.min.js"></script> 
  <script type="text/javascript" src="./js/tzProgressBar.js"></script>
```

### html元素
```
     <div class="demo-progressbar-1">
        进度条加载中...
    </div>
```

### js,以下均为默认值，不配置时候使用以下的值
```
  const _tzProgressBar = new TzProgressBar({
            container: 'demo-progressbar-1', //容器
            width: '20px', //设置进度条的宽度
            fontSize: '14px', //文字大小 
            radius: '20px', //进度条圆角
            borderSize: null, //进度条边框
            borderColor: null, //进度条边框颜色
            borderLine: null, //进度条边框线样式
            showNum: true, //是否显示百分比
            maxLeft: 100, //控制文本范围 移动端测试 适合85 pc端100
            textLeft: 15, //用于控制进度条文本位置精准度
            textAlign: 'c', //c=居中  t=顶部  b=底部
            oldText: '已经完成', //已完成的提示文字
            newText: '正在完善', //正在完成提示文字
            showOldVal: true, //是否显示旧的值
            color: '#5FB878', //进度条颜色
            bgColor: '#e2e2e2', //进度条背景颜色
            oldColor: '#393D49', //旧的进度条颜色
            textColor: '#fff', //开启文字居中后生效
            oldVal: 90, //已完成进度的值 
            sub: function(callback) {}, //进度条减少的时候回调
            add: function(callback) {}, //进度条增加时候的回调
            success: function(callback) {}, //完成时候的回调
     });
     
     
      _tzProgressBar.sub(5); //设置新的值 减少进度条的值
      _tzProgressBar.add(3); //设置新的值 增加进度条的值
      _tzProgressBar.setNewVal(_num); //设置新的值 直接设置进度条的具体值

```

