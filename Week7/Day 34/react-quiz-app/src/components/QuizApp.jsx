import { useState, useEffect } from "react";

import { questions } from "../data/questions";

function QuizApp() {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [score, setScore] = useState(0);

    const [quizFinished, setQuizFinished] = useState(false);

    const [seconds, setSeconds] = useState(30);

    useEffect(() => {

        if (quizFinished) return;

        if (seconds <= 0) {

            setQuizFinished(true);

            return;

        }

        const timer = setInterval(() => {

            setSeconds((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [seconds, quizFinished]);

    function handleSelect(option) {

        if (selectedAnswer) return;

        setSelectedAnswer(option);

        if (option === questions[currentQuestion].answer) {

            setScore((prev) => prev + 1);

        }

        setTimeout(() => {

            if (currentQuestion + 1 < questions.length) {

                setCurrentQuestion((prev) => prev + 1);

                setSelectedAnswer(null);

            }

            else {

                setQuizFinished(true);

            }

        }, 800);

    }

    function restartQuiz() {

        setCurrentQuestion(0);

        setSelectedAnswer(null);

        setScore(0);

        setSeconds(30);

        setQuizFinished(false);

    }

    if (quizFinished) {

        return (

            <div className="quiz-container">

                <div className="quiz-card">

                    <h1>🎉 Quiz Completed</h1>

                    <h2>

                        Your Score

                    </h2>

                    <h3>

                        {score} / {questions.length}

                    </h3>

                    <button

                        onClick={restartQuiz}

                    >

                        Restart Quiz

                    </button>

                </div>

            </div>

        );

    }

    const question = questions[currentQuestion];

    return (

        <div className="quiz-container">

            <div className="quiz-card">

                <h1>

                    React Quiz App

                </h1>

                <div className="quiz-info">

                    <span>

                        Question {currentQuestion + 1} / {questions.length}

                    </span>

                    <span>

                        ⏳ {seconds}s

                    </span>

                </div>

                <h2>

                    {question.text}

                </h2>

                <div className="options">

                    {

                        question.options.map((option) => {

                            let className = "";

                            if (selectedAnswer) {

                                if (option === question.answer) {

                                    className = "correct";

                                }

                                else if (option === selectedAnswer) {

                                    className = "wrong";

                                }

                            }

                            return (

                                <button

                                    key={option}

                                    className={className}

                                    onClick={() =>

                                        handleSelect(option)

                                    }

                                >

                                    {option}

                                </button>

                            );

                        })

                    }

                </div>

            </div>

        </div>

    );

}

export default QuizApp;