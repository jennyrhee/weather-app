import './css/style.css';
import { getData } from './api';

(() => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = getData(e.target[0].value);
    console.log(data);
  })
})();
