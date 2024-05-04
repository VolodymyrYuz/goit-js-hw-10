import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const delayInput = form.elements['delay'];
  const stateInput = form.elements['state'];

  const delay = parseInt(delayInput.value);
  const state = stateInput.value;

  try {
    const result = await createPromise(delay, state);
    if (state === 'fulfilled') {
      iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms` });
    } else {
      iziToast.error({ message: `❌ Rejected promise in ${result}ms` });
    }
  } catch (error) {
    iziToast.error({ message: `❌ Rejected promise in ${delay}ms` });
    console.error(error);
  }
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
