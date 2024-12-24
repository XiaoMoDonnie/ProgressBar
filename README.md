## ProgressBar
 一个简单的进度条封装,本项目基于Jquery,如果您有需求可以自己修改为js版本

## 功能描述

  #### 1、普通的进度条
  #### 2、可以配置已经完成的进度显示
  #### 3、可以配置是否显示百分比的值和文本内容
  #### 4、可以配置百分比值
  #### 5、具体功能可以查看初始化配置参数和示例

## 在线演示
  [进度条在线示例传送门](https://okay-xiaomo.github.io/ProgressBar/index.html)

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

### js实例化,以下均为默认值，不配置时候默认使用以下的值
```
  const _tzProgressBar = new TzProgressBar({
        container: 'demo-progressbar-1', //容器
        size: '12px', //进度条大小
        fontSize: '12px', //文字大小 
        radius: '2px', //进度条圆角
        speed: '0.6s', //进度条的速度
        border: 'none', //进度条边框 
        showStripes: true, //是否显示条纹效果
        showAnimation: true, //是否显示动画效果
        showPercent: true, //是否显示百分比
        maxLeft: 90, //控制文本范围最大值，以免超出进度条范围 移动端测试 适合85 pc端100
        textLeft: 15, //用于控制进度条文本位置精准度，以免超出进度条范围
        textAlign: 'c', //c=居中  t=顶部  b=底部
        oldText: '已完成', //已完成的提示文字
        newText: '完善中', //正在完成提示文字
        showOldVal: false, //是否显示旧的值
        color: '#5FB878', //进度条颜色
        bgColor: '#e2e2e2', //进度条背景颜色
        oldColor: '#393D49', //旧的进度条颜色
        textColor: '#fff', //开启文字居中后生效
        value: 0, //已完成进度的值 
        sub: function(callback) {}, //进度条减少的时候回调
        add: function(callback) {}, //进度条增加时候的回调
        success: function(callback) {}, //完成时候的回调
     });
     
     //控制进度条进度
      _tzProgressBar.sub(填写具体数值); //设置新的值 减少进度条的值
      _tzProgressBar.add(填写具体数值); //设置新的值 增加进度条的值
      _tzProgressBar.setNewVal(填写具体的数值：0-100); //设置新的值 直接设置进度条的具体值

```

