import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const textInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const spDays = document.querySelector('span[data-days]');
const spHours = document.querySelector('span[data-hours]');
const spMinutes = document.querySelector('span[data-minutes]');
const spSeconds = document.querySelector('span[data-seconds]');



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
    },
  };

const flat = flatpickr(textInput, options);

const addLeadingZero = value => String(value).padStart(2, 0);

function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
   return { days, hours, minutes, seconds };
 }
let timerId = null;
btnStart.addEventListener("click", timeStart);

function timeStart(event) {
  if (timerId) return;
 const differ = intervalCalback();
 if (differ < 1000) return;
 timerId = setInterval(intervalCalback, 1000); 
}

function intervalCalback() {
  const differ = flat.selectedDates[0].getTime() - new Date().getTime();
  if(differ < 0) {
    clearInterval(timerId);
    differ = null;
    return  differ;
  }
  let  { days, hours, minutes, seconds } = convertMs(differ);

  spDays.textContent = addLeadingZero(days);
  spHours.textContent = addLeadingZero(hours);
  spMinutes.textContent = addLeadingZero(minutes);
  spSeconds.textContent = addLeadingZero(seconds);

  return differ;
}