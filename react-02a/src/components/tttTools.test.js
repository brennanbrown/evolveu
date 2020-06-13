import tttTools from './tttTools.js'

let consoleLog = [];
let consoleLine = 0;

test('140b: Testing the TDD Pipes', () => {
    
    consoleLog = [];
    consoleLine = 0;
    consoleLog[consoleLine++] = "Testing the TDD pipes";
    expect(consoleLog[0]).toBe("Testing the TDD pipes");
    expect(consoleLog[0]).toBe("Testing the TDD pipes");
    
});

test('140b: Playing with Conditions', () => {
    
    expect("X").toBeTruthy();
    expect("O").toBeTruthy();
    expect(null).toBeFalsy();
    
});


test('140b: Testing Constants', () => {
    
    expect(tttTools.xPlayer).toBe("X");
    expect(tttTools.oPlayer).toBe("O");
    
});

test('140b: Testing calculateWinner', () => {

    let testBoard = Array(9).fill(null);
    expect(testBoard).toEqual([null, null, null, null, null, 
        null, null, null, null]);

    expect (tttTools.calculateWinner(testBoard)).toEqual([null, [-1, -1, -1]]);
    
    testBoard[0] = "X";
    testBoard[1] = "X";
    testBoard[2] = "X";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["X", [0, 1, 2]]);

    testBoard[0] = "O";
    testBoard[1] = "O";
    testBoard[2] = "O";    
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["O", [0, 1, 2]]);

    testBoard[0] = null;
    testBoard[1] = null;
    testBoard[2] = null; 
    testBoard[3] = "X";
    testBoard[4] = "X";
    testBoard[5] = "X";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["X", [3, 4, 5]]);

    testBoard[3] = null;
    testBoard[4] = null;
    testBoard[5] = null; 
    testBoard[6] = "O";
    testBoard[7] = "O";
    testBoard[8] = "O";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["O", [6, 7, 8]]);

    testBoard[7] = null;
    testBoard[8] = null; 
    testBoard[0] = "X";
    testBoard[3] = "X";
    testBoard[6] = "X";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["X", [0, 3, 6]]);
    
    testBoard[0] = null;
    testBoard[3] = null; 
    testBoard[6] = null;
    testBoard[1] = "O";
    testBoard[4] = "O";
    testBoard[7] = "O";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["O", [1, 4, 7]]);
        
    testBoard[1] = null;
    testBoard[4] = null; 
    testBoard[7] = null;
    testBoard[2] = "X";
    testBoard[5] = "X";
    testBoard[8] = "X";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["X", [2, 5, 8]]);
            
    testBoard[2] = null;
    testBoard[5] = null;
    testBoard[0] = "O";
    testBoard[4] = "O"; 
    testBoard[8] = "O";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["O", [0, 4, 8]]);
                
    testBoard[0] = null;
    testBoard[8] = null;
    testBoard[2] = "X";
    testBoard[4] = "X"; 
    testBoard[6] = "X";
    
    expect (tttTools.calculateWinner(testBoard)).toEqual(["X", [2, 4, 6]]);
});

test('140b: Testing cvt2Grid', () => {
    
    expect (tttTools.cvt2Grid(0)).toBe("R: 1 C: 1");
    expect (tttTools.cvt2Grid(1)).toBe("R: 1 C: 2");
    expect (tttTools.cvt2Grid(2)).toBe("R: 1 C: 3");
    expect (tttTools.cvt2Grid(3)).toBe("R: 2 C: 1");
    expect (tttTools.cvt2Grid(4)).toBe("R: 2 C: 2");
    expect (tttTools.cvt2Grid(5)).toBe("R: 2 C: 3");
    expect (tttTools.cvt2Grid(6)).toBe("R: 3 C: 1");
    expect (tttTools.cvt2Grid(7)).toBe("R: 3 C: 2");
    expect (tttTools.cvt2Grid(8)).toBe("R: 3 C: 3");
    
});


test('140b: Testing suggestMove', () => {

    let testBoard = Array(9).fill(null);
    expect(testBoard).toEqual([null, null, null, null, null, 
        null, null, null, null]);
        
    // Move #1
    expect (tttTools.suggestMove(testBoard, tttTools.oPlayer, 0)).toBe("No Suggestion");
    expect (tttTools.suggestMove(testBoard, tttTools.xPlayer, 0)).toBe("R: 1 C: 1");
    
    // Move #2

    testBoard[0] = "X";
    expect (tttTools.suggestMove(testBoard, tttTools.oPlayer, 1)).toBe("R: 2 C: 2");
    
    testBoard[0] = null;
    testBoard[4] = "X";
    expect (tttTools.suggestMove(testBoard, tttTools.oPlayer, 1)).toBe("R: 1 C: 1");
        
    testBoard[0] = "X";
    testBoard[4] = "O";
    expect (tttTools.suggestMove(testBoard, tttTools.xPlayer, 2)).toBe("R: 3 C: 3");
            
    testBoard[0] = null;
    testBoard[4] = "O";
    testBoard[8] = "X";
    expect (tttTools.suggestMove(testBoard, tttTools.xPlayer, 2)).toBe("R: 1 C: 3");

    testBoard[0] = "X";
    testBoard[4] = "O";
    testBoard[8] = "X";

    expect (tttTools.suggestMove(testBoard, tttTools.oPlayer, 3)).toBe("R: 1 C: 2");

    testBoard[4] = null;
    testBoard[8] = null;

    testBoard[0] = "X";
    testBoard[1] = "O";
    testBoard[7] = "X";

    expect (tttTools.suggestMove(testBoard, tttTools.oPlayer, 3)).toBe("R: 2 C: 2");

    testBoard[1] = null;
    testBoard[7] = null;

    testBoard[0] = "X";
    testBoard[4] = "O";
    testBoard[8] = "X";
    testBoard[1] = "O";

    expect (tttTools.suggestMove(testBoard, tttTools.xPlayer, 4)).toBe("R: 3 C: 2");
});

test('140b: Testing the possibleWin', () => {
    
    let testBoard = Array(9).fill(null);
    expect(testBoard).toEqual([null, null, null, null, null, 
        null, null, null, null]);
        
    let testPlayer = tttTools.xPlayer;
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([-1, null]);

    // Testing Row 1

    testBoard[0] = "X";
    testBoard[1] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([2, "X"]);
    
    testBoard[0] = null;
    testBoard[1] = "O";
    testBoard[2] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([0, "O"]);
        
    testBoard[0] = "X";
    testBoard[1] = null;
    testBoard[2] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([1, "X"]);

    // Testing Row 2

    testBoard[0] = null;
    testBoard[1] = null;
    testBoard[2] = null;
    
    testBoard[3] = "X";
    testBoard[4] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([5, "X"]);
    
    testBoard[3] = null;
    testBoard[4] = "O";
    testBoard[5] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([3, "O"]);
        
    testBoard[3] = "X";
    testBoard[4] = null;
    testBoard[5] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([4, "X"]);

    // Testing Row 3

    testBoard[3] = null;
    testBoard[4] = null;
    testBoard[5] = null;
    
    testBoard[6] = "X";
    testBoard[7] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([8, "X"]);
    
    testBoard[6] = null;
    testBoard[7] = "O";
    testBoard[8] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([6, "O"]);
        
    testBoard[6] = "X";
    testBoard[7] = null;
    testBoard[8] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([7, "X"]);

    // Testing Column 1

    testBoard[6] = null;
    testBoard[7] = null;
    testBoard[8] = null;
    
    testBoard[0] = "X";
    testBoard[3] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([6, "X"]);

    testBoard[0] = null;
    testBoard[3] = "O";
    testBoard[6] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([0, "O"]);

    testBoard[0] = "X";
    testBoard[3] = null;
    testBoard[6] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([3, "X"]);

    // Testing Column 2

    testBoard[0] = null;
    testBoard[6] = null;
    
    testBoard[1] = "X";
    testBoard[4] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([7, "X"]);

    testBoard[1] = null;
    testBoard[4] = "O";
    testBoard[7] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([1, "O"]);

    testBoard[1] = "X";
    testBoard[4] = null;
    testBoard[7] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([4, "X"]);

    // Testing Column 3

    testBoard[1] = null;
    testBoard[7] = null;
    
    testBoard[2] = "X";
    testBoard[5] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([8, "X"]);

    testBoard[2] = null;
    testBoard[5] = "O";
    testBoard[8] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([2, "O"]);

    testBoard[2] = "X";
    testBoard[5] = null;
    testBoard[8] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([5, "X"]);

    // Check Diagonal Right to Left

    testBoard[2] = null;

    testBoard[0] = "X";
    testBoard[4] = "X";
    testBoard[8] = null;
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([8, "X"]);

    testBoard[0] = null;
    testBoard[4] = "O";
    testBoard[8] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([0, "O"]);

    testBoard[0] = "X";
    testBoard[4] = null;
    testBoard[8] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([4, "X"]);

    // Check Diagonal Left to Right

    testBoard[0] = null;
    testBoard[8] = null;

    testBoard[2] = "X";
    testBoard[4] = "X";
    testBoard[6] = null;
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([6, "X"]);

    testBoard[2] = null;
    testBoard[4] = "O";
    testBoard[6] = "O";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([2, "O"]);

    testBoard[2] = "X";
    testBoard[4] = null;
    testBoard[6] = "X";
    expect (tttTools.possibleWin(testBoard, testPlayer)).toEqual([4, "X"]);

});