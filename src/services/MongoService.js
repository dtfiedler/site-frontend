import axois from 'axios';

/**
 * The host of the backend service.
 * @type {string}
 */
let BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || 'http://127.0.0.1:3000';

export default {
    /**
     * Fetches weather for a given lat and long.
     * @param {string} lat 
     * @param {long} long 
     * @param {date} - the day for which weather request as created
     * @returns {Promise} - the promise that resolves returned weather details
     */
    async saveWeatherRequest(lat, long, date){
        const response = await axois({
            method: 'GET',
            url: `${BACKEND_HOST}/api/weather/save/${lat}/${long}/${date}`,
        });
        return response.data;
    }
}