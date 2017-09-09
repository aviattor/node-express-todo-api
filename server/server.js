const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')


const app = express()

app.use(bodyParser.json())

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








app.listen(3000, () => {
    console.log(`Server started on port 3000`)
})


module.exports = {
    app
}