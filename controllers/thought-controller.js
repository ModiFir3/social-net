const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    createThought({ body }, res) {
        console.log(body, 'body')
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(thoughtData => {
                console.log(thoughtData, 'thoughtdata')
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    createReaction({ params, body }, res) {
        console.log(body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No Comment found with this id!" })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController;