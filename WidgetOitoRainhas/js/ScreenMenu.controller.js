var ScreenMenu_controller = {
	
	existsGameSaved: function() {
		var timeSaved = ''; 
		try {
			timeSaved = getPreferenceForKey("time");
		} catch (e) {
		}
		
		if (timeSaved != '') {
			return true;
		} else {
			return false;
		}
	}	
};