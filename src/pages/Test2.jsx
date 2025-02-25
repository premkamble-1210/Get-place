import React, { useState } from 'react';
import Leetcode from '../company_data/leetcode_questions.json';




function Test2() {
  const [sarech, setSarech] = useState('');
   const [isPopupOpen, setPopupOpen] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  const handlesubmit = () => {
    if (sarech) {
      console.log('Search term:', sarech);

      const searchKey = sarech.toLowerCase();
      const matchedCompany = Object.keys(Leetcode).find(
        (company) => company.toLowerCase() === searchKey
      );

      if (matchedCompany) {
        const questions = Leetcode[matchedCompany].questions;
        setCompanyData(questions);

        console.log('Company Data Found:', {
          questionLinks: questions.question_links,
          questionNames: questions.question_names,
          occurrences: questions.occurrences,
        });
      } else {
        console.log('No data found for the entered company.');
        setCompanyData(null);
      }
    } else {
      console.log('Please enter the company name.');
    }
  };

  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-43 flex justify-center items-center">
        <div className="w-[80%] h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent">
          Company-Specific Questions
          </h1>
          <p className="mt-2 text-sm md:text-lg text-gray-600 hidden md:block">
          Explore, prepare, and excel with curated company-specific questions tailored for your technical interviews.   </p>
        </div>
        
      </div>

      <div className="w-full h-[80%] flex flex-col justify-center items-center">
        <div className="w-[100%] h-[30%] flex justify-center items-center">
          <input
            type="text"
            value={sarech}
            onChange={(e) => setSarech(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlesubmit()}
            placeholder="Search any company eg. Google, tcs"
            className="h-12 w-[40%] outline-none border-2 rounded-xl text-center bg-white"
          />
          <button
            className="w-40 h-12 bg-white rounded-xl flex justify-center items-center border-2 border-gradient-to-r from-[#E4C9F5] to-[#C55FF4] cursor-pointer ml-10"
            onClick={handlesubmit}
          >
            <p className="text-center bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent">
              Done 👍
            </p>
          </button>
        </div>

        <div className="w-[100%] h-[70%]  p-4 rounded-lg overflow-y-auto">
          {companyData ? (
            <table className="w-full border-collapse border border-gray-500 text-center bg-transparent rounded-2xl">
              <thead>
                <tr>
                  <th className="border border-gray-500 px-4 py-2">Question Name</th>
                  <th className="border border-gray-500 px-4 py-2">Question Link</th>
                  <th className="border border-gray-500 px-4 py-2">Occurrences</th>
                </tr>
              </thead>
              <tbody>
                {companyData.question_names.map((name, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 px-4 py-2">{name}</td>
                    <td className="border border-gray-500 px-4 py-2">
                      <a
                        href={companyData.question_links[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        <button className='h-8 w-12 rounded-lg bg-[#04de71] cursor-pointer hover:bg-green-400 text-white'>Solve</button>
                      </a>
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {companyData.occurrences[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white text-lg text-center">No data to display. Search for a company!</p>
          )}
        </div>
      </div>
     </div>
  );
}

export default Test2;
