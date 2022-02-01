const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const compression = require('compression');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const conn_port = 4242;

const jointRoom = "joint_room";


app.get("", (req, res)=>{
	res.sendFile(__dirname + '/static/test.html')
})
app.use(compression());
app.use('/unity', express.static(path.join(__dirname, 'webgl')));
//app.get("/unity", (req, res)=>{
//	res.sendFile(__dirname + '/webgl/index.html')
//})


io.on('connection', (socket) => {
	// DEBUG
	console.log("Data received by %s", socket.request.url);

	socket.on("disconnect", () => {
		console.log("User disconnected %s", socket.request.url);
	})
	
	// Enlist the client interested in receiving the joint updates
	socket.on("subscribeToJointsValuesUpdates", () => {
		socket.join(jointRoom);
		console.log("Client added to list %s", jointRoom);
	})
	
	// Remove the client from the list of those interested in receiving the joint updates
	socket.on("unsubscribeToJointsValuesUpdates", () => {
		socket.leave(jointRoom);
		console.log("Client removed from list %s", jointRoom);
	})
	
	// Update the currently stored joints' values and publish
	// them to all the clients interested in receiving those.
	socket.on("jointsUpdate", (msg) => {
		// Send data back to the sockets
		io.to(jointRoom).emit("getJointsValues", msg);
	})
})


server.listen(conn_port, () => {
	console.log("Server started.")
})
