const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const {ObjectID} = require('mongodb')

const {authenticate} = require('./middleware/authenticate')



const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())


// POST /todos

app.post('/todos', (request, response) => {
    const todo = new Todo({
        text: request.body.text
    })
    todo.save()
        .then(doc => {
            response.send(doc)

        })
        .catch(error => {
            response.status(400).send()
        })

})


// GET /todos

app.get('/todos', (request, response) => {
    Todo.find()
        .then(todos => {
            response.send({
                todos
            })

        })
        .catch(error => {
            response.status(400).send()
        })
})



// GET /todos/:id

app.get('/todos/:id', (request, response) => {

    const todoID = request.params.id

    if (!ObjectID.isValid(todoID)) {
        return response.status(404).send()
    }

    Todo.findById(todoID)
        .then(todo => {
            if (!todo) {
                return response.status(404).send()
            }
            response.send({todo})

        })
        .catch(error => {
            response.status(400).send(error)

        })

})


// DELETE /todos/:id

app.delete('/todos/:id', (request, response) => {
    const todoID = request.params.id

    if (!ObjectID.isValid(todoID)) {
        return response.status(404).send()
    }

    Todo.findByIdAndRemove(todoID)
        .then(todo => {
            if (!todo) {
                return response.status(404).send()
            }
            response.send({todo})
        })
        .catch(error => {
            response.status(400).send()

        })

})

// PATCH /todos/:id

app.patch('/todos/:id', (request, response) => {

    const todoID = request.params.id
    const body = _.pick(request.body, ['text', 'completed'])

    if (!ObjectID.isValid(todoID)) {
        return response.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()

    } else {
        body.completed = false
        body.completedAt = null

    }

    Todo.findByIdAndUpdate(todoID,{
        $set: body
    }, {
        new: true
    })
        .then(todo => {
            if (!todo) {
                return response.status(404).send()
            }
            response.send({todo})


        })
        .catch(error => {
            response.status(400).send()
        })


})


// POST /users

app.post('/users', (request, response) => {
    const body = _.pick(request.body, ['email', 'password'])

    let user = new User(body)




    user.save()
        .then(() => {
            return user.generateAuthToken()
                .then(token => {
                    response.header('x-auth', token).send(user)
                })
                .catch(error => {
                    response.send(400).send(error)
                })
        })
        .catch(error => {
            response.status(400).send(error)

        })

})





app.get('/users/me', authenticate, (request, response) => {
    const token = request.header('x-auth')

    response.send(request.user)
})






app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


module.exports = {
    app
}