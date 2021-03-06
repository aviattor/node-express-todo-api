const expect = require('expect')
const request =  require('supertest')


const {app} = require('./../server')
const { Todo } = require('./../models/todo')

beforeEach((done) => {
    Todo.remove({})
        .then(() => done())
})


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text)
            })
            .end((error, response) => {
                if (error) {
                    return done(error)
                }
                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(1)
                        expect(todos[0].text).toBe(text)
                        done()
                    })
                    .catch(error => {
                        done(error)
                    })
            })
    })
})