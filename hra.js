'use strict';

let player = 'circle';
const gridSquareElmArr = document.querySelectorAll('.grid__square');

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
  }
};

for (let i = 0; i < gridSquareElmArr.length; i++) {
  gridSquareElmArr[i].addEventListener('click', addSymbol);
};