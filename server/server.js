const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const fs = require('fs');

let questions = [];
let currentCorrectUsers = [];
let Users = [];
let currentQuestionNum = 1;
let maxQuestions = 5;
let lobby = [];
let currentQuestion = null;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

fs.readFile(__dirname+"/qmana-questions.json", 'utf8', (err, data) => {
    if (err) throw err;
    questions = JSON.parse(data);
  });

function getNewQuestion() {
    return questions[Math.floor(Math.random()*questions.length)];
}

function nextQuestion(socket) {
    currentCorrectUsers = [];
    //grab a new question
    currentQuestion = getNewQuestion()  
    io.emit('new-question',(currentQuestion) )
        
    //set timer for question- set timer for 10secs. when timer finishes we send question complete
    var QuestionCountdown = setInterval(function(){
        //question complete msg will contain who got it right
        io.emit('question-complete', {'answer': currentQuestion.answer, 'currentCorrectUsers': currentCorrectUsers})
        //after sending question complete start another timer. wait 5secs. This timer will be to send next question.
        var NewQuestionCountdown = setInterval(function(){
            if (currentQuestionNum < maxQuestions) {
                currentQuestionNum++
                //add some logic to tell if you want to ask question or tell if game is over.
                nextQuestion(socket);
            }else {
                //send endgame message
                io.emit('gameover', (currentCorrectUsers))
            }
            clearInterval(NewQuestionCountdown);
        }, 5000);
        clearInterval(QuestionCountdown);
    }, 10000);
}
//num players screenLeft. count array
//hook up game over-screen
//lobby- players are waiting to start
//start game button will be in lobby page
//



function onConnection(socket) {
    console.log('connected', socket.id)
    socket.on('add-user', (data) => {
        let newUser = { username: data.username, id: socket.client.id }
        Users.push(newUser)
        io.emit('new-player', (Users))
        console.log('sending question');
        //takes in all logic for handling one funciton
        //keep track of how many question and how many left. counter for how many questions per game
        //load json file when server starts
    })

    socket.on('start-game', (data) => {
        nextQuestion(socket);
    })

    socket.on('choice', (data) => {
        if (data.answer === currentQuestion.answer ) {
            currentCorrectUsers.push(data.id)
        }
    })
}

app.get('/api/users', (request, response) => {
    return response.send(Users)
})

io.on('connection', onConnection);


http.listen(port, () => console.log('listening on port ' + port));


// {
//     "id": 3,
//     "prompt": "Who was the first woman pilot to fly solo across the Atlantic?:",
//     "choices": [
//       "Susan B. Anthony",
//       "Beyonce",
//       "Amelia Earhart",
//       "Hew Keller"
//     ],
//     "answer": "Amelia Earhart",
//     "links": [
//       {
//         "href": "www.google.com",
//         "text": "LMGTFY"
//       }
//     ]
//   },
//   {
//     "id": 4,
//     "prompt": "The Hoover Dam in the United States is built on what river?",
//     "choices": [
//       "North Carolina River",
//       "The Colorado River",
//       "Yadkin River",
//       "Hoover River"
//     ],
//     "answer": "The Colorado River",
//     "links": [
//       {
//         "href": "www.google.com",
//         "text": "LMGTFY"
//       }
//     ]
//   },
//   {
//     "id": 6,
//     "prompt": "Steve Jobs, Steve Wozniak, and Ronald Wayne founded what company in 1976?",
//     "choices": [
//       "Nintendo",
//       "Sony",
//       "Microsoft",
//       "Apple Computer, Inc."
//     ],
//     "answer": "Apple Computer, Inc.",
//     "links": [
//       {
//         "href": "www.google.com",
//         "text": "LMGTFY"
//       }
//     ]
//   },
//   {
//     "id": 7,
//     "prompt": "How many feet are in a mile?",
//     "choices": [
//       "5280",
//       "328",
//       "1020",
//       "About 200"
//     ],
//     "answer": "5280",
//     "links": [
//       {
//         "href": "www.google.com",
//         "text": "LMGTFY"
//       }
//     ]
//   },
//   {
//     "id": 9,
//     "prompt": "All of these are examples of ORMs except?",
//     "choices": [
//       "Express",
//       "Sequelize",
//       "A custom library taking callbacks",
//       "Mongoose"
//     ],
//     "answer": "Express",
//     "links": [
//       {
//         "href": "www.google.com",
//         "text": "LMGTFY"
//       }
//     ]
//   },