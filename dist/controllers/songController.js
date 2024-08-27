"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = exports.deleteSong = exports.updateSong = exports.getSongById = exports.getSongs = exports.createSong = void 0;
const songModel_1 = __importDefault(require("../models/songModel"));
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, artist, album, genre } = req.body;
        const newSong = new songModel_1.default({ title, artist, album, genre });
        const savedSong = yield newSong.save();
        res.status(201).json(savedSong);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating song', error });
    }
});
exports.createSong = createSong;
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songModel_1.default.find();
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching songs', error });
    }
});
exports.getSongs = getSongs;
const getSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield songModel_1.default.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching song', error });
    }
});
exports.getSongById = getSongById;
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSong = yield songModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(updatedSong);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating song', error });
    }
});
exports.updateSong = updateSong;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSong = yield songModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting song', error });
    }
});
exports.deleteSong = deleteSong;
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalSongs = yield songModel_1.default.countDocuments();
        const totalArtists = yield songModel_1.default.distinct('artist').countDocuments();
        const totalAlbums = yield songModel_1.default.distinct('album').countDocuments();
        const totalGenres = yield songModel_1.default.distinct('genre').countDocuments();
        const songsByGenre = yield songModel_1.default.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } }
        ]);
        const songsAndAlbumsByArtist = yield songModel_1.default.aggregate([
            { $group: { _id: '$artist', songs: { $sum: 1 }, albums: { $addToSet: '$album' } } },
            { $project: { artist: '$_id', songs: 1, albums: { $size: '$albums' }, _id: 0 } }
        ]);
        const songsByAlbum = yield songModel_1.default.aggregate([
            { $group: { _id: '$album', count: { $sum: 1 } } }
        ]);
        res.json({
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres,
            songsByGenre,
            songsAndAlbumsByArtist,
            songsByAlbum
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
exports.getStatistics = getStatistics;
