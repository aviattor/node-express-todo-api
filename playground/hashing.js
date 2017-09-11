const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

const data = {
    id: 10
}

const token = jwt.sign(data, 'good')
console.log(`JWT Token: ${token}`)

const decoded = jwt.verify(token, 'good')

console.log(`JWT Decoded:`, JSON.stringify(decoded, undefined, 2))




// const message = "I am user number 3"
// const hash = SHA256(message).toString()
//
// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)
//
//
// const data = {
//     id: 4
// }
//
// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'good').toString()
// }
//
// console.log(token)
//
//
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'good').toString()
//
//
//
// if (resultHash === token.hash) {
//     console.log("Data is good")
// } else {
//     console.log('Data was changed. Don\'t trust')
// }