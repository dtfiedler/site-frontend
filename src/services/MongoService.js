import axois from 'axios';

/**
 * The host of the backend service.
 * @type {string}
 */
const BACKEND_HOST = process.env.BACKEND_HOST || '127.0.0.1';


export default {
    /**
     * Fetches weather for a given lat and long.
     * @param {string} lat 
     * @param {long} long 
     * @returns {Promise} - the promise that resolves returned weather details
     */
    async saveLookup(lat, long, time){
        return await axois({
            method: 'GET',
            url: `${BACKEND_HOST}/api/weather/${lat}/${long}/${time}`,
        });
    }
}