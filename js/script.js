//ul where player guessed letters appear
const lettersGuessedList = document.querySelector(".guessed-letters");
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
const guessedLettersAr = [];

/// guess placeholder symbols ///
const placeHolder = function(word){
//test// console.log(word.split(""));
   //-//const wordArray = word.split("");
   const revealLettersAr = []
//test// console.log(revealLetters);
//test// console.log(wordArray.length);
   
//*-*// a forEach is overkill, a "for of" looks at array values only, no need for index in this function //
   //-//wordArray.forEach (function(letter, index){
     //-// revealLetters.push("●");
      //test//console.log(`${letter} ${index}`)
      //-// } 
   //-// );

   for (const letter of word){
      console.log(letter);
      revealLettersAr.push("●");
   }
   //-//const revealed = revealLetters.join(" ");
   //-//wordInProgress.innerText = revealed;
/*/refactored/*/
   wordInProgress.innerText = revealLettersAr.join(" ");
}
placeHolder(word);

/// button pushed event handler actions ///
guessBtn.addEventListener("click", function(e){
   e.preventDefault();
   
   response.innerText = "";

   const guess = inputLetter.value;
   const goodGuess = checkInput(guess);
      console.log(goodGuess);

   if (goodGuess){
      makeGuess(guess);
   }
   
   inputLetter.value = "";
});

/// function checks inputs ///

const checkInput = function(xinput){
   const acceptedLetter = /[a-zA-Z]/;
   //-//console.log(input.length);
 if (xinput.length === 0){
    response.innerText = `oops, please enter a letter to guess.`;
 }else if (xinput.length > 1){
   response.innerText = `Please, enter only one letter at a time.`;
 } else if (!xinput.match(acceptedLetter)){
   response.innerText = `Sorry only letters are accepted`;
 } else{
    return xinput;
    //none of the other return except for the last response. and that is what is feed into the if statement before array validation function is done

 }

};



const makeGuess = function(xguess){
   xguess = xguess.toUpperCase();
   if (guessedLettersAr.includes(xguess)){
     response.innerText = ` you have already guessed that letter.` 
   }else{
      guessedLettersAr.push(xguess);
      console.log(guessedLettersAr);
      //-//lettersGuessedList.innerText = guessedLettersAr;
      updateGuessed();
      console.log(lettersGuessedList);
   }
   
};

const updateGuessed = function(){
   lettersGuessedList.innerHTML = "";

   for (let guessed of guessedLettersAr){ 
   
      let vlist = document.createElement("li");
      vlist.innerText = guessed;   
      lettersGuessedList.append(vlist);
      //-//console.log(lettersGuessedList);

   }
};