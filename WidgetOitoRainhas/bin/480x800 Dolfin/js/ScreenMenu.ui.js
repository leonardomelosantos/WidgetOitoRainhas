var ScreenMenu_ui = {
	display: function () {
		Widget_Handler.stopTimer();
		changeScreen(Widget_Definitions.NAME_SCREEN_MENU);

		existsGameSaved = ScreenMenu_controller.existsGameSaved();
		if (existsGameSaved) {
			$("buttonStartGameAgain").setAttribute("class", "button");
		} else {
			$("buttonStartGameAgain").setAttribute("class", "buttonDisabled");
		}
	}
};