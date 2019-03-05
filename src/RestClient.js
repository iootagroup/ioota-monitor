const request = require('request')
const fs = require('fs')
const path = require('path')

const rest = require('./RestClient.config.js')
const { Query } = require('./Query.js')

//let qfile = fs.readFileSync()
let qConfig = {
    sensor: 'sensorname',
    tsStart: new Date(2018, 11, 24, 10, 33, 30),
    tsEnd: new Date(2018, 11, 24, 18, 13, 12),
    limit: 100,
    from: 0
}

let q = new Query(qConfig)
q.path = q.returnPath()

module.exports = {
    getStatus: (callback) => {
        request.get(rest.url + rest.host.paths.status, (err, res, body) => {
            if (err) throw err
            console.log('Received response')
            status = JSON.parse(body).status == 'ONLINE' ? "Online" : "Offline"
            time = JSON.parse(body).timestamp
            return callback(status, time)
        })
    },
    getData: (callback) => {
        //request.get({url: rest.options.url + query.path, headers: {'Authorization': 'Bearer ' + jwt}}, (err, res, body) => {
        request.get({ url: rest.url + q.path, headers: rest.headers }, (err, res, body) => {
            let data = body 
            // Parse the data here
            return callback(data)
        })
    },
    postData: (data) => {
        console.log(data)
        request.post({url: 'http://health-safety.dev.api.kemppi.com:8080/api/sensordata', headers: {'Authorization': 'Bearer ' + rest.token }, json: data}, (err, res, body) => {
        //request.post({ url: rest.url + rest.host.paths.sensordata, d:{}, json: data }, (err, res,body) => {
            if (err) throw err
            console.log(body)
        })
    }, 
    deleteData: (callback) => {
        //request.delete({url: 'http://health-safety.dev.api.kemppi.com:8080/api/sensordata', headers: {'Authorization': 'Bearer ' + jwt }, json: {clear: true}}, (err, res, body) => {
        request.delete({ url: rest.url + rest.host.paths.sensordata, headers: rest.headers, json: { clear: true } }, (err, res, body) => {
            if (err) throw err
            return callback(body.message)
        })
    }
}