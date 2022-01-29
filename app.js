
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const unity_server = require('http').Server(app);
const iov2 = require('socket.io-v2')(unity_server);

const conn_port = 4242;
const unity_conn_port = 4243;

const jointsValue = [];
const jointRoom = "joint_room";
const unityRoom = "unity_room";


app.get("", (req, res)=>{
	res.sendFile(__dirname + '/static/test.html')
})

iov2.on('connection', (socket) => {
	// DEBUG
	console.log("Data received by %s", socket.request.url);

	socket.join(unityRoom);

	socket.on("disconnect", () => {
		console.log("Unity disconnected %s", socket.request.url);
	})

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
		// if this user
		io.to(jointRoom).emit("getJointsValues", jointsValue);

		iov2.to(unityRoom).emit("getJointsValues", jointsValue);
		
	})
})



server.listen(conn_port, () => {
	console.log("Server started.")
})


unity_server.listen(unity_conn_port, () => {
	console.log("Unity server started.")
})