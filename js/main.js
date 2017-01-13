function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function SeaBattle (fieldSize) {
	var self = this;
	fieldSize = fieldSize ? fieldSize : 10;
	var field = [];

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

	this.shoot = function (id) {
		var coordinate = id.split ('_');
		var x = coordinate[0], y = coordinate[1];
		if(!validate(x,y)) return;
		field[x][y].chip ='f';
		//alert(id);
	}
	function validate (x, y) {
		return x >= 0 && x < fieldSize && y >= 0 && y < fieldSize ? true : false;
	}
	this.showTable = function(fieldId) {
		var p1 = document.getElementById(fieldId);
		for (i = 0; i < fieldSize; i++)
			for (j = 0; j < fieldSize; j++) {
				var div1 = document.createElement('div');
				div1.id = i + '_' + j;
				div1.className = field[i][j].chip;
				p1.appendChild(div1);
				}
		p1.style.height = p1.style.width = fieldSize*32+'px';
		p1.onclick = function () {
			self.shoot(event.target.id);
			event.target.className = 'f';
		};
	}

	this.autoShips = function() {
		var x, y;
		var shipCoordinates =[];
		var borderCoordinates =[];
		var doneFlag = true;
		var border =[];
		//1 4х палубный
		do {
			var vector = [1, 2];
			do {
				x = rand(0, fieldSize);
				y = rand(0, fieldSize);
			}
			while (field[x][y].chip !== 'w');
			do {
				shipCoordinates[0] ={x: x,y: y};
				var moveTo = rand(0 , vector.length-1);
				switch (vector[moveTo]) {
					case 1: {//проверка поставить вверх
						doneFlag = true;
						for (var iShip = 1; iShip < 4; iShip++) {
							if (validate(x - iShip, y) && field[x - iShip][y].chip == 'w') {
								shipCoordinates[iShip] = {
									x: x- iShip,
									y: y
								};
							} else {
								doneFlag = false;
								shipCoordinates = [];
								break;
							}
						}
						if (doneFlag) { //проверяем и отмечаем границы
							 border = [{x: x+1, y: y-1 }, {x: x, y: y-1}, {x: x-1, y: y-1}, {x: x-2, y: y-1}, {x: x-3, y: y-1}, 
							 			{x: x-4, y: y-1}, {x: x-4, y: y}, {x: x-4, y: y+1}, {x: x-3, y: y+1}, {x: x-2, y: y+1}, 
							 			{x: x-1, y: y+1}, {x: x, y: y+1}, {x: x+1, y: y+1}, {x: x+1, y: y}];
							borderCoordinates = checkBorders(border);
							doneFlag = !!borderCoordinates;
						}
						break;
					}
					case 2: {//проверка поставить вправо
						doneFlag = true;
						for (var iShip = 1; iShip < 4; iShip++) {
							if (validate(x, y + iShip) && field[x][y + iShip].chip == 'w') {
								shipCoordinates[iShip] = {
									x: x,
									y: y + iShip
								};
							} else {
								doneFlag = false;
								shipCoordinates = [];
								break;
							}
						}
						if (doneFlag) { //проверяем и отмечаем границы
							 border = [{x: x, y: y-1 }, {x: x-1, y: y-1}, {x: x-1, y: y}, {x: x-1, y: y+1}, {x: x-1, y: y+2}, 
							 			{x: x-1, y: y+3}, {x: x-1, y: y+4}, {x: x, y: y+4}, {x: x+1, y: y+4}, {x: x+1, y: y+3}, 
							 			{x: x+1, y: y+2}, {x: x+1, y: y+1}, {x: x+1, y: y}, {x: x+1, y: y-1}];
							borderCoordinates = checkBorders(border);
							doneFlag = !!borderCoordinates;
						}
					break;
					}
				}
				vector.splice (moveTo,1);
			}
			while (!doneFlag && vector.length > 0)

		}
		while ( !doneFlag);
		FillFieldByCoordinates ('s',shipCoordinates);
		FillFieldByCoordinates( 'b', borderCoordinates);
		//------------------------------------------------
		//2 3х палубных
		for (var count = 0; count < 2; count++) {
			do {
			var vector = [1, 2];
			do {
				x = rand(0, fieldSize);
				y = rand(0, fieldSize);
			}
			while (field[x][y].chip !== 'w');
			do {
				shipCoordinates[0] ={x: x,y: y};
				var moveTo = rand(0 , vector.length-1);
				switch (vector[moveTo]) {
					case 1: {//проверка поставить вверх
						doneFlag = true;
						for (var iShip = 1; iShip < 3; iShip++) {
							if (validate(x - iShip, y) && field[x - iShip][y].chip == 'w') {
								shipCoordinates[iShip] = {
									x: x- iShip,
									y: y
								};
							} else {
								doneFlag = false;
								shipCoordinates = [];
								break;
							}
						}
						if (doneFlag) { //проверяем и отмечаем границы
							 border = [{x: x+1, y: y-1 }, {x: x, y: y-1}, {x: x-1, y: y-1}, {x: x-2, y: y-1}, {x: x-3, y: y-1}, 
							 			{x: x-3, y: y}, {x: x-3, y: y+1}, {x: x-2, y: y+1},	{x: x-1, y: y+1}, {x: x, y: y+1}, {x: x+1, y: y+1}, {x: x+1, y: y}];
							borderCoordinates = checkBorders(border);
							doneFlag = !!borderCoordinates;
						}
						break;
					}
					case 2: {//проверка поставить вправо
						doneFlag = true;
						for (var iShip = 1; iShip < 3; iShip++) {
							if (validate(x, y + iShip) && field[x][y + iShip].chip == 'w') {
								shipCoordinates[iShip] = {
									x: x,
									y: y + iShip
								};
							} else {
								doneFlag = false;
								shipCoordinates = [];
								break;
							}
						}
						if (doneFlag) { //проверяем и отмечаем границы
							 border = [{x: x, y: y-1 }, {x: x-1, y: y-1}, {x: x-1, y: y}, {x: x-1, y: y+1}, {x: x-1, y: y+2},
							 			{x: x-1, y: y+3}, {x: x, y: y+3}, {x: x+1, y: y+3},
							 			{x: x+1, y: y+2}, {x: x+1, y: y+1}, {x: x+1, y: y}, {x: x+1, y: y-1}];
							borderCoordinates = checkBorders(border);
							doneFlag = !!borderCoordinates;
						}
					break;
					}
				}
				vector.splice (moveTo,1);
			}
			while (!doneFlag && vector.length > 0)

		}
		while ( !doneFlag);
		FillFieldByCoordinates ('s',shipCoordinates);
		FillFieldByCoordinates( 'b', borderCoordinates);
		}
		//3 2х палубных
		for (var count = 0; count < 3; count++) {
			do {
			var vector = [1, 2];
			do {
				x = rand(0, fieldSize);
				y = rand(0, fieldSize);
			}
			while (field[x][y].chip !== 'w');
			do {
				shipCoordinates[0] ={x: x,y: y};
				var moveTo = rand(0 , vector.length-1);
				switch (vector[moveTo]) {
					case 1: {//проверка поставить вверх
						doneFlag = true;
						for (var iShip = 1; iShip < 2; iShip++) {
							if (validate(x - iShip, y) && field[x - iShip][y].chip == 'w') {
								shipCoordinates[iShip] = {
									x: x- iShip,
									y: y
								};
							} else {
								doneFlag = false;
								shipCoordinates = [];
								break;
							}
						}
						if (doneFlag) { //проверяем и отмечаем границы
							 border = [{x: x+1, y: y-1 }, {x: x, y: y-1}, {x: x-1, y: y-1}, {x: x-2, y: y-1},
							 			{x: x-2, y: y}, {x: x-2, y: y+1},	{x: x-1, y: y+1}, {x: x, y: y+1}, {x: x+1, y: y+1}, {x: x+1, y: y}];
							borderCoordinates = checkBorders(border);
							doneFlag = !!borderCoordinates;
						}
						break;
					}
					case 2: {//проверка поставить вправо
						doneFlag = true;
						for (var iShip = 1; iShip < 2; iShip++) {
							if (validate(x, y + iShip) && field[x][y + iShip].chip == 'w') {
								shipCoordinates[iShip] = {
									x: x,
									y: y + iShip
								};
							} else {
								doneFlag = false;
								shipCoordinates = [];
								break;
							}
						}
						if (doneFlag) { //проверяем и отмечаем границы
							 border = [{x: x, y: y-1 }, {x: x-1, y: y-1}, {x: x-1, y: y}, {x: x-1, y: y+1}, {x: x-1, y: y+2},
							 			{x: x, y: y+2},	{x: x+1, y: y+2}, {x: x+1, y: y+1}, {x: x+1, y: y}, {x: x+1, y: y-1}];
							borderCoordinates = checkBorders(border);
							doneFlag = !!borderCoordinates;
						}
					break;
					}
				}
				vector.splice (moveTo,1);
			}
			while (!doneFlag && vector.length > 0)

		}
		while ( !doneFlag);
		FillFieldByCoordinates ('s',shipCoordinates);
		FillFieldByCoordinates( 'b', borderCoordinates);
		}
		//4 однопалубных
		for (var iShip = 0; iShip < 4; iShip++) {
		do{
			do {
				x = rand(0, fieldSize);
				y = rand(0, fieldSize);
			}
			while (field[x][y].chip !== 'w');
			border = [{
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

			borderCoordinates = checkBorders (border);
		} while (borderCoordinates.length == 0);
		field[x][y].chip = 's';
		FillFieldByCoordinates( 'b', borderCoordinates);
		//-------------------------------------------------
	}
	function checkBorders (border) {
		var borderCoordinates =[];
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
			return borderCoordinates;
	}
	}
	function FillFieldByCoordinates(chip,coordinates) {
		for (var i = 0; i < coordinates.length; i++) {
			field[+coordinates[i].x][+coordinates[i].y].chip = chip;
		}
	}
}
var seaBattleUser = new SeaBattle(10);
var seaBattleComp = new SeaBattle(10);
seaBattleComp.autoShips();
seaBattleUser.autoShips();
//seaFight.shoot(5, 3);
//seaFight.shoot(7, 5);
//seaFight.shoot(1, 4);
//window.onload = 
seaBattleUser.showTable('battle-field-1');
//window.onload = 
seaBattleComp.showTable('battle-field-2');
// document.getElementById('battle-field-2').onclick = function () {
// 	console.log(this);
// };
// for (var i = 0; i < document.getElementById('battle-field-2').childNodes.length; i++) {
// 	 	document.getElementById('battle-field-2').childNodes[i].onclick = function () {seaBattleComp.shoot(this.id); this.className = 'f';};
//     }