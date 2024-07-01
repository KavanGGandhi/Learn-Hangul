import React, { useState } from 'react';

export default function AnswerInput({ isCorrect, handleInputSubmit }) {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = () => {
        handleInputSubmit(input);
        setInput('');
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={input}
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