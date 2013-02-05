function $(id) {
	return document.getElementById(id);
}

function setPreferenceForKey(value, varName) {
	try {
		widget.setPreferenceForKey(value, varName);
	} catch (e) {
		WidgetAPI.arrayTemp[varName] = value;
	}
}

function getPreferenceForKey(varName) {
	try {
		return widget.preferenceForKey(varName);
	} catch (e) { 
		return WidgetAPI.arrayTemp[varName];
	}
}