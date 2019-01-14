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
  var unAnswered = 0;
  var currentQuestion = 0;
  var wasCorrect = false;
  //Setting up questions and answers
  var questions = [
    {
      question: "In what state does the trial in the movie take place?",
      answers: {
        1: "Georgia",
        2: "Alabama",
        3: "New York",
        4: "Texas",
        correct: "2",
        correctAnswer: "Alabama"
      }
    },
    {
      question: "What actor played Vinny?",
      answers: {
        1: "Joe Pesci",
        2: "Robert deNiro",
        3: "Brad Pitt",
        4: "Jim Belushi",
        correct: "1",
        correctAnswer: "Joe Pesci"
      }
    },
    {
      question:
        "What animal does Vinny go hunting with the prosecuting lawyer, Jim Trotter?",
      answers: {
        1: "Ducks",
        2: "Rabbits",
        3: "Deer",
        4: "Moose",
        correct: "3",
        correctAnswer: "Deer"
      }
    },
    {
      question: "What car do Bill and Stan drive before getting arrested?",
      answers: {
        1: "'62 Chevy Impala",
        2: "A Ferrari",
        3: "'63 Pontiac Tempest",
        4: "'64 Buick Skylark",
        correct: "4",
        correctAnswer: "'64 Buick Skylark"
      }
    },
    {
      question:
        "When Vinny kicks the shit out of the guy at the bar, how much does the guy owe Mona Lisa?",
      answers: {
        1: "$50",
        2: "$200",
        3: "$100",
        4: "$20",
        correct: "2",
        correctAnswer: "$200"
      }
    },
    {
      question: "How long does it take to cook grits?",
      answers: {
        1: "5 minutes",
        2: "20 minutes",
        3: "1 hour",
        4: "15 minutes",
        correct: "2",
        correctAnswer: "20 minutes"
      }
    },
    {
      question: "How many times did Vinny take the bar before he passed?",
      answers: {
        1: "1 time, guy is a genius!",
        2: "3 times",
        3: "2 times",
        4: "6 times",
        correct: "4",
        correctAnswer: "6 times"
      }
    },
    {
      question: "What piece of evidence proves Stan and Bill didn't do it?",
      answers: {
        1: "DNA",
        2: "Tire tracks",
        3: "Finger prints",
        4: "Video of the crime",
        correct: "2",
        correctAnswer: "Tire tracks"
      }
    },
    {
      question: "How many times has Lucas seen My Cousin Vinny?",
      answers: {
        1: "5 times",
        2: "57 times",
        3: "22 times",
        4: "74 times",
        correct: "2",
        correctAnswer: "57 times"
      }
    }
  ];

  function start() {
    $("#start-btn").css("display", "none");
    $("#timer").text("Time remaining: " + "30");
    intervalId = setInterval(decrease, 1000);
    $("#question").text(questions[currentQuestion].question);
    for (var i = 1; i < 5; i++) {
      $(".a" + i).text(questions[currentQuestion].answers[i]);
    }
  }

  function decrease() {
    if (time === 1) {
      unAnswered++;
      wasCorrect = false;
      console.log(
        "No answer selected, incorrece answers increases and is now " +
          incorrectAnswers
      );
      displayAnswer();
    }
    time--;
    $("#timer").text("Time remaining: " + time);
  }

  function makeGuess() {
    if ($(this).attr("key") === questions[currentQuestion].answers.correct) {
      console.log("correct answer");
      wasCorrect = true;
      correctAnswers++;
    } else {
      incorrectAnswers++;
      wasCorrect = false;
      console.log("incorrect answer");
      console.log(
        "incorrect answer you have guessed " +
          incorrectAnswers +
          " incorrectly."
      );
    }
    console.log("You have guessed " + correctAnswers + " question correctly");
    console.log("You have guessed " + incorrectAnswers + " incorrectly.");
    displayAnswer();
  }

  function displayAnswer() {
    clearInterval(intervalId);
    $("#question").text("");
    $(".answer").text("");
    if (wasCorrect === true) {
      $("#y-n").text("you got it!");
    } else {
      $("#y-n").text("Nuh, uh.");
      $("#correct-ans").text(
        "Da correct answer was, " +
          questions[currentQuestion].answers.correctAnswer
      );
    }
    console.log(currentQuestion);
    $("#answer-layout").append(
      "<img class='result-img' src='assets/images/img" +
        currentQuestion +
        ".gif'>"
    );
    //Move to next question, at a delay of 5 seconds
    if (currentQuestion < 8) {
      setTimeout(nextQuestion, 2000);
    } else {
      //End game logic when all questions have been answered and responses shown
      setTimeout(gameOver, 2000);
    }
  }

  function nextQuestion() {
    $(".result-img").remove();
    $("#y-n").text("");
    $("#correct-ans").text("");
    currentQuestion++;
    console.log("current question number is " + currentQuestion);
    $("#timer").text("Time remaining: 30");
    time = 30;
    intervalId = setInterval(decrease, 1000);
    $("#question").text(questions[currentQuestion].question);
    for (var i = 1; i < 5; i++) {
      $(".a" + i).text(questions[currentQuestion].answers[i]);
    }
  }

  //Add Game Over logic
  function gameOver() {
    $(".result-img").remove();
    $("#y-n").text("");
    $("#correct-ans").text("");
    $("#end-desc").text("You two youts finished. Heres how ya did.");
    $("#correct-answers").html(
      "You answered <b>" + correctAnswers + "</b> correctly!"
    );
    $("#incorrect-answers").html(
      "You answered <b>" + incorrectAnswers + "</b> incorrectly."
    );
    if (unAnswered > 0){
    $("#unanswered").html(
      "You didn't answer <b>" + unAnswered + "</b> questions."
    )};
  }

  //Click listeners
  $("#start-btn").click(start);
  $(".answer").click(makeGuess);
});
