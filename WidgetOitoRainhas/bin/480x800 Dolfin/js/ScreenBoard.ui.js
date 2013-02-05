var ScreenBoard_ui = {

	display : function() {
		changeScreen(Widget_Definitions.NAME_SCREEN_BOARD);
	},
	
	updateCell: function(a,b) {
		var cellReference = "c" + a + "" + b;
		$(cellReference).setAttribute("class", Widget_Definitions.boardState[a][b]);
	}, 
	
	showActualTime: function(totalSeconds) {
		
		try {
			var totalSecondsConverted = parseInt(totalSeconds);
			
			var hours = 0;
			var minutes = 0;
			var seconds = 0;
			hours = parseInt(parseFloat(totalSeconds / 3600));
			minutes = parseInt( (totalSeconds-(hours*60)) / 60);
			seconds = parseInt( (totalSeconds-(hours*60)-(minutes*60)) );
			
			var hoursText = "" + hours;
			var minutesText = "" + minutes;
			var secondsText = "" + seconds;
			
			if (hours < 10) hoursText = "0" + hoursText;
			if (minutes < 10) minutesText = "0" + minutesText;
			if (seconds < 10) secondsText = "0" + secondsText;
			
			$("time").innerHTML = 	hoursText + ":" + minutesText + ":" + secondsText;
		} catch (e) { }
	},
	
	showCongratulations: function(time) {
		$("congratulations").style.display = "block";
		$("congratulations").innerHTML = Widget_Messages.congratulationsText + "<br/><br/>Tempo: " + time;
		setTimeout("ScreenBoard_ui.closeCongratulations()", 4000);
	}, 
	
	closeCongratulations: function() {
		$("congratulations").style.display = "none";
	}
};