const gameboard = (() => {

    const board =  [["x", "o", ""],
                    ["o", "", ""],
                    ["o", "x", ""]];

    const draw = () => {
        for (let i = 0; i < 9; i++) {
            const box = document.createElement("div");
            const container = document.querySelector("#game");

            container.appendChild(box);
        }
    }
    return {board, draw};

})();

const player = (name) => {
    const test = () => name;
    return {test}
}

const player1 = player("bob");