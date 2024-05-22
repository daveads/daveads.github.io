import run from './core/quotes_gemini.js';

async function helloWorld() {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    },); // wait 2 seconds before resolving
  });
  return "Hello World Test";
}


document.addEventListener("DOMContentLoaded", async function() {
  var hello = await run();
  if(document.getElementById('resp')){
      document.getElementById('container').style.display = "block";
      document.getElementById('resp').textContent = hello;
  }

});