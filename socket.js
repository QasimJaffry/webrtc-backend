const { Server } = require("socket.io");
let IO;

module.exports.initIO = (httpServer) => {
  IO = new Server(httpServer, {
    origins: "*:*",
  });

  IO.use((socket, next) => {
    if (socket.handshake.query) {
      let callerId = socket.handshake.query.callerId;
      socket.user = callerId;
      next();
    }
  });

  let onlineUsers = [];

  IO.on("connection", (socket) => {
    console.log(socket.user, "Connected");
    socket.join(socket.user);

    socket.on("userConnect", (userId) => {
      if (!onlineUsers.some((user) => user === userId)) {
        // if user is not added before
        onlineUsers.push(userId);
        console.log("new user is here!", onlineUsers);
      }
      // send all active users to new user
      socket.emit("onlineUsers", onlineUsers);

      // console.log(userId, "userIduserId");
      // onlineUsers.add(userId);
      // socket.emit("onlineUsers", Array.from(onlineUsers));
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("user disconnected", onlineUsers);
      // send all online users to all users
      socket.emit("onlineUsers", onlineUsers);
    });

    socket.on("call", (data) => {
      let calleeId = data.calleeId;
      console.log(typeof calleeId);
      let rtcMessage = data.rtcMessage;
      console.log(data, "DATA", calleeId, "sd", socket.user);
      socket.to(calleeId).emit("newCall", {
        callerId: socket.user,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("answerCall", (data) => {
      let callerId = data.callerId;
      rtcMessage = data.rtcMessage;

      socket.to(callerId).emit("callAnswered", {
        callee: socket.user,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("ICEcandidate", (data) => {
      console.log("ICEcandidate data.calleeId", data.calleeId);
      let calleeId = data.calleeId;
      let rtcMessage = data.rtcMessage;

      socket.to(calleeId).emit("ICEcandidate", {
        sender: socket.user,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("end", (data) => {
      onlineUsers = onlineUsers.filter((user) => user !== data.calleeId);
      // onlineUsers.delete(data.calleeId);
      console.log(onlineUsers, "onlineUsersonlineUsersonlineUsers");

      socket.emit("onlineUsers", onlineUsers);

      // socket.emit("onlineUsers", Array.from(onlineUsers));
      socket.to(data.calleeId).emit("endCall");
    });
  });
};

module.exports.getIO = () => {
  if (!IO) {
    throw Error("IO not initilized.");
  } else {
    console.log("EHYEYEYYE");
    return IO;
  }
};
