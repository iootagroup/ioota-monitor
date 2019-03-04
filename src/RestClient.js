const request = require('request')
const fs = require('fs')

// Define the hostname
let hostname = 'http://health-safety.dev.api.kemppi.com'

// Define the port
let port = 8080

// Define the path
let path = '/api/sensordata?type=SENSORNAME&start=2010-01-01T00:00:00Z&end=2019-04-03T18:12:41Z&limit=100&from=0'

// Define the url
var url = hostname + ':' + port + path

// Define the JSON web token
let jwt = fs.readFileSync('./group4.jwt')

// Define the options
var options = {
    url: url,
    headers: {
        'Authorization': 'Bearer ' + jwt
    }
}

module.exports = {
    getStatus: (callback) => {
        request.get(`${hostname}:${port}/health`, (err, res, body) => {
            if (err) throw err
            console.log('Received response')
            status = JSON.parse(body).status == 'ONLINE' ? "Online" : "Offline"
            time = JSON.parse(body).timestamp
            return callback(status, time)
        })
    },
    getData: (callback) => {
        request.get(options, (err, res, body) => {
            let data = body 
            // Parse the data here
            return callback(data)
        })
    },
    postData: (data) => {
        request.post({url: 'http://health-safety.dev.api.kemppi.com:8080/api/sensordata', headers: {'Authorization': 'Bearer ' + jwt }, json: data}, (err, res, body) => {
            if (err) throw err
            console.log(body)
        })
    }, 
    deleteData: (callback) => {
        request.delete({url: 'http://health-safety.dev.api.kemppi.com:8080/api/sensordata', headers: {'Authorization': 'Bearer ' + jwt }, json: {clear: true}}, (err, res, body) => {
            if (err) throw err
            return callback(body.message)
            console.log(body.message)
        })
    }
}