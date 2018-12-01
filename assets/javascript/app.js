//countdown
var download
var timeleft
$("#start").on("click", function(){
if(timeleft > 0){
    setInterval(download); 
    $("quiz").trigger("reset"); 
}  
timeleft = 60;
download = setInterval(function(){
timeleft--;
document.getElementById("countdowntimer").textContent = timeleft;
if(timeleft <= 0)
    clearInterval(download);
},1000);
$("#quiz").show();
$("#getstarted").hide();
})

//my questions
var myQuestions = [
    {
        question: "The acronym HTML stands for Hypertext Markup Language.",
        answers: {
            a: 'True',
            b: 'False',
        },
        correctAnswer: 'a'
    },
    {
        question: "XML stands for expensive markup language.",
        answers: {
            a: 'True',
            b: 'False',
        },
        correctAnswer: 'b'
    },
    {
        question: "jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, animation, and Ajax.",
        answers: {
            a: 'True',
            b: 'False',
        },
        correctAnswer: 'a'
    }
];

$("#reset").hide();
$("#getstarted").show();
$("#quiz").hide();

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var resetButton = document.getElementById('reset');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // store output and the answer choices for use later in code
        var output = [];
        var answers;

        // number of question in array
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // html radio button in front of answers
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // make container for awsers
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // track correct answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // a count for each question
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct add correct answer
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;

            }

        }

        // show correct answers and incorrect answers
        resultsContainer.innerHTML = 'You got' + ' ' + numCorrect + ' out of ' + questions.length + ' ' + 'correct';
    }

    // show questions
    showQuestions(questions, quizContainer);
    
    // submit button
    submitButton.onclick = function(){
        clearInterval(download);
        showResults(questions, quizContainer, resultsContainer);
        $("#start").hide();
        $("#reset").show();
    }

    // submit button
    resetButton.onclick = function(){
         $("#start").show();
         $("#reset").hide();
         $("#quiz").hide();
         $("#getstarted").show();
         resultsContainer.innerHTML = ' ';
         timeleft = 60;
         //setInterval(download);
     }

}