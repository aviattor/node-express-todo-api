// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')



const obj = new ObjectID()
console.log(obj)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MongoDB Server`)
    }

    console.log(`Connected to MongoDB Server`)
    // db.collection('Todos').insertOne({
    //     text: 'Master Swift 4',
    //     completed: false
    //
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert todo', error)
    //     }
    //
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    // })


    // db.collection('Users').insertOne({
    //     name: 'Lucius Sinna',
    //     age: 25,
    //     location: 'Zurich'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user', error)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })



    db.close()

})