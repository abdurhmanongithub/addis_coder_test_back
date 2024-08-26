import { Schema, model } from 'mongoose';

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    album: {
        type: String,
        trim: true,
    },
    genre: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const Song = model('Song', songSchema);

export default Song;
