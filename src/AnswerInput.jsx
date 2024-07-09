import React, { useState } from 'react';

export default function AnswerInput({ input, setInput, isCorrect, handleInputSubmit }) {

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = () => {
        handleInputSubmit(input);
        setInput('');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div>
            <div>
                <input 
                    className="answerInput"
                    type="text" 
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}/>
                <button className="submit" onClick={handleSubmit}>Submit</button>
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