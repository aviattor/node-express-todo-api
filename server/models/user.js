const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    versionKey: false,
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true

        }
    }]

})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
    const user = this
    const access = 'auth'
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'good').toString()
    user.tokens.push({
        access,
        token
    })

    return user.save()
        .then(() => {
            return token
        })
        .catch()
}

UserSchema.methods.removeToken = function (token) {
    const user = this
    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}


UserSchema.statics.findByToken = function (token) {
    const User = this
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'good')

    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject()
        // })
        return Promise.reject()

    }
    return User.findOne({
        '_id': decodedToken._id,

        'tokens.access': 'auth',
        'tokens.token': token,
    })
}


UserSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({email})
        .then(user => {
            if (!user) {
                return Promise.reject()
            }
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (result) {
                        resolve(user)
                    } else {
                        reject()
                    }

                })
            })

        })
        .catch(error => {
            reject()
        })
}




UserSchema.pre('save', function (next) {
    const user = this
    if (user.isModified('password')) {

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (hash) {
                    user.password = hash
                    next()
                }
            })
        })

    } else {
        next()
    }
})


const User = mongoose.model('User', UserSchema)


module.exports = {

    User

}