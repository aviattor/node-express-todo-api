const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MongoDB Server`)
    }

    console.log(`Connected to MongoDB Server`)

    // db.collection('Todos').find({
    //     _id: new ObjectID('59b2fc540798ae73fb4c0f75')
    // }).toArray()
    //     .then(data => {
    //         console.log('Todos')
    //         console.log(JSON.stringify(data, undefined, 2))
    //     })
    //     .catch(error => {
    //         console.log('Unable to fetch todos', error)
    //     })


    // db.collection('Todos').find().count()
    //     .then(count => {
    //         console.log(`Todos count: ${count}`)
    //     })
    //     .catch(error => {
    //         console.log('Unable to fetch todos', error)
    //     })

    db.collection('Users').find({
        name: 'Lucius Sinna'
    }).toArray()
        .then(user => {
            console.log(JSON.stringify(user, undefined, 4))
        })
        .catch(error => {
            console.log('Could not find user')
        })




    db.close()

})