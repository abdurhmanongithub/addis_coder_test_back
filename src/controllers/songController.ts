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
