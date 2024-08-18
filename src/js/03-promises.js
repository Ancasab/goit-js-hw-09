"use strict";

import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      }
    }, delay);
  })
}

document.querySelector('.form').addEventListener("submit", event => {
  event.preventDefault();
  const delay = parseInt(event.target.delay.value);
  const step = parseInt(event.target.step.value);
  const amount = parseInt(event.target.amount.value);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + step * (i - 1); 
    createPromise(i, currentDelay)
      .then(value => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${value.position} in ${value.delay}ms`);
      })
      .catch(error => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${error.delay}ms`);
      });
  }
});





