export default class Pomme{
		
		constructor(position = [10,10]){
			this.position = position;
		}
		
		setNewPosition(widthInBlocks,heightInBlocks){
			const newX = Math.round(Math.random() * (widthInBlocks - 1));
			const newY = Math.round(Math.random() * (heightInBlocks - 1));
			this.position = [newX,newY];
		}
		isOnSnake(snakeToCheck){
			let isOnSnake = false;
			
			for(let i = 0; i < snakeToCheck.body.length; i++)
			{
				if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
					isOnSnake = true;
			}
			return isOnSnake;
		}
	}
