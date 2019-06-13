import React from 'react';
import './board.scss';

const boardSize = 720
const cellSize = boardSize / 30;

class Board extends React.Component {

    // constructor here
    constructor(props) {
        super(props);
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
        });
    };

    componentDidMount() {
        this.drawBoard();
    }

    render () {
        return (
            <div id = 'gameContainer' className = 'container-fluid'>
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize}/>
            </div>
        )
    }

}

export default Board;