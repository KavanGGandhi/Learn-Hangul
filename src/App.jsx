import { useState } from 'react'
import AnswerInput from './AnswerInput.jsx'
import { scoreInitialState } from './constants'

export default function App({ consonants, vowels }) {
    const [questions, setQuestions] = useState(consonants.concat(vowels));
    const [questionsLength, setQuestionsLength] = useState(consonants.concat(vowels).length);

    const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * questionsLength));
    const {question, answer} = questions[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(scoreInitialState);
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const [input, setInput] = useState('');
    const [skip, setSkip] = useState(false);
    const [modal, setModal] = useState(false);
    const [consonantTrue, setConsonantTrue] = useState(true);
    const [vowelTrue, setVowelTrue] = useState(true);

    const answerList = answer.map((element, i) => [ i > 0 && ", ", <li key={i}>{element}</li>]);

    const updateSettings = () => {
        let temp = [];
        if (consonantTrue) {
            temp = temp.concat(consonants);
        }
        if (vowelTrue) {
            temp = temp.concat(vowels);
        }
        setQuestions(temp);
        setQuestionsLength(temp.length);
        setCurrentQuestion(Math.floor(Math.random() * questionsLength));
    }

    const toggleConsonants = () => {
        setConsonantTrue(!consonantTrue);
        updateSettings();
    }

    const toggleVowels = () => {
        setVowelTrue(!vowelTrue);
        updateSettings();
    }

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
                    Settings
                    <br></br>
                    <button 
                    style={consonantTrue ? {backgroundColor: "green"} : {backgroundColor: "red"}}
                    onClick={toggleConsonants}>Consonants</button>
                    <button 
                    style={vowelTrue ? {backgroundColor: "green"} : {backgroundColor: "red"}} 
                    onClick={toggleVowels}>Vowels</button>
                    <button onClick={toggleSettings} className='closeModal'>X</button>
                </div>
                
            </div>)}
        </div>
    )
};
