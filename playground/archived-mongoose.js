const mongoose = require('mongoose')


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp', {useMongoClient: true})
    .then(() => {
        const Todo = mongoose.model('Todo', {
            text: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            completedAt: {
                type: Number,
                default: null
            }
        })


        // const newTodo = new Todo({
        //     text: "Create bluecolr studios website"
        // })
        //
        // newTodo.save()
        //     .then(response => {
        //         console.log("Saved todo", response)
        //
        //     })
        //     .catch(error => {
        //         console.log('Unable to save todo', error)
        //     })




        const User = mongoose.model('User', {
            email: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            }
        })


        const newUser = new User({
            email: 'aviattor@usa.com'

        })

        newUser.save()
            .then(response => {
                console.log('Saved user', response)
            })
            .catch(error => {
                console.log('Unable to save user', error)
            })

    })
    .catch(error => {

    })

