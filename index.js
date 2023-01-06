const app = express();
const http = require("http");
const server = http.createServer(app);

require("dotenv").config();
require("./config/database").connect();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const express = require("express");
const auth = require("./middleware/auth");
const credentials = require('./middleware/credentials');
const cors = require('cors')
const corsOptions = require("./config/corsOptions");

const User = require("./models/user");
const Student = require("./models/student");
const StudentAttendance = require("./models/studentAttendance");
const School = require("./models/school");

const getRoute = require("./routes/getRoute")
const postRoute = require("./routes/postRoute")
const putRoute = require("./routes/putRoute")
const deleteRoute = require("./routes/deleteRoute")

app.use(credentials);

app.use(cors(corsOptions))

app.use(express.json());

app.use('/get', getRoute);
app.use('/post', getRoute);
app.use('/put', getRoute);
app.use('/delete', getRoute);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});