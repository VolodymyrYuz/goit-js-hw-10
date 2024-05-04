import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-btn');
const daysValue = document.getElementById('days');
const hoursValue = document.getElementById('hours');
const minutesValue = document.getElementById('minutes');
const secondsValue = document.getElementById('seconds');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = new Date().getTime();

    if (selectedDate <= currentDate) {
      startBtn.disabled = true;
      iziToast.error({ message: 'Please choose a date in the future' });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  const selectedDate = new Date(dateTimePicker.value).getTime();
  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = selectedDate - now;

    if (distance <= 0) {
      clearInterval(timerInterval);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      startBtn.disabled = false;
      dateTimePicker.disabled = false;
      iziToast.success({ message: 'Countdown finished!' });
    } else {
      const { days, hours, minutes, seconds } = convertMs(distance);
      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
