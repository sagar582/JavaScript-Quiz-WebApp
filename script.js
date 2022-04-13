/* 
**@Description   : Use to hide the division when page loads
**@Since         : 2022
**@Author        : Sagar Ashal
*/
window.onload = function() {
    hideTimer();
    hideQuestions();
    hideResult();
}

var i = 0;
var timeInterval;
var questionInterval;
var correct = 0;
var incorrect = 0;
var attempted = 0;
var unattempted = 0;
var finalresult = 0;
var selectedAnswesArrOfObj = [];
var k;


var minutes;
var seconds;
var time;


/* 
**@Description   : Set the total timer value
**@Since         : 2022
**@Author        : Sagar Ashal
*/
function timerMin(){

    minutes = 0;
    seconds = 20;
    time = (minutes * 60)+seconds;
    minutes = Math.floor(time / 60);
    seconds = time % 60;
}

/* 
**@Description   : Push the timer to HTML page
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const timer = () => {
    document.getElementById("display_clock").innerHTML = "Time Left : " + minutes + ":" + seconds;
    time--;

    if (time < 0) {
        updateSelectedArrofObj();
        
        timerMin();
    }
};


timerMin();

var totalTime = (time * 2000) + 2000;


const questionsArrOfObj = [
    {
        question : "Who is the founder of 0 (Zero).",
        options : [ { option : "Aryabhata", tf : true},
                    { option : "Ramanujan", tf : false},
                    { option : "Charak", tf : false},
                    { option : "Sushruta", tf : false}]
    },
    {
        question : "World's largest Epic.",
        options : [ { option : "Ramayana", tf : false},
                    { option : "Mahabharata", tf : true},
                    { option : "Bhagavad Gita", tf : false},
                    { option : "Vishnu Puran", tf : false}]
    },
    {
        question : "World largest Temple.",
        options : [ { option : "Pashupatinath", tf : false},
                    { option : "Sri Ranganathaswamy Temple", tf : false},
                    { option : "Angkor Wat", tf : true},
                    { option : "The Kailasa temple", tf : false}]
    },
    {
        question : "Who Calculated the value of pie.",
        options : [ { option : "Aryabhata", tf : false},
                    { option : "Ramanujan", tf : false},
                    { option : "Baudhayana ", tf : true},
                    { option : "Sushruta", tf : false}]
    },
    {
        question : "Who is the Father of Surgery.",
        options : [ { option : "Aryabhata", tf : false},
                    { option : "Ramanujan", tf : false},
                    { option : "Charak", tf : false},
                    { option : "Sushruta", tf : true}]
    },
];


/* 
**@Description   : Hide the Timer
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const hideTimer = () => {
    document.getElementById("clock").style.display = "none";
};
/* 
**@Description   : Show the Timer
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const showTimer = () => {
    document.getElementById("clock").style.display = "block";
};


/* 
**@Description   : Hide the Questions
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const hideQuestions = () =>{
    document.getElementById("questions").style.display = "none";
}

/* 
**@Description   : Show the Questions
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const showQuestions = () =>{
    document.getElementById("questions").style.display = "block";
    hideButton();
}



/* 
**@Description   : Hide the start button
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const hideButton = () =>{
    document.getElementById("startbutton").style.display = "none";
}
/* 
**@Description   : Show the Start Button
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const showButton = () =>{
    document.getElementById("startbutton").style.display = "block";
}


/* 
**@Description   : Hide the Result
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const hideResult = () =>{
    document.getElementById("result").style.display = "none";
}


/* 
**@Description   : Display the result when quiz is completed
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const showResult = () => {
    updateResult();
    hideTimer();
    hideQuestions();
    res = (correct * 100) / questionsArrOfObj.length;
    document.getElementById("result").style.display = "block";
    document.getElementById("totalquestion").innerHTML = questionsArrOfObj.length;
    document.getElementById("attempted").innerHTML = correct + incorrect;
    document.getElementById("unattempted").innerHTML = questionsArrOfObj.length - (correct + incorrect);
    document.getElementById("correct").innerHTML = correct;
    document.getElementById("incorrect").innerHTML = incorrect;
    document.getElementById("percentage").innerHTML = res + "%";

    if(res>=40){
        let resmsg = document.getElementById("resultmsg");
        let passcolor = "#7CFC00";
        document.getElementById("resultmsg").style.color = passcolor;
        resmsg.setAttribute("class","bi bi-trophy");
        document.getElementById("resultmsg").innerHTML ="Congratulations! You have clear the Exam!";
    }
    else{
        let resmsg = document.getElementById("resultmsg");
        let failcolor = "#FF0000";
        document.getElementById("resultmsg").style.color = failcolor;
        resmsg.setAttribute("class","bi bi-emoji-frown-fill");
        document.getElementById("resultmsg").innerHTML = "Sorry! you have not clear this Exam!";
    }
};

/* 
**@Description   : Start the quiz when button clicked
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const startQuiz = () => {
    
    if (i == questionsArrOfObj.length - 1) {
        document.getElementById("next_que").value = "Submit";
    }
    else {
        document.getElementById("next_que").value = "Next";
    }
    timerMin();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    showTimer();
    showQuestions();
    hideButton();
    hideResult();
    timer();
    nextQuestion();

    timeInterval = setInterval(function () {
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (i <= questionsArrOfObj.length) {
            timer();
        }
    }, 1000);

    questionInterval = setInterval(function () {
        if (i < questionsArrOfObj.length) {
            nextQuestion();
        }
        else {
            showResult();
            showButton();
            clearInterval(timeInterval);
            clearInterval(questionInterval);
            timerMin();
            i = 0;
        }
    }, (totalTime/2));// 21000 milisecond from (00:00 to 00:20)
};

/* 
**@Description   : Redirect to the next question
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const nextQuestion = () => {

    document.getElementById("mcq").innerHTML = "";
    document.getElementById("question").innerHTML = (i + 1) + ".   " + questionsArrOfObj[i].question;
    for (var j = 0; j < questionsArrOfObj[i].options.length; j++) {
        document.getElementById("mcq").innerHTML += "<input class='form-check-input' type='radio' name='radioButton' value='" + questionsArrOfObj[i].options[j].option + "' id='optionCheckBox' onclick='clickBtn()'>" + questionsArrOfObj[i].options[j].option + "<br>";
    }

    i++;

};

/* 
**@Description   : Pop up the alert when options are not selected
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const clickBtn = () => {

    k = document.querySelector('input[name="radioButton"]:checked');
    k = k.value;
    //alert(k);
}

/* 
**@Description   : Redirect to next question when next button is clicked
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const nextQuestionBtn = () => {
    
    if (k==null) {
        alert("Please Select An Answer From Below Options");
    }
    else {
      timerMin();
    clearInterval(timeInterval);
    clearInterval(questionInterval);
    updateSelectedArrofObj();
    k=null;
    document.getElementById("mcq").innerHTML = "";

    if (i < questionsArrOfObj.length) {
        startQuiz();
    }
    else if (i == questionsArrOfObj.length) {
        showResult();
        showButton();
        i = 0;
        selectedAnswesArrOfObj = [];
    }
    }
};


/* 
**@Description   : Skips the question when skip button is clicked
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const skipQuestionBtn = () => {
    timerMin();
    clearInterval(timeInterval);
    clearInterval(questionInterval);
    document.getElementById("mcq").innerHTML = "";
    if (i < questionsArrOfObj.length) {
        startQuiz();
    }
    else if (i == questionsArrOfObj.length) {
        showResult();
        showButton();
        i = 0;
        selectedAnswesArrOfObj = [];
    }
};

/* 
**@Description   : Update to next question when time is over or next button clicked
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const updateSelectedArrofObj = () => {
    i--;
    var j = 0
    for (j = 0; j < questionsArrOfObj[i].options.length; j++) {
        if (questionsArrOfObj[i].options[j].option == k) {
            selectedAnswerObj = {
                questionObj: questionsArrOfObj[i].question,
                answerObj: [
                    {
                        optionObj: questionsArrOfObj[i].options[j].option,
                        tfObj: questionsArrOfObj[i].options[j].tf
                    }
                ]
            };
            selectedAnswesArrOfObj.push(selectedAnswerObj );
        }
    }
    i++;
};


/* 
**@Description   : Checks whether answer is right or wrong.
**@Since         : 2022
**@Author        : Sagar Ashal
*/
const updateResult = () => {
    
    correct = 0;
    incorrect = 0;
    for (i = 0; i < selectedAnswesArrOfObj.length; i++) {
         if (selectedAnswesArrOfObj[i].answerObj[0].tfObj) {
            correct++;
        }
        else {
            incorrect++;
        }
    }
};
