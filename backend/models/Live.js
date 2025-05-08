const mongoose = require('mongoose');

const liveSchema = new mongoose.Schema({
    meetingTitle: {
        type: String,
        required: true,
        trim: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    startTime: {
        type: Date,
        required: true,
    },
    meetingLink: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    chat: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
        },
    ],
}, { timestamps: true });

const Live= mongoose.model('Live', liveSchema);

module.exports = Live;