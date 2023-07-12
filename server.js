const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require("fs");
const http = require("http");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
const { getIO, initIO } = require("./socket");
// const userController = require("./controller/user.controller");

const app = express();
const httpServer = http.createServer(app);
initIO(httpServer);

getIO();

const port = 3500;

app.use(bodyParser.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

// app.get("/socket.io", function (req, res) {
//   res.send("Socket Working Fine 256.");
// });

// app.get("/api/users", (req, res) => {
//   userController.getUsers().then((data) => res.json(data));
// });

// app.get("/api/user/:id", (req, res) => {
//   userController.getUserById(req.body.task).then((data) => res.json(data));
// });

// app.post("/api/user", (req, res) => {
//   console.log(req.body);
//   userController.createUser(req.body.task).then((data) => res.json(data));
// });

// app.put("/api/user", (req, res) => {
//   userController.updateUser(req.body.task).then((data) => res.json(data));
// });

// app.delete("/api/user/:id", (req, res) => {
//   userController.deleteUser(req.params.id).then((data) => res.json(data));
// });

// app.get("/", (req, res) => {
//   res.send(`<h1>API Works !!!</h1>`);
// });

httpServer.listen(port, () => {
  console.log(` Server listening on the port  ${port}`);
  console.log(":smile");
});
