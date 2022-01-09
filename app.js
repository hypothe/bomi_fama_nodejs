
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const conn_port = 4242;
const jointsValue = [];
const jointRoom = "joint_room";

io.on('connection', (socket) => {
	let sub2JointUpdates = false;
	// DEBUG
	console.log("Data received by %s", socket.request.url);

	socket.on("disconnect", () => {
		console.log("User disconnected %s", socket.request.url);
	})
	
	// Enlist the client interested in receiving the joint updates
	socket.on("subscribeToJointsValuesUpdates", () => {
		socket.join(jointRoom);
	})
	
	// Remove the client from the list of those interested in receiving the joint updates
	socket.on("unsubscribeToJointsValuesUpdates", () => {
		socket.leave(jointRoom)
	})
	
	// Update the currently stored joints' values and publish
	// them to all the clients interested in receiving those.
	socket.on("jointsUpdate", (msg) => {
		for (var jointID in msg.joints) {
			jointsValue[jointID] = msg.joints[jointID];
		}
		// if this user
		socket.to(jointRoom).emit(jointsValue);
	})
})

server.listen(conn_port, () => {
	console.log("Server started.")
})

/************************************************************/
// DEBUG: fall-back if socket.io won't work in Unity
/*
const { parse } = require('url');
const WebScoket, { WebSocketServer } = require('ws');

var ws_ud = [];

const wss_ud = new WebSocketServer({ noServer=true }, () => {
	console.log('Unity web-socket side started');
})

wss_ud.on('connection', (ws) => {
	ws_ud.push(ws); // store the sockets of incoming Unity connections 
									// (hardly more than one, but you never know)
	ws.on('message', (data) => {
		// log
		console.log("Received message from Unity client %s %o", ws.url, data);
	})
})
*/