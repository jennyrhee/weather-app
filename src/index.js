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

function showError(response) {
  alert(`${response.statusText}. Try another location.`);
}

function handleResponse(entry) {
  getData(entry).then(data => {
    if (data.status === 404) showError(data);
    else showData(data);
  });
}

function formatEntry(entry) {
  let formatted = entry.replace(/\s*,\s*/g, ',');
  if ((formatted.match(',') || []).length === 1) {
    // Assumes if a comma, then it's a city and state in the US
    // Might be a bad assumption
    formatted = `${formatted}, USA`;
  }
  return formatted;
}

function initializeForm(formId) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const entry = formatEntry(e.target[0].value)
    handleResponse(entry);
  })
}

(() => {
  handleResponse('Lafayette');
  initializeForm('form');
})();
