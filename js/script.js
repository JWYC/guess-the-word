//ul where player guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
//guess button
const guessBtn = document.querySelector(".guess");
// text input for guessing a letter
const inputLetter = document.querySelector(".letter");
// <p> word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// <p> remaining guesses display
const remainGuesses = document.querySelector(".remaining");
//<span> inside <p> where remaining guesses display
const  numRemainGuesses = document.querySelector(".remaining span");
//response message to players guess
const response = document.querySelector(".message");
//play again button - hidden -
const againBtn = document.querySelector(".play-again");

const world = "magnolia"