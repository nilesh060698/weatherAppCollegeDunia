import { create } from 'apisauce';
const API_KEY = '113f5448edc8b6292a627addf6b766ca';
const api = create({
    baseURL: 'https://api.openweathermap.org/',
    headers: {
        'Content-Type': 'application/json',
    }
  })

export async function getWeatherReport(location) {
   return api
  .get(`data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`)
  .then(response => {return response.data })
}