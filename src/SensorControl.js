var GrovePi = require('node-grovepi').GrovePi

var Commands = GrovePi.commands
var Board = GrovePi.board

var chainableRGBLedDigitalSensor = GrovePi.sensors.chainableRGBLedDigitalSensor

var board = new Board({
    debug: true,
    onError: function(err) {
      console.log('Something wrong just happened')
      console.log(err)
    },
    onInit: function(res) {
      if (res) {
        console.log('GrovePi Version :: ' + board.version())

        var RGBLed = new chainableRGBLedDigitalSensor(7, 1)
        console.log('RGB led Sensor (start watch)')
        RGBLed.on('change', function(res) {
          console.log('RGB led onChange value=' + res)
        })
        RGBLed.watch()
      }
    }
  })

  board.init();
//module.exports = {
//    functionName: ChainableRGBLedDigitalSensor

//}