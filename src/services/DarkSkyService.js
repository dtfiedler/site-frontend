import axois from 'axios';
/**
 * The host of the darksy endpoint service.
 * @type {string}
 */
let DARKSKY_HOST = process.env.REACT_APP_DARKSKY_HOST;

/**
 * Secret key for dark sky.
 * @type {string}
 */
const DARKSKY_SECRET = process.env.REACT_APP_DARKSKY_SECRET;

/**
 * Append proxy to enable CORS for heroku apps.
 * 
 * Reference: https://cors-anywhere.herokuapp.com/
 */
if (process.env.REACT_APP_CORS_ANYWHERE){
    DARKSKY_HOST = `${process.env.REACT_APP_CORS_ANYWHERE}/${DARKSKY_HOST}`
}

/**
 * Service to retrieve weather information from Dark Sky.
 */
export default {
    /**
     * Fetches weather for a given latitude, longitude, and time duration.
     * 
     * Reference: https://darksky.net/dev/docs#time-machine-request
     * 
     * @param {string} lat
     * @param {string} long
     * @param {string} time - the epoch timestamp to request
     * @returns {Promise} - the promise that resolves returned weather details
     */
    async fetchWeatherHistory(lat, long, time){
        const response = await axois({
            method: 'GET',
            url: `${DARKSKY_HOST}/${DARKSKY_SECRET}/${lat},${long},${time}?exclude=hourly`,
        }) 
        return response.data;   
    }
}