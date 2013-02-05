var ScreenBoard_controller = {

	startNewGame: function() {
		
		Widget_Definitions.boardStateQueens = new Array(8);
		for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
			Widget_Definitions.boardStateQueens[i] = -1;
		}
	
		ScreenBoard_controller.clearBoard();
		
		Widget_Handler.stopTimer();
		ScreenBoard_ui.display();
		setTimeout('Widget_Handler.startTimer()', 1000);
		Widget_Definitions.showTime = 'true';
	},
	
	clearBoard: function() {
		Widget_Definitions.boardState = new Array(8);
		for (i = 0; i < Widget_Definitions.boardState.length; i++) {
			Widget_Definitions.boardState[i] = new Array (8);
			
			Widget_Definitions.boardState[i][0] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,0);
			
			Widget_Definitions.boardState[i][1] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,1);
			
			Widget_Definitions.boardState[i][2] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,2);
			
			Widget_Definitions.boardState[i][3] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,3);
			
			Widget_Definitions.boardState[i][4] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,4);
			
			Widget_Definitions.boardState[i][5] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,5);
			
			Widget_Definitions.boardState[i][6] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,6);
			
			Widget_Definitions.boardState[i][7] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(i,7);
		}
	},
	
	resumeGame: function() {
		var x;
		var y;
		
		ScreenBoard_controller.clearBoard();
		
		Widget_Definitions.boardStateQueens = new Array(8);
		for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
			Widget_Definitions.boardStateQueens[i] = -1;
		}
		
		// Consultando as posições armazenadas das rainhas 
		for (i = 0; i < 8; i++) {
			var contentSaved = getPreferenceForKey("q"+i);
			if (contentSaved != '') {
				var positionsQueen = contentSaved.split(';'); 
				if (positionsQueen[0] != '-1') {
					
					x = parseInt(positionsQueen[0]);
					y = parseInt(positionsQueen[1]);
					Widget_Definitions.boardState[x][y] = Widget_Definitions.STATE_CELL_QUEEN;
					ScreenBoard_ui.updateCell(x,y);
					// Adicionando no vetor de rainhas
					for (k = 0; k < Widget_Definitions.boardStateQueens.length; k++) {
						if (Widget_Definitions.boardStateQueens[k] == -1) {
							Widget_Definitions.boardStateQueens[k] = y;
							break;
						}
					}
					ScreenBoard_controller.updateReferences(x,y);
				}
			}
		}
		
		// Atualizando o tempo, iniciando o timer e exibido a tela
		Widget_Handler.stopTimer();
		ScreenBoard_ui.display();
		try {
			Widget_Definitions.actualTime = parseInt(parseFloat(getPreferenceForKey("time")));
		} catch (e) {
			Widget_Definitions.actualTime = 0;
		}
		setTimeout('Widget_Handler.startTimer()', 1000);
		Widget_Definitions.showTime = 'true';
		
		// Limpando o jogo que o usuário acabou de carregar
		setPreferenceForKey("", "time");
		for (i = 0; i < 8; i++) {
			setPreferenceForKey("", "q"+1);
		}
		
	}, 
	
	saveGame: function() {
		// Salvando o tempo
		setPreferenceForKey(Widget_Definitions.actualTime + "", "time");
		
		// Salvando as posições das rainhas
		for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
			if (Widget_Definitions.boardStateQueens[i] != -1) {
				var columnAux;
				columnAux = Widget_Definitions.boardStateQueens[i];
				for (j = 0; j < 8; j++) {
					if (Widget_Definitions.boardState[j][columnAux] == Widget_Definitions.STATE_CELL_QUEEN) {
						setPreferenceForKey(j+";"+columnAux, "q"+i);
						break;
					}
				}
			} else {
				setPreferenceForKey("-1;-1", "q"+i);
			}
		}
		
		ScreenMenu_ui.display();
	},
	
	cellClick: function(a,b) {
		if (Widget_Definitions.boardState[a][b] == Widget_Definitions.STATE_CELL_EMPTY) {
			Widget_Definitions.boardState[a][b] = Widget_Definitions.STATE_CELL_QUEEN;
			ScreenBoard_ui.updateCell(a,b);
			
			// Adicionando no vetor de rainhas
			for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
				if (Widget_Definitions.boardStateQueens[i] == -1) {
					Widget_Definitions.boardStateQueens[i] = b;
					break;
				}
			}
			
			ScreenBoard_controller.updateReferences(a,b);
			
		} else if (Widget_Definitions.boardState[a][b] == Widget_Definitions.STATE_CELL_QUEEN) {
			Widget_Definitions.boardState[a][b] = Widget_Definitions.STATE_CELL_EMPTY;
			ScreenBoard_ui.updateCell(a,b);
			ScreenBoard_controller.updateReferences(a,b);
		}
		
		// Verifica se conseguiu alcancar o objetivo
		var target = true;
		for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
			if (Widget_Definitions.boardStateQueens[i] == -1) {
				target = false;
				break;
			}
		}
		if (target) {
			ScreenBoard_ui.showCongratulations($("time").innerHTML);
		}
		
	},
	
	updateReferences: function(x,y) {
		
		if (Widget_Definitions.boardState[x][y] == Widget_Definitions.STATE_CELL_QUEEN) {
			
			ScreenBoard_controller.updateReferencesState(x,y,Widget_Definitions.STATE_CELL_DISABLE);
			
		} else if (Widget_Definitions.boardState[x][y] == Widget_Definitions.STATE_CELL_EMPTY) {
			
			// Retirando do vetor de rainhas
			for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
				if (Widget_Definitions.boardStateQueens[i] == y) {
					Widget_Definitions.boardStateQueens[i] = -1;
					// Limpando as referências desta rainha recem-retirada
					ScreenBoard_controller.updateReferencesState(x,y,Widget_Definitions.STATE_CELL_EMPTY);
					break;
				}
			}
			
			for (i = 0; i < Widget_Definitions.boardStateQueens.length; i++) {
				if (Widget_Definitions.boardStateQueens[i] != -1) {
					var columnAux;
					columnAux = Widget_Definitions.boardStateQueens[i];
					for (j = 0; j < 8; j++) {
						if (Widget_Definitions.boardState[j][columnAux] == Widget_Definitions.STATE_CELL_QUEEN) {
							ScreenBoard_controller.updateReferencesState(j,columnAux,Widget_Definitions.STATE_CELL_DISABLE);
							break;
						}
					}
				}
			}
		}
	},
	
	updateReferencesState: function(x,y,state) {
		var row; 
		var column;
		
		// Desativando casas verticais relativas a esta nova rainha posicionada
		for (row = 0; row < 8; row++) {
			if (row != x) {
				if (Widget_Definitions.boardState[row][y] != Widget_Definitions.STATE_CELL_QUEEN) {
					Widget_Definitions.boardState[row][y] = state;
					ScreenBoard_ui.updateCell(row,y);
				}
			}
		}
		// Desativando casas horizontais relativas a esta nova rainha posicionada
		for (column = 0; column < 8; column++) {
			if (column != y) {
				if (Widget_Definitions.boardState[x][column] != Widget_Definitions.STATE_CELL_QUEEN) {						
					Widget_Definitions.boardState[x][column] = state;
					ScreenBoard_ui.updateCell(x,column);
				}
			}
		}
		// Desativando casas diagonais relativas a esta nova rainha posicionada
		var xAux = x;
		var yAux = y;
		
		while (xAux > 0 && yAux > 0) {
			xAux = xAux - 1;
			yAux = yAux - 1;
			if (Widget_Definitions.boardState[xAux][yAux] != Widget_Definitions.STATE_CELL_QUEEN) {
				Widget_Definitions.boardState[xAux][yAux] = state;
				ScreenBoard_ui.updateCell(xAux,yAux);
				
			}
		}
		xAux = x;
		yAux = y;
		while (xAux < 7 && yAux > 0) {
			xAux = xAux + 1;
			yAux = yAux - 1;
			if (Widget_Definitions.boardState[xAux][yAux] != Widget_Definitions.STATE_CELL_QUEEN) {						
				Widget_Definitions.boardState[xAux][yAux] = state;
				ScreenBoard_ui.updateCell(xAux,yAux);
				
			}
		}
		xAux = x;
		yAux = y;
		while (xAux > 0 && yAux < 7) {
			xAux = xAux - 1;
			yAux = yAux + 1;
			if (Widget_Definitions.boardState[xAux][yAux] != Widget_Definitions.STATE_CELL_QUEEN) {						
				Widget_Definitions.boardState[xAux][yAux] = state;
				ScreenBoard_ui.updateCell(xAux,yAux);
			}
		}
		xAux = x;
		yAux = y;
		while (xAux < 7 && yAux < 7) {
			xAux = xAux + 1;
			yAux = yAux + 1;
			if (Widget_Definitions.boardState[xAux][yAux] != Widget_Definitions.STATE_CELL_QUEEN) {						
				Widget_Definitions.boardState[xAux][yAux] = state;
				ScreenBoard_ui.updateCell(xAux,yAux);
				
			}
		}
		
	}
	
};