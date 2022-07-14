import './App.css';
import React, {useState, useEffect} from 'react';
import Letters from './Letters';
import Word from './Word';


function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [numWrong, setNumWrong] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [word, setWord] = useState('');

  const guessLetter = (guessedLetter) => {
    if (!word.includes(guessedLetter)) {
      setNumWrong((currentNumWrong) => currentNumWrong + 1);
    } else {
      for (const letter of word) {
        if (letter === guessedLetter) {
          setNumCorrect((currentNumCorrect) => currentNumCorrect + 1);
        }
      }
    }

    setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
  };

  const hasWon = numCorrect === word.length;
  const hasLost = numWrong > 4;

  const getRandomWord = () => {
    fetch('https://random-word-api.herokuapp.com/word')
    .then((response) => response.json())
    .then((data) => {
      setWord(data[0])
    })
  }

  useEffect(() => {
    getRandomWord()
  }, [])

  const resetGame = () => {
    setGuessedLetters(() => []);
    setNumCorrect(() => 0);
    setNumWrong(() => 0);
    getRandomWord();
  }

  return (
    <div>
      <h1>Sharkwords</h1>
      <div className='shark-images'>
        <img src={`/images/guess${numWrong}.png`} alt={`${numWrong}-guesses-wrong`} />
      </div>
      {hasWon ? (
        <button
        className='reset-button'
        onClick={() => resetGame()}
        >
          Congratulations! 🥳 You won! Click here to play again.
        </button>
      ) : null}
      {hasLost ? (
        <button
        className='reset-button'
        onClick={() => resetGame()}
        >
          The Shark got you! The word was {word}. <br></br> Click here to play again.
        </button>
      ) : null}

      <Word word={word} guessedLetters={guessedLetters} />
      <Letters
        guessedLetters={guessedLetters}
        handleGuessLetter={guessLetter}
        disableAll={hasWon || hasLost}
      />
    </div>
  );
}

export default App;
