let questionsData = {
    q1: {
        question: "What color is the sky?",
        answers: ["Blue", "Yellow", "Green"],
        trueAnswer: "A"
    },
    q2: {
        question: "What do you call people who are 18+ ?",
        answers: ["Baby", "Adult", "Person"],
        trueAnswer: "B"
    },
    q3: {
        question: "What color is the tree?",
        answers: ["Red", "Brown", "Green"],
        trueAnswer: "C"
    },
    q4: {
        question: "What do you call someone who has a wife?",
        answers: ["Wife", "Husband", "Married"],
        trueAnswer: "C"
    },
    q5: {
        question: "Which is the most us level in English?",
        answers: ["B1", "C2", "A2"],
        trueAnswer: "B"
    }
}

/* 
=============
Selectors
=============
*/


// StartButton
let startButton = $('#startButton');
// Display screen (block or none)
let menu = $('.menu');
let game = $('.game');
// Display screen (question & answers)
let displayQuestion = $('#displayQuestion')
let variantA = $('#variantA')
let variantB = $('#variantB')
let variantC = $('#variantC')
// Display Progress Bar 
let progressBar = $('.progress-bar')
// let progressBar = $('.progress-bar')
let displayTotalPoint = $('#displayTotalPoint')
// 

/* 
=============
Init
=============
*/
let questionArr, progress, progressBarLength, numberOfQuestion
var init = function () {
    // Progress bar
    questionArr = Object.entries(questionsData);
    progress = 100 / questionArr.length;
    progressBarLength = 0;
    progressBar.css('width', '0%')
    // initial length of scores (line 88)
    numberOfQuestion = -1;
    displayTotalPoint.text('Total point : 0%')
}
init()
/* 
=============
Functions
=============
*/

// Start game remove d-none class from main section then add d-block class to game section
startButton.on('click', function () {
    init();
    menu.removeClass('d-block')
    menu.addClass('d-none')
    game.removeClass('d-none')
    game.addClass('d-block')
    changeQuestion()
})

// Result
let result = function () {
    menu.addClass('d-block')
    menu.removeClass('d-none')
    game.addClass('d-none')
    game.removeClass('d-block')
    displayTotalPoint.text(`Total point : ${progressBarLength}%`)
}


// Change questions
function changeQuestion() {
    numberOfQuestion++
    if (numberOfQuestion < questionArr.length) {
        displayQuestion.text(questionArr[numberOfQuestion][1].question)
        variantA.text(questionArr[numberOfQuestion][1].answers[0])
        variantB.text(questionArr[numberOfQuestion][1].answers[1])
        variantC.text(questionArr[numberOfQuestion][1].answers[2])
        correctAnswer = (questionArr[numberOfQuestion][1].trueAnswer)
    }
}

/* 
=============
Play game
=============
*/
document.addEventListener('keypress', function (e) {
    let userChoise = e.key.toUpperCase();
    let letter

    if ('ABC'.indexOf(userChoise) === -1) {
        alert('Please enter A B C')
        return
    }

    if (numberOfQuestion <= questionArr.length - 1) {
        if (userChoise === 'A') {
            letter = 'A'
        } else if (userChoise === 'B') {
            letter = 'B'
        } else if (userChoise === 'C') {
            letter = 'C'
        }

        if (userChoise === correctAnswer) {

            let successCard = $(`.list${letter}`)
            successCard.removeClass('bg-dark')
            successCard.addClass('bg-success')
            progressBarLength += progress;
            progressBar.css(`width, ${progressBarLength}%`);

            setTimeout(() => {
                changeQuestion()
                successCard.removeClass('bg-success')
                successCard.addClass('bg-dark')
            }, 1000)


        } else {
            let wrongCard = $(`.list${letter}`)
            wrongCard.removeClass('bg-dark')
            wrongCard.addClass('bg-danger')
            setTimeout(() => {
                changeQuestion()
                wrongCard.removeClass('bg-danger')
                wrongCard.addClass('bg-dark')
            }, 1000)


        }
        if (numberOfQuestion === questionArr.length - 1) {
            result()
        }
    }
});

