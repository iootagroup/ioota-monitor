const restClient = require('./RestClient.js')
const chalk = require('chalk')

process.stdout.write('Starting application...\n')

// Check the status of the API service
restClient.getStatus((status, timestamp) => {
    console.log(chalk.green(`Received a response from ${chalk.white('Hostname')}`))
    status == 'Online' ? startMonitoring() : console.log("Service " + chalk.bgRed('offline'))
})

let data = [{
    'timestamp': '2019-04-03T18:12:41Z',
    'type': 'SENSORNAME',
    'value': 52.5
}]

function startMonitoring() {
    console.log("Status:\t\t" + chalk.bgGreen(' Online '))
    //restClient.postData(data)
    restClient.deleteData((res) => {
        console.warn(chalk.yellow(res))
    })
    restClient.getData((res) => {
        console.log(res)
    })

}