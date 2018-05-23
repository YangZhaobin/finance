import axios from 'axios';
const Tool = require('@/tool/index');

// axios.defaults.proxy = {
//     host: '127.0.0.1',
//     port: 9000
// };
let token = Tool.Cookie.get('financeCookieId') || '';
axios.defaults.headers.common['X-CSRF-Token'] = token;

export default axios;