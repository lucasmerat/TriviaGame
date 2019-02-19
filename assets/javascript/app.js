$(document).ready(function() {
  //Global variables being set
  var time = 15;
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
      question:
        "When Vinny gives a fake when meeting name Judge Haller for the first time, what name does he give?",
      answers: {
        1: "Jerry Callo",
        2: "Vincent Vito",
        3: "Jerry Gallo",
        4: "Jimmy Gambini",
        correct: "3",
        correctAnswer: "Jerry Gallo"
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
    var audio = new Audio("song.mp3");
    audio.play();
    //Reset variables for when game is restarted
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    time = 15;
    //Hide elements for when game is restarted
    $("#restart").css("visibility", "hidden");
    $("#incorrect-answers").html("");
    $("#correct-answers").html("");
    $("#unanswered").html("");
    $("#end-desc").text("");
    $("#start-btn").css("display", "none");
    $("#timer").text("Time remaining: " + "15"); //Initialize timer at 15 seconds
    //Setting countdown
    intervalId = setInterval(decrease, 1000);
    //Displaying text of question and possible answers
    $("#question-layout").css("display", "block");
    $("#question").text(questions[currentQuestion].question);
    for (var i = 1; i < 5; i++) {
      $(".a" + i).text(questions[currentQuestion].answers[i]);
    }
  }
  //Function to decrease countdown
  function decrease() {
    if (time === 1) {
      //Conditional for when clock runs out, add 1 to unanswered question var
      unAnswered++;
      wasCorrect = false;
      console.log(
        "No answer selected, incorrect answers increases and is now " +
          incorrectAnswers
      );
      displayAnswer();
    }
    time--;
    $("#timer").text("Time remaining: " + time);
  }

  function makeGuess() {
    //If what is clicked has a key that is the same as the key of the correct answer in object, do correct answer logic
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
    //Clear interval and question and answer text to display answer content
    clearInterval(intervalId);
    $("#question-layout").css("display", "none");
    $("#question").text("");
    $(".answer").text("");
    //Displaying incorrect or correct answer body based on result of guess
    if (wasCorrect === true) {
      $("#y-n").text("you got it!");
    } else {
      $("#y-n").text("Nuh, uh.");
      $("#correct-ans").text(
        "Da correct answer was, " +
          questions[currentQuestion].answers.correctAnswer //Pulls in correct answer from questions object
      );
    }
    console.log(currentQuestion);
    $("#answer-layout").append(
      "<img class='result-img' src='assets/images/img" +
        currentQuestion +
        ".gif'>"
    );
    //Move to next question, at a delay of 4 seconds
    if (currentQuestion < 9) {
      setTimeout(nextQuestion, 4000);
    } else {
      //End game logic when all questions have been answered and responses shown
      setTimeout(gameOver, 4000);
    }
  }

  function nextQuestion() {
    //Resets all text from display answer function
    $(".result-img").remove();
    $("#y-n").text("");
    $("#correct-ans").text("");
    currentQuestion++;//Increase question variable by one, moving to next question in object
    console.log("current question number is " + currentQuestion);
    $("#timer").text("Time remaining: 15");
    time = 15; 
    intervalId = setInterval(decrease, 1000);
    $("#question-layout").css("display", "block");
    $("#question").text(questions[currentQuestion].question);
    for (var i = 1; i < 5; i++) {
      $(".a" + i).text(questions[currentQuestion].answers[i]);
    }
  }

  function gameOver() {
    //Remove display answer content
    $(".result-img").remove();
    $("#y-n").text("");
    $("#correct-ans").text("");
    //Add text for end game with percent correct, incorrect and not answered
    $("#end-desc").text("You two youts finished. Heres how ya did.");
    $("#correct-answers").html(
      "You answered <b>" +
        Math.floor((correctAnswers / 10) * 100) +
        "%</b> correctly!"
    );
    $("#incorrect-answers").html(
      "You answered <b>" +
        Math.floor((incorrectAnswers / 10) * 100) +
        "%</b> incorrectly."
    );
    if (unAnswered > 0) {
      $("#unanswered").html(
        "You didn't answer <b>" +
          Math.floor((unAnswered / 10) * 100) +
          "%</b> of the questions."
      );
    }
    $("#restart").css("visibility", "visible");
    $("#restart").css("margin-top", "0"); 
  }

  //Click listeners
  $("#start-btn").click(start);
  $(".answer").click(makeGuess);
  $("#restart").click(start);
});