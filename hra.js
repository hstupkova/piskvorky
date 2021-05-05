'use strict';

let player = 'circle';
const gridSquareElmArr = document.querySelectorAll('.grid__square');
const boardSize = 10;
const symbolsToWin = 5;

const addSymbol = ({target}) => {
  if (!target.classList.contains('grid__square--circle') && !target.classList.contains('grid__square--cross')) {
    target.classList.add(`grid__square--${player}`);
    target.disabled = true;
    const controlsSymbolElm = document.querySelector('.controls__symbol');
    if (player === 'circle') {
      player = 'cross';
      controlsSymbolElm.src = 'cross.svg';
      controlsSymbolElm.alt = 'symbol křížku';
    } else {
      player = 'circle';
      controlsSymbolElm.src = 'circle.svg';
      controlsSymbolElm.alt = 'symbol kolečka';
    }
    if (isWinningMove(target) && player === 'cross') {
      if (confirm(`Vyhrálo kolečko. Chcete spustit další hru?`)) {
        location.reload();
      }
    } else if (isWinningMove(target) && player === 'circle') {
      if (confirm(`Vyhrál křížek. Chcete spustit další hru?`)) {
        location.reload();
      }
    }
  }
};

const getSymbol = (field) => {
  if (field.classList.contains('grid__square--cross')) {
		return 'cross'
	} else if (field.classList.contains('grid__square--circle')) {
		return 'circle'
	}
};

const getField = (row, column) => {
  return gridSquareElmArr[row * boardSize + column];
};

const getPosition = (field) => {
	let fieldIndex = 0;
	while (fieldIndex < gridSquareElmArr.length && field !== gridSquareElmArr[fieldIndex]) {
		fieldIndex++;
	};

	return {
		row: Math.floor(fieldIndex / boardSize),
		column: fieldIndex % boardSize,
	};
};

const isWinningMove = (field) => {
	const origin = getPosition(field);
	const symbol = getSymbol(field);

	let i;
  let j;

	let inRow = 1;
	// Koukni doleva
	i = origin.column;
	while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
		inRow++;
		i--;
	};

	// Koukni doprava
	i = origin.column;
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(origin.row, i + 1))
	) {
		inRow++;
		i++;
	};

	if (inRow >= symbolsToWin) {
		return true;
	}

	let inColumn = 1;
	// Koukni nahoru
	i = origin.row;
	while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
		inColumn++;
		i--;
	};

	// Koukni dolu
	i = origin.row;
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(i + 1, origin.column))
	) {
		inColumn++;
		i++;
	}

	if (inColumn >= symbolsToWin) {
		return true;
	}

  let inDiagonDown = 1;
  // Koukni doleva nahoru
  i = origin.column;
  j = origin.row;
  while (
    i > 0 &&
    j > 0 &&
    symbol === getSymbol(getField(j - 1 , i - 1))
  ) {
    inDiagonDown++;
    i--;
    j--;
  }

  // Koukni doprava dolů
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize &&
    j < boardSize &&
    symbol === getSymbol(getField(j + 1 , i + 1))
  ) {
    inDiagonDown++;
    i++;
    j++;
  }

  if (inDiagonDown >= symbolsToWin) {
		return true;
	}

  let inDiagonUp = 1;
  // Koukni doleva dolů
  i = origin.column;
  j = origin.row;
  while (
    i > 0 &&
    j < boardSize &&
    symbol === getSymbol(getField(j + 1 , i - 1))
  ) {
    inDiagonUp++;
    i--;
    j++;
  }

  //Koukni doprava nahoru
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize &&
    j > 0 &&
    symbol === getSymbol(getField(j - 1 , i + 1))
  ) {
    inDiagonUp++;
    i++;
    j--;
  }

  if (inDiagonUp >= symbolsToWin) {
		return true;
	}

	return false;
};

for (let i = 0; i < gridSquareElmArr.length; i++) {
  gridSquareElmArr[i].addEventListener('click', addSymbol);
};