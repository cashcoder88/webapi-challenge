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

// DELETES

server.delete('/actions/:id', (req, res) => {
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
    .catch(err => {
        res.status(500).json({
            errorMessage: "the action could not be deleted"
        })
    })
});

server.delete('/projects/:id', (req, res) => {
    const {id} = req.params;
    dbProjects.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(204).end();
        }
        else {
            res.status(404).json({
                errorMessage: "The project with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "the project could not be deleted"
        })
    })
});

//-----------------------------------

// Updates (PUTS)
server.put('/actions/:id', (req, res) => {
    const actionChanges = req.body;
    const projectId = req.body.project_id;
    const {id} = req.params;
    if (!projectId) {
        res.status(400).json({ 
            errorMessage: "Please provide project ID for the action." 
        })
    }
    else {
        dbActions.update(id, actionChanges)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({
                    message: 'The action with the specified id does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The action information could not be modified."
            })
        })
    }
})

server.put('/projects/:id', (req, res) => {
    // const changes = req.body;
    // const {name, bio} = req.body;
    // const {id} = req.params;
    // if (!name || !bio ) {
    //     res.status(400).json({ 
    //         errorMessage: "Please provide name and bio for the user." 
    //     })
    // }
    // else 
    // db.update(id, changes)
    // .then(updated => {
    //     if (updated) {
    //         res.status(200).json(updated)
    //     } else {
    //         res.status(404).json({
    //             message: "The user with the specified ID does not exist."
    //         })
    //     }
    // })
    // .catch(err => {
    //     res.status(500).json({
    //         error: "The user information could not be modified."
    //     })
    // })
    
})




module.exports = server;
