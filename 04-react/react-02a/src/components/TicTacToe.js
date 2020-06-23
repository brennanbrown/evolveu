import React from 'react';
import tttTools from './tttTools.js'
import './TicTacToe.css';

function Square(props) {

  // const squareColor = "green";

    return (
        <button className="square" onClick={props.onClick} style={{color: `${props.squareColor}`}}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
        
      return (
        <Square 
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          squareColor={this.props.winnerButtons.includes(i)?"green":"black"}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div>1 . 2 . 3</div>
          <div className="board-row">
           .1
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            .2
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            .3
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          player: null,
          squarePicked: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      // call .slice() to create a copy of the squares array
      const squares = current.squares.slice();
      if (tttTools.calculateWinner(squares)[0] || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          player: squares[i],
          squarePicked: i
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {

      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = tttTools.calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + ": " + history[move].player + " chose " + tttTools.cvt2Grid(history[move].squarePicked):
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });      
      
      let status;

      if (winner[0]) {
        status = 'Winner: ' + winner[0];
      } else if (this.state.stepNumber === 9) {
        status = "Tie: Result is a Draw";
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winnerButtons={winner[1]}
            />
          </div>
          <div className="game-info">
            <div>Suggest Move: {tttTools.suggestMove(current.squares, (this.state.xIsNext ? 'X' : 'O'),this.state.stepNumber)}</div>
            <div>{status}</div>
              <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
function TicTacToe(props) {

    return (
        <div>
            <div className="AppTicTacToe">
                <p>
                    {props.sMessageArea}
                </p>
                <Game />
            </div>
        </div>
    );
}

export default TicTacToe;
