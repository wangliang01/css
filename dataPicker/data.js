(function(){
	var datapikcer = {};
	// 获取日期数据
	datapikcer.getMonthData = function(year,month){
		var ret = [] //用来存放数据
		// 如果没有传参数，取当前年月
		if(!year && !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		// 当月第一天
		var firstDay = new Date(year, month-1, 1);
		// 重新获取年份，月份
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;
		// 当月最后一天
		var lastDay = new Date(year, month, 0).getDate();
		// 上一个月最后一天
		var lastDayOfLastMonth = new Date(year, month-1, 0);
		// 当月第一天所对应的星期
		var weekOfFirstDay = firstDay.getDay();
		// 对星期天做一个特殊处理
		if(weekOfFirstDay === 0) {
			weekOfFirstDay = 7;
		}
		// 上一个月在日历中的天数
		var daysOfLastMonthCount = weekOfFirstDay -1;
		// 日历显示的天数可能是4周，也可能6周
		for(var i=0; i<7*6; i++){
			// 日期的处理
			var date = i + 1 - daysOfLastMonthCount; 
			var showDate = date;
			var thisMonth = month;
			if(date <= 0){
				// 上一月
				thisMonth = month - 1;
				showDate = lastDayOfLastMonth.getDate() + date;
			}else if(date > lastDay) {
				// 下一月
				thisMonth = month + 1;
				showDate = date - lastDay;
			}


			// 月份的处理
			if(month < 1) {
				// 上一年
				month = 12;
			}
			if(month > 12){
				// 下一年
				month = 1
			}

			// 将这些数据添加至ret数组中
			ret.push({
				date: date,
				showDate: showDate,
				month: thisMonth
			});
		}

		// 将ret返回
		return {
			year: year,
			month: month,
			ret: ret
		}
	}
	window.datapikcer = datapikcer;
})();