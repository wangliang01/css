(function(){
	var datapicker = window.datapikcer;
	var monthData;
	var $wrapper = document.createElement('div');
	$wrapper.className = 'ui-datapicker-wrapper';
	datapicker.buildUi = function(year, month) {
		// 拿到日历数据
		monthData = datapicker.getMonthData(year,month);
		var html = '';
		html += '<div class="ui-datapicker-header">'+
					'<a href="#" class="ui-datapicker-btn ui-datapicker-prev-btn">&lt;</a>'+
					'<a href="#" class="ui-datapicker-btn ui-datapicker-next-btn">&gt;</a>'+
					'<span class="ui-datapicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>'+
				'</div>'+
				'<div class="ui-datapicker-body">'+
					'<table>'+
						'<thead>'+
							'<tr>'+
								'<th>一</th>'+
								'<th>二</th>'+
								'<th>三</th>'+
								'<th>四</th>'+
								'<th>五</th>'+
								'<th>六</th>'+
								'<th>日</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody>';
		for(var i=0; i<monthData.ret.length; i++){
			var date = monthData.ret[i]
			if(i % 7 === 0){
				html += '<tr>';
			}
			html += '<td data-date="'+date.date+'" data-month="'+date.month+'">'+ date.showDate+'</td>';
			if(i % 7 ===6){
				html += '</tr>'
			}
		}
				
		html += '</tbody>'+
				'</table>'+
			'</div>';

		return html;
	}
	datapicker.render = function(direction) {
		if(monthData){
			var year = monthData.year;
			var month = monthData.month;
		}
		console.log(direction);
		if(direction === 'prev') month--;
		if(direction === 'next') month++;
		var html = datapicker.buildUi(year,month);
		$wrapper.innerHTML = html;
		document.body.appendChild($wrapper);
		var $tds = document.querySelectorAll('[data-month="'+monthData.month+'"]')
		for(var i=0; i<$tds.length; i++){
			var td = $tds[i];
			td.classList.add('light');
		}
		console.log($tds)
	}
	
	datapicker.init = function(input) {
		datapicker.render();
		$input = document.querySelector(input);
		var isOpen = false;
		$input.addEventListener('click',function(){
			if(isOpen){
				$wrapper.classList.remove('show');
				isOpen  = false;
			}else{
				$wrapper.classList.add('show')
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.left = left + 'px';
				$wrapper.style.top = top + height + 2 + 'px';
				isOpen = true;
			}
		},false);

		// 给按钮绑定事件
		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			console.log($target.classList.contains('ui-datapicker-btn'))
			if(!$target.classList.contains('ui-datapicker-btn')){
				 return;
			}

			if($target.classList.contains('ui-datapicker-prev-btn')){
				// 上一月
				datapicker.render('prev');

			}else if($target.classList.contains('ui-datapicker-next-btn')){
				// 下一月
				datapicker.render('next');
			}
		},false);

		// 选择日期
		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			if($target.tagName.toLowerCase() !== 'td') {
				return ;
			}
			console.log($target.dataset.month)
			console.log(monthData.month)
			if($target.dataset.month == monthData.month){
				
				var date = new Date(monthData.year,monthData.month-1, $target.dataset.date);

				$input.value = format(date);
			}
		},false);

		function format(date){
			var padding = function(num) {
				if(num < 10){
					return '0' + num;
				}
				return num;
			}
			var ret = '';
			ret += date.getFullYear()+'-';
			ret += padding(date.getMonth() + 1)+'-'; 
			ret += padding(date.getDate())
			return ret;
		}
	}

	window.datapicker = datapicker;
})();