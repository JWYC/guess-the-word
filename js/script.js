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
const  remainGuessesSpan = document.querySelector(".remaining span");
//response message to players guess
const response = document.querySelector(".message");
//play again button - hidden -
const againBtn = document.querySelector(".play-again");

const word = "magnolia";



const placeHolder = function(word){
//test// console.log(word.split(""));
   //-//const wordArray = word.split("");
   const revealLetters = []
//test// console.log(revealLetters);
//test// console.log(wordArray.length);
   
//*-*// a forEach is overkill, a "for in" looks at array values only, no need for index in this function //
   //-//wordArray.forEach (function(letter, index){
     //-// revealLetters.push("●");
      //test//console.log(`${letter} ${index}`)
      //-// } 
   //-// );

   for (const letter of word){
      console.log(letter);
      revealLetters.push("●");
   }
   //-//const revealed = revealLetters.join(" ");
   //-//wordInProgress.innerText = revealed;
   /*/refactored/*/
   wordInProgress.innerText = revealLetters.join(" ");
}
placeHolder(word);


guessBtn.addEventListener("click", function(e){
   e.preventDefault();
   const guess = inputLetter.value;
   console.log(guess);
   inputLetter.value = ""
}

);