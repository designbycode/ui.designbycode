'use client';

import { Menu, ListMusic } from 'lucide-react';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/lib/theme-colors';
import { AudioVisualizer } from '@/registry/new-york/components/blocks/music-player/audio-visualizer';
import { PlayerControls } from '@/registry/new-york/components/blocks/music-player/player-controls';
import { PlaylistSidebar } from '@/registry/new-york/components/blocks/music-player/playlist-sidebar';
import { ProgressBar } from '@/registry/new-york/components/blocks/music-player/progress-bar';
import { TrackInfo } from '@/registry/new-york/components/blocks/music-player/track-info';
import { VisualizerSettings } from '@/registry/new-york/components/blocks/music-player/visualizer-settings';
import { VolumeControl } from '@/registry/new-york/components/blocks/music-player/volume-control';
import { samplePlaylists } from '@/registry/new-york/lib/audio-context';
import type {
    Track,
    Playlist,
    VisualizerStyle,
} from '@/registry/new-york/lib/audio-context';

export function MusicPlayer() {
    // Audio state
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    // Player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isShuffled, setIsShuffled] = useState(false);
    const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

    // Track and playlist state
    const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);
    const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(
        samplePlaylists[2],
    );
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    // UI state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [visualizerStyle, setVisualizerStyle] =
        useState<VisualizerStyle>('bars');
    const [, setIsAudioReady] = useState(false);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    // Shuffle indices
    const shuffledIndices = useMemo(() => {
        if (!currentPlaylist) {
            return [];
        }

        const indices = Array.from(
            { length: currentPlaylist.tracks.length },
            (_, i) => i,
        );

        if (isShuffled) {
            for (let i = indices.length - 1; i > 0; i--) {
                // eslint-disable-next-line react-hooks/purity
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
        }

        return indices;
    }, [currentPlaylist, isShuffled]);

    const currentTrack =
        currentPlaylist?.tracks[
            isShuffled
                ? shuffledIndices[currentTrackIndex] || 0
                : currentTrackIndex
        ] || null;

    const { primary: primaryColor, secondary: secondaryColor } =
        useThemeColors();

    // Initialize audio context
    const initAudioContext = useCallback(() => {
        if (!audioRef.current || audioContextRef.current) {
            return;
        }

        try {
            const audioContext = new (
                window.AudioContext ||
                (
                    window as typeof window & {
                        webkitAudioContext: typeof AudioContext;
                    }
                ).webkitAudioContext
            )();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;

            const source = audioContext.createMediaElementSource(
                audioRef.current,
            );
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            sourceRef.current = source;
            setAnalyser(analyser);
        } catch (error) {
            console.log('[v0] Error initializing audio context:', error);
        }
    }, []);

    // Navigation
    const handleNext = useCallback(() => {
        if (!currentPlaylist) {
            return;
        }

        const maxIndex = currentPlaylist.tracks.length - 1;

        if (currentTrackIndex < maxIndex) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else if (repeatMode === 'all') {
            setCurrentTrackIndex(0);
        } else {
            setIsPlaying(false);
        }
    }, [currentPlaylist, currentTrackIndex, repeatMode]);

    const handlePrevious = () => {
        if (!audioRef.current) {
            return;
        }

        if (audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
        } else if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        }
    };

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleDurationChange = () => setDuration(audio.duration || 0);
        const handleEnded = () => {
            if (repeatMode === 'one') {
                audio.currentTime = 0;
                audio.play();
            } else {
                handleNext();
            }
        };
        const handleCanPlay = () => setIsAudioReady(true);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [repeatMode, handleNext]);

    // Volume control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Play/Pause
    const handlePlayPause = async () => {
        if (!audioRef.current || !currentTrack) {
            return;
        }

        if (!audioContextRef.current) {
            initAudioContext();
        }

        if (audioContextRef.current?.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.log('[v0] Playback error:', error);
            }
        }

        setIsPlaying(!isPlaying);
    };

    // Seek
    const handleSeek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    // Toggle controls
    const handleShuffle = () => setIsShuffled(!isShuffled);
    const handleRepeat = () => {
        const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
        const currentIndex = modes.indexOf(repeatMode);
        setRepeatMode(modes[(currentIndex + 1) % modes.length]);
    };

    const handleToggleFavorite = () => {
        if (!currentTrack) {
            return;
        }

        const newFavorites = new Set(favorites);

        if (newFavorites.has(currentTrack.id)) {
            newFavorites.delete(currentTrack.id);
        } else {
            newFavorites.add(currentTrack.id);
        }

        setFavorites(newFavorites);
    };

    // Playlist management
    const handleSelectPlaylist = (playlist: Playlist) => {
        setCurrentPlaylist(playlist);
        setCurrentTrackIndex(0);
        setIsPlaying(false);
    };

    const handleSelectTrack = (track: Track, playlist: Playlist) => {
        if (currentPlaylist?.id !== playlist.id) {
            setCurrentPlaylist(playlist);
        }

        const index = playlist.tracks.findIndex((t) => t.id === track.id);
        setCurrentTrackIndex(index >= 0 ? index : 0);
        setIsPlaying(true);
    };

    const handleCreatePlaylist = (name: string) => {
        const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name,
            tracks: [],
        };
        setPlaylists([...playlists, newPlaylist]);
    };

    // Auto-play when track changes
    useEffect(() => {
        if (audioRef.current && isPlaying && currentTrack) {
            audioRef.current.load();

            if (!audioContextRef.current) {
                initAudioContext();
            }

            (async () => {
                if (audioContextRef.current?.state === 'suspended') {
                    try {
                        await audioContextRef.current.resume();
                    } catch (e) {
                        console.log('[v0] Resume failed:', e);
                    }
                }

                try {
                    await audioRef.current?.play();
                } catch (e) {
                    console.error(e);
                }
            })();
        }
    }, [currentTrack, isPlaying, initAudioContext]);

    const currentAnalyser = isPlaying ? analyser : null;

    return (
        <div className="@container flex h-screen bg-background">
            {/* Hidden audio element */}
            <audio ref={audioRef} src={currentTrack?.src} preload="metadata" />

            {/* Playlist Sidebar */}
            <PlaylistSidebar
                playlists={playlists}
                currentPlaylist={currentPlaylist}
                currentTrack={currentTrack}
                onSelectPlaylist={handleSelectPlaylist}
                onSelectTrack={handleSelectTrack}
                onCreatePlaylist={handleCreatePlaylist}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main content */}
            <main className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-border p-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="text-muted-foreground hover:text-foreground @lg:hidden"
                            aria-label="Open playlist"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-bold text-foreground">
                            Sonic<span className="text-primary">Wave</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <VisualizerSettings
                            currentStyle={visualizerStyle}
                            onStyleChange={setVisualizerStyle}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden text-muted-foreground hover:text-foreground @lg:flex"
                            aria-label="Toggle playlist"
                        >
                            <ListMusic className="h-5 w-5" />
                        </Button>
                    </div>
                </header>

                {/* Visualization area with background */}
                <div className="relative flex-1 overflow-hidden">
                    {/* Dynamic background based on album art */}
                    {currentTrack?.coverUrl && (
                        <div className="absolute inset-0">
                            <img
                                src={currentTrack.coverUrl}
                                alt=""
                                className="absolute inset-0 scale-110 object-cover opacity-30 blur-3xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                        </div>
                    )}

                    {/* Visualizer */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="h-full max-h-96 w-full max-w-4xl">
                            <AudioVisualizer
                                analyser={currentAnalyser}
                                isPlaying={isPlaying}
                                style={visualizerStyle}
                                primaryColor={primaryColor}
                                secondaryColor={secondaryColor}
                            />
                        </div>
                    </div>

                    {/* Current album art (centered) */}
                    {currentTrack?.coverUrl && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="relative h-32 w-32 overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 @md:h-48 @md:w-48 @lg:h-56 @lg:w-56">
                                <img
                                    src={currentTrack.coverUrl}
                                    alt={`${currentTrack.album} cover`}
                                    className="absolute inset-0 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Player controls */}
                <div className="border-t border-border bg-card/80 backdrop-blur-lg">
                    <div className="mx-auto max-w-4xl space-y-4 p-4 @md:p-6">
                        {/* Track info */}
                        <TrackInfo
                            track={currentTrack}
                            isFavorite={
                                currentTrack
                                    ? favorites.has(currentTrack.id)
                                    : false
                            }
                            onToggleFavorite={handleToggleFavorite}
                        />

                        {/* Progress bar */}
                        <ProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={handleSeek}
                        />

                        {/* Controls row */}
                        <div className="flex flex-col items-center justify-between gap-4 @md:flex-row">
                            <div className="flex w-full justify-center @md:block @md:flex-1">
                                <VolumeControl
                                    volume={volume}
                                    onVolumeChange={setVolume}
                                />
                            </div>

                            <PlayerControls
                                isPlaying={isPlaying}
                                onPlayPause={handlePlayPause}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                onShuffle={handleShuffle}
                                onRepeat={handleRepeat}
                                isShuffled={isShuffled}
                                repeatMode={repeatMode}
                                disabled={!currentTrack}
                            />

                            <div className="hidden flex-1 @md:block" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
