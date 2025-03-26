import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


// Описані в коді повідомлення
const successMessage = {
  title: 'OK',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#59a10d',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
};

const errorMessage = {
  title: 'Error',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
};

const cautionMessage = {
  title: 'Caution',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#ffa000',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
};

const informingMessage = {
  title: 'Hello',
  message: 'Welcome!',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#09f',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
};

// Показуємо перше інформативне повідомлення
iziToast.show({
  ...informingMessage,
});

const form = document.querySelector('.form');
form.setAttribute('novalidate', '');

document.querySelector('button').addEventListener('click', event => {
  event.preventDefault(); // Зупиняємо перезавантаження сторінки при натисканні на кнопку

  const delayInput = document.querySelector('input[name="delay"]');
  if (!delayInput) return; // Якщо інпут не знайдений — виходимо
  const delay = Number(delayInput.value);

  if (isNaN(delay) || delay < 0) {
    iziToast.show({
      ...cautionMessage,
      message: 'Invalid delay value',
    });
    return;
  }

  const state = document.querySelector('input[name="state"]:checked')?.value;

  // Створюємо обіцянку (promise)
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.success({
          ...successMessage,
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
        resolve(delay);
      } else {
        iziToast.error({
          ...errorMessage,
          message: `❌ Rejected promise in ${delay}ms`,
        });
        reject(delay);
      }
    }, delay);
  });

  // Обробка виконання та відхилення обіцянки
  promise
    .then(result => console.log(`✅ Fulfilled in ${result}ms`))
    .catch(error => console.log(`❌ Rejected in ${error}ms`));

  // Очищуємо форму після виконання
  form.reset();
});
