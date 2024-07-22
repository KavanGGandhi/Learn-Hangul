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
        <div className="flex flex-col items-center p-4">
          <div className="flex space-x-2 mb-4">
            <input 
              className="border border-gray-300 rounded-md p-2 w-full"
              type="text" 
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
            />
            <button 
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="mt-2 text-center">
            {isCorrect === true && (
              <div className="text-green-500 font-medium">Correct!</div>
            )}
            {isCorrect === false && (
              <div className="text-red-500 font-medium">Incorrect!</div>
            )}
            {isCorrect === null && (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      );
}