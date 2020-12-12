import React from 'react';
import ReactDOM from 'react-dom';
import CalculateWinner from './CalculateWinner.js';

function Square(props) {
    console.log(props)
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
        console.log(this.state.squares)
    } 

    reset() {
        this.setState({
            squares: this.state.squares.map(x => null),
            xIsNext: true
        })        
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if(squares[i] || CalculateWinner(squares))
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
        <Square 
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
        );
    }

    render() {
        const winner = CalculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext? 'X' : 'O'}`;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <button onClick={() => this.reset()}>Reset</button>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
