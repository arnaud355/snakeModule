//window.onload = function()
//la fonction arrow est un raccourci de function(arg)...return x: = (arg) => {}, ou return quelques chose

import Game from "./game.js";

window.onload = () => { //au chargement de la fenetre
	
	
	let myGame = new Game();
	/*myGame est un objet de la classe Game, cela rend le code plus simple, plus lisible
	on travaille ensuite sur cette objet en cours pour appeler méthodes ou les objets des autres classes
	comme serpent et pomme seront des objets de l'objet Game*/
	myGame.init();	
	
	//Créeons, 2 jeu de la classe Game, il y aura 2 ecrans
	/*let myGame2 = new Game(500,400,10);
	let myGame3 = new Game(100,80,5);
	//let myGameIdent = Object.assign(myGame3,myGame2);
	myGame2.init();
	myGame3.init();*/
	
	//document.onkeydown = function handlekeyDown(e)
	document.onkeydown = (e) => {
		const key = e.keyCode;
		let newDirection;
		switch(key)
		{
			case 37:
				newDirection = "left";
				break;
			case 38:
				newDirection = "up";
				break;
			case 39:
				newDirection = "right";
				break;
			case 40:
				newDirection = "down";
				break;
			case 32 :
				myGame.launch();
				//myGame2.launch();
				//myGame3.launch();
				return
			default:
				return;
		}
		myGame.serpentin.setDirection(newDirection);
		//myGame2.serpentin.setDirection(newDirection);
		//myGame3.serpentin.setDirection(newDirection);
	};
	
}
