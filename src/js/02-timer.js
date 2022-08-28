import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


let choosenDate;
let intervalId = 0;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Будь ласка, виберіть дату в майбутньому');
      refs.startBtn.setAttribute('disabled', true);
      return;
    }
    refs.startBtn.removeAttribute('disabled');
    choosenDate = selectedDates[0].getTime();
  },
};

flatpickr("input#datetime-picker", options);

refs.startBtn.addEventListener('click', onClickStartBtn)

function onClickStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    const deltaTime = convertMs(choosenDate - Date.now());
    updateClockFace(deltaTime);
    
      if (choosenDate - Date.now() < 1000) {
        clearInterval(intervalId);
      };
  }, 1000);

}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, `0`);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}