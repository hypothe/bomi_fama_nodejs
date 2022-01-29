
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
//const io = new Server(server, {transports: ['websocket', 'polling']});
const io = new Server(server);



// WebSocketServer living on the same server of socket.io, ON A DIFFERENT PATH
// *should not* conflict

/*
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({server: server, path: '/ws'});
*/

const conn_port = 4242;

const jointsValue = [];
const jointRoom = "joint_room";


app.get("", (req, res)=>{
	res.sendFile(__dirname + '/static/test.html')
})


io.on('connection', (socket) => {
	// DEBUG
	console.log("Data received by %s", socket.request.url);

	socket.on("disconnect", () => {
		console.log("User disconnected %s", socket.request.url);
	})
	
	// Enlist the client interested in receiving the joint updates
	socket.on("subscribeToJointsValuesUpdates", () => {
		socket.join(jointRoom);
		console.log("Client added to list");
	})
	
	// Remove the client from the list of those interested in receiving the joint updates
	socket.on("unsubscribeToJointsValuesUpdates", () => {
		socket.leave(jointRoom);
		console.log("Client removed from list");
	})
	
	// Update the currently stored joints' values and publish
	// them to all the clients interested in receiving those.
	socket.on("jointsUpdate", (msg) => {
		for (var jointID in msg.joints) {
			jointsValue[jointID] = msg.joints[jointID];
		}
		// send data to all interested socket.io
		io.to(jointRoom).emit("getJointsValues", jointsValue);
		// send data to each websocket client
		
		/*
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebScoket.OPEN){
				client.send(jointsValue);
			}
		});
		*/

	})
})

/*
wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		// log
		console.log("Received message from Unity client %s %o", ws.url, data);
	})

})
*/


server.listen(conn_port, () => {
	console.log("Server started.")
})

