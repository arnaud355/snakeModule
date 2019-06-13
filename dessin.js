	
export default class Dessiner {
		
		static gameOver(ctx,centreX,centreY) {
			ctx.save();
			ctx.font = "bold 70px sans-serif";
			ctx.fillStyle = "#000";
			ctx.textAlign = "center";
			ctx.textbaseline = "middle"; //affichage par rapport au milieu
			ctx.strokeStyle = "white";
			ctx.lineWidth = 5;
			ctx.strokeText("Game Over",centreX,centreY - 180);
			ctx.fillText("Game Over",centreX,centreY - 180);
			ctx.font = "bold 30px sans-serif";
			ctx.strokeText("Apuyer sur la touche Espace pour rejouer",centreX,centreY - 120);
			ctx.fillText("Apuyer sur la touche Espace pour rejouer",centreX,centreY - 120);
			ctx.restore();
		}
		static afficheScore(ctx,centreX,centreY,score) {
			ctx.save();
			ctx.font = "bold 200px sans-serif";
			ctx.fillStyle = "gray";
			ctx.textAlign = "center";
			ctx.textbaseline = "middle"; //affichage par rapport au milieu
			ctx.fillText(score.toString(),centreX,centreY);
			ctx.restore();
		}
		static drawBlock (ctx,position,blockSize) {
			const x = position[0] * blockSize;
			const y = position[1] * blockSize;
			ctx.fillRect(x,y,blockSize,blockSize);
		}
		static dessinerSerpent(ctx,serpent,blockSize){
			ctx.save();//sauvegarde config actuelle
			ctx.fillStyle = "#00a600";
			for(let block of serpent.body)
			{
				/*Dessiner.drawBlock(ctx,serpent.body[i]); alternatif: comme on appel une methode 
				de la même classe, on peut le faire sur l'objet en cours, au lieu d'appeler classe */
				this.drawBlock(ctx,block,blockSize);
			}
			ctx.restore();//restaure config au moment sauvegarde
		}
		static dessinerPomme(ctx,pomme,blockSize){
			const radius = blockSize/2;
			const x = pomme.position[0]*blockSize + radius;
			const y = pomme.position[1]*blockSize + radius;
			ctx.save();
			ctx.fillStyle = "#ff0000";
			ctx.beginPath();//premier chemin
			/*Pour appeler la méthode pour dessiner cercle
			elle auras besoin du point au centre et non en haut
            à gauche, elle aura besoin en plus de x et y,
            du rayon, soit le blockSize/2 et de pi*/
			ctx.arc(x,y,radius,0,Math.PI*2,true);
			ctx.fill();
			ctx.restore();
		}
		
	}
