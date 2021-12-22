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

const word = "magnolia";



const placeHolder = function(){
   //-/console.log(word.split(""));
   const wordArray = word.split("");
   const revealLetters = []
   //-/console.log(revealLetters);
   //-/console.log(wordArray.length);

   wordArray.forEach (function(letter, index){
      revealLetters.push("●");
      //-/console.log(`${letter} ${index}`)
   });
  
   const revealed = revealLetters.join(" ");
   wordInProgress.innerText = revealed;

}
placeHolder(word);