"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
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
const Song = (0, mongoose_1.model)('Song', songSchema);
exports.default = Song;
