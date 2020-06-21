const express = require('express');
const cors = require('cors')
const helmet = require('helmet')

const authPetRouter = require('../auth/auth-petRouter.js');
const usersRouter = require('../users/users-router.js');
const authenticate = require('../auth/auth-middleware.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use('/api/users', usersRouter);
server.use('/api/auth', authenticate, authPetRouter);

module.exports = server;