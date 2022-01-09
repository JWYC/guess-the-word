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
//let remainingGuesses = 8;

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
//placeHolder(word);

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

// function shows guessed letters updates guessedLetterAr ///
const makeGuess = function(xguess){
   xguess = xguess.toUpperCase();
   if (guessedLettersAr.includes(xguess)){
     response.innerText = ` you have already guessed that letter.` 
   }else{
      guessedLettersAr.push(xguess);
      console.log(guessedLettersAr);
      //-//lettersGuessedList.innerText = guessedLettersAr;
      
      guessesLeft(guessedLettersAr);
     
      updateGuessed();
      
      correctReveal(guessedLettersAr); 
       
      //-//console.log(lettersGuessedList);
   }
   
};

// function appends guessed letters to .letters-guessed ul as list items//
const updateGuessed = function(){
   lettersGuessedList.innerHTML = "";

   for (const guessed of guessedLettersAr){ 
   
      const vlist = document.createElement("li");
      vlist.innerText = guessed;   
      lettersGuessedList.append(vlist);
      //-//console.log(lettersGuessedList);

   }
};

//replaces circle symbols with correct letters guessed//

const correctReveal = function(guessedLettersAr){
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   //-//console.log(wordArray);
   //-//console.log(guessedLettersAr);

   const completedWordAr = []

   wordArray.forEach(function(vletter, index){
   //-//console.log(`${vletter} : ${index}`);
     
     if (guessedLettersAr.includes(vletter)){
      //-//console.log(`in business ${index}`);
         completedWordAr.push(vletter);
         //is--not needed--// (completedWordAr.includes(vletter)){
           //-- not needed --// completedWordAr.splice(index, 1, vletter);
         //}
      
     } else{
        //-//console.log(`nope ${index}`);
        completedWordAr.push("●");
     }

     console.log(completedWordAr.join(" "));
     wordInProgress.innerText = completedWordAr.join("");
     won(word);
    
   });

};



// check to see if player has won - completed whole word //

const won = function(xword){
   //-// console.log(`hello ${xprogressword.toUpperCase()}`)
   const completedWord = wordInProgress.innerText;
   //-// console.log(completedWord);

   if (xword.toUpperCase() == completedWord){
     console.log('done');
      response.classList.add("win");
console.log (response);
      response.innerHTML = '<p class= "highlight"> You guessed correct the word! Congrats! </p>';
      startOver();
      

   }
};

const guessesLeft = function(xguess){
   let remainingGuesses = 8;
   const upperWord = word.toUpperCase();
   const upperWordSplit = upperWord.split("");
  //-// console.log(`hi ${upperWordSplit}`);
  //-// console.log(`wave ${xguess}`);


//// *** double check this if statement ***///  
for (letter of xguess){
   console.log(letter);
   if (upperWordSplit.includes(letter)){
      console.log(remainingGuesses);
      response.innerText = `Good Guess! the word has the letter ${letter}`;
   }
   else{
      remainingGuesses -=1;
      console.log(remainingGuesses);
      //const newNumGuesses = remainingGuesses;
      if (remainingGuesses === 0){
         console.log("END!")
         remainGuessesSpan.innerText = `no more guesses, Play Again!`; 
         startOver();
         
      }else{
         remainGuessesSpan.innerText = `${remainingGuesses} guesses`;
      }

   }
}

};

const startOver = function(){
   guessBtn.classList.add("hide");
   remainGuesses.classList.add("hide");
   lettersGuessedList.classList.add("hide");
   //remainGuesses.innerText = "";
   againBtn.classList.remove("hide");
};

againBtn.addEventListener("click", function(){
   console.log("hello");
   response.classList.remove("win");
   response.innerHTML = "";
   
   //wordInProgress.innerText = "";
   
   remainingGuesses = 8; 
   remainGuessesSpan.innerText = `${remainingGuesses} guesses`;
   remainGuesses.classList.remove("hide");

   guessedLettersAr.splice(0, guessedLettersAr.length);
   console.log(guessedLettersAr);
   lettersGuessedList.innerHTML = "";
   lettersGuessedList.classList.remove("hide");

   guessBtn.classList.remove("hide");
   againBtn.classList.add("hide");

   getWord();
});