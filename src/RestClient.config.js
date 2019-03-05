const fs = require('fs')

let token = fs.readFileSync('./group4.jwt')
token = token.toString().replace(/\r?\n|\r/g, '')
let host = {
    hostname: "http://health-safety.dev.api.kemppi.com",
    port: 8080,
    paths: {
        status: '/health',
        sensordata: '/api/sensordata'
    }
}
let url =  `${host.hostname}:${host.port}`
let headers = JSON.stringify({
        Authorization: 'Bearer ' + token
})
module.exports = {
    host: host,
    url: url,
    headers: headers,
    token: token
}