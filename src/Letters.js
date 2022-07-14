import React from 'react';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const Letters = (props) => {
  const letterBtns = [];
  for (const letter of ALPHABET) {
    letterBtns.push(
      <button
        type="button"
        className='letter-button'
        key={letter}
        disabled={props.disableAll || props.guessedLetters.includes(letter)}
        onClick={() => props.handleGuessLetter(letter)}
      >
        {letter}
      </button>,
    );
  }

  return <section className="letter-buttons">{letterBtns}</section>;
};

export default Letters;
