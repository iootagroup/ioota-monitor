var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.Commands;
var Board = GrovePi.board;

var AirQualityAnalogSensor = GrovePi.sensors.AirQualityAnalog;

var board = new Board({
  debug: true,
  onError: function(err) {
    console.log('Something wrong just happened')
    console.log(err)
  },
  onInit: function(res) {
    if (res) {
      console.log('GrovePi Version :: ' + board.version());

      var airQualitySensor = new AirQualityAnalogSensor(0);
      console.log('Air Quality Analog Sensor (start watch)');
      airQualitySensor.on('change', function(res) {
        console.log('Air Quality onChange value=' + res)
      });
      airQualitySensor.watch();
    }
  }
});

board.init();