import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
function AddaptiQ() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question_number: 1,
      question: "The average age of 8 men increases by 2 years when two women are included in place of two men of ages 20 and 24 years. Find the average age of the women?",
      options: {
        A: "18 years",
        B: "24 years",
        C: "30 years",
        D: "36 years"
      },
      answer: {
        key: "C",
        text: "30 years"
      },
      explanation: "20 + 24 + 8 * 2 = 60/2 = 30"
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    question_number: '',
    question: '',
    options: { A: '', B: '', C: '', D: '' },
    answer: { key: '', text: '' },
    explanation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      options: { ...prev.options, [name]: value }
    }));
  };

  const handleAddQuestion = () => {
    setQuestions(prev => [...prev, { ...newQuestion, question_number: prev.length + 1 }]);
    setNewQuestion({
      question_number: '',
      question: '',
      options: { A: '', B: '', C: '', D: '' },
      answer: { key: '', text: '' },
      explanation: ''
    });
    navigate('/Home/Apptitude');
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center  p-4'>
      <input 
        type='text' 
        name='question' 
        value={newQuestion.question} 
        onChange={handleChange} 
        placeholder='Enter question' 
        className='p-2 border rounded w-1/2 mb-2'
      />
      <div className='flex gap-2'>
        {['A', 'B', 'C', 'D'].map(option => (
          <input
            key={option}
            type='text'
            name={option}
            value={newQuestion.options[option]}
            onChange={handleOptionChange}
            placeholder={`Option ${option}`}
            className='p-2 border rounded w-1/4 mb-2'
          />
        ))}
      </div>
      <input
        type='text'
        name='answerKey'
        value={newQuestion.answer.key}
        onChange={(e) => setNewQuestion(prev => ({ ...prev, answer: { ...prev.answer, key: e.target.value } }))}
        placeholder='Correct option key (A/B/C/D)'
        className='p-2 border rounded w-1/2 mb-2'
      />
      <input
        type='text'
        name='answerText'
        value={newQuestion.answer.text}
        onChange={(e) => setNewQuestion(prev => ({ ...prev, answer: { ...prev.answer, text: e.target.value } }))}
        placeholder='Correct answer text'
        className='p-2 border rounded w-1/2 mb-2'
      />
      <input
        type='text'
        name='explanation'
        value={newQuestion.explanation}
        onChange={handleChange}
        placeholder='Explanation'
        className='p-2 border rounded w-1/2 mb-2'
      />
      <button onClick={handleAddQuestion} className='bg-blue-500 text-white px-4 py-2 rounded'>
        Add Question
      </button>
      
    </div>
  );
}

export default AddaptiQ;
