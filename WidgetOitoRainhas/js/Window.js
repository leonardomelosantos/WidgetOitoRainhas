function changeScreen(screen) {
	if (Widget_Definitions.currentScreen != "")
	{
		$(Widget_Definitions.currentScreen).style.display = "none";
	}
	
	$(screen).style.display = "block";
	Widget_Definitions.currentScreen = screen;
}

function resizeWindow(width, height) {
	try {	
		widget.window.resizeWindow(width, height);
	}catch(e) {
		window.resizeTo(width, height);
	}
}
