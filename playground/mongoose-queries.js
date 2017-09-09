const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {ObjectID} = require('mongodb')

// const id = '59b46580b81ce5b44060b4551'
//
// if (!ObjectID.isValid(id)) {
//      return console.log("ID not valid")
// }
//
// Todo.find({
//     _id: id
// })
//     .then(todos => {
//         console.log('Todos: ', todos)
//     })
//
//
//
// Todo.findOne({ _id: id})
//     .then(todo => {
//         console.log('Todo - Find One: ', todo)
//     })
//
//
// Todo.findById(id)
//     .then(todo => {
//         if (!todo) {
//             return console.log('ID not found')
//         }
//         console.log('Todo - Find By ID: ', todo)
//     })


const userID = '59b35d6c36650aa6b5d8f474'

if (!ObjectID.isValid(userID)) {
    return console.log("User ID is invalid")
}

User.findById(userID)
    .then(user => {
        if (!user) {
            return console.log("User not found")
        }
        console.log('User found', JSON.stringify(user, undefined, 2))

    })
    .catch(error => {
        console.log('Unable to fetch user', error)
    })



