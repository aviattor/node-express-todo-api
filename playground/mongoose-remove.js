const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {ObjectID} = require('mongodb')

// Todo.remove({}) -- removes everything

//
// Todo.remove({})
//     .then(result => {
//         console.log(result)
//     })



// Todo.findOneAndRemove() - Will return the doc


// Todo.findByIdAndRemove(id) - Will return the doc

Todo.findByIdAndRemove('59b47532d26abcb47c01bf68')
    .then(todo => {
        console.log(todo)
    })








