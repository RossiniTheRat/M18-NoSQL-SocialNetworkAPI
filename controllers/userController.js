const { User } = require('../models');

const userController = {
    
    // get all users
    getAllUsers: async (req, res) => {
        try {
            const dbUserData = await User.find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one user by id
    getUserById: async ({ params }, res) => {
        try {
            const dbUserData = await User.findOne({ _id: params.id })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v');
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create a new user
    createUser: async ({ body }, res) => {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // update user by id
    updateUser: async ({ params, body }, res) => {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete user
    deleteUser: async ({ params }, res) => {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: params.id });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // add friend
    addFriend: async ({ params }, res) => {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // remove friend
    removeFriend: async ({ params }, res) => {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = userController;
