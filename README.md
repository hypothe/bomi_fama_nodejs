# bomi_fama_nodejs

This repository contains the code used to spin up a Node.JS serve that allows the communication between a python and a Unity3D script.
The Unity3D application is compiled and runs on WebGL, taking advantage of the HTML embedding to insert the Javascript snippets allowing the socket.io communication.

Once the server is started it will present the Unity3D application at `localhost:4242` (_unless rerouted, see the **docker-compose** section). 

# WebGL - browser interaction

The Node.JS server created hosts the static content built by Unity3D. The application can communicate with the Javascript in the HTML page thanks to a simple plugin that spins up the socket and defines its callback, in turn referencing functions defined in a C# script acting as the client (and dispatcher of data to the rest of the scene's scripts).
For a more in depth explanation take a look at the official [Unity3D documentation on WebGL-browser interaction](https://docs.unity3d.com/2021.2/Documentation/Manual/webgl-interactingwithbrowserscripting.html).

# Docker image

A lighweight docker image can be built using the dockerfile here presented. Notice it's not hosted online because... well, it's light and simple enough to not make much sense doing otherwise.

### Container generation

```bash
.../bomi_fama_nodejs$ docker build . -f Dockerfile.dockerfile -t <your-container-name>
```

### Conteiner launch

```bash
$ docker run -it --rm -p <reroute-port>:4242 <your-container-name>
```

# Libraries used in the client

| Client | Library |
| :--- | :--- |
| Python | [python-socketio](https://github.com/miguelgrinberg/python-socketio)* |

> (*) Note: requires `socket.io version 4.4.1 or grater on the server sider

# Docker-Compose

Not presented here, but certainly might come in handy.
Give a look at the [whole project this is a submodule of](https://github.com/hypothe/bomi-cam-unity3dof-control) for an example.

---

# Credit

A lot of effort went into making this side of the project work, and a lot of googling and scrolling StackOverflow more than anything. Since no single source of information was used, but a mashup of many separate things, here are reported some of the articles, videos and posts I found useful (even if many of them did not directly contribute to the final product).

- [kTonpa/3dof-robot-arm-using-unity3D](https://github.com/kTonpa/3dof-robot-arm-using-unity3D): the original Unity3D project that was expanded here to implement the `socket.io` connection.
-	thanks to [Aman](https://github.com/robotmiro1), one of the members of the group working on the [whole project](https://github.com/hypothe/bomi-cam-unity3dof-control) for the first edit of the original Unity3D project (_see above_)
- [tomowatt/unity-docker-example](https://github.com/tomowatt/unity-docker-example): simple nginx server for a WebGL-built Unity3D game (see also his [article on the process](https://dev.to/tomowatt/running-an-unity-webgl-game-within-docker-5039))
- [Rocher0724/socket.io-unity](https://github.com/Rocher0724/socket.io-unity): the first working socket.io Plugin for Unity3D I found. Albeit it did not work with WebGL (not the plugin's fault, it's simply not designed for that) it might be useful for someone else arriving here. Note that it requires socket.io@2.0.1 (or perhaps up to 2.4.1, haven't tested it myself), so if you need to use another version in the server keep that in mind (give a look at the `socket.io-v2` branch of this repo to get an idea for the implementation, while the installation procedure is explained in thi [stackoverflow thread](https://stackoverflow.com/questions/26414587/how-to-install-multiple-versions-of-package-using-npm))
- [KyleDulce/Unity-Socketio](https://github.com/KyleDulce/Unity-Socketio): I haven't tested it out, but it seems a more recent `socket.io-Unity3D` plugin, supporting socket.ioV4. I found it out too later unfortunately, but can be useful for someone out there


---

# FAQ

## Where can I access the Unity3D source

THanks for asking! The original project, as mentioned in the **Credits**, can be found at [kTonpa/3dof-robot-arm-using-unity3D](https://github.com/kTonpa/3dof-robot-arm-using-unity3D). The version used here, instead, is not online, but feel free to open an issue if interested and I'll send it to you asap!

# The whole project

This is a submodule of the project [Body-Machine Interface](https://github.com/hypothe/bomi-cam-unity3dof-control).
