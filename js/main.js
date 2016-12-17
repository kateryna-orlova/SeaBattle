function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function SeaFight (fieldSize) {
	fieldSize = fieldSize ? fieldSize : 10;
	var field = [];
	// function creatEmptyField () {
		for (var i = 0; i < fieldSize; i++) {
			field[i] = [];
			for (var j = 0; j < fieldSize; j++) {
				field[i][j] = {
					chip: 'w',
					opened: false,
					msg: ""
				};
			}
		}
	//}
	//creatEmptyField();
	this.shoot = function (x, y) {
		if (!validate(x, y)) return;
		field[x][y].chip = true;
	}
	function validate (x, y) {
		return x >= 0 && x < fieldSize && y >= 0 && y < fieldSize ? true : false;
	}
	this.showTable = function() {
		// var show = [];
		// for (var i = 0; i < fieldSize; i++) {
		// 	show[i] = [];
		// 	for (var j = 0; j < fieldSize; j++) {
		// 		if (field[i][j].ship) {
		// 			show[i][j] = "0";
		// 		} else {
		// 			show[i][j] = "";
		// 		}
		// 		if (field[i][j].opened) {
		// 			show[i][j] = "*****";
		// 		}
		// 	}
		// }
		// console.table(show);
		var p1 = document.getElementById('battle-field-1');
		for (i = 0; i < fieldSize; i++)
			for (j = 0; j < fieldSize; j++) {
				var div1 = document.createElement('div');
				div1.id = i + '_' + j;
				div1.className = field[i][j].chip;
				// if (p1map[i][j] == 's') {
				// 	div1.className = 's';
				// } else {
				// 	div1.className = 'w';
				// }
				p1.appendChild(div1);
			}
	}

	this.autoShips = function() {
		var x, y;
		//1 4х палубный
		var shipCoordinates =[];
		do {
			var vector = [1, 2, 3, 4];
			do {
				x = rand(0, fieldSize);
				y = rand(0, fieldSize);
			}
			while (field[x][y].chip !== 'w');
			shipCoordinates[0] ={x: x,y: y};
			var moveTo = rand(0 , vector.length-1);
			switch (vector[moveTo]) {
				case 1: {
					break;
				}
				case 2:
				{
					//проверка поставить вправо
					for (var iShip = 1; iShip < 4; iShip++) {
						if (validate(x, y - iShip) && field[x][y - iShip].chip == 'w') {
							shipCoordinates[iShip] = {
								x: x,
								y: y - iShip
							};
						} else {
							shipCoordinates = [];
							break;
						}
					}
				break;
				}
				case 3: {
					break;
				}
				case 4: {
					break;
				}
			}
			vector.splice (moveTo,1);

		}
		while (shipCoordinates.length == 0);
		FillFieldByCoordinates ('s',shipCoordinates);
		//------------------------------------------------
		//4 однопалубных
		var borderCoordinates =[];
		for (var iShip = 0; iShip < 4; iShip++) {
		do{
			do {
				x = rand(0, fieldSize);
				y = rand(0, fieldSize);
			}
			while (field[x][y].chip !== 'w');
			var border = [{
				x: x,
				y: y - 1
			}, {
				x: x + 1,
				y: y - 1
			}, {
				x: x + 1,
				y: y
			}, {
				x: x + 1,
				y: y + 1
			}, {
				x: x,
				y: y + 1
			}, {
				x: x - 1,
				y: y + 1
			}, {
				x: x - 1,
				y: y
			}, {
				x: x - 1,
				y: y - 1
			}];
			for (var i = 0; i < border.length; i++) {
				var bx = +border[i].x;
				var by = +border[i].y;
				if (validate(bx, by))
					if (field[bx][by].chip == 'w' || field[bx][by].chip == 'b') {
						borderCoordinates.push({x: bx, y: by});
					} else {
						borderCoordinates = [];
						break;
					}
			}
		} while (borderCoordinates.length == 0);
		field[x][y].chip = 's';
		FillFieldByCoordinates( 'b', borderCoordinates);
		//-------------------------------------------------
	}
	}
	function FillFieldByCoordinates(chip,coordinates) {
		for (var i = 0; i < coordinates.length; i++) {
			field[+coordinates[i].x][+coordinates[i].y].chip = chip;
		}
	}
}
var seaFight = new SeaFight(10);

//10 случайных одинарных кораблей
seaFight.autoShips();
//seaFight.shoot(5, 3);
//seaFight.shoot(7, 5);
//seaFight.shoot(1, 4);
window.onload = seaFight.showTable();