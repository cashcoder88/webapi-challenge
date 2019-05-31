const dbActions = require('../data/helpers/actionModel');
const actionsRouter = require('express').Router();

// GETS
actionsRouter.get('/', (req, res) => {
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

// POSTS

actionsRouter.post('/', (req, res) => {
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

// DELETES

actionsRouter.delete('/:id', (req, res) => {
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

// Updates (PUTS)
actionsRouter.put('/:id', (req, res) => {
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

module.exports = actionsRouter;