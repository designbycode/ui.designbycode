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
        title: 'Cold Steel Sheets',
        artist: 'Iron & Oak',
        album: 'Forged',
        duration: 475,
        src: '/music/cold-steel-sheets.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop',
    },
    {
        id: '2',
        title: 'Laughter at the Gale',
        artist: 'Storm Chaser',
        album: 'Braving the Wind',
        duration: 353,
        src: '/music/laughter-at-the-gale.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    },
    {
        id: '3',
        title: 'Roses in the Sink',
        artist: 'Violet Glass',
        album: 'Fading Petals',
        duration: 393,
        src: '/music/roses-in-the-sink.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    },
    {
        id: '4',
        title: "Storm Walker's Oath",
        artist: 'Thunder Pass',
        album: 'The Reckoning',
        duration: 462,
        src: '/music/storm-walkers-oath.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    },
    {
        id: '5',
        title: 'The Empty Chair',
        artist: 'Silent Hollow',
        album: 'Left Behind',
        duration: 259,
        src: '/music/the-empty-chair.mp3',
        coverUrl:
            'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=400&fit=crop',
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
        name: 'Dark & Stormy',
        tracks: [sampleTracks[1], sampleTracks[3]],
        coverUrl: sampleTracks[1].coverUrl,
    },
    {
        id: '3',
        name: 'All Tracks',
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
