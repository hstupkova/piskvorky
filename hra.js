'use strict';

let player = 'circle';
const gridSquareElmArr = document.querySelectorAll('.grid__square');

const addSymbol = ({srcElement}) => {
  if (!srcElement.classList.contains('grid__square--circle') && !srcElement.classList.contains('grid__square--cross')) {
    srcElement.classList.add(`grid__square--${player}`);
    srcElement.disabled = true;
    if (player === 'circle') {
      player = 'cross';
      document.querySelector('.controls__symbol').src = 'cross.svg';
    } else {
      player = 'circle';
      document.querySelector('.controls__symbol').src = 'circle.svg';
    }
  }
};

for (let i = 0; i < gridSquareElmArr.length; i++) {
  gridSquareElmArr[i].addEventListener('click', addSymbol);
};