var Widget_Handler = {
	
	initEvents: function() {
		$("buttonStartGame").setAttribute("onclick","Widget_Handler.buttonStartGame_click();");
		$("buttonStartGameAgain").setAttribute("onclick","Widget_Handler.buttonStartGameAgain_click();");
		
		$("buttonRestart").setAttribute("onclick","Widget_Handler.buttonRestart_click();");
		$("buttonSaveGame").setAttribute("onclick","Widget_Handler.buttonSaveGame_click();");
		$("buttonMenu").setAttribute("onclick","Widget_Handler.buttonMenu_click();");

		$("c00").setAttribute("onclick","ScreenBoard_controller.cellClick(0,0);");
		$("c01").setAttribute("onclick","ScreenBoard_controller.cellClick(0,1);");
		$("c02").setAttribute("onclick","ScreenBoard_controller.cellClick(0,2);");
		$("c03").setAttribute("onclick","ScreenBoard_controller.cellClick(0,3);");
		$("c04").setAttribute("onclick","ScreenBoard_controller.cellClick(0,4);");
		$("c05").setAttribute("onclick","ScreenBoard_controller.cellClick(0,5);");
		$("c06").setAttribute("onclick","ScreenBoard_controller.cellClick(0,6);");
		$("c07").setAttribute("onclick","ScreenBoard_controller.cellClick(0,7);");
		$("c10").setAttribute("onclick","ScreenBoard_controller.cellClick(1,0);");
		$("c11").setAttribute("onclick","ScreenBoard_controller.cellClick(1,1);");
		$("c12").setAttribute("onclick","ScreenBoard_controller.cellClick(1,2);");
		$("c13").setAttribute("onclick","ScreenBoard_controller.cellClick(1,3);");
		$("c14").setAttribute("onclick","ScreenBoard_controller.cellClick(1,4);");
		$("c15").setAttribute("onclick","ScreenBoard_controller.cellClick(1,5);");
		$("c16").setAttribute("onclick","ScreenBoard_controller.cellClick(1,6);");
		$("c17").setAttribute("onclick","ScreenBoard_controller.cellClick(1,7);");
		$("c20").setAttribute("onclick","ScreenBoard_controller.cellClick(2,0);");
		$("c21").setAttribute("onclick","ScreenBoard_controller.cellClick(2,1);");
		$("c22").setAttribute("onclick","ScreenBoard_controller.cellClick(2,2);");
		$("c23").setAttribute("onclick","ScreenBoard_controller.cellClick(2,3);");
		$("c24").setAttribute("onclick","ScreenBoard_controller.cellClick(2,4);");
		$("c25").setAttribute("onclick","ScreenBoard_controller.cellClick(2,5);");
		$("c26").setAttribute("onclick","ScreenBoard_controller.cellClick(2,6);");
		$("c27").setAttribute("onclick","ScreenBoard_controller.cellClick(2,7);");
		$("c30").setAttribute("onclick","ScreenBoard_controller.cellClick(3,0);");
		$("c31").setAttribute("onclick","ScreenBoard_controller.cellClick(3,1);");
		$("c32").setAttribute("onclick","ScreenBoard_controller.cellClick(3,2);");
		$("c33").setAttribute("onclick","ScreenBoard_controller.cellClick(3,3);");
		$("c34").setAttribute("onclick","ScreenBoard_controller.cellClick(3,4);");
		$("c35").setAttribute("onclick","ScreenBoard_controller.cellClick(3,5);");
		$("c36").setAttribute("onclick","ScreenBoard_controller.cellClick(3,6);");
		$("c37").setAttribute("onclick","ScreenBoard_controller.cellClick(3,7);");
		$("c40").setAttribute("onclick","ScreenBoard_controller.cellClick(4,0);");
		$("c41").setAttribute("onclick","ScreenBoard_controller.cellClick(4,1);");
		$("c42").setAttribute("onclick","ScreenBoard_controller.cellClick(4,2);");
		$("c43").setAttribute("onclick","ScreenBoard_controller.cellClick(4,3);");
		$("c44").setAttribute("onclick","ScreenBoard_controller.cellClick(4,4);");
		$("c45").setAttribute("onclick","ScreenBoard_controller.cellClick(4,5);");
		$("c46").setAttribute("onclick","ScreenBoard_controller.cellClick(4,6);");
		$("c47").setAttribute("onclick","ScreenBoard_controller.cellClick(4,7);");
		$("c50").setAttribute("onclick","ScreenBoard_controller.cellClick(5,0);");
		$("c51").setAttribute("onclick","ScreenBoard_controller.cellClick(5,1);");
		$("c52").setAttribute("onclick","ScreenBoard_controller.cellClick(5,2);");
		$("c53").setAttribute("onclick","ScreenBoard_controller.cellClick(5,3);");
		$("c54").setAttribute("onclick","ScreenBoard_controller.cellClick(5,4);");
		$("c55").setAttribute("onclick","ScreenBoard_controller.cellClick(5,5);");
		$("c56").setAttribute("onclick","ScreenBoard_controller.cellClick(5,6);");
		$("c57").setAttribute("onclick","ScreenBoard_controller.cellClick(5,7);");
		$("c60").setAttribute("onclick","ScreenBoard_controller.cellClick(6,0);");
		$("c61").setAttribute("onclick","ScreenBoard_controller.cellClick(6,1);");
		$("c62").setAttribute("onclick","ScreenBoard_controller.cellClick(6,2);");
		$("c63").setAttribute("onclick","ScreenBoard_controller.cellClick(6,3);");
		$("c64").setAttribute("onclick","ScreenBoard_controller.cellClick(6,4);");
		$("c65").setAttribute("onclick","ScreenBoard_controller.cellClick(6,5);");
		$("c66").setAttribute("onclick","ScreenBoard_controller.cellClick(6,6);");
		$("c67").setAttribute("onclick","ScreenBoard_controller.cellClick(6,7);");
		$("c70").setAttribute("onclick","ScreenBoard_controller.cellClick(7,0);");
		$("c71").setAttribute("onclick","ScreenBoard_controller.cellClick(7,1);");
		$("c72").setAttribute("onclick","ScreenBoard_controller.cellClick(7,2);");
		$("c73").setAttribute("onclick","ScreenBoard_controller.cellClick(7,3);");
		$("c74").setAttribute("onclick","ScreenBoard_controller.cellClick(7,4);");
		$("c75").setAttribute("onclick","ScreenBoard_controller.cellClick(7,5);");
		$("c76").setAttribute("onclick","ScreenBoard_controller.cellClick(7,6);");
		$("c77").setAttribute("onclick","ScreenBoard_controller.cellClick(7,7);");
		
	},	

	buttonStartGame_click: function() {
		ScreenBoard_controller.startNewGame();
	},
	
	buttonStartGameAgain_click: function() {
		
		existsGameSaved = ScreenMenu_controller.existsGameSaved();
		if (existsGameSaved) {
			ScreenBoard_controller.resumeGame();
		}
	},

	buttonRestart_click: function() {
		Widget_Handler.stopTimer();
		setTimeout('ScreenBoard_controller.startNewGame()', 1000);
	},
	
	buttonSaveGame_click: function() {
		ScreenBoard_controller.saveGame();
	},
	
	buttonMenu_click: function() {
		ScreenMenu_ui.display();
	},
	
	updateMessages: function() {
		$("buttonStartGame").innerHTML = Widget_Messages.startGameText;
		$("buttonStartGameAgain").innerHTML = Widget_Messages.startGameAgainText;
		$("buttonRestart").innerHTML = Widget_Messages.restartGameText;
		$("buttonSaveGame").innerHTML = Widget_Messages.saveGameText;
		$("buttonMenu").innerHTML = Widget_Messages.menuText;
	},
	
	startTimer: function() {
		if (Widget_Definitions.showTime == 'true') {
			Widget_Definitions.actualTime = Widget_Definitions.actualTime + 1;
			ScreenBoard_ui.showActualTime(Widget_Definitions.actualTime);
			setTimeout('Widget_Handler.startTimer()', 1000);
		}
	}, 
	
	stopTimer: function() {
		Widget_Definitions.showTime = 'false';
		Widget_Definitions.actualTime = 0;
		ScreenBoard_ui.showActualTime(0);
	}

};