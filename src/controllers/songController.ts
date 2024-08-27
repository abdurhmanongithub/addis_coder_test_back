import { Request, Response } from 'express';
import Song from '../models/songModel';

export const createSong = async (req: Request, res: Response) => {
    try {
        const { title, artist, album, genre } = req.body;
        const newSong = new Song({ title, artist, album, genre });
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(500).json({ message: 'Error creating song', error });
    }
};

export const getSongs = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs', error });
    }
};

export const getSongById = async (req: Request, res: Response) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching song', error });
    }
};

export const updateSong = async (req: Request, res: Response) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: 'Error updating song', error });
    }
};

export const deleteSong = async (req: Request, res: Response) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting song', error });
    }
};

export const getStatistics = async (req: Request, res: Response) => {
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = await Song.distinct('artist').countDocuments();
        const totalAlbums = await Song.distinct('album').countDocuments();
        const totalGenres = await Song.distinct('genre').countDocuments();
        const songsByGenre = await Song.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } }
        ]);
        const songsAndAlbumsByArtist = await Song.aggregate([
            { $group: { _id: '$artist', songs: { $sum: 1 }, albums: { $addToSet: '$album' } } },
            { $project: { artist: '$_id', songs: 1, albums: { $size: '$albums' }, _id: 0 } }
        ]);
        const songsByAlbum = await Song.aggregate([
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
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}