
const environment = 'development';
const serverUrl = '';


export default {
   apiurl : environment == 'development' ? '' 
                                         : '',
   host : serverUrl,
}