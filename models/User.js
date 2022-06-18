const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: String,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                Type: String
            }
        ]

    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const user = model('User', UserSchema)

module.exports = user;