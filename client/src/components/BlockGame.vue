<template>
  <div>
    <canvas ref="game" width="640" height="480" style="border: 1px solid black;">
    
    </canvas>
  </div>
</template>

<script>
    //import io from 'socket.io-client'; 
    
    export default {
     name: 'BlockGame',
     data(){
         return {
             socket: {},
             //context,
             position :{
                 x: 0,
                 y: 0
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
