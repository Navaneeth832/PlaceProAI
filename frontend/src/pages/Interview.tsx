import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const interviewQuestions = [
  "Explain the React component lifecycle methods and their corresponding hooks in a functional component. When would you use each?",
  "Describe different state management patterns in a large-scale React application. When would you choose one over another?",
  "How do you optimize the performance of a large-scale web application? Provide specific techniques you've implemented.",
  "Discuss the pros and cons of different CSS methodologies (e.g., BEM, CSS Modules, CSS-in-JS) and which you prefer for a complex project.",
  "What are some key considerations for ensuring web accessibility (A11y) in a frontend application? Provide examples of common pitfalls and how to avoid them.",
  "Explain what Web Workers are and how they can be used to improve web application performance. Can they directly manipulate the DOM?",
  "Describe your approach to testing frontend applications. What types of tests do you write and what tools do you use?",
  "What is the role of a bundler like Webpack or Vite in a modern frontend development workflow? Name some key features they provide.",
  "Describe a challenging technical problem you encountered in a frontend project and how you approached debugging and resolving it.",
  "How do you handle constructive feedback on your code from peers, and how do you provide it to others?"
];

const Interview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(interviewQuestions.length).fill(''));

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const goNext = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        AI Interview Bot
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
        Answer each question in your own words. Navigate using the buttons below.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Question {currentQuestion + 1} of {interviewQuestions.length}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {interviewQuestions[currentQuestion]}
        </p>
        <textarea
          className="w-full min-h-[150px] rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Type your answer here..."
          value={answers[currentQuestion]}
          onChange={handleAnswerChange}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={goPrevious}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </button>
          <button
            onClick={goNext}
            disabled={currentQuestion === interviewQuestions.length - 1}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
