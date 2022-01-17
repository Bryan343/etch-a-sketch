const board = document.querySelector('#board-container');
const title = document.querySelector('h1')
const colorDiv = document.querySelector('#color-picker');
const color = document.querySelector('#color');
const quantity = document.querySelector('#quantity');
const clear = document.querySelector('#clear');
const blocker = document.querySelector('#blocker');
const helpBtn = document.querySelector('#help-btn');
const helpClose = document.querySelector('#help-close');
const maxPixels = 100;
const minPixels = 10;
let allowDrawing = false;
let boardPixels = quantity.value;
let selectedColor = color.value;

function setBoardGrid() {
    board.style.cssText = `grid-template-columns: repeat(${boardPixels}, 1fr);grid-template-rows: repeat(${boardPixels}, 1fr)`;
}

function addPixels() {
    for (let i = 0; i < boardPixels * boardPixels; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', paint);
        board.appendChild(pixel);
    }
}

function paint(event) {
    if (!allowDrawing) {
        return;
    }
    const target = event.currentTarget;
    target.style.background = selectedColor;
}

function changeColor(e) {
    selectedColor = e.target.value;
}

function startKeyPressTools(e) {
    console.log(e.key);
    if (e.key === 'c') {
        color.click();
    } else if (e.key === 'r') {
        clear.click();
    }
}

function clearBoard() {
    Array.from(board.children).forEach(pixel => {
        pixel.style.cssText = 'background: transparent;';
    });
}

function openHelpMenu() {
    blocker.style.visibility = 'visible';
}

function closeHelpMenu() {
    blocker.style.visibility = 'hidden';
}

function updateBoard(e) {
    if (e.key === "Enter") {
        checkValue(e.currentTarget.value);
        if (boardPixels !== e.currentTarget.value) {
            boardPixels = e.currentTarget.value;
            board.replaceChildren();
            setBoardGrid();
            addPixels();
        }
    }
}

function checkValue(val) {
    if (val < minPixels) {
        quantity.value = minPixels;
    } else if (val > maxPixels) {
        quantity.value = maxPixels;
    }
}

document.addEventListener('keydown', startKeyPressTools);
quantity.addEventListener('keydown', updateBoard);
color.addEventListener('change', changeColor);
clear.addEventListener('click', clearBoard);
helpBtn.addEventListener('click', openHelpMenu);
helpClose.addEventListener('click', closeHelpMenu);
board.addEventListener('click', () => allowDrawing = !allowDrawing);
colorDiv.addEventListener('click', () => color.click());

setBoardGrid();
addPixels();