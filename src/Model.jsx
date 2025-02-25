// components/Model.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAYAVFe8IlXRMmYydEUGMBBREav6VGV3Hg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);
  console.log("Full API response:", result);
  return result.response.candidates[0].content.parts[0].text;  ;
};
