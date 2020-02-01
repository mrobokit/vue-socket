
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

    //socket.emit('Created', socket.id + "connected" ) // EMIT TO CURRENT  Client, cand s-a creat(prima), messajul - si apoi ala doar console.log(data)
    Socketio.emit('Created', socket.id + "connected") // emits to all clients

   console.log(socket.id + ' connected.')


    socket.emit("position", position) // As in pos line5, emits to one client

    // If connected & playing - Server console logs - socket.on
    socket.on("disconnect", data => {
        console.log(socket.id + ' disconnected.')
    })
    socket.on("playing", data => {
        console.log(socket.id + ' playing video.') // log here
        Socketio.emit('playing', socket.id + " started playing video.") // send to all clients
    })
    socket.on("paused", data => {
        console.log('- ' + socket.id + ' paused video.') // log here
        Socketio.emit('paused', socket.id + " paused the video.") // send to all clients
    })
    socket.on('move', data => {
        switch (data) {
            case "left":
                position.x -= 5 //position = position -5 
                    //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;

            case "right":
                position.x += 5 //position = position -5 
                    //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;

            case "up":
                position.y -= 5 //position = position -5 
                    //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;

            case "down":
                position.y += 5 //position = position -5 
                    //Socketio emits to all clients, whereas socket.emit will emit to just that 1 socket
                Socketio.emit("position", position) //we want to update the position on ALL clients
                break;
        }
    })

});

// end of it

Http.listen(3000, () => {
    console.log("Listening at :3000")
});