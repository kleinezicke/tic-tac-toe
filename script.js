const gameboard = (() => {

    const board =  [["", "", ""],
                    ["", "", ""],
                    ["", "", ""]];

    const draw = () => {
        for (let i = 0; i < 9; i++) {
            const box = document.createElement("div");
            const container = document.querySelector("#game");
            
            box.classList.add("box");
            box.id = `box${i+1}`;

            box.addEventListener("click", function() {
                game.round(box.id);
            })

            container.appendChild(box);
        }
    }

    const getRow = (id) => {

        let index = id.slice(3);

        if (index <= 3) {
            return 0;
        }
        else if (index > 3 && index <= 6) {
            return 1;
        }
        else {
            return 2;
        }
    }

    const getIndex = (id) => {
        let index = id.slice(3) - 1;

        if (index <= 2)
            return index;
        else if (index > 2 && index < 6)
            return index -3;
        else
            return index - 6;
    }

    const reset = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = ["", "", ""]
        }
        const boxes = document.querySelectorAll(".box")
        boxes.forEach(element => {
            element.innerHTML = "";
        });
    }

    return {board, draw, getRow, getIndex, reset};

})();

const game = (() => {

    let turn = 1;
    let gameEnd = false;
    const board = gameboard.board;

    const round = (id) => {

        let row = gameboard.getRow(id);
        let index = gameboard.getIndex(id);

        if (gameEnd == false) {
            if (turn == 1) {
                if (checkValid(row, index) == true) {
                    gameboard.board[row][index] = player1.getSymbol(); 
                    document.getElementById(id).innerHTML = "<span>" + player1.getSymbol() + "</span>";
                    checkWin(player1);
                    turn = 2;
                }
            }
            else {
                if (checkValid(row, index) == true) {
                    gameboard.board[row][index] = player2.getSymbol();
                    document.getElementById(id).innerHTML = "<span>" + player2.getSymbol() + "</span>";
                    checkWin(player2);
                    turn = 1;
                }
            }
        }
    }

    const checkValid = (row, index) => {

        let value = gameboard.board[row][index]

        if (value === "") {
            return true;
        }
        else
            return false;
    }

    const checkWin = (player) => {

        const displayWin = () => {
            const winMessage = player.getName() + " wins!";
            gameEnd = true;
            alert(winMessage);
        }

        for (let i = 0; i < 3; i++) {
            if (gameboard.board[i][0] === gameboard.board[i][1] && gameboard.board[i][0] === gameboard.board[i][2] && gameboard.board[i][0] != "") {
                displayWin();
            }

            if (gameboard.board[0][i] === gameboard.board[1][i] && gameboard.board[0][i] === gameboard.board[2][i] && gameboard.board[0][i] != "") {
                displayWin();
            }
        }

        if (gameboard.board[0][0] === gameboard.board[1][1] && gameboard.board[0][0] === gameboard.board[2][2] && gameboard.board[0][0] != "") {
            displayWin();
        }
        else if (gameboard.board[0][2] === gameboard.board[1][1] && gameboard.board[0][2] === gameboard.board[2][0] && gameboard.board[0][2] != "") {
            displayWin();
        }
    }

    return {round};

})();

const player = (name, symbol) => {

    const getSymbol = () => symbol;
    const getName = () => name;

    const changeName = () => {
        name = prompt("New Name?");
    }

    return {getSymbol, getName, changeName}
}

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O")

const container = document.querySelector("#game")
container.onload = gameboard.draw();