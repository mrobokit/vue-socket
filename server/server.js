
const Express = require("express")(); //constructor (inst. of var app =express())
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
//var moment = require('moment'); // It should run on client to update the times ;) 

// Only for the Canvas game
var position = {
        x: 200,
        y: 200
    }
    // end of it

Socketio.on("connection", socket => {

    //socket.emit('Created', socket.id + "connected" ) // EMIT TO CURRENT  Client, cand s-a creat(prima), messajul - si apoi ala doar console.log(data)
    console.log(socket.id + ' connected.')
    // emits to all clients
    Socketio.emit('Created', {
            id: "🚀" + socket.id ,
            action: "joined room. ",
            timestamp: socket.handshake.time 
    }) 
    socket.emit("position", position) // As in pos line5, emits to one client

    // If connected & playing - Server console logs - socket.on
    socket.on("disconnect", data => {
        console.log(socket.id + ' disconnected.')

        Socketio.emit('disconnect', {
            id: "💥" + socket.id ,
            action: "left room.",
            timestamp: socket.handshake.time 
        }) 
   
    })
    socket.on("playing", data => {
        console.log(socket.id + ' started watching.') // log here socket.handshake.time 
        //.slice to make it shorter in client
        Socketio.emit('playing', {
            id: socket.id ,
            action: "started watching.",
            timestamp: socket.handshake.time 
        })  // send to all clients
    })
    socket.on("paused", data => {
        console.log( socket.id + 'paused.') // log here

        Socketio.emit('paused', {
            id: socket.id ,
            action: "paused.",
            timestamp: socket.handshake.time 
        })  // send to all clients
    })
    socket.on("ready", data => {
        console.log( socket.id + "'s player is ready.") // log here

        Socketio.emit("ready", {
            id: socket.id ,
            action: "'s player is ready.",
            timestamp: socket.handshake.time 
        })  // send to all clients
    })
    socket.on("ended", data => {
        console.log(socket.id + 'ended watching.') // log here socket.handshake.time 
        //.slice to make it shorter in client
        Socketio.emit('ended', {
            id: socket.id  ,
            action: "ended watching.",
            timestamp: socket.handshake.time 
        })  // send to all clients
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