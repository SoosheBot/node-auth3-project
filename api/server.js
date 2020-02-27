const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');
const restricted = require("../auth/restrictedMiddleware");


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, role("admin"), usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

function role(role) {
  return function(req,res,next) {
      if (req.decodedToken && req.decodedToken.role.toLowerCase() === role) {
          next();
      } else {
          res.status(403).json({ message: "You are not authorized to access this department"});
      }
  }
}

module.exports = server;