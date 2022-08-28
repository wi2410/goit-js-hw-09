import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayEl = document.querySelector('[name="delay"]');
const delayStepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

form.addEventListener('submit', onClickSubmit);

function onClickSubmit(ev) {
  ev.preventDefault();
  let delay = +firstDelayEl.value;
  let step = +delayStepEl.value;
  const amount = +amountEl.value;

  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delay+=step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
            reject({ position, delay });
          }
      }, delay);
  })

}

