var answerbtns = document.body.querySelector("ul")
var backbtn = document.querySelector("#backbtn")
var startbtn = document.querySelector("#startbtn")
var Timer = document.querySelector("#timernumber")
var timercountdown = document.querySelector("header").children[1]
var highscoresubmitbtn = document.querySelector("#submit-highscore-btn")
var highscoresbtn = document.querySelector("#HighscoresBtn")
var wipebtn = document.querySelector("#wipeleaderboardbtn")
var questiondisplay = document.querySelector("#title")
var timerstart = 75;
var questionnumber = 0;
var answernumber = 0;
var score = 0;
var timeremaining = timerstart;
var gameover = true;



//Questions and asnwer array
var questionshown = {
    questions: [
        "What is an example of an Array?",
        
        "What is the foundation for all webpages?",
        
        "What is the correct location to link a CSS file?",
        
        "What is the correct syntax for a list of universal variables at the beginning of a CSS file?",
        
        "What is the index position for the first item in an Array"

    ],

    //answers

    answers: [
        [" 1 , 2 , 3 , 4 " , "(1 , 2 , 3 , 4)" , "Right Answer:[1 , 2 , 3 , 4]", "0 , 2 , 4 , 6"],
        
        ["Java-script" , "CSS Files" , "Right Answer:HTML Files" , "Coffee"],
        
        ["Right Answer:Header" , "Footer" , "Div" , "In your Java-script"],
        
        [":Var-list" , ":Uni-Var" , ":groot" , "Right Answer: :root"],

        ["1" , "Right Answer:0" , "Numero Uno" , "10"]

    ]
}

//Function that initializes everything based off of the click listener
function makeitwork() {
    startbtn.addEventListener("click", startgame);
    answerbtns.addEventListener("click", checkAnswer);
    highscoresbtn.addEventListener("click", listhighscores);
    wipebtn.addEventListener("click", clearHighscores);
    backbtn.addEventListener("click", Game);
    highscoresubmitbtn.addEventListener("click", savehighscores);

    Game();

    return;
}


function Game() {
    timeremaining = timerstart;
    Timer.textContent = timerstart;

    document.querySelector("#highscore-display").style.display = "none" ;

   

    questiondisplay.style.display = "block";
    document.querySelector("#directions").style.display = "block";
    highscoresbtn.style.display = "block";
    startbtn.style.display = "block";

    return;
}

//starts the countdown of the timer and displays it
function begincountdown() {
    console.log(Timer)
    
    var tickdown = setInterval(function() {

        if(gameover === true) {
            clearInterval(tickdown);
            return;
        }
        if(timeremaining < 1) {
            clearInterval(tickdown);
            endgame();
        }

        Timer.textContent = timeremaining;
        timeremaining--;
    }, 1000);

    return;
}

//displays the current question and answers basedd off of the index location
function showquestions(questionnumber) {
    questiondisplay.textContent = questionshown.questions[questionnumber];

    showanswers(questionnumber);
}

//shows the asnwer choices that match the index location of the current question
function showanswers(questionnumber) {
    answerbtns.innerHTML = "";

    for (answernumber = 0; answernumber < questionshown.answers[questionnumber].length; answernumber++) {
        var currentanswerchoices = document.createElement("li");
        var tempstr = questionshown.answers[questionnumber][answernumber];

        //recognizes the answer that i have given the ID of "Right Answer" as the correct answer
        if (questionshown.answers[questionnumber][answernumber].includes("Right Answer:")){
            tempstr = questionshown.answers[questionnumber][answernumber].substring(13, questionshown.answers[questionnumber][answernumber].length);

            currentanswerchoices.id = "Right Answer";
        }

        currentanswerchoices.textContent = tempstr;
        answerbtns.appendChild(currentanswerchoices);
    }

    return;
}

//starts the quiz and displays the questions,answers,and timer
function startgame() {
    gameover = false;
    questionnumber = 0;

    highscoresbtn.style.display = "none";
    startbtn.style.display = "none";
    document.querySelector("#directions").style.display = "none";
    Timer.style.display = "block";

    showquestions(questionnumber);
    begincountdown();

    return;
}

//moves to the next set of question and answers in the array
function nextQuestion() {
    questionnumber++; 

    if (questionnumber >= questionshown.questions.length){ 

        endgame(); 
    } else { 
        showquestions(questionnumber); 

    } 

    return;
}
//ends the quiz and shows the users score, and allows them to input a name
function endgame() { 

    gameover = true; 

    score = timeremaining; 

    
    Timer.style.display = `none`; 

    questiondisplay.style.display = `none`; 
    answerbtns.innerHTML = ''; 


    
    document.querySelector(`#scoreid`).textContent = score; 

    document.querySelector(`#highscore-submit`).style.display = `block`; 

    return;
}


//checks for if the correct answer is chosen, else subtracts 10 seconds from the timer
function checkAnswer(event) {
    if (event.target = answerbtns){ 
        console.log(event.target)


        if (!event.target.id.includes('Right Answer')){ 

            timeremaining -= 10; 

        }

        nextQuestion();

    }

    return;
}

//saves the users' score and name in local storage
function savehighscores() {
    var highscoreTextbox = document.querySelector(`input`); 

    var tempArray = []; 

    if (highscoreTextbox.value != `` || highscoreTextbox.value != null) {

        var tempObject = { 

            names: highscoreTextbox.value, 
            scores: score, 
        }

        if(window.localStorage.getItem(`highscores`) == null) { 

            tempArray.push(tempObject); 

            window.localStorage.setItem(`highscores`, JSON.stringify(tempArray)); 

        } else { 

            tempArray = JSON.parse(window.localStorage.getItem(`highscores`));


            for (let index = 0; index <= tempArray.length; index++) { 
                
                if (index == tempArray.length) { 

                    tempArray.push(tempObject) 

                    break;

                } else if (tempArray[index].scores < score) { 

                    tempArray.splice(index, 0, tempObject); 

                    break; 

                }
            }
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArray)) 

        }
        document.querySelector(`input`).value = ``; 

        score = 0; 


        listhighscores();

    }

    return;
}
//lists the current highscores listed in local storage as an ordered list
function listhighscores() {
    
    questiondisplay.style.display = `none`; 
    startbtn.style.display = `none`; 
    document.querySelector(`header`).children[0].style.display = `none`; 

    document.querySelector(`#directions`).style.display = `none`;

    document.querySelector(`#highscore-submit`).style.display = `none`; 


    document.querySelector(`#highscore-display`).style.display = `block`; 

    highscorelist = document.querySelector(`ol`);

    highscorelist.innerHTML = `` 


    tempArray = JSON.parse(window.localStorage.getItem(`highscores`)); 

    if (tempArray != null) { 

        for (let index = 0; index < tempArray.length; index++) { 

            var newLi = document.createElement(`li`) 

            newLi.textContent = tempArray[index].names + ` - ` + tempArray[index].scores; 

            highscorelist.appendChild(newLi); 

        }

    } else { 

        var newLi = document.createElement(`p`) 

        newLi.textContent = `No Highscores` 

        highscorelist.appendChild(newLi); 

    }

    return;
}
//clears the local storage
function clearHighscores() {
    document.querySelector(`ol`).innerHTML = ``; 

    window.localStorage.clear(); 

    Game(); 

    return;
}



makeitwork();