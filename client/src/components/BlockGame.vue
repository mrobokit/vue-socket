	<template>
	<div id="sockets">
		<canvas ref="game" width="320" height="240" style="border: 1px solid black;">
		</canvas>
		<br>
		<button @click="move('right')">Right</button>
		<button @click="move('left')">Left</button>
		<button @click="move('up')">Up</button>
		<button @click="move('down')">Down</button>

		<!-- MacOs Terminal-->
		<div id="youtubeTerminal">
			<div id="bar"> 
				<span id="whatfor">Youtube Logs</span>
				<div id="red"></div>
				<div id="yellow"></div>
				<div id="green"></div>
			</div>
			<ul class="list-container" v-chat-scroll > 
				<li 
						v-for="event in events" :key="event.id" 
						ref="playingPaused"
						
				> 
					<span class="id">{{event.id.substring(0, 8)}} </span> 
					<span :class="{'play': event.action === 'started watching.', 'pause': event.action === 'paused.' }"> {{event.action}}</span>  

			
					<!-- <span ref="fromNow" >{{ event.timestamp  }}</span>   Future reference, or local component-->
					<dynamic-from-now class="timestamp" :interval="60000"></dynamic-from-now>
				</li>
			</ul>
		</div>

		<youtube ref="youtube" id="ytb" :video-id="videoId" @ready="ready" @playing="playing" @paused="paused"></youtube>
		
		


		<div id="bar"> 
			<span id="whatfor">Room Logs</span>
			<div id="red"></div>
			<div id="yellow"></div>
			<div id="green"></div>
		</div>
			<ul class="list-container" style="opacity: 0.6; filter: blur(1px);">
				<li>

				</li>
			</ul>
	




	</div>
	</template>

	<script>
	/* eslint-disable */
	import io from 'socket.io-client'; 


	export default {
		name: 'BlockGame',
		data(){
			return {
						socket: {},
						context: 0,
						position :{x: 0, y: 0},
						videoId: 'ikpsEt0bJXw',
						events: [],

			} //fara virgula dupa return
		},

		// Ready to establish a socket connection, best way is created(), before the View renders
		created(){

				//this.interval = setInterval(() => this.$forceUpdate(), 1000); //2. time magic
				// For Gitpod, beware as it is not localhost, instead paste the link they gave eg: https://3000-ec7c0a46-d8e8-4fb7-b436-551bbd8a6fdc.ws-eu01.gitpod.io/
				this.socket = io("http://localhost:3000"); // Client socket to > server adress
		},

		// After the view renders, we want to start listening for events, best way is mounted(), so we can work with our canvas
		mounted(){

				

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
						
					
						
				})
				this.socket.on('paused', data => {  
						// eslint-disable-next-line no-console
					
						this.events.push(data); //write to array, which will output to dom with v-for
						//console.log(this.events);

				})

		
				//setInterval(this.getNow, 5000);//refs are available only after mounted

		},
		computed:{

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
				console.log('\o/ we are watching!!!')
				this.socket.emit("playing");//1. Emit from client to server, from server back, and client show again
				
			},
			paused () {
				console.log('Video paused')
				this.socket.emit("paused");
				
			},


		}, //methods

	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style>
	#youtubeTerminal{
		position: absolute;
		bottom:80px;
		right:10px;
	}
	#ytb{
		position: absolute;
		top:0;
		right:10px;
	}

	ul.list-container  {
  	list-style-type: none;
		font-size: 14px;
		height: 150px;
		width:400px;
		margin:0;
		overflow-y: auto;
		background-color: #33485E;
		color:#00ff7f;
		padding: 12px;
		border-radius: 0px 0px 8px 8px;
	}
	.timestamp{
		opacity: 0.75;
		font-size:12px;
		color: #ffffff;
		font-weight: 400;
		padding-left:3px;
	float: right;
	}

	/*MacOs Terminal*/ 

#bar {
    text-align: center;
    width: 424px;
    height: 25px;
    background-color: #DAD9D9;
    margin: 0 ;
    font-family: monospace;
    padding: auto;
    float: none;
    border-radius: 5px;
		position: relative;
}
#red {
    background-color: #E94B35;
    border-radius: 100%;
    width: 15px;
    height: 15px;
    margin: 0 auto;
    left: -200px;
    bottom: -20%;
    position:relative;
}
#yellow {
    background-color: #f0f000;
    border-radius: 100%;
    width: 15px;
    height: 15px;
    margin: 0 auto;
    left: -180px;
    bottom: 40%;
    position:relative;
    display: block;
}
#green {
    background-color: #1AAF5C;
    border-radius: 100%;
    width: 15px;
    height: 15px;
    margin: 0 auto;
    left: -160px;
    bottom: 99%;
    position:relative;
    display: block;
}
	#whatfor{
		position: absolute;
    height: 15px;
		left: 170px;
		top: 5px;
	}

	.play{
		color: #00ff00;
	}
	.pause{
			color: #f1f227;
	}
	.id{
		color: #be90d4
	}
	</style>
