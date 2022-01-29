# bomi_fama_nodejs

This repository contains the code used to spin up a Node.JS server (actually two) that allow the communication between a python and a Unity script.
Due to library requirements, the node.js app needs to communicate with either of those clients using a different version of the [socket.io](https://socket.io/) package: v4.4.1 for Python, v2.0.1 for Unity.
Yhe two servers are listening to port `4242`(python) and `4243` (Unity3D).

# How the different versions of socket.io were installed

## Socket.ioV4

```bash
npm install socket.io@^4.4.1
```

## Socket.ioV2

```bash
npm install socket.io-v2@npm:socket.io@2.0.1
```

And thus the library is referred to, in the code, as `socket.io-v2`.


# FAQ

Would it be possibile to use the same server but just different paths? Apparently yes, but I didn't manage to get it to work quickly enough.
Pull requests are more than welcomed!


# Libraries used

| Client | Library |
| :--- | :--- |
| Python | [python-socketio](https://github.com/miguelgrinberg/python-socketio) |
| Unity3D | [socket.io-unity](https://github.com/Rocher0724/socket.io-unity) |