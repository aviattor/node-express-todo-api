const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MongoDB Server`)
    }

    console.log(`Connected to MongoDB Server`)

    // Find One and Update

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('59b2e1eb09191b9ff39f9daf')
    }, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    })
        .then(response => {
            console.log(response)

        })
        .catch(error => {
            console.log(error)
        })


    //db.close()

})