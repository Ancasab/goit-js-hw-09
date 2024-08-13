"use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
    } else {
      startBtn.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr("#datetime-picker", options);

const startBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

startBtn.disabled = true;

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(targetDate) {
  const deltaTime = targetDate - Date.now();
  if (deltaTime <= 0) {
    clearInterval(timerId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);

}

startBtn.addEventListener('click', () => {
  const selectedDate = new Date(flatpickrInstance.selectedDates[0]);
  startBtn.disabled = true;
  updateTimer(selectedDate);
  timerId = setInterval(() => {
    updateTimer(selectedDate);
  }, 1000);
});
