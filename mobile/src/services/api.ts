import axios from 'axios';

/**
 * Access api 
 * 
 * Emulator
 * IOS: http://localhost:3333
 * Android: 
 *    run command on terminal: adb reverse tcp:3333 tcp:3333
 *    http://localhost:3333
 * 
 * Device
 * IOS 
 * Android: 
 *    run command yarn start and get the IP address present on webpage of axios
 *    http://000.000.0.000:3333
 */


const api = axios.create({
  baseURL: 'http://192.168.0.106:3333',
});

export default api;