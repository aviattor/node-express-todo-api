const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const {ObjectID} = require('mongodb')



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
            response.status(400).send(error)
            console.log(error)
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
            console.log(error)
            response.status(400).send(error)
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








app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


module.exports = {
    app
}