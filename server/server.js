
const Express = require("express")(); //constructor (inst. of var app =express())
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
// const nsp = Socketio.of('/room1');
//var moment = require('moment'); // It should run on client to update the times ;) 
// io.socket/ io is default /, or Socketio in our case with broadcast all /

// Only for the Canvas game
var position = {
        x: 200,
        y: 200
    }
    // end of it

Socketio.on("connection", socket => {

    //console.log(socket.id + ' connected.')
   
    // Socketio.emit('Created', {
    //         id: "🚀" + socket.id ,
    //         action: "joined room. ",
    //         timestamp: socket.handshake.time 
    // }) 

        socket.emit("position", position) // As in pos line5, emits to one client

        // If connected & playing - Server console logs - socket.on
        socket.on("disconnect", data => {
            console.log(socket.username + " " + socket.id + ' disconnected.')

            Socketio.emit('disconnect', {
                id: "💥" + socket.username + " " + socket.id.substring(0, 8),
                action: "left room.",
                timestamp: socket.handshake.time 
            }) 
    
        })
        socket.on("playing", data => {
            console.log(socket.username + " " + socket.id + ' started watching.') // log here socket.handshake.time 
            //.slice to make it shorter in client
            Socketio.emit('playing', {
                id: socket.username + " " + socket.id.substring(0, 8) ,
                action: "started watching.",
                timestamp: socket.handshake.time 
            })  // send to all clients
        })
        socket.on("paused", data => {
            console.log( socket.id + 'paused.') // log here

            Socketio.emit('paused', {
                id: socket.username + " " + socket.id.substring(0, 8) ,
                action: "paused.",
                timestamp: socket.handshake.time 
            })  // send to all clients
        })
        socket.on("ready", data => {
            console.log( socket.username + " " + socket.id  + "'s player is ready.") // log here

            Socketio.emit("ready", {
                id: socket.username + " " + socket.id.substring(0, 8)  ,
                action: "'s player is ready.",
                timestamp: socket.handshake.time 
            })  // send to all clients
        })
        socket.on("ended", data => {
            console.log(socket.username + " " + socket.id + 'ended watching.') // log here socket.handshake.time 
            //.slice to make it shorter in client
            Socketio.emit('ended', {
                id:  socket.username + " " + socket.id.substring(0, 8) ,
                action: "ended watching.",
                timestamp: socket.handshake.time 
            })  // send to all clients
        })
        socket.on('little_newbie', username => {
            socket.username = username;
            console.log(socket.username + " " + socket.id +' is speaking to me! ' );

            Socketio.emit('little_newbie', {
                id: socket.username + " " + socket.id.substring(0, 8),
                action: "has joined the room <3.",
                timestamp: socket.handshake.time 
            })  // send to all clients

        });
        socket.on('play_all', data => {
           
            console.log('I command all players play now!');

            Socketio.emit('play_all', {

                action: "Get Playing guys!",
 
            })  // send to all clients

        });


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

// nsp.on('connection', socket => {
//   console.log('someone connected');
// });

// nsp.emit('hi', 'everyone!');







Http.listen(3000, () => {
    console.log("Listening at :3000")
});