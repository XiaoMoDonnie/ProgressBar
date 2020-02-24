(function() {
    'use strict';
    const TzProgressBar = function(options) {
        //TzProgressBar(options||{}) 或者 new TzProgressBar(options||{})都可以使用 TzProgressBar 方法
        if (!(this instanceof TzProgressBar)) { return new TzProgressBar(options); }

        this.options = this.extend({
            container: null, //容器
            size: '20px', //进度条大小
            fontSize: '14px', //文字大小 
            radius: '20px', //进度条圆角
            speed: '0.6s', //进度条的速度
            border: 'none', //进度条边框 
            showStripes: false, //是否显示条纹效果
            showAnimation: false, //是否显示动画效果
            showPercent: true, //是否显示百分比文字提示
            maxLeft: 90, //控制文本范围最大值，以免超出进度条范围 移动端测试 适合85 pc端100
            textLeft: 15, //用于控制进度条文本位置精准度，以免超出进度条范围
            textAlign: 'c', //c=居中  t=顶部  b=底部
            oldText: '已完成', //已完成的提示文字
            newText: '完善中', //正在完成提示文字
            showOldVal: true, //是否显示旧的值
            color: '#5FB878', //进度条颜色
            bgColor: '#e2e2e2', //进度条背景颜色
            oldColor: '#393D49', //已完成的进度条颜色
            textColor: '#fff', //开启文字居中后生效
            value: 0, //已完成进度的值 
            sub: function(callback) {}, //进度条减少时候的回调
            add: function(callback) {}, //进度条增加时候的回调
            success: function(callback) {}, //初始化完成时候的回调
        }, options);
        this.init(); //初始化  
    }
    let _isShowInfo = false;
    TzProgressBar.prototype = {
        /**
         * 扩展合并参数
         * @param {any} obj 参数对象数据源
         * @param {any} obj2 参数对象数据源
         * @returns {any} 合并后的新的参数对象 
         */
        extend: function(obj, obj2) { // 参数合并方法体
            for (var key in obj2) {
                obj[key] = obj2[key];
            }
            return obj;
        },
        newProgressBarVal: 0,
        elements: null,
        getElements: function() {
            let _$container = $(this.options.container); //父容器
            return this.elements = {
                _$progressbar: _$container.find('.tz-progressbar-container'), //进度条容器
                _$progressbarContent: _$container.find('.tz-progressbar-content'), //进度条颜色区域
                _$oldPercentText: _$container.find('.tz-progressbar-oldpercent'), //已完成进度的文字提示
                _$newPercentText: _$container.find('.tz-progressbar-newpercent'), //正在完成进度的文字提示
                _$progressbarStyle: _$container.find('.tz-progressbar-style'), //公共样式
                _$progressBarBgColor: _$container.find('.tz-progressbar-bg'), //背景颜色区域
                _$progressBarOldValColor: _$container.find('.tz-progressbar-oldval'), //已完成进度颜色区域
                _$progressBarNewValColor: _$container.find('.tz-progressbar-newval'), //正在完成进度颜色区域
            };
        },
        /** 步进式设置进度条的值 */
        sub: function(val) {
            val = Number(val);
            let _this = this;
            let _elements = _this.elements;
            let _options = _this.options;
            if (_this.newProgressBarVal <= 0) return;
            _this.newProgressBarVal -= val;
            if (_this.newProgressBarVal <= 0) _this.newProgressBarVal = 0;
            let _newVal = _this.newProgressBarVal;
            _options.sub(_newVal); //回调

            if (_newVal <= _options.value) {
                _elements._$progressBarNewValColor.css({
                    'z-index': 3
                });
                _elements._$oldPercentText.css({
                    'z-index': 3,
                });
                _elements._$newPercentText.css({
                    'z-index': 4,
                    'color': _options.textAlign === 'c' ? _newVal === 0 ? _options.color : _options.textColor : _options.color
                });
            } else {
                _elements._$newPercentText.css({
                    'z-index': 2
                });
            }
            _elements._$progressBarNewValColor.css({
                'opacity': 1,
                'width': _newVal + '%'
            });
            let _max = _newVal >= _options.maxLeft ? _options.maxLeft : _newVal;
            _elements._$newPercentText.css({
                'opacity': 1,
                'left': (_max - _options.textLeft) < 0 ? 10 : (_max - _options.textLeft) + '%',
            });
            _elements._$newPercentText.text(_options.newText + _newVal + '%');
        },
        /** 步进式设置进度条的值 */
        add: function(val) {
            val = Number(val);
            let _this = this;
            let _elements = _this.elements;
            let _options = _this.options;
            if (_this.newProgressBarVal >= 100) return;
            _this.newProgressBarVal += val;
            if (_this.newProgressBarVal >= 100) _this.newProgressBarVal = 100;

            let _newVal = _this.newProgressBarVal;
            _options.add(_newVal); //回调
            if (_newVal > _options.value) {
                _elements._$progressBarNewValColor.css({
                    'z-index': 1
                });
                _elements._$newPercentText.css({
                    'z-index': 2
                });
            } else {
                _elements._$newPercentText.css({
                    'z-index': 4,
                    'color': _options.textAlign === 'c' ? _options.textColor : _options.color
                });
                _elements._$progressBarNewValColor.css({
                    'z-index': 3
                });
            }

            _elements._$progressBarNewValColor.css({
                'opacity': 1,
                'width': _newVal + '%'
            });
            let _max = _newVal >= _options.maxLeft ? _options.maxLeft : _newVal;
            _elements._$newPercentText.css({
                'opacity': 1,
                'left': (_max - _options.textLeft) < 0 ? 10 : (_max - _options.textLeft) + '%'
            });
            _elements._$newPercentText.text(_options.newText + _newVal + '%');
        },
        /** 直接设置进度条的值 */
        setNewVal: function(newVal) {
            newVal = Number(newVal);
            let _this = this;
            if (newVal < 0) newVal = 0;
            else if (newVal > 100) newVal = 100;
            let _newVal = newVal - _this.newProgressBarVal;

            if (_newVal >= 0) {
                _this.elements._$newPercentText.css({
                    'color': _this.options.textColor
                });
                _this.add(_newVal);
            } else {
                _this.sub(Math.abs(_newVal));
            }
        },
        setStyle: function() {
            let _this = this;
            let _elements = _this.elements;
            let _options = _this.options;

            //设置样式 
            _elements._$progressbarStyle.css({
                'transition': 'all ' + _options.speed + ' ease 0s'
            });
            let _max = _options.value >= _options.maxLeft ? _options.maxLeft : _options.value;

            _elements._$oldPercentText.css({
                'transition': 'all ' + _options.speed + ' ease 0s',
                'left': (_max - _options.textLeft) < 0 ? 10 : (_max - _options.textLeft) + '%',
            });
            _elements._$newPercentText.css({
                'transition': 'all ' + _options.speed + ' ease 0s',
                'left': (_max - _options.textLeft) < 0 ? 10 : (_max - _options.textLeft) + '%'
            });

            _elements._$progressBarBgColor.css({
                'background-color': _options.bgColor,
            });
            _elements._$progressBarOldValColor.css({
                'width': _options.value + '%',
                'background-color': _options.oldColor,
            });
            if (_options.showStripes) {
                _elements._$progressBarNewValColor.addClass('stripes');
                if (_options.showAnimation) {
                    _elements._$progressBarNewValColor.addClass('active');
                }
            }
            _elements._$progressBarNewValColor.css({
                'width': _this.newProgressBarVal + '%',
                'background-color': _options.color,
            });

            //设置文本显示位置
            if (_options.textAlign === 'c') {
                _elements._$oldPercentText.css({
                    'top': 0,
                    'z-index': 3,
                    'color': _options.textColor
                });
                _elements._$newPercentText.css({
                    'top': 0,
                    'z-index': 2,
                    'color': _options.textColor
                });
            } else if (_options.textAlign === 'b') {
                _elements._$progressbar.css({
                    'padding-bottom': '20px'
                })
                _elements._$oldPercentText.css({
                    'top': '20px',
                    'color': _options.oldColor
                });
                _elements._$newPercentText.css({
                    'top': '20px',
                    'color': _options.color
                });
            } else {
                _elements._$progressbar.css({
                    'padding-top': '20px'
                })

                _elements._$oldPercentText.css({
                    'top': '0px',
                    'line-height': _options.size,
                    'color': _options.oldColor
                });
                _elements._$newPercentText.css({
                    'top': '0px',
                    'line-height': _options.size,
                    'color': _options.color
                });
            }

            //设置数值
            _elements._$oldPercentText.text(_options.oldText + _options.value + '%');
            _elements._$newPercentText.text(_options.newText + _this.newProgressBarVal + '%');


            if (!_options.showPercent) {
                _elements._$oldPercentText.hide();
                _elements._$newPercentText.hide();
            }
            if (!_options.showOldVal) {
                _elements._$oldPercentText.hide();
                _elements._$progressBarOldValColor.hide();
                _elements._$progressBarNewValColor.css('opacity', 1);
                if (_options.showPercent) {
                    _elements._$newPercentText.css('opacity', 1);
                }
            }
            _elements._$oldPercentText.css({
                'font-size': _options.fontSize,
                'line-height': _options.size
            });
            _elements._$newPercentText.css({
                'font-size': _options.fontSize,
                'line-height': _options.size
            });

            let _border = 'none';
            if (_options.border !== null) {
                _border = _options.border
            }
            _elements._$progressbarContent.css({
                'border': _border,
                'border-radius': _options.radius,
                'height': _options.size
            });
        },
        render: function() {
            let _this = this;
            let _template = `
                <div class="tz-progressbar-container">
                    <span class="tz-progressbar-oldpercent">加载中0%</span>
                    <span class="tz-progressbar-newpercent">加载中0%</span>
                    <div class="tz-progressbar-content">
                        <span class="tz-progressbar-style tz-progressbar-bg"></span>
                        <span class="tz-progressbar-style tz-progressbar-oldval"></span>
                        <span class="tz-progressbar-style tz-progressbar-newval"></span>
                    </div> 
                </div>
            `;
            $(_this.options.container).html(_template);
            setTimeout(function() {
                _this.getElements();
                _this.setStyle();
                _this.options.success({
                    'value': _this.options.value
                });
            }, 500);
        },
        init: function() {
            let _this = this;
            if (_this.options.container === null) {
                console.error('未设置进度条容器，参数= options->container');
                return;
            }
            if ($(_this.options.container).length === 0) {
                console.error('进度条容器不存在：');
                console.error('当前设置容器参数：options->container=“' + _this.options.container + '”');
                return;
            }
            _this.newProgressBarVal = Number(_this.options.value);
            _this.render();
            if (!_isShowInfo) {
                _isShowInfo = true;
                console.log('%c  ——作者信息：——————————————————————————', 'color:#FFB800')
                console.log('%c 丨 作者昵称：提拉米苏的呆猫（Evan Mo）  丨', 'color:#009688')
                console.log('%c 丨 E-Mail：tzxiaomo@outlook.com       丨', 'color:#01AAED')
                console.log('%c 丨 WebSite：http://www.925i.cn        丨', 'color:#FF5722')
                console.log('%c  —————————————————————————————————————', 'color:#FFB800')
                console.log("    ");
                console.log('%c 进度条初始化成功', 'color:#009688');
                console.log("    ");
            }
        }
    };
    window.TzProgressBar = TzProgressBar;
}());
