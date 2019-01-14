//Pseudocode
//First page displays only a start button and the name of the gam
//Click listener on start will display the first question and start a timer from 30 seconds
//Hover effect on each possible answer.
//When an answer is clicked, it displays whether the answer was correct or not, and tells correct answer w an image
//Interval timer freezes at ammt remaining.
//setTimeoutDelayed start of next question (6 secs?). W no user input.
//If the time remaining === 0, display that they are out of time, w correct answer and an image
//Moves to next question. After each answer, once at the end, it freezes the timer, displays the number of correct/incorrect answers
//Displays start over button. On click of start over button, no page reload, and starts from the top.
//Variables: numCorrect, numIncorrect, Interval for timer
//Objects: questions with correct and incorrect answers
//Functions: Start which begins the game and can be tied to restart button, getQuestion() which is called at end of start but also each time a question is answered.
$(document).ready(function() {
    //Global variables being set
  var time = 30;
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var currentQuestion = 0;
  var wasCorrect = false;
    //Setting up questions and answers
  var questions = [
    {
      question: "Who is vinny",
      answers: {
        1: "wrong,a",
        2: "correct,b",
        3: "wrong,c",
        4: "wrong,d",
        correct: "2",
        correctAnswer: "correct,b"
      }
    },
    {
      question: "Who played",
      answers: {
        1: "correct,a",
        2: "wrong,b",
        3: "wrong,c",
        4: "wrong,d",
        correct: "1",
        correctAnswer: "correct,a"
      }
    }, {
        question: "I am",
        answers: {
          1: "correct,a",
          2: "wrong,b",
          3: "wrong,c",
          4: "wrong,d",
          correct: "1",
          correctAnswer: "correct,a"
        }
      }, {
        question: "Yep",
        answers: {
          1: "wrong,a",
          2: "wrong,b",
          3: "wrong,c",
          4: "correct,d",
          correct: "4",
          correctAnswer: "correct,d"
        }
      }, {
        question: "Another",
        answers: {
          1: "wrong,a",
          2: "correct,b",
          3: "wrong,c",
          4: "wrong,d",
          correct: "2",
          correctAnswer: "correct,b"
        }
      }, {
        question: "Wow",
        answers: {
          1: "wrong,a",
          2: "correct,b",
          3: "wrong,c",
          4: "wrong,d",
          correct: "2",
          correctAnswer: "correct,b"
        }
      }, {
        question: "YEHAWWW",
        answers: {
          1: "wrong,a",
          2: "wrong,b",
          3: "wrong,c",
          4: "correct,d",
          correct: "4"
        }
      }
  ];

  function start() {
    $("#start-btn").css("display", "none");
    $("#timer").text("Time remaining: " + "30");
    intervalId = setInterval(decrease, 1000);
    $('#question').text(questions[currentQuestion].question);
    for(var i = 1;i<5;i++){
        $('.a'+ i).text(questions[currentQuestion].answers[i]);
    }
  }

  function decrease() {
    if (time === 1){
        incorrectAnswers++;
        wasCorrect = false;
        console.log('No answer selected, incorrece answers increases and is now ' + incorrectAnswers);
        displayAnswer();
    }
    time--;
    $("#timer").text("Time remaining: " + time);
  }

  function makeGuess(){
    if ($(this).attr('key') === questions[currentQuestion].answers.correct){
        console.log('correct answer')
        wasCorrect = true;
        correctAnswers++;
    } else {
        incorrectAnswers++;
        wasCorrect = false;
        console.log('incorrect answer')
        console.log('incorrect answer you have guessed ' + incorrectAnswers + ' incorrectly.')
    }
    console.log('You have guessed ' + correctAnswers + ' question correctly')
    console.log('You have guessed ' + incorrectAnswers + ' incorrectly.')
    displayAnswer();
  }

  function displayAnswer(){
    clearInterval(intervalId);
    $('#question').text('')
    $('.answer').text('')
    if(wasCorrect === true){
        $('#y-n').text('yep!')
    } else {
        $('#y-n').text('nope.')
        $('#correct-ans').text('The correct answer was, ' + questions[currentQuestion].answers.correctAnswer)
    }

    //add image here
    console.log(currentQuestion)
    $('#answer-layout').append("<img class='result-img' src='assets/images/img" + currentQuestion + ".jpg'>")
    //Move to next question, at a delay of 5 seconds
    setTimeout(nextQuestion,4000);
  }

  function nextQuestion(){
    $('.result-img').remove();
    $('#y-n').text('');
    $('#correct-ans').text('');
    currentQuestion++;
    console.log('current question number is ' + currentQuestion)
    $("#timer").text("Time remaining: 30");
    time = 30;
    intervalId = setInterval(decrease, 1000);
    $('#question').text(questions[currentQuestion].question);
    for(var i = 1;i<5;i++){
        $('.a'+ i).text(questions[currentQuestion].answers[i]);
    }
  }

  //Add Game Over logic 
  

  //Click listeners
  $("#start-btn").click(start);
  $('.answer').click(makeGuess);
});
