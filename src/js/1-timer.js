import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    if (selected <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        color: '#ef4040',
        titleColor: '#fff',
        iconColor: 'white',
        messageColor: '#fff',
        progressBarColor: '#b51b1b',
        theme: 'light',
      });
      button.setAttribute('disabled', true);
      return;
    }
    button.removeAttribute('disabled');
    userSelectedDate = selected;
  },
};

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

const button = document.querySelector('[data-start]');
button.setAttribute('disabled', true);
button.addEventListener('click', handleClick);

function handleClick() {
  button.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    const deltaTime = userSelectedDate - Date.now();
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      update({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      button.removeAttribute('disabled');
      input.removeAttribute('disabled');
      return;
    }
    update(convertMs(deltaTime));
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function update({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}
