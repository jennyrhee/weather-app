const API_KEY = process.env.API_KEY;

function isZip(location) {
  return /^\d{5}(-\d{4})?$/.test(location);
}

async function getLocation(lat, lon, limit = 1) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`,
    );
    const locationData = await response.json();

    return { city: locationData[0].local_names.en, state: locationData[0].state };
  } catch (err) {
    console.log(err);
  }
}

async function getCurrentWeather(location) {
  try {
    const response = isZip(location) 
      ? await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${API_KEY}&units=imperial`,
      )
      : await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`,
      );

    if (response.status === 200) {
      const weatherData = await response.json();
      return {
        name: weatherData.name,
        ...weatherData.coord,
        ...weatherData.weather[0],
        ...weatherData.main
      };
    } else return response;

  } catch (err) {
    console.log(err);
  }
}

async function getData(location) {
  const currentData = await getCurrentWeather(location);
  if (currentData.status === 404) return currentData;
  else {
    const locationData = await getLocation(currentData.lat, currentData.lon);
    return {
      ...locationData,
      ...currentData
    };
  }
}

export { getData }