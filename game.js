import Serpent from "./serpent.js";
import Pomme from "./pomme.js";
import Dessiner from "./dessiner.js";

export default class Game {
		
		constructor(canvasWidth = 900,canvasHeight = 600, blockSize = 30){
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
			this.blockSize = blockSize;
			this.canvas = document.createElement('canvas'); //cree un nouvel element de type canvas, dans le doc d'hmtl
			this.ctx = this.canvas.getContext('2d');//creation context
			this.delay = 100;
			this.serpentin;
			this.pommette;
			this.widthInBlocks = this.canvasWidth/this.blockSize;
			this.heightInBlocks = this.canvasHeight/this.blockSize;
			this.score;
			this.timeOut;
			this.centreX = this.canvasWidth / 2;
			this.centreY = this.canvasHeight / 2;
			//const à placer si pas de réassignation, par défaut on met const
		}
		init(){
		
			this.canvas.width = this.canvasWidth;
			this.canvas.height = this.canvasHeight;
			this.canvas.style.border = "30px solid gray";
			this.canvas.style.margin = "50px auto";
			/*pour centrer element et que marges marchent
			il faut un type display*/
			this.canvas.style.display = "block";
			/*en CSS3 on fait background-color mais
			ej JS on met une MAJ à la place du tiret*/
			this.canvas.style.backgroundColor = "#ddd";
			document.body.appendChild(this.canvas); //ajoute un noeud au canvas
			this.launch();
		}
	
		launch() {
			this.serpentin = new Serpent([[6,4],[5,4],[4,4]],"right");
			this.pommette = new Pomme();
			this.score = 0;
			//clear timeOut est une méthode de l'objet global
			clearTimeout(this.timeOut);
			this.delay = 100;
			this.refreshCanvas();
		}
	
		refreshCanvas()  {
			this.serpentin.advance();/*Par defaut direction vers droite, si evenement au clavier
			avant appel de la méthode advance et que c'est une touche de changement de direction autorisée, 
			c'est la fonction setDirection qui modifiera la direction, la methode advance prendra
			en compte nouvelle coordonnees de direction...*/
			if(this.serpentin.checkCollision(this.widthInBlocks,this.heightInBlocks))
			{
				Dessiner.gameOver(this.ctx,this.centreX,this.centreY);
			}
			else
			{
				if(this.serpentin.isEatingApple(this.pommette))
				{
					this.score++;
					this.serpentin.ateApple = true;
					do
					{
						this.pommette.setNewPosition(this.widthInBlocks,this.heightInBlocks);
					}while(this.pommette.isOnSnake(this.serpentin));
					
					if(this.score % 5 == 0){
						this.speedUp();
					}
				}
				this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);//efface données rect, met à 0, 0, L,l initiale
				Dessiner.afficheScore(this.ctx,this.centreX,this.centreY,this.score);
				Dessiner.dessinerSerpent(this.ctx,this.serpentin,this.blockSize);
				Dessiner.dessinerPomme(this.ctx,this.pommette,this.blockSize);
				/*ctx.fillStyle = "#ff0000"; //rempli avec une couleur
				ctx.fillRect(xcoord,ycoord,100,50); //place une forme: absicisse,ordonéee,L,l*/
				
				/*this.timeOut = setTimeout(this.refreshCanvas,this.delay);
				setTimeout est une méthode de l'objet global, lors d'un appel, même dans une classe
				ou fonction, elle prend l'objet global, ça sera donc l'objet global, et pas notre objet en cours
				de la classe Game, ça ne marchera pas, pour y remédier on fait une copie du this de l'instance
				de Game, dans le paramètre, afin que ça soit cette objet spécifique sur qui se passe l'action 
				et pas un objet global.				
				*/
				this.timeOut = setTimeout(this.refreshCanvas.bind(this),this.delay);//fonction pour executer une certaine fonction quand un délai est passé
			}
		
		}
	
		speedUp() {
			this.delay /= 2;
		}
	
	}	
