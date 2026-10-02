import { useState } from "react";
import QuestionCard from "./components/QuestionCard";

function App() {

  const questions = [

    {
      question:"Which language is used for React?",
      options:["Python","JavaScript","Java","C++"],
      correctIndex:1
    },

    {
      question:"HTML stands for?",
      options:[
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Home Tool Markup Language",
        "Hyperlinks Text"
      ],
      correctIndex:0
    },

    {
      question:"CSS is used for?",
      options:["Database","Styling","Backend","Server"],
      correctIndex:1
    },

    {
      question:"Which hook manages state?",
      options:["useFetch","useState","useData","useAPI"],
      correctIndex:1
    },

    {
      question:"React is a ____ ?",
      options:["Framework","Library","Language","Database"],
      correctIndex:1
    }

  ];

  const [current,setCurrent]=useState(0);

  const [score,setScore]=useState(0);

  function nextQuestion(answer){

    if(answer===questions[current].correctIndex){

      setScore(score+1);

    }

    setCurrent(current+1);

  }

  function restart(){

    setCurrent(0);

    setScore(0);

  }

  if(current===questions.length){

    return(

      <div>

        <h1>Quiz Finished</h1>

        <h2>Your Score : {score} / {questions.length}</h2>

        <button onClick={restart}>
          Restart Quiz
        </button>

      </div>

    );

  }

  return(

    <div>

      <h2>

        Question {current+1} of {questions.length}

      </h2>

      <QuestionCard

        question={questions[current]}

        nextQuestion={nextQuestion}

      />

    </div>

  );

}

export default App;