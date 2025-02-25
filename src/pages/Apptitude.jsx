import React, { useState, useEffect } from "react";
import Options from "../components/Options";
import apti from "../company_data/questions_part1.json";
import reasoning from "../company_data/questions_part2.json";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function Apptitude() {
  const [questions, setQuestions] = useState([]); // Store 20 random questions
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected answers
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Track if quiz is submitted
  const [score, setScore] = useState(0); // Track score

  useEffect(() => {
    // Combine both question sets and shuffle
    const combinedQuestions = [...apti, ...reasoning];
    const shuffledQuestions = combinedQuestions.sort(() => 0.5 - Math.random()).slice(0, 20);
    setQuestions(shuffledQuestions);
  }, []);

  const handleSelectOption = (optionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: optionKey, // Save selected option key for current question
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    questions.forEach((q, index) => {
      if (selectedOptions[index] === q.answer.key) {
        totalScore += 1; // Increase score for correct answer
      }
    });
    setScore(totalScore);
    setQuizSubmitted(true);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (quizSubmitted) {
    const overallPerformance = (score / questions.length) * 100; // Calculate percentage

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-lg mt-2">Your Score: {score} / {questions.length}</p>
          
          {/* Performance Gauge */}
          <Gauge
            value={overallPerformance}
            startAngle={-110}
            endAngle={110}
            width={250}
            height={250}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 35,
                color: "black",
                fontWeight: "600",
              },
            }}
            text={({ value }) => `${Math.round(value)}%`}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const optionsArray = Object.entries(currentQuestion.options); // Convert options object to array

  return (
    <div className="w-full h-screen  p-4">
      {/*  */}
      <div className="w-full h-43 flex justify-center items-center">
        <div className="w-[80%] h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent">
        🧠 Aptitude Prep
  </h1>
  <p className="mt-2 text-sm md:text-lg text-gray-600 hidden md:block">
  Practice and improve your problem-solving skills for exams and placements! 🚀
  </p>
        </div>
        <div className="md:w-[20%] h-full flex justify-center items-center hidden">
          <button
            className="w-40 h-12 bg-white rounded-xl flex justify-center items-center border-2 border-gradient-to-r from-[#E4C9F5] to-[#C55FF4] cursor-pointer"
            onClick={() => setPopupOpen(true)}
          >
            <p className="text-center bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent ">
              Add new room
            </p>
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center">

      <div className="w-full max-w-3xl bg-gradient-to-r from-[#D5E3E7] via-[#EFF3CD] via-[#E4F2F6] to-[#D5E3E7] rounded-lg shadow-lg p-2">
        {/* Question Section */}
        <div className="w-full text-center py-4 border-b">
          <span className="text-xl md:text-xl font-semibold">
            {currentQuestion.question}
          </span>
        </div>

        {/* Options Section */}
        <div className="w-full mt-4 flex flex-col gap-3">
          {optionsArray.map(([key, optionText]) => (
            <Options
              key={key}
              label={optionText}
              isSelected={selectedOptions[currentIndex] === key}
              onSelect={() => handleSelectOption(key)}
            />
          ))}
        </div>

        {/* Navigation & Submit Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-400"
          >
            <i className="fa-solid fa-arrow-left"></i> Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Apptitude;
