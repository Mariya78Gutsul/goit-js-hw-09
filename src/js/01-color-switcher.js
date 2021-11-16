

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
 }
 const btnStart = document.querySelector("button[data-start]");
 const btnStop = document.querySelector("button[data-stop]");
 const body = document.querySelector("body");
 let timerId = null;

 btnStart.addEventListener("click", () => {
    body.classList.add("background-color");
    btnStart.disabled = true;
    timerId = setInterval(() => {
       body.style.backgroundColor = getRandomHexColor();
    }, 1000);
 });
 btnStop.addEventListener("click", () => {
   btnStart.disabled = false;
   clearInterval(timerId) 
 });
