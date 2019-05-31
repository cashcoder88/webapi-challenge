const express = require('express');
const helmet = require('helmet');

const dbActions = require('./data/helpers/actionModel');
const dbProjects = require('./data/helpers/projectModel');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/actions', (req, res) => {
    dbActions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            error: 'could not retrieve actions'
        })
    })
});

server.get('/projects', (req, res) => {
    dbProjects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({
            error: 'could not retrieve projects'
        })
    })
});




module.exports = server;
