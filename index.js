
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

//Configurations
require("dotenv").config();
require("./config/database").connect();

const credentials = require('./middleware/credentials');

const cors = require('cors')
const corsOptions = require("./config/corsOptions");

app.use(credentials);

app.use(cors(corsOptions))

app.use(express.json());

//Routes
const getRoute = require("./routes/getRoute")
const postRoute = require("./routes/postRoute")
const putRoute = require("./routes/putRoute")
const deleteRoute = require("./routes/deleteRoute")

app.use('/get', getRoute);
app.use('/post', postRoute);
app.use('/put', putRoute);
app.use('/delete', deleteRoute);

//Port
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//Run server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});