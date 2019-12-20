import axois from 'axios';

/**
 * The host of the darksy endpoint service.
 * @type {string}
 */
const DARKSKY_HOST = process.env.DARKSKY_HOST;

/**
 * Secret key for dark sky.
 * @type {string}
 */
const DARKSKY_SECRET = process.env.DARKSKY_SECRET;

/**
 * Service to retrieve weather information from Dark Sky.
 * 
 */
export default {
    /**
     * Fetches weather for a given latitude, longitude, and time duration.
     * 
     * Reference: https://darksky.net/dev/docs#time-machine-request
     * 
     * @param {string} lat
     * @param {string} long
     * @param {string} time - the time 
     * @returns {Promise} - the promise that resolves returned weather details
     */
    async fetchWeatherHistory(lat, long, time = 'day'){
        return await axois({
            method: 'GET',
            url: `${DARKSKY_HOST}/${DARKSKY_SECRET}/${lat},${long},${time}`,
        });
    }
}