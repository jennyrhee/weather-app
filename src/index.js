import './css/style.css';
import { getData } from './api';

function fillDiv(query, text) {
  const div = document.querySelector(query);
  div.textContent = text;
}

function showData(data) {
  fillDiv('.location', `${data.city}, ${data.state}`)
  fillDiv('.description', data.main);

  const icon = document.querySelector('.icon');
  icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  fillDiv('#main-temp', Math.round(data.temp));

  const etcs = document.querySelectorAll('.etc');
  etcs[0].textContent = `Feels like: ${Math.round(data.feels_like)}`;
  etcs[1].textContent = `Humidity: ${data.humidity}%`;
}

function initializeForm(formId) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    getData(e.target[0].value).then(data => showData(data));
  })
}

(() => {
  getData('Lafayette').then(data => {
    console.log(data);
    showData(data);
  });
  initializeForm('form');
})();
