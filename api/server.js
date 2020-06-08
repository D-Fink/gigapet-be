const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConnection = require('../data/dbConfig.js');

const authPetRouter = require('../auth/auth-petRouter.js');
const authUserRouter = require('../auth/auth-userRouter.js');
const usersRouter = require('../users/users-router.js');
const authenticate = require('../auth/auth-middleware.js');

const server = express();

const sessionConfig = {
    name: 'originalsid',
        secret: process.env.SESSION_SECRET || 'yada yada yada',
        cookie: {
            maxAge: 1000 * 60 * 60,
            secure: true, //true when pushed to production
            httpOnly: true,
        },
        resave: false,
        saveUninitialized: true, //laws dictate you must inform user youre using cookies before this can be true
        store: new KnexSessionStore({ //persists session information through database
            knex: dbConnection,
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 60000
        })
}

server.use(cors())
server.use(helmet())
server.use(session(sessionConfig));
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authenticate, authPetRouter);
server.use('/api/users/auth', authenticate, authUserRouter);

module.exports = server;