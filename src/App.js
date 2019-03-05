const restClient = require('./RestClient.js')
const chalk = require('chalk')
const path = require('path')

const grove = require(__dirname + '/GrovePiReader.js')


var GrovePi = require('node-grovepi').GrovePi

//const ledc = require('./LedTest.js')

process.stdout.write('Starting application...\n')

// Check the status of the API service
restClient.getStatus((status, timestamp) => {
    process.stdout.write(chalk.green(`Received a response from ${chalk.white('Hostname')} \n`))
    status == 'Online' ? startMonitoring() : process.stdout.write(`Service ${chalk.bgRed('offline')}\n`)
})

/*
// Generate sample data
let data = []
for (var i = 0; i < 10; i++) {
    let test = {
        'timestamp': `2019-04-0${i}T00:00:00Z`,
        'type': 'test',
        'value': Math.random() * 30
    }
    data.push(test)
}
*/ 

let alarmStatus = false
var led = new GrovePi.sensors.DigitalOutput(7);
function toggle() {
    if (alarmStatus == false){
        led.turnOff();
        alarmStatus = true;
    }
    else {
        led.turnOn();
        alarmStatus = false;
    }
}

function startMonitoring() {
    process.stdout.write(`Status:\t\t ${chalk.bgGreen(' Online ')}`)
    /*
    Tests
    restClient.deleteData((res) => {
        console.warn(chalk.yellow(res))
    })
    restClient.postData(data)
    */

    grove.listen((res) => {
        let field = [{
            timestamp: new Date(),
            type: 'airquality',
            value: res
        }]

        if (res >= 35 && res < 69) {
            if(alarmStatus) {
                led.turnOff()
                alarmStatus = false
            }
            
            console.log(chalk.yellow(' Alert '))
        }
        if (res >= 70 && res < 12800) {
            if(!alarmStatus) {
                led.turnOn();
                //ledc.start()
                alarmStatus = true
            }
            console.log(chalk.red(' Alert '))
        }
        if (res >= 12800) {
            if(!alarmStatus) {
                led.turnOn();
                alarmStatus = true
            }
            console.log(chalk.red(' Alert '))
        }

        //console.log(JSON.stringify(field))
        restClient.postData(field)

    })

    // Retrieve data
    restClient.getData((res) => {
        console.log(res)
    })

}