import { useState } from 'react'
import AnswerInput from './AnswerInput.jsx'
import { scoreInitialState } from './constants'

export default function App({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * questions.length));
    const {question, answer} = questions[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(scoreInitialState);
    const [wrongAnswer, setWrongAnswer] = useState(false);

    const handleInputSubmit = (input) => {
        if (answer.includes(input)) {
            if (wrongAnswer) {
                setIsCorrect(true);
                setWrongAnswer(false);
                handleNextQuestion();
            } else {
                setIsCorrect(true);
                setScore((prev) => ({
                    ...prev,
                    correct: prev.correct + 1,
                    total: prev.total + 1
                }))
                handleNextQuestion();
            }
            
        } else {
            if (wrongAnswer) {
                setIsCorrect(false);
            } else {
                setIsCorrect(false);
                setScore((prev) => ({
                    ...prev,
                    total: prev.total + 1
                }))
                setWrongAnswer(true);
            }
        }
    }

    const handleNextQuestion = () => {
        setCurrentQuestion(Math.floor(Math.random() * questions.length));
    }
    
    return (
        <div>
            <div class="top">
                <button class="settings"> Settings </button>
                <div class="scoreboard">
                    {score.correct + '/' + score.total}
                </div>
            </div>
            <div class="rest">
                <div class="title">
                    Hangul Practice
                </div>
                <div>
                    <div class="kSymbol">{question}</div>
                </div>
                <AnswerInput isCorrect={isCorrect} handleInputSubmit={handleInputSubmit}/>
            </div>
        </div>
    )
};
