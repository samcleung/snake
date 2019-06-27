import React from 'react';
import './board.scss';
import Snake from './snake';

const boardSize = 720;
const cellSize = boardSize / 30;

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            snake: {
              head: {
                x: 15,
                y: 15
              },
              tail: {
                x: 15,
                y: 15
              },
              direction: '',
              body: [{ x:15, y:15 }],
              running: false,
              alive: true,
              speed: 1
            }
        }
    };

    drawGrid () {
        const{ctx} = this.state;
        ctx.strokeStyle = '#FFFFFF';
        ctx.fillRect(0, 0, boardSize, boardSize);
        for (var vertical = cellSize; vertical < boardSize; vertical += cellSize){
            ctx.beginPath();
            ctx.moveTo(vertical, 0);
            ctx.lineTo(vertical, boardSize);
            ctx.stroke();
        };

        for (var horizontal = cellSize; horizontal < boardSize; horizontal += cellSize){
            ctx.beginPath();
            ctx.moveTo(0, horizontal);
            ctx.lineTo(boardSize ,horizontal);
            ctx.stroke();
        };
    };

    drawBoard () {
        const canvas = this.refs.gameBoard;
        this.setState ({
            canvas: canvas,
            ctx: canvas.getContext('2d')
        }, function () {
            this.drawGrid();
            this.drawSnake();
        });
    };

    drawSnake () {
        const { ctx, snake } = this.state;
        // Change colour of canvas
        ctx.fillStyle = 'green';
        // Loop through the array of the snake body and draw a green box
        snake.body.forEach (cord => {
            //ctx.fillRect (cord.x * cellSize, cord.y * cellSize, 1 * cellSize, 1 * cellSize);
            this.canvasMoveSnake();
        });
    };

    // Managing state and canvas
    changeDirection (direction) {
        let newState = Object.assign ({}, this.state);
        newState.snake.direction = direction;
        this.setState(newState);
        this.canvasMoveSnake();
    };

    canvasMoveSnake () {
        const { ctx, snake } = this.state;
        // Make the snake's previous position black so it looks like it disappears
        ctx.fillStyle = 'black';
        this.drawRect(snake.tail.x,snake.tail.y,1,1);
        ctx.fillStyle = 'green';
        this.drawRect(snake.head.x,snake.head.y,1,1);
        snake.tail.x = snake.head.x;
        snake.tail.y = snake.head.y;
    }

    drawRect (x, y, l, h) {
        const {ctx} = this.state
        ctx.fillRect(x * cellSize, y * cellSize, l * cellSize, h * cellSize);
    }

    componentDidMount () {
        this.drawBoard();
    }

    render () {
        return (
            <div id = 'gameContainer' className = 'container-fluid'>
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize}/>
                <Snake snake = {this.state.snake}
                changeDirection = {this.changeDirection.bind(this)}/>
            </div>
        )
    }

}

export default Board;