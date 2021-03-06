const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {ObjectID} = require('mongodb')

const {authenticate} = require('./middleware/authenticate')


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())


// POST /todos

app.post('/todos', authenticate, (request, response) => {
    const todo = new Todo({
        text: request.body.text,
        _creator: request.user._id
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

app.get('/todos', authenticate, (request, response) => {
    Todo.find({
        _creator: request.user._id
    })
        .then(todos => {
            response.send({todos})

        })
        .catch(error => {
            response.status(400).send()
        })
})


// GET /todos/:id

app.get('/todos/:id', authenticate, (request, response) => {

    const todoID = request.params.id

    if (!ObjectID.isValid(todoID)) {
        return response.status(404).send()
    }

    Todo.findOne({
        _id: todoID,
        _creator: request.user._id
    })
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

app.delete('/todos/:id', authenticate, (request, response) => {
    const todoID = request.params.id

    if (!ObjectID.isValid(todoID)) {
        return response.status(404).send()
    }

    Todo.findOneAndRemove({
        _id: todoID,
        _creator: request.user._id
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

// PATCH /todos/:id

app.patch('/todos/:id', authenticate, (request, response) => {

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

    Todo.findOneAndUpdate({
        _id: todoID,
        _creator: request.user._id
    }, {
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
                    response.status(400).send(error)
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

// POST /users/login

app.post('/users/login', (request, response) => {
    const body = _.pick(request.body, ['email', 'password'])

    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateAuthToken()
                .then(token => {
                    response.header('x-auth', token).send(user)
                })
                .catch(error => {
                    response.status(400).send(error)
                })
        })
        .catch(error => {
            response.status(400).send()

        })

})

app.delete('/users/me/token', authenticate, (request, response) => {
    request.user.removeToken(request.token)
        .then(() => {
            response.status(200).send()
        })
        .catch(() => {
            response.status(400).send()
        })
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


module.exports = {
    app
}