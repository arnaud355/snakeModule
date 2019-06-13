export default class Serpent{
		
		constructor(body, direction){
			this.body = body;
			this.direction = direction;
			this.ateApple = false;
		}
		
		advance(){
			const nextPosition = this.body[0].slice();
			//le slice() fait une copie de la tête
			/*pourquoi const devant nextPosition et pas let ?
			c'est un tableau (se comporte comme les objets),
			on lui dit pointe sur l'adresse et change la
            valeur existante qui s'y trouve,
			je ne réassigne pas une nouvelle valeur */
			switch(this.direction)
			{
				case "left":
					nextPosition[0] -= 1;
					break;
				case "right":
					nextPosition[0] += 1;
					break;
				case "down":
					nextPosition[1] += 1;
					break;
				case "up":
					nextPosition[1] -= 1;
					break;
				default:
					throw("Invalid direction");
			}
			this.body.unshift(nextPosition);
			/*unshift ajoute un nouvel element en premier
			par ex: 7,4 après 6,4*/
			if(!this.ateApple)
				this.body.pop();//supprime dernier element
			else
				this.ateApple = false;
		}
		setDirection(newDirection){
			let allowedDirections;
			switch(this.direction)
			{
				case "left":
				case "right":
					allowedDirections = ["up","down"];
					break;
				case "up":
				case "down":
					allowedDirections = ["left","right"];
					break;
				default:
					throw("Invalid direction");
			}
			/*if(allowedDirections.indexOf(newDirection) > -1)
			{
				this.direction = newDirection;
			}*/
			//Avec ES7 on peut utiliser le includes à la place de indexof
			if(allowedDirections.includes(newDirection))
			{
				this.direction = newDirection;
			}
		}
		checkCollision(widthInBlocks,heightInBlocks){
			let wallCollision =  false;
			let snakeCollision =  false;
			const head = this.body[0];//tete du serpent
			const rest = this.body.slice(1);/*avec 1  
			en argument: signifie copie tout sauf à l'index 0
			donc copie le corps du serpent sauf la tête*/
			const snakeX =  head[0];
			const snakeY =  head[1];
			const minX = 0;
			const minY = 0;
			const maxX = widthInBlocks - 1;
			const maxY = heightInBlocks - 1;
			const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
			const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
			
			if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
			{
				wallCollision = true;
			}
			for(let i = 0;i < rest.length; i++)
			{
				if(snakeX === rest[i][0] && snakeY === rest[i][1])
				{
					snakeCollision = true;
				}
			}
			return wallCollision || snakeCollision;
		}
		isEatingApple(appleToEat){
			const head = this.body[0];
			if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1] )
				return true;
			else
				return false;
			
		}
	}
