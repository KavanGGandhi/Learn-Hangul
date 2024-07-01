import { useState } from 'react'
import './App.css'
import AnswerInput from './AnswerInput.jsx'

export default function App({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const {question, answer} = questions[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(null);

    const handleInputSubmit = (input) => {
        if (answer.includes(input)) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }
    
    return (
        <div>
            <h1>Hangul Practice</h1>
            <div>
                <h2>{question}</h2>
            </div>
            <AnswerInput isCorrect={isCorrect} handleInputSubmit={handleInputSubmit}/>
        </div>
    )
};
