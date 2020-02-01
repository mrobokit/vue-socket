<template>
  <div>
    <canvas ref="game" width="640" height="480" style="border: 1px solid black;">
    </canvas>
    <br>
    <button @click="move('right')">Right</button>
    <button @click="move('left')">Left</button>
    <button @click="move('up')">Up</button>
    <button @click="move('down')">Down</button>
  </div>
</template>

<script>
    import io from 'socket.io-client'; 
    
    export default {
     name: 'BlockGame',
     data(){
         return {
             socket: {},
             context: 0,
             position :{
                 x: 0,
                 y: 0
                }
            }
        },
        // Ready to establish a socket connection, best way is created(), before the View renders
        created(){
            // For Gitpod, beware as it is not localhost, instead paste the link they gave eg: https://3000-ec7c0a46-d8e8-4fb7-b436-551bbd8a6fdc.ws-eu01.gitpod.io/
            this.socket = io("https://3000-ec7c0a46-d8e8-4fb7-b436-551bbd8a6fdc.ws-eu01.gitpod.io/"); // Client socket to > server adress
        },
        // After the view renders, we want to start listening for events, best way is mounted(), so we can work with our canvas
        mounted(){
            this.context = this.$refs.game.getContext("2d");
            this.socket.on("position", data => {
                this.position = data;
                //this.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height); // Clear the canvas
                this.context.fillRect(this.position.x, this.position.y, 20, 20); // Add a rectangle
            })
        },
        methods: {
            // "Move in this direction and let the server determine how far it moved"
            move(direction){ 
                this.socket.emit("move", direction);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
