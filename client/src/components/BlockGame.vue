	<template>
	<div id="sockets">
		<canvas ref="game" width="340" height="280" style="border: 1px solid black;">
		</canvas>
		<br>
		<button @click="move('right')">Right</button>
		<button @click="move('left')">Left</button>
		<button @click="move('up')">Up</button>
		<button @click="move('down')">Down</button>

		<ul>Last connected: 
				<li ref="connected"> </li>
		</ul>

		<youtube ref="youtube" id="ytb" :video-id="videoId" @ready="ready" @playing="playing" @paused="paused"></youtube>
		
		
			<ul class="list-container" v-chat-scroll > 
				<li 
						v-for="event in events" :key="event.id" 
						ref="playingPaused"
				> 
					<span>{{event.idAction}} </span>
					<span class="timestamp">{{ event.timestamp | moment("from") }}</span> 
				</li>
				<!-- //<span>{{ someDate | moment("from") }}</span> -->
			</ul>
	




	</div>
	</template>

	<script>
	/* eslint-disable */
	import io from 'socket.io-client'; 
	
	//will import vue moment
	export default {
			name: 'BlockGame',
			data(){
				return {
							socket: {},
							context: 0,
							position :{x: 0, y: 0},
							videoId: '6twHWEstx2Q',
							events: [],
							
				} //fara virgula dupa return
			},		
		// Ready to establish a socket connection, best way is created(), before the View renders
		created(){
			//Time update
			updateTime:setInterval
				// For Gitpod, beware as it is not localhost, instead paste the link they gave eg: https://3000-ec7c0a46-d8e8-4fb7-b436-551bbd8a6fdc.ws-eu01.gitpod.io/
				this.socket = io("http://localhost:3000"); // Client socket to > server adress
		},
		// After the view renders, we want to start listening for events, best way is mounted(), so we can work with our canvas
		mounted(){
			
			//Getting data back from server this.socket.on
				this.context = this.$refs.game.getContext("2d");
				

				this.socket.on("position", data => {
						this.position = data;
						this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height); // Clear the canvas
						this.context.fillRect(this.position.x, this.position.y, 20, 20); // Add a rectangle
				})
				this.socket.on('Created', data => {  
						// eslint-disable-next-line no-console
						console.log(data);

				})
				this.socket.on('playing', data => {  
						// eslint-disable-next-line no-console
						this.events.push(data);
						//console.log(this.events);
				})
				this.socket.on('paused', data => {  
						// eslint-disable-next-line no-console
						this.events.push(data); //write to array, which will output to dom with v-for
						//console.log(this.events);
				})

		},

		methods: {
			// "Move in this direction and let the server determine how far it moved"
			move(direction){ 
					this.socket.emit("move", direction);
			},
			ready (event) {
					this.player = event.target;
					console.log('Player is ready.')
			},
			playing () {
			// The player is playing a video.
				console.log('\o/ we are watching!!!')
				this.socket.emit("playing");//1. Emit from client to server, from server back, and client show again
			},
			paused () {
				console.log('Video paused')
				this.socket.emit("paused");
				//this.socket.emit("playing", event);//1. Emit from client to server, from server back, and client show again
			},
		},
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style>
	#ytb{
		position: absolute;
		top:0%;
		right:0;
	}

	ul.list-container  {
  list-style-type: none;
	font-size: 14px;
		height: 150px;
		width:400px;
		overflow-y: auto;
		background: lightseagreen;
		color: rgb(61, 24, 24);
	}
	.timestamp{
		opacity: 0.7;
		font-size:12px;
	}
	</style>
