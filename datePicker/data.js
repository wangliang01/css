(function(){
	var datepicker = {};
	datepicker.getMonthData = function(year, month){
		var ret = [];
		// 如果没有传参数
		if(!year && !month) {
			year = new Date().getFullYear();
			month = new Date().getMonth() + 1;
		}
		// 当月第一天
		var firstDay = new Date(year, month-1, 1);
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;
		// 当月最后一天
		var lastDay = new Date(year, month, 0);

		// 上月最后一天
		var lastDayofLastMonth = new Date(year, month-1, 0);

		// 当月第一天对应的星期
		var weekOfFirstDay = firstDay.getDay();

		// 对星期天做处理
		if(weekOfFirstDay === 0) {
			weekOfFirstDay = 7;
		}

		// 上一个月要显示的天数
		var daysOfLastMonthCount = weekOfFirstDay -1;

		for(var i=0; i<7*6; i++){
			var date = i + 1 - daysOfLastMonthCount;
			var showDate = date;
			var thisMonth = month;
			if(date <= 0){
				// 上一月
				showDate = lastDayofLastMonth.getDate() + date;
				thisMonth = month -1;
			}

			if(date > lastDay.getDate()){
				// 下一月
				showDate = date - lastDay.getDate();
				thisMonth = month + 1;
			}

			// 月份的处理
			if(month === 0){
				// 上一年
				month = 12;
			}
			if(month === 13){
				// 下一年
				month = 1;
			}

			ret.push ({
				date: date,
				showDate: showDate,
				month: thisMonth
			});

		}

		return {
			year: year,
			month: month,
			days: ret
		};
	}

	window.datepicker = datepicker;
})();