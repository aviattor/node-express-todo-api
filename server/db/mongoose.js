const mongoose = require('mongoose')


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp', {useMongoClient: true})
    // .then(() => {
    //
    // })
    // .catch(error => {
    //
    // })


module.exports = {
    mongoose
}