import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

// Math.random() gives us a random number between 0 and 1
// we multiply it by the length of the list to get a random
// index in the list and then round down since it may be a decimal
const word = WORDS[Math.floor(Math.random() * WORDS.length)];


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App word={word} />
  </React.StrictMode>
);
