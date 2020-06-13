const tttTools = {

    xPlayer: "X",
    oPlayer: "O",

    calculateWinner: (squares) => {
        const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return [squares[a], lines[i]];
            }
        }
    
        return [null, [-1, -1, -1]];
    },

    cvt2Grid: (index) => {

        const gridMap = [
          {row: 1, col: 1},
          {row: 1, col: 2},
          {row: 1, col: 3},
          {row: 2, col: 1},
          {row: 2, col: 2},
          {row: 2, col: 3},
          {row: 3, col: 1},
          {row: 3, col: 2},
          {row: 3, col: 3},
        ]
        return `R: ${gridMap[index].row} C: ${gridMap[index].col}`
    },

    //
    // Turn = 0 X   Go(0)   (upper left corner).
    // Turn = 1 O   If Board[4] is blank, Go(4), else Go(0).
    // Turn = 2 X   If Board[8] is blank, Go(8), else Go(2).
    // Turn = 3 O  If Posswin(X) is not 0, then Go(Posswin(X)) i.e. [ block opponent’s win], else Go(Make2).
    // Turn = 4 X  if Posswin(X) is not 0 then Go(Posswin(X)) [i.e. win], else if Posswin(O) is not 0, then Go(Posswin(O)) [i.e. block win], else if Board[6] is blank, then Go(6), else Go(2). [to explore other possibility if there be any ].
    // Turn = 5 O  If Posswin(O) is not 0 then Go(Posswin(O)), else if Posswin(X) is not 0, then Go(Posswin(X)), else Go(Make2).
    // Turn = 6 X  If Posswin(X) is not 0 then Go(Posswin(X)), else if Posswin(X) is not 0, then Go(Posswin(O)) else go anywhere that is blank.
    // Turn = 7 O  if Posswin(O) is not 0 then Go(Posswin(O)), else if Posswin(X) is not 0, then Go(Posswin(X)), else go anywhere that is blank.
    // Turn = 8 X  Same as Turn=6.
    //
    // Make2: returns 4 if the center square of the board is null. Otherwise, this function returns any non-corner square (1, 3, 5 or 7).
    //

    suggestMove: (board, player, stepNumber) => {

        let chkWin = [];

        console.log("suggestMove: board:");
        console.log(board);
        console.log("Player: " + player);
        console.log("stepNumber: " + stepNumber);

        if (player === "X" && stepNumber === 0) {
            return (tttTools.cvt2Grid(0));
        } 
        else if (player === "O" && stepNumber === 1) {
            if (board[4] === null)
                return (tttTools.cvt2Grid(4));
            else return tttTools.cvt2Grid(0);
        } 
        else if (player === "X" && stepNumber === 2) {
            if (board[8] === null)
                return (tttTools.cvt2Grid(8));
            else return tttTools.cvt2Grid(2);
        }
        else if (player ===  "O" && stepNumber === 3) {

            chkWin = tttTools.possibleWin(board, player);

            if (chkWin[0] < 0) {
                if (board[4] === null)
                    return (tttTools.cvt2Grid(4));
                else if (board[1] === null) 
                    return tttTools.cvt2Grid(1);
                else if (board[3] === null) 
                    return tttTools.cvt2Grid(3);
                else if (board[5] === null) 
                    return tttTools.cvt2Grid(5);
                else if (board[7] === null) 
                    return tttTools.cvt2Grid(7);
            }
            else return (tttTools.cvt2Grid(chkWin[0]));
        }
        else if (player === "X" && stepNumber === 4) {

            chkWin = tttTools.possibleWin(board, player);

            console.log(chkWin);

            if (chkWin[0] < 0) {
                if (board[6] === null)
                    return (tttTools.cvt2Grid(6));
                else if (board[2] === null) 
                    return tttTools.cvt2Grid(2);
            }
            else return (tttTools.cvt2Grid(chkWin[0]));
        }
        else if (player === "O" && stepNumber === 5) {

            chkWin = tttTools.possibleWin(board, player);

            if (chkWin[0] < 0) {
                if (board[4] === null)
                    return (tttTools.cvt2Grid(4));
                else if (board[1] === null) 
                    return tttTools.cvt2Grid(1);
                else if (board[3] === null) 
                    return tttTools.cvt2Grid(3);
                else if (board[5] === null) 
                    return tttTools.cvt2Grid(5);
                else if (board[7] === null) 
                    return tttTools.cvt2Grid(7);
            }
            else return (tttTools.cvt2Grid(chkWin[0]));
        }
        else if (player === "X" && stepNumber === 6) {

            chkWin = tttTools.possibleWin(board, player);

            if (chkWin[0] < 0) return (tttTools.cvt2Grid(board.findIndex((element) => element === null)));
            else return (tttTools.cvt2Grid(chkWin[0]));
        }
        else if (player === "O" && stepNumber === 7) {

            chkWin = tttTools.possibleWin(board, player);

            if (chkWin[0] < 0) return (tttTools.cvt2Grid(board.findIndex((element) => element === null)));
            else return (tttTools.cvt2Grid(chkWin[0]));
        }
        else if (player === "X" && stepNumber === 8) {
            
            chkWin = tttTools.possibleWin(board, player);
            
            if (chkWin[0] < 0) return (tttTools.cvt2Grid(board.findIndex((element) => element === null)));
            else return (tttTools.cvt2Grid(chkWin[0]));
        }
        else if (stepNumber === 9) return "Game is Over";
        else return "No Suggestion";
    },

    possibleWin: (board, player) => {

        const chkBoard = board.map( element => {
                if (element === "X") return 3;
                else if (element === "O") return 5;
                else return 2
            });
        let chk3 = [];
        const noWin = [-1, null];
        let win = noWin.slice();
        let calcWin;

        //
        // Check Rows
        //
    
        for (let i = 0; i < chkBoard.length; i = i+3) {

            calcWin = chkBoard[i] * chkBoard[i+1] * chkBoard[i+2];

            if (calcWin === 18) win[1] = "X";
            else if (calcWin === 50) win[1] = "O";

            if (win[1] !== null) {

                if (chkBoard[i] === 2) win[0] = i;
                else if (chkBoard[i+1] === 2) win[0] = i + 1;
                else win[0] = i + 2;

                return win;
            }
        }

        //
        // Check Columns
        //
    
        for (let i = 0; i < 3; i++) {

            calcWin = chkBoard[i] * chkBoard[i+3] * chkBoard[i+6];

            if (calcWin === 18) win[1] = "X";
            else if (calcWin === 50) win[1] = "O";

            if (win[1] !== null) {

                if (chkBoard[i] === 2) win[0] = i;
                else if (chkBoard[i+3] === 2) win[0] = i + 3;
                else win[0] = i + 6;

                return win;
            }
        }

        //
        // Check Diagonal Left to Right
        //

        calcWin = chkBoard[0] * chkBoard[4] * chkBoard[8];
        if (calcWin === 18) win[1] = "X";
        else if (calcWin === 50) win[1] = "O";

        if (win[1] !== null) {

            if (chkBoard[0] === 2) win[0] = 0;
            else if (chkBoard[4] === 2) win[0] = 4;
            else win[0] = 8;

            return win;
        }

        //
        // Check Diagonal Right to Left
        //

        calcWin = chkBoard[2] * chkBoard[4] * chkBoard[6];
        if (calcWin === 18) win[1] = "X";
        else if (calcWin === 50) win[1] = "O";

        if (win[1] !== null) {

            if (chkBoard[2] === 2) win[0] = 2;
            else if (chkBoard[4] === 2) win[0] = 4;
            else win[0] = 6;

            return win;
        }

        //
        // Return [positionToWin, playerToWin]. If no win [-1, null]
        //

        return win;
    }
}

export default tttTools;