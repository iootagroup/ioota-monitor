let GrovePi = require('node-grovepi').GrovePi
//var Commands = GrovePi.Commands
let Board = GrovePi.board

let AirQualityAnalogSensor = GrovePi.sensors.AirQualityAnalog

module.exports = {
  listen: (callback) => {
    let board = new Board(
      {
        debug: true,
        onError: (err) => {
          process.stdout.write(err)
        },
        onInit: (res) => {
          if (res) {
            let airQualitySensor = new AirQualityAnalogSensor(0)
            airQualitySensor.on('change', (res) => {
              return callback(res)
            })
            airQualitySensor.watch(1000)
          }
        }
      }
    )
    board.init()
  }
}
