const { Server } = require("socket.io");
let IO;

module.exports.initIO = (httpServer) => {
  IO = new Server(httpServer, {
    origins: "*:*",
  });

  IO.use((socket, next) => {
    const query = socket.handshake.query;
    socket.user = query;
    next();
  });

  const onlineUsers = new Map();

  IO.on("connection", (socket) => {
    socket.join(socket.user.callerId);

    socket.on("close", (recipientId) => {
      socket.to(recipientId).emit("disconnectUser", {
        senderId: socket.user.callerId,
      });
    });

    socket.on("login", (userInfo) => {
      onlineUsers.set(socket.id, userInfo);
      IO.emit("userConnected", Array.from(onlineUsers.values()));
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      IO.emit("userDisconnected", Array.from(onlineUsers.values()));
    });

    socket.on("call", (data) => {
      let calleeId = data.calleeId;

      let rtcMessage = data.rtcMessage;

      socket.to(calleeId).emit("newCall", {
        callerId: socket.user.callerId,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("answerCall", (data) => {
      let callerId = data.callerId;
      rtcMessage = data.rtcMessage;

      socket.to(callerId).emit("callAnswered", {
        callee: socket.user.callerId,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("ICEcandidate", (data) => {
      let calleeId = data.calleeId;
      let rtcMessage = data.rtcMessage;

      socket.to(calleeId).emit("ICEcandidate", {
        sender: socket.user.callerId,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("end", (data) => {
      socket.to(data.calleeId).emit("endCall");
    });
  });
};

module.exports.getIO = () => {
  if (!IO) {
    throw Error("IO not initilized.");
  } else {
    console.log("Initilized");
    return IO;
  }
};
