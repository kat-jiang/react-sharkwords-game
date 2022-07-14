import './App.css';
import React from 'react';
import Letters from './Letters';

const Word = (props) => {
  const charDivs = [];
  for (const [i, letter] of Object.entries(props.word)) {
    let displayLetter = null;
    if (props.guessedLetters.includes(letter)) {
      displayLetter = letter;
    }

    charDivs.push(
      <div key={i} className="letter-box">
        {displayLetter}
      </div>,
    );
  }

  return <section className="word-container">{charDivs}</section>;
};

function App(props) {
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [numWrong, setNumWrong] = React.useState(0);
  const [numCorrect, setNumCorrect] = React.useState(0);

  const guessLetter = (guessedLetter) => {
    if (!props.word.includes(guessedLetter)) {
      setNumWrong((currentNumWrong) => currentNumWrong + 1);
    } else {
      for (const letter of props.word) {
        if (letter === guessedLetter) {
          setNumCorrect((currentNumCorrect) => currentNumCorrect + 1);
        }
      }
    }

    setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
  };

  const hasWon = numCorrect === props.word.length;
  const hasLost = numWrong > 4;

  return (
    <div>
      <h1>Sharkwords</h1>
      <div className='shark-images'>
        <img src={`/images/guess${numWrong}.png`} alt={`${numWrong}-guesses-wrong`} />
      </div>
      {hasWon ? (
        <a id="win" href="/sharkwords-final">
          Congratulations! 🥳 You won! Click here to play again.
        </a>
      ) : null}
      {hasLost ? (
        <a id="win" href="/sharkwords-final">
          The Shark got you! 🥺 Click here to play again
        </a>
      ) : null}

      <Word word={props.word} guessedLetters={guessedLetters} />
      <Letters
        guessedLetters={guessedLetters}
        handleGuessLetter={guessLetter}
        disableAll={hasWon || hasLost}
      />
    </div>
  );
}

export default App;
