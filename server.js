const express = require('express');
const helmet = require('helmet');

const dbActions = require('./data/helpers/actionModel');
const dbProjects = require('./data/helpers/projectModel');

const server = express();

server.use(helmet());
server.use(express.json());




// GETS
server.get('/actions', (req, res) => {
    console.log('REQ BODY ACTIONS', req.body);
    console.log('REQ PARAMS ACTIONS', req.params);
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
    console.log('REQ BODY PROJECTS', req.body);
    console.log('REQ PARAMS PROJECTS', req.params);
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
//-----------------------------------

// POSTS

server.post('/actions', (req, res) => {
    console.log('REQ BODY ACTIONS', req.body);
    console.log('REQ PARAMS ACTIONS', req.params);
    const projectId = req.body.project_id;
    const actionInfo = req.body;
    if (!projectId) {
        res.status(400).json({
            errorMessage: 'Please provide project id'
        })
    }
    else {
        dbActions.insert(actionInfo)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database" 
           })
        })
    }
});

server.post('/projects', (req, res) => {
    const {name, description} = req.body;
    const projectInfo = req.body;
    if (!name || !description ) {
        res.status(400).json({
            errorMessage: 'Please provide name and description of project'
        })
    }
    else {
        dbProjects.insert(projectInfo)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: 'There was an error saving the project to the db'
            })
        })
    }
});

//-----------------------------------

// DELETE

server.delete('/actions', (req, res) => {
    const {id} = req.params;
    dbActions.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(204).end();
        }
        else {
            res.status(404).json({
                errorMessage: "The action with the specified ID does not exist."
            })
        }
    })
});

server.delete('/projects', (req, res) => {
    
});

module.exports = server;
