// selects the body element
const body = document.querySelector("body");
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

let word = "magnolia";
const guessedLettersAr = [];


const getWord = async function(){
  const requestWords = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); 
   const fetchedWordAr = await requestWords.text();
   const wordArray = fetchedWordAr.split("\n");
   console.log(wordArray);
   newWord(wordArray);
   placeHolder(word)
};

const newWord = function(xwordArray){
   const randomWordsIndexs=Math.floor(Math.random()*xwordArray.length);
   const randomWord = xwordArray[randomWordsIndexs];
   console.log(randomWord);
   const newWord = randomWord.trim();
   word= newWord;
   
};

getWord();

/// guess placeholder symbols ///
const placeHolder = function(word){
   const revealLettersAr = []
   //test// console.log(revealLettersAr);
   //test// console.log(wordArray.length);

   for (const letter of word){
      console.log(letter);
      revealLettersAr.push("●");
   }

   wordInProgress.innerText = revealLettersAr.join(" ");
}

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
   //test// console.log(xinput.length);
 if (xinput.length === 0){
    response.innerText = `oops, please enter a letter to guess.`;
 } else if (xinput.length > 1){
   response.innerText = `Please, enter only one letter at a time.`;
 } else if (!xinput.match(acceptedLetter)){
   response.innerText = `Sorry only letters are accepted`;
 } else{
    return xinput;
 }

};

/// function shows guessed letters updates guessedLetterAr ///
const makeGuess = function(xguess){
   xguess = xguess.toUpperCase();
   if (guessedLettersAr.includes(xguess)){
     response.innerText = ` you have already guessed that letter.` 
   }else{
      guessedLettersAr.push(xguess);
      console.log(guessedLettersAr);
      
      guessesLeft(guessedLettersAr);
     
      updateGuessed();
      
      correctReveal(guessedLettersAr); 

   }
   
};

/// function appends guessed letters to .letters-guessed ul as list items ///
const updateGuessed = function(){
   lettersGuessedList.innerHTML = "";

   for (const guessed of guessedLettersAr){ 
   
      const vlist = document.createElement("li");
      vlist.innerText = guessed;   
      lettersGuessedList.append(vlist);
      //test// console.log(lettersGuessedList);
   }
};

/// replaces circle symbols with correct letters guessed ///

const correctReveal = function(xguessedLettersAr){
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");

   const completedWordAr = []

  // loop word arrray each time through push a letter or dot symbol //
   for (const vletter of wordArray){  
     if (xguessedLettersAr.includes(vletter)){
         completedWordAr.push(vletter);  
     } else{
        completedWordAr.push("●");
     }

     console.log(completedWordAr.join(" "));
     wordInProgress.innerText = completedWordAr.join("");
     
     won(word);
    
   };

};

/// check to see if player has won - completed whole word ///

const won = function(xword){
   const completedWord = wordInProgress.innerText;

   if (xword.toUpperCase() == completedWord){
      response.classList.add("win");
      response.innerHTML = '<p class= "highlight"> You guessed correct the word! Congrats! </p>';
      startOver();
   }
};

/// counts how many guesses are left ///
const guessesLeft = function(xguess){
   let remainingGuesses = 8;
   const upperWord = word.toUpperCase();
   const upperWordSplit = upperWord.split("");

//// *** double check this if statement ***///  
for (letter of xguess){
   console.log(letter);
   if (upperWordSplit.includes(letter)){
      //test// console.log(remainingGuesses);
      response.innerText = `Good Guess! the word has the letter ${letter}`;
   }
   else{
      remainingGuesses -=1;
      //test// console.log(remainingGuesses);
      if (remainingGuesses === 0){
         console.log("END!")
         remainGuessesSpan.innerText = `no more guesses, Play Again!`; 
         startOver();
         
      }else{
         remainGuessesSpan.innerText = `${remainingGuesses} guesses`;
         response.innerText = `Guess Again`;
      }
   }
}

};
/// reveals paly again button- hides elements not needed //
const startOver = function(){
   guessBtn.classList.add("hide");
   remainGuesses.classList.add("hide");
   lettersGuessedList.classList.add("hide");
   
   againBtn.classList.remove("hide");
};


/// click event, removes old information, and resets for new game ///
againBtn.addEventListener("click", function(){
   // remove win message //
   response.classList.remove("win");
   response.innerHTML = "";
   // reset numberr of guesses //
   remainingGuesses = 8; 
   remainGuessesSpan.innerText = `${remainingGuesses} guesses`;
   remainGuesses.classList.remove("hide");
   // clear guessed letter array and clear display of guessed letters //
   guessedLettersAr.splice(0, guessedLettersAr.length);
   lettersGuessedList.innerHTML = "";
   lettersGuessedList.classList.remove("hide");
   // reset states of buttons //
   guessBtn.classList.remove("hide");
   againBtn.classList.add("hide");
   // get new word //
   getWord();
});