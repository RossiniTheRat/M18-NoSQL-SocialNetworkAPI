const { Thought } = require('../models');

const thoughtController = {

    // Get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find()
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(thoughts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while retrieving thoughts.' });
        }
    },


    // Get a thought by ID
    getThoughtById: async (req, res) => {
        try {
            const { id } = req.params;
            const thought = await Thought.findById(id)
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v');
            if (!thought) {
                res.status(404).json({ message: `No thought found with id ${id}.` });
            } else {
                res.json(thought);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'An error occurred while retrieving the thought.' });
        }
    },

    // Create a new thought
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'An error occurred while creating the thought.' });
        }
    },


    // Update a thought by ID
    updateThought: async (req, res) => {
        try {
            const { id } = req.params;
            const thought = await Thought.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!thought) {
                res.status(404).json({ message: `No thought found with id ${id}.` });
            } else {
                res.json(thought);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'An error occurred while updating the thought.' });
        }
    },

    // Delete a thought by ID
    deleteThought: async (req, res) => {
        try {
            const { id } = req.params;
            const thought = await Thought.findByIdAndDelete(id);
            if (!thought) {
                res.status(404).json({ message: `No thought found with id ${id}.` });
            } else {
                res.json(thought);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'An error occurred while deleting the thought.' });
        }
    },


    // Add a reaction to a thought
    addReaction: async (req, res) => {
        try {
            const { thoughtId } = req.params;
            const reaction = req.body;
            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $push: { reactions: reaction } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: `No thought found with id ${thoughtId}.` });
            } else {
                res.json(thought);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'An error occurred while adding the reaction.' });
        }
    },


    // Remove a reaction from a thought
    removeReaction: async (req, res) => {
        try {
            const { thoughtId, reactionId } = req.params;
            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId: reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: `No thought found with id ${thoughtId}.` });
            } else {
                res.json(thought);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'An error occurred while removing the reaction.' });
        }
    }
};

module.exports = thoughtController;
