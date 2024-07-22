import { useEffect, useState } from 'react'
import AnswerInput from './AnswerInput.jsx'
import { scoreInitialState } from './constants'

//Function to shuffle the array of questions
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export default function App({ consonants, vowels }) {
    const [questions, setQuestions] = useState(consonants.concat(vowels));

    //State for the shuffled questions array
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    // State for the current question index
    const [currentIndex, setCurrentIndex] = useState(0);

    //Using a different method to randomize, this is the old method
    //const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * questions.length));
    //const {question, answer} = questions[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(scoreInitialState);
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const [input, setInput] = useState('');
    const [skip, setSkip] = useState(false);
    const [modal, setModal] = useState(false);
    const [consonantTrue, setConsonantTrue] = useState(true);
    const [vowelTrue, setVowelTrue] = useState(true);


    const updateSettings = () => {
        let temp = [];
        if (consonantTrue) {
            temp = temp.concat(consonants);
        }
        if (vowelTrue) {
            temp = temp.concat(vowels);
        }

        //If no options are selected, default to both
        if (temp.length === 0) {
            temp = consonants.concat(vowels);
            setConsonantTrue(true);
            setVowelTrue(true);
            alert('Please select at least one option (Consonants or Vowels). Defaulting to both.');
        }   
        setQuestions(temp);
        //setQuestionsLength(temp.length);
        //setCurrentQuestion(Math.floor(Math.random() * questionsLength));
        //let temp2 = shuffleArray([...temp]);
        setShuffledQuestions(shuffleArray([...temp]));
        //console.log(temp2);
        setCurrentIndex(0);
    }

    const toggleConsonants = () => {
        setConsonantTrue(!consonantTrue);
        //updateSettings();
    }

    const toggleVowels = () => {
        setVowelTrue(!vowelTrue);
        //updateSettings();
    }

    const handleInputSubmit = (input) => {
        const currentQuestion = shuffledQuestions[currentIndex];
        if (currentQuestion.answer.includes(input)) {
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
                 
                //Insert the incorrect question back into the shuffled questions array, at least 5 questions away and at most 10 questions away
                const incorrectQuestion = shuffledQuestions[currentIndex];
                setShuffledQuestions((prev) => {
                    console.log(prev);
                    const newQuestions = [...prev];
                    const insertIndex = (currentIndex + Math.floor(Math.random() * 6) + 5) % newQuestions.length;
                    newQuestions.splice(insertIndex, 1, incorrectQuestion);
                    //console.log(newQuestions);
                    console.log("insert index: " + insertIndex);
                    console.log("curr index: " + currentIndex);
                    console.log(newQuestions);
                    return newQuestions;
                });
            }
        }
    }

    const handleNextQuestion = () => {
        setSkip(false);
        //setCurrentQuestion(Math.floor(Math.random() * questions.length));
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledQuestions.length);
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

    useEffect(() => {
        updateSettings();
    }, [consonantTrue, vowelTrue]);

    useEffect(() => {
        updateSettings();
    }, []);

    if (shuffledQuestions.length === 0) return null;

    const currentQuestion = shuffledQuestions[currentIndex];
    const answerList = currentQuestion.answer.map((element, i) => [ i > 0 && ", ", <li key={i}>{element}</li>]);

    return (
        <div>
            <div className="flex-none font-sans">
                <div className="flex-none relative">
                    <div className="flex justify-between p-4 bg-white shadow-md">
                    <button
                        onClick={toggleSettings} 
                        className="px-6 font-semibold rounded-md border border-slate-200 text-slate-900 text-xl"> 
                        Settings 
                    </button>
                    <div className="text-slate-900 font-semibold text-3xl">
                        {score.correct + '/' + score.total}
                    </div>
                </div>
                
                <button
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white mt-20 mb-3 text-2xl"
                    type="submit"
                    onClick={handleSkip}>
                    Skip
                </button>

                {skip ? <ul className='answers mt-4 text-slate-700 font-medium'>{answerList}</ul> : null}
                    <div className="kSymbol">{currentQuestion.question}</div>
                <AnswerInput input={input} setInput={setInput} isCorrect={isCorrect} handleInputSubmit={handleInputSubmit}/>
                
                {modal && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                        <div className='absolute inset-0 bg-black opacity-50'></div>
                        <div className='bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto z-10'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold text-slate-900'>Settings</h2>
                            <button onClick={toggleSettings} className='text-slate-900 font-bold'>
                            X
                            </button>
                        </div>
                        <div className='space-y-1'>
                            <button
                            className={`w-4/12 py-2 rounded-md mr-3 ${consonantTrue ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                            onClick={toggleConsonants}>
                            Consonants
                            </button>

                            <button
                            className={`w-4/12 py-2 rounded-md ml-3 ${vowelTrue ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                            onClick={toggleVowels}>
                            Vowels
                            </button>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
};
