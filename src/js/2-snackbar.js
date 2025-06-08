import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(form.elements.delay.value);
  const checkedRadio = form.elements.state.value === 'fulfilled';
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkedRadio) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })

    .then(() => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        color: '#59a10d',
        messageColor: '#fff',
      });
    })
    .catch(() => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        color: '#ef4040',
        messageColor: '#fff',
      });
    });
});
