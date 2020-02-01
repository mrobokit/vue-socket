const Express = require("express")(); //constructor (inst. of var app =express())
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

// Only for the Canvas game
var position = {
 x: 200,
 y: 200
}
// end of it

Socketio.on("connection", socket => {
 socket.emit("position", position) // As in pos line5
});

// end of it

Http.listen(3000, () => {
   console.log("Listening at :3000")
});
    