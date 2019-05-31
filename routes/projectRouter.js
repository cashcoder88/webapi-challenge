const dbProjects = require('../data/helpers/projectModel');
const projectRouter = require('express').Router();



// GET LIST OF PROJECTS ACTIONS
projectRouter.get('/:project_id', (req, res) => {
    const id = req.params.project_id;
    dbProjects.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'unable to retrieve list of projects actions'
        })
    })
});

//GETS
projectRouter.get('/', (req, res) => {
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

//POSTS

projectRouter.post('/', (req, res) => {
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

//Updates

projectRouter.put('/:id', (req, res) => {
    const {name, description} = req.body;
    const {id} = req.params;
    const projectChanges = req.body;
    if (!name || !description ) {
        res.status(400).json({
            errorMessage: 'Please provide name and description of project'
        })
    }
    else {
        dbProjects.update(id, projectChanges)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({
                    message: 'The project with the specified id does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The project information could not be modified."
            })
        })
    }
})

//DELETES

projectRouter.delete('/:id', (req, res) => {
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



module.exports = projectRouter;