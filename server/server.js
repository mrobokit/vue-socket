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
    console.log('+ ' + socket.handshake.time + ':' + socket.id + ' connected.' )

    socket.emit("position", position) // As in pos line5
    socket.on('move', data => {
        switch(data){
            case "left" :
                position.x -= 5 //position = position -5 
                //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;

            case "right" :
                position.x += 5 //position = position -5 
                //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;

            case "up" :
                position.y -= 5 //position = position -5 
                //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;

            case "down" :
                position.y += 5 //position = position -5 
                //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;
        }
    })
    socket.on("disconnect", data => {
     console.log('- ' + socket.handshake.time +  socket.id + ' disconnected.')
    })

});

// end of it

Http.listen(3000, () => {
   console.log("Listening at :3000")
});
    