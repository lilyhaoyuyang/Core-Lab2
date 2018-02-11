var five = require("johnny-five");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var board, led;
board = new five.Board();
board.on("ready", function () {
  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });
  led.color("#FF0000"); // Red
}
);

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  
socket.on('control message', function (msg) {
  
  if (msg === 'red') {
    // turn to red
    led.color("#FF0000");
  }
  if (msg === 'green') {
    // turn to green
    led.color("#00FF00");
  }
  if (msg === 'blue') {
    //turn to blue
    led.color("#0000FF");
  }
  if (msg === 'on') {
    //// turn on LED
    led.on();
  }
  if (msg === 'off') {
    //// turn off LED
    led.off();
  }
});
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});