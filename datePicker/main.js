(function() {
    var datepicker = window.datepicker;
    var monthData;
    var wrapper;
    datepicker.buildUI = function(year, month) {
        // 拿到日历数据
        monthData = datepicker.getMonthData(year, month);
        // 创建html模板
        var html = '';
        html += '<div class="ui-datepicker-header">' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +
            '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var i = 0; i < monthData.days.length; i++) {
            if (i % 7 === 0) {
                html += '<tr>';
            }
            html += '<td data-date="'+monthData.days[i].date+'">' + monthData.days[i].showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }
        html += '</tbody>' +
            '</table>' +
            '</div>';

        return html
    }
    datepicker.render = function(direction) {
        if (monthData) {
            var year = monthData.year;
            var month = monthData.month;
        }
        if (direction === 'prev') month--;
        if (direction === 'next') month++;
        var html = datepicker.buildUI(year, month);
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'ui-datepicker-wrapper';
        }
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);

    }
    datepicker.init = function(input) {
        datepicker.render();
        // 控制展开
        var $input = document.querySelector(input);
        var isOpen = false; //设置一个开关，默认是不展开

        // 给input框绑定事件
        $input.addEventListener('click', function() {
            // 展开
            if (isOpen) {
                // 移除控制显示的类
                wrapper.classList.remove('ui-datepicker-show');
                isOpen = false;
            } else {
                // 添加控制显示的类
                wrapper.classList.add('ui-datepicker-show');
                // 控制datepicker显示的位置
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                // 给datepicker 设置样式
                wrapper.style.left = left + 'px'; //记得要带上单位
                wrapper.style.top = top + height + 2 + 'px';
                isOpen = true;
            }
        }, false);

        // 月份切换
        wrapper.addEventListener('click', function(e) {
            // 获取点击的元素
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) {
                return;
            }

            // 上一月
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');
            }

            // 下一月
            if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        }, false);

        // 选择日期
        wrapper.addEventListener('click', function(e) {
        	// 获取点击元素
        	var $target = e.target;

        	// 点击元素不是td
        	if($target.tagName.toLowerCase() !== 'td') {
        		return ;
        	}

        	// 点击元素是td
        	var year = monthData.year;
        	var month = monthData.month;
        	var date = $target.dataset.date;
        }, false);
    }
})();
