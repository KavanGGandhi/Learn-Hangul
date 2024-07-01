import React, { useState } from 'react';

function AnswerInput() {
    const [answer, setAnswer] = useState('');
    //Example for now, will move to parent component later
    const [isCorrect, setIsCorrect] = useState(null);

    const correctAnswer = 'ga'; //Example

    const handleInputChange = (event) => {
        setAnswer(event.target.value);
    }

    //Example toy function to check if answer is correct
    const checkAnswer = (answer) => {
        if(answer === correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setAnswer('');
    }

    const handleSubmit = () => {
        checkAnswer(answer);
        setAnswer('');
    }

    //Example behavior for now, will move onto the parent component later
    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={answer}
                    onChange={handleInputChange}/>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            {isCorrect === true && (
                <div style={{color: 'green'}}>Correct!</div>
            )}
            {isCorrect === false && (
                <div style={{color: 'red'}}>Incorrect!</div>
            )}
            {isCorrect === null && (
                <div> </div>
            )}
        </div>
        );
}

export default AnswerInput;