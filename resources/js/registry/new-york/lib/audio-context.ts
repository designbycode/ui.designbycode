export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    src: string;
    coverUrl?: string;
}

export interface Playlist {
    id: string;
    name: string;
    tracks: Track[];
    coverUrl?: string;
}

export const sampleTracks: Track[] = [
    {
        id: '1',
        title: 'Midnight Echoes',
        artist: 'Luna Wave',
        album: 'Dreamscape',
        duration: 245,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop',
    },
    {
        id: '2',
        title: 'Neon Lights',
        artist: 'Synthwave Collective',
        album: 'Retro Future',
        duration: 312,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    },
    {
        id: '3',
        title: 'Ocean Drift',
        artist: 'Ambient Shores',
        album: 'Tidal',
        duration: 278,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    },
    {
        id: '4',
        title: 'Electric Dreams',
        artist: 'Pulse',
        album: 'Voltage',
        duration: 195,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    },
    {
        id: '5',
        title: 'Starfall',
        artist: 'Cosmic Sound',
        album: 'Galaxies',
        duration: 267,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=400&fit=crop',
    },
    {
        id: '6',
        title: 'Urban Flow',
        artist: 'City Beats',
        album: 'Metropolis',
        duration: 224,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    },
];

export const samplePlaylists: Playlist[] = [
    {
        id: '1',
        name: 'Chill Vibes',
        tracks: [sampleTracks[0], sampleTracks[2], sampleTracks[4]],
        coverUrl: sampleTracks[0].coverUrl,
    },
    {
        id: '2',
        name: 'Energy Boost',
        tracks: [sampleTracks[1], sampleTracks[3], sampleTracks[5]],
        coverUrl: sampleTracks[1].coverUrl,
    },
    {
        id: '3',
        name: 'Late Night',
        tracks: sampleTracks,
        coverUrl: sampleTracks[3].coverUrl,
    },
];

export type VisualizerStyle = 'bars' | 'wave' | 'circular' | 'particles';

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
