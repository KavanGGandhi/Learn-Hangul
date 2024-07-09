import { useState } from 'react'
import AnswerInput from './AnswerInput.jsx'
import { scoreInitialState } from './constants'

export default function App({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * questions.length));
    const {question, answer} = questions[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(scoreInitialState);
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const [input, setInput] = useState('');
    const [skip, setSkip] = useState(false);
    const [modal, setModal] = useState(false);

    const answerList = answer.map((element, i) => [ i > 0 && ", ", <li key={i}>{element}</li>]);

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
        setSkip(false);
        setCurrentQuestion(Math.floor(Math.random() * questions.length));
    }
    const handleSkip = () => {
        if (!wrongAnswer) {
            setScore((prev) => ({
                ...prev,
                total: prev.total + 1
            }))
            setWrongAnswer(true);
        }
        setSkip(true);
    }

    const toggleSettings = () => {
        setModal(!modal);
    }

    return (
        <div>
            <div className="top">
                <button
                onClick={toggleSettings} 
                className="settingsButton"> 
                Settings </button>
                <div className="scoreboard">
                    {score.correct + '/' + score.total}
                </div>
            </div>
            <button className="skip" onClick={handleSkip}>SKIP</button>
            {skip ? <ul className='answers'>{answerList}</ul> : null}
            <div>
                <div className="kSymbol">{question}</div>
            </div>
            <AnswerInput input={input} setInput={setInput} isCorrect={isCorrect} handleInputSubmit={handleInputSubmit}/>
            {modal && (<div className='settingsModal'>
                <div className='overlay'></div>
                <div className='modalContent'>
                    Hello World
                    <button onClick={toggleSettings} className='closeModal'>X</button>
                </div>
                
            </div>)}
        </div>
    )
};
