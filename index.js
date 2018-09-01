// // dependency for inquirer npm package
// var inquirer = require("inquirer");

// var Word = require("./word.js"); 

var Word = require("./word.js");
var inquirer = require('inquirer');


wordList = ["apple", "banana", "cantaloupe", "orange", "kiwi", "strawberry", "honeydew", "watermellon", "pear", "grapes"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

function startGame() {
    if (wordList.length < 2) {
        wordList = ["apple", "banana", "cantaloupe", "orange", "kiwi", "strawberry", "mellon", "watermellon", "pear", "grapes"];
    }
    select = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    console.log("\n Topic: Fruit. [You have a total of 9 guesses]\n")
    promptUser();
}

function promptUser() {
    if (counter < 9) {
        console.log(gameWord.showWord());
        inquirer.prompt([{
            type: "input",
            name: "letter",
            message: "\nPick a letter and press enter. ".cyan
        }]).then(function (data) {
            checkAnswer(data);
        });
    } else {
        console.log("\nSorry, you're out of guesses.\n".inverse);
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        inquirer.prompt([{
            name: "confirm",
            type: "confirm",
            message: "Would you like to play again?"
        }])
        .then(function (answer) {
            if (answer.confirm === true) {
                startGame();
            } else {
                console.log("Have a juicy day and come back soon!")
            }
        })
        
    }
}

function checkAnswer(data) {
    if (data.letter.length === 1) {

        var temp = gameWord.showWord();
        gameWord.checkGuess(data.letter);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n");
            counter++;
            console.log(((9 - counter) + " guesses remaining"));
            promptUser();
        } else {
            rightGuess();
        }
    } else {
        console.log("\nPlease enter a letter, one at a time.\n");
        promptUser();
    }


}


function rightGuess() {
    console.log("\nYou guessed correctly.\n");
    if (chosenWord.replace(/ /g, "") == (gameWord.showWord()).replace(/ /g, "")) {
        console.log(gameWord.showWord());
        console.log('\nYou win!!\n');
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        inquirer.prompt([{
            name: "confirm",
            type: "confirm",
            message: "Would you like to play again?"
        }])
        .then(function (answer) {
            if (answer.confirm === true) {
                startGame();
            } else {
                console.log("\nHave a juicy day and come back soon!\n")
            }
        })
    } else {
        promptUser();
    }
}

startGame();


// var counter = 9; 

// wordList = ["apple", "banana", "cantaloupe", "orange", "kiwi", "strawberry", "honeydew", "watermellon", "pear", "grapes"];
// var randomNumber = Math.floor(Math.random() * wordList.length);
// var randomWord = wordList[randomNumber];

// function placeholder(word) {
//     var splitWord = word.split(""); 
//     var blankSpaces = ""; 
//     for (var i = 0; i < splitWord.length; i++) {
//         splitWord[i] = "_"; 
//         blankSpaces += splitWord[i]; 
//     }
//     return blankSpaces; 
    
// }

// var word = placeholder(randomWord); 

// function startGame() {
//     inquirer.prompt([{
//         name: "guess",
//         type: "input",
//         message: "Guess the Word --> Topic: Fruit \n " + word + "\n" 
//     }])
//     .then(function (answer) {
//         checkAnswer(answer.guess); 
//     })
// }; 