const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MongoDB Server`)
    }

    console.log(`Connected to MongoDB Server`)

    // Delete Many
    // db.collection('Todos').deleteMany({
    //     text: 'Call mother'
    // })
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    // Delete One

    // db.collection('Todos').deleteOne({ text: 'Eat lunch'})
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    // Find One And Delete

    db.collection('Todos').findOneAndDelete({ _id: new ObjectID('59b30f2b0798ae73fb4c1321')})
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })





    //db.close()

})