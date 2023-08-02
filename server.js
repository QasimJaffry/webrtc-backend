const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require("fs");
const http = require("http");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
const { getIO, initIO } = require("./socket");
const userController = require("./controller/user.controller");
const callController = require("./controller/call.controller");

const { VideoGrant } = require("twilio/lib/jwt/AccessToken");
const AccessToken = require("twilio/lib/jwt/AccessToken");

const app = express();
const httpServer = http.createServer(app);
initIO(httpServer);

getIO();

const port = 3500;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

app.use(bodyParser.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

app.get("/socket.io", function (req, res) {
  res.send("Socket Working Fine 256.");
});

app.get("/api/users", (req, res) => {
  userController.getUsers().then((data) => res.json(data));
});

app.get("/api/generate-token", (req, res) => {
  const identity = req.query.id || "default_user";

  const videoGrant = new VideoGrant({ room: "cool room" });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {
      identity: identity,
    }
  );
  token.addGrant(videoGrant);

  res.json({ token: token.toJwt() });
});

app.get("/api/user/:id", (req, res) => {
  userController.getUserById(req.params.id).then((data) => res.json(data));
});

app.post("/api/user", (req, res) => {
  console.log(req.body, "create");
  userController.createUser(req.body).then((data) => res.json(data));
});

app.put("/api/user", (req, res) => {
  userController.updateUser(req.body).then((data) => res.json(data));
});

app.delete("/api/user/:id", (req, res) => {
  userController.deleteUser(req.params.id).then((data) => res.json(data));
});

app.get("/api/call/:id", (req, res) => {
  callController
    .getCallRecordsById(req.params.id)
    .then((data) => res.json(data));
});

app.post("/api/call", (req, res) => {
  console.log(req.body, "create call");
  callController.addUserCallRecord(req.body).then((data) => res.json(data));
});

app.get("/", (req, res) => {
  res.send(`<h1>API Works !!!</h1>`);
});

httpServer.listen(port, () => {
  console.log(` Server listening on the port  ${port}`);
  console.log(":smile");
});
