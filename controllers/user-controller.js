const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '_id'
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    addFriend({ params, body }, res) {
        console.log(body)
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendsId: params.friendsId } } },
            { new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    }
}


module.exports = userController;