const axios = require('axios');


var session_url = 'https://atlantia-dev-test.herokuapp.com/api/auth';
var credentials = {"authuser": "Pm7EMK6Cfp9gn568"};

var profile_url = 'https://atlantia-dev-test.herokuapp.com/api/profile';

class Service {

    constructor() {
        this.http = axios;
    }

    login() {
        return this.http.post(session_url, credentials)
            .then((response) => response.data)
            .then((response) => response.token)
            .catch(console.log)
    }
    post() {
        return this.login().then(token => {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            return this.http.post(profile_url, {}, config).then(response => {
                return response.data;
            }).catch(e => {
                console.log(e.response)
            })
        })
    }

}


module.exports = new Service();
