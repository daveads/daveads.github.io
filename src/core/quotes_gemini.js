
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key
const API_KEY = process.env.GEMINI_KEY
const genAI = new GoogleGenerativeAI(API_KEY);


async function run() {
// For text-only input, use the gemini-pro model

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const quotes = ["A short quote in Physics", "A short quote in Mathematics"];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const random_prompt = quotes[randomIndex];
  
  const Result = await model.generateContent(random_prompt);

  const response = Result.response;
  const resp = response.text();
  
  return resp;

}


export default run 

/*
document.addEventListener("DOMContentLoaded", async function() {
    var hello = await run();
    if(document.getElementById('resp')){
        document.getElementById('container').style.display = "block";
        document.getElementById('resp').textContent = hello;
    }
  
  });
*/