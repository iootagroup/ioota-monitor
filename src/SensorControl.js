var GrovePi = require('node-grovepi').GrovePi;

var Commands = GrovePi.commands;
var Board = GrovePi.board;

var ChainableRGBLedDigitalSensor = GrovePi.sensors.ChainableRGBLedDigital;

var board = new Board({
    debug: true,
    onError: function(err) {
      console.log('Something wrong just happened');
      console.log(err);
    },
    onInit: function(res) {
      if (res) {
        console.log('GrovePi Version :: ' + board.version());

        var RGBLed = new ChainableRGBLedDigitalSensor(8, 1);

        
        
        //var RGBLedcolor = RGBLed.Commands.storeColor(0,255,0);
        //RGBLed.Commands.chainbleRgbLedSetModulo(RGBLedcolor);
        //var RGBLedcolor = Commands.storeColor(0,255,0);
        //RGBLed.Commands.chainbleRgbLedSetModulo(RGBLedcolor);

        console.log('RGB led Sensor (start watch)');
        RGBLed.on('change', function(res) {

          console.log('RGB led onChange value=' + res)
        });

        RGBLed.watch(1000);

        //RGBLed.commands.ChainableRGBLedDInit()
        console.log("x");
        var temp = 0.75
        setInterval(function(){
          temp == 0.75 ? temp = 0 : temp = 0.75
          console.log(temp)
          RGBLed.write(temp)
        },1000);
      }
    }
  })
  board.init();
//module.exports = {
//    functionName: ChainableRGBLedDigitalSensor

//}