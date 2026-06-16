<?php

namespace Database\Seeders;

use App\Models\Registry;
use App\Models\User;
use Illuminate\Database\Seeder;

class RegistrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = User::first()?->id ?? 1;

        $items = [
            [
                'name' => 'music-player',
                'type' => 'registry:block',
                'title' => 'Music Player',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    'lucide-react',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'https://ui.test/r/audio-context.json',
                    'button',
                    'utils',
                    'input',
                    'popover',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/audio-visualizer.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { useRef, useEffect, useCallback } from \'react\';
import type { VisualizerStyle } from \'@/registry/new-york/lib/audio-context\';

interface AudioVisualizerProps {
    analyser: AnalyserNode | null;
    isPlaying: boolean;
    style: VisualizerStyle;
    primaryColor?: string;
    secondaryColor?: string;
}

export function AudioVisualizer({
    analyser,
    isPlaying,
    style,
    primaryColor,
    secondaryColor,
}: AudioVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<
        Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            life: number;
        }>
    >([]);

    const drawBars = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const bufferLength = dataArray.length;
            const barWidth = (width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * height * 0.8;

                const gradient = ctx.createLinearGradient(
                    0,
                    height,
                    0,
                    height - barHeight,
                );
                gradient.addColorStop(0, primaryColor || \'#e54545\');
                gradient.addColorStop(1, secondaryColor || \'#ff7b7b\');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

                // Reflection
                ctx.fillStyle = `${primaryColor || \'#e54545\'}33`;
                ctx.fillRect(x, height, barWidth - 2, barHeight * 0.3);

                x += barWidth;
            }
        },
        [primaryColor, secondaryColor],
    );

    const drawWave = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const bufferLength = dataArray.length;
            const sliceWidth = width / bufferLength;

            ctx.lineWidth = 3;
            ctx.strokeStyle = primaryColor || \'#e54545\';
            ctx.shadowColor = primaryColor || \'#e54545\';
            ctx.shadowBlur = 10;

            ctx.beginPath();
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.stroke();

            // Second wave with offset
            ctx.strokeStyle = secondaryColor || \'#ff7b7b\';
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * height) / 2 + 10;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        },
        [primaryColor, secondaryColor],
    );

    const drawCircular = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.35;
            const bufferLength = dataArray.length;

            // Draw circular bars
            for (let i = 0; i < bufferLength; i++) {
                const angle = (i / bufferLength) * Math.PI * 2 - Math.PI / 2;
                const barHeight = (dataArray[i] / 255) * radius * 0.8;

                const x1 = centerX + Math.cos(angle) * radius;
                const y1 = centerY + Math.sin(angle) * radius;
                const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                const y2 = centerY + Math.sin(angle) * (radius + barHeight);

                const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                gradient.addColorStop(0, primaryColor || \'#e54545\');
                gradient.addColorStop(1, secondaryColor || \'#ff7b7b\');

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // Inner glow circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = `${primaryColor || \'#e54545\'}44`;
            ctx.lineWidth = 2;
            ctx.stroke();
        },
        [primaryColor, secondaryColor],
    );

    const drawParticles = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const avgAmplitude =
                dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            // Add new particles based on audio
            if (avgAmplitude > 50) {
                for (let i = 0; i < Math.floor(avgAmplitude / 30); i++) {
                    particlesRef.current.push({
                        x: Math.random() * width,
                        y: height,
                        vx: (Math.random() - 0.5) * 3,
                        vy: -Math.random() * (avgAmplitude / 30) - 2,
                        size: Math.random() * 4 + 2,
                        life: 1,
                    });
                }
            }

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.life -= 0.015;

                if (p.life <= 0) {
                    return false;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle =
                    p.life > 0.5
                        ? primaryColor || \'#e54545\'
                        : secondaryColor || \'#ff7b7b\';
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;

                return p.life > 0;
            });

            // Draw frequency bars at bottom
            const barCount = 10;
            const barWidth = width / barCount;

            for (let i = 0; i < barCount; i++) {
                const dataIndex = Math.floor((i / barCount) * dataArray.length);
                const barHeight = (dataArray[dataIndex] / 255) * height * 0.3;

                ctx.fillStyle = `${primaryColor || \'#e54545\'}88`;
                ctx.fillRect(
                    i * barWidth,
                    height - barHeight,
                    barWidth - 2,
                    barHeight,
                );
            }
        },
        [primaryColor, secondaryColor],
    );

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext(\'2d\');

        if (!ctx) {
            return;
        }

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });

        resizeObserver.observe(canvas);

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            ctx.clearRect(0, 0, width, height);

            if (analyser && isPlaying) {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);

                switch (style) {
                    case \'bars\':
                        drawBars(ctx, dataArray, width, height);
                        break;
                    case \'wave\':
                        analyser.getByteTimeDomainData(dataArray);
                        drawWave(ctx, dataArray, width, height);
                        break;
                    case \'circular\':
                        drawCircular(ctx, dataArray, width, height);
                        break;
                    case \'particles\':
                        drawParticles(ctx, dataArray, width, height);
                        break;
                }
            } else {
                // Draw idle animation
                const time = Date.now() / 1000;
                const bars = 22;
                const barWidth = rect.width / bars;

                for (let i = 0; i < bars; i++) {
                    const barHeight =
                        (Math.sin(time * 2 + i * 0.3) + 1) * 10 + 5;
                    ctx.fillStyle = `${primaryColor || \'#e54545\'}88`;
                    ctx.fillRect(
                        i * barWidth,
                        height - barHeight,
                        barWidth - 2,
                        barHeight,
                    );
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            resizeObserver.disconnect();

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        analyser,
        isPlaying,
        style,
        drawBars,
        drawWave,
        drawCircular,
        drawParticles,
        primaryColor,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ display: \'block\' }}
        />
    );
}
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/music-player.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { Menu, ListMusic } from \'lucide-react\';

import { useState, useRef, useEffect, useCallback, useMemo } from \'react\';
import { Button } from \'@/components/ui/button\';
import { useThemeColors } from \'@/lib/theme-colors\';
import { AudioVisualizer } from \'@/registry/new-york/components/music-player/audio-visualizer\';
import { PlayerControls } from \'@/registry/new-york/components/music-player/player-controls\';
import { PlaylistSidebar } from \'@/registry/new-york/components/music-player/playlist-sidebar\';
import { ProgressBar } from \'@/registry/new-york/components/music-player/progress-bar\';
import { TrackInfo } from \'@/registry/new-york/components/music-player/track-info\';
import { VisualizerSettings } from \'@/registry/new-york/components/music-player/visualizer-settings\';
import { VolumeControl } from \'@/registry/new-york/components/music-player/volume-control\';
import { samplePlaylists } from \'@/registry/new-york/lib/audio-context\';
import type {
    Track,
    Playlist,
    VisualizerStyle,
} from \'@/registry/new-york/lib/audio-context\';

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
    const [repeatMode, setRepeatMode] = useState<\'off\' | \'all\' | \'one\'>(\'off\');

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
        useState<VisualizerStyle>(\'bars\');
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
            console.log(\'[v0] Error initializing audio context:\', error);
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
        } else if (repeatMode === \'all\') {
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
            if (repeatMode === \'one\') {
                audio.currentTime = 0;
                audio.play();
            } else {
                handleNext();
            }
        };
        const handleCanPlay = () => setIsAudioReady(true);

        audio.addEventListener(\'timeupdate\', handleTimeUpdate);
        audio.addEventListener(\'durationchange\', handleDurationChange);
        audio.addEventListener(\'ended\', handleEnded);
        audio.addEventListener(\'canplay\', handleCanPlay);

        return () => {
            audio.removeEventListener(\'timeupdate\', handleTimeUpdate);
            audio.removeEventListener(\'durationchange\', handleDurationChange);
            audio.removeEventListener(\'ended\', handleEnded);
            audio.removeEventListener(\'canplay\', handleCanPlay);
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

        if (audioContextRef.current?.state === \'suspended\') {
            await audioContextRef.current.resume();
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.log(\'[v0] Playback error:\', error);
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
        const modes: (\'off\' | \'all\' | \'one\')[] = [\'off\', \'all\', \'one\'];
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
                if (audioContextRef.current?.state === \'suspended\') {
                    try {
                        await audioContextRef.current.resume();
                    } catch (e) {
                        console.log(\'[v0] Resume failed:\', e);
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
        <div className="flex h-screen bg-background @container">
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={currentTrack?.src}
                preload="metadata"
            />

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
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/player-controls.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Repeat1,
} from \'lucide-react\';
import { Button } from \'@/components/ui/button\';
import { cn } from \'@/lib/utils\';

interface PlayerControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onShuffle: () => void;
    onRepeat: () => void;
    isShuffled: boolean;
    repeatMode: \'off\' | \'all\' | \'one\';
    disabled?: boolean;
}

export function PlayerControls({
    isPlaying,
    onPlayPause,
    onPrevious,
    onNext,
    onShuffle,
    onRepeat,
    isShuffled,
    repeatMode,
    disabled = false,
}: PlayerControlsProps) {
    return (
        <div className="flex items-center justify-center gap-1 @md:gap-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={onShuffle}
                disabled={disabled}
                className={cn(
                    \'h-8 w-8 @md:h-10 @md:w-10\',
                    isShuffled
                        ? \'text-primary\'
                        : \'text-muted-foreground hover:text-foreground\',
                )}
                aria-label="Shuffle"
            >
                <Shuffle className="h-3 w-3 @md:h-5 @md:w-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                disabled={disabled}
                className="h-9 w-9 text-foreground hover:text-primary @md:h-12 @md:w-12"
                aria-label="Previous track"
            >
                <SkipBack className="h-4 w-4 @md:h-6 @md:w-6" />
            </Button>

            <Button
                onClick={onPlayPause}
                disabled={disabled}
                className={cn(
                    \'h-12 w-12 rounded-full @md:h-16 @md:w-16\',
                    \'bg-primary text-primary-foreground hover:bg-primary/90\',
                    \'shadow-lg shadow-primary/25 transition-all\',
                    \'hover:scale-105 active:scale-95\',
                )}
                aria-label={isPlaying ? \'Pause\' : \'Play\'}
            >
                {isPlaying ? (
                    <Pause className="h-5 w-5 @md:h-7 @md:w-7" />
                ) : (
                    <Play className="ml-0.5 h-5 w-5 @md:h-7 @md:w-7" />
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={disabled}
                className="h-9 w-9 text-foreground hover:text-primary @md:h-12 @md:w-12"
                aria-label="Next track"
            >
                <SkipForward className="h-4 w-4 @md:h-6 @md:w-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onRepeat}
                disabled={disabled}
                className={cn(
                    \'h-8 w-8 @md:h-10 @md:w-10\',
                    repeatMode !== \'off\'
                        ? \'text-primary\'
                        : \'text-muted-foreground hover:text-foreground\',
                )}
                aria-label="Repeat"
            >
                {repeatMode === \'one\' ? (
                    <Repeat1 className="h-3 w-3 @md:h-5 @md:w-5" />
                ) : (
                    <Repeat className="h-3 w-3 @md:h-5 @md:w-5" />
                )}
            </Button>
        </div>
    );
}
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/playlist-sidebar.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { Plus, Music, ChevronRight, X, Play } from \'lucide-react\';
import { useState } from \'react\';
import { Button } from \'@/components/ui/button\';
import { Input } from \'@/components/ui/input\';
import { cn } from \'@/lib/utils\';
import type { Playlist, Track } from \'@/registry/new-york/lib/audio-context\';
import { formatTime } from \'@/registry/new-york/lib/audio-context\';

interface PlaylistSidebarProps {
    playlists: Playlist[];
    currentPlaylist: Playlist | null;
    currentTrack: Track | null;
    onSelectPlaylist: (playlist: Playlist) => void;
    onSelectTrack: (track: Track, playlist: Playlist) => void;
    onCreatePlaylist: (name: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export function PlaylistSidebar({
    playlists,
    currentPlaylist,
    currentTrack,
    onSelectPlaylist,
    onSelectTrack,
    onCreatePlaylist,
    isOpen,
    onClose,
}: PlaylistSidebarProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState(\'\');
    const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(
        null,
    );

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            onCreatePlaylist(newPlaylistName.trim());
            setNewPlaylistName(\'\');
            setIsCreating(false);
        }
    };

    const toggleExpand = (playlistId: string) => {
        setExpandedPlaylist(
            expandedPlaylist === playlistId ? null : playlistId,
        );
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm @lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    \'fixed top-0 left-0 z-50 h-full w-80 border-r border-border bg-card @lg:relative\',
                    \'transform transition-transform duration-300 ease-in-out\',
                    isOpen
                        ? \'translate-x-0\'
                        : \'-translate-x-full @lg:translate-x-0\',
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border p-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Playlists
                        </h2>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCreating(true)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Create playlist"
                            >
                                <Plus className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground @lg:hidden"
                                aria-label="Close sidebar"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Create playlist form */}
                    {isCreating && (
                        <div className="border-b border-border p-4">
                            <Input
                                type="text"
                                placeholder="Playlist name..."
                                value={newPlaylistName}
                                onChange={(e) =>
                                    setNewPlaylistName(e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === \'Enter\' && handleCreatePlaylist()
                                }
                                className="mb-2"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={handleCreatePlaylist}
                                    className="flex-1"
                                >
                                    Create
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setNewPlaylistName(\'\');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Playlist list */}
                    <div className="flex-1 overflow-y-auto">
                        {playlists.map((playlist) => (
                            <div
                                key={playlist.id}
                                className="border-b border-border/50"
                            >
                                <button
                                    onClick={() => {
                                        onSelectPlaylist(playlist);
                                        toggleExpand(playlist.id);
                                    }}
                                    className={cn(
                                        \'flex w-full items-center gap-3 p-4 transition-colors hover:bg-muted/50\',
                                        currentPlaylist?.id === playlist.id &&
                                            \'bg-muted\',
                                    )}
                                >
                                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                        {playlist.coverUrl ? (
                                            <img
                                                src={playlist.coverUrl}
                                                alt={playlist.name}
                                                className="absolute inset-0 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/50 to-primary/20">
                                                <Music className="h-6 w-6 text-primary" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1 text-left">
                                        <p className="truncate font-medium text-foreground">
                                            {playlist.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {playlist.tracks.length} tracks
                                        </p>
                                    </div>

                                    <ChevronRight
                                        className={cn(
                                            \'h-5 w-5 text-muted-foreground transition-transform\',
                                            expandedPlaylist === playlist.id &&
                                                \'rotate-90\',
                                        )}
                                    />
                                </button>

                                {/* Expanded track list */}
                                {expandedPlaylist === playlist.id && (
                                    <div className="bg-muted/30">
                                        {playlist.tracks.map((track, index) => (
                                            <button
                                                key={track.id}
                                                onClick={() =>
                                                    onSelectTrack(
                                                        track,
                                                        playlist,
                                                    )
                                                }
                                                className={cn(
                                                    \'flex w-full items-center gap-3 px-4 py-2 transition-colors hover:bg-muted/50\',
                                                    currentTrack?.id ===
                                                        track.id &&
                                                        \'bg-primary/10\',
                                                )}
                                            >
                                                <span className="w-6 text-center text-xs text-muted-foreground">
                                                    {currentTrack?.id ===
                                                    track.id ? (
                                                        <Play className="mx-auto h-3 w-3 fill-primary text-primary" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </span>
                                                <div className="min-w-0 flex-1 text-left">
                                                    <p
                                                        className={cn(
                                                            \'truncate text-sm\',
                                                            currentTrack?.id ===
                                                                track.id
                                                                ? \'text-primary\'
                                                                : \'text-foreground\',
                                                        )}
                                                    >
                                                        {track.title}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {track.artist}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatTime(track.duration)}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/progress-bar.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { useRef, useState, useCallback } from \'react\';
import { formatTime } from \'@/registry/new-york/lib/audio-context\';

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

export function ProgressBar({
    currentTime,
    duration,
    onSeek,
}: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);

    const calculatePosition = useCallback((clientX: number): number => {
        if (!progressRef.current) {
            return 0;
        }

        const rect = progressRef.current.getBoundingClientRect();
        const position = (clientX - rect.left) / rect.width;

        return Math.max(0, Math.min(1, position));
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const position = calculatePosition(e.clientX);
        onSeek(position * duration);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const position = calculatePosition(e.clientX);
        setHoverPosition(position);

        if (isDragging) {
            onSeek(position * duration);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setHoverPosition(null);
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const position = calculatePosition(touch.clientX);
        onSeek(position * duration);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) {
            return;
        }

        const touch = e.touches[0];
        const position = calculatePosition(touch.clientX);
        onSeek(position * duration);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="w-full space-y-1">
            <div
                ref={progressRef}
                className="group relative h-2 cursor-pointer rounded-full bg-muted"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
                aria-label="Seek"
                tabIndex={0}
            >
                {/* Progress fill */}
                <div
                    className="absolute top-0 left-0 h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                />

                {/* Hover preview */}
                {hoverPosition !== null && (
                    <div
                        className="absolute top-0 h-full rounded-full bg-foreground/20"
                        style={{ width: `${hoverPosition * 100}%` }}
                    />
                )}

                {/* Thumb */}
                <div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    style={{ left: `calc(${progress}% - 8px)` }}
                />

                {/* Hover time tooltip */}
                {hoverPosition !== null && (
                    <div
                        className="absolute -top-8 rounded bg-card px-2 py-1 text-xs text-foreground shadow-lg"
                        style={{ left: `calc(${hoverPosition * 100}% - 20px)` }}
                    >
                        {formatTime(hoverPosition * duration)}
                    </div>
                )}
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/track-info.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { Heart } from \'lucide-react\';

import { cn } from \'@/lib/utils\';
import type { Track } from \'@/registry/new-york/lib/audio-context\';

interface TrackInfoProps {
    track: Track | null;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export function TrackInfo({
    track,
    isFavorite,
    onToggleFavorite,
}: TrackInfoProps) {
    if (!track) {
        return (
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 animate-pulse rounded-lg bg-muted" />
                <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <div className="group relative h-16 w-16 overflow-hidden rounded-lg shadow-lg @md:h-20 @md:w-20">
                {track.coverUrl ? (
                    <img
                        src={track.coverUrl}
                        alt={`${track.album} cover`}
                        className="object-cover transition-transform group-hover:scale-110"
                        crossOrigin="anonymous"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/50">
                        <span className="text-2xl font-bold text-primary-foreground">
                            {track.title[0]}
                        </span>
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-foreground @md:text-base">
                    {track.title}
                </h3>
                <p className="truncate text-xs text-muted-foreground @md:text-sm">
                    {track.artist}
                </p>
                <p className="truncate text-xs text-muted-foreground/70">
                    {track.album}
                </p>
            </div>

            <button
                onClick={onToggleFavorite}
                className="rounded-full p-2 transition-colors hover:bg-muted"
                aria-label={
                    isFavorite ? \'Remove from favorites\' : \'Add to favorites\'
                }
            >
                <Heart
                    className={cn(
                        \'h-5 w-5 transition-all\',
                        isFavorite
                            ? \'scale-110 fill-primary text-primary\'
                            : \'text-muted-foreground hover:text-primary\',
                    )}
                />
            </button>
        </div>
    );
}
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/visualizer-settings.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { Settings, Waves, BarChart3, Circle, Sparkles } from \'lucide-react\';
import { Button } from \'@/components/ui/button\';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from \'@/components/ui/popover\';
import { cn } from \'@/lib/utils\';
import type { VisualizerStyle } from \'@/registry/new-york/lib/audio-context\';

interface VisualizerSettingsProps {
    currentStyle: VisualizerStyle;
    onStyleChange: (style: VisualizerStyle) => void;
}

const visualizerOptions: {
    style: VisualizerStyle;
    label: string;
    icon: React.ReactNode;
}[] = [
    { style: \'bars\', label: \'Bars\', icon: <BarChart3 className="size-4" /> },
    { style: \'wave\', label: \'Wave\', icon: <Waves className="size-4" /> },
    {
        style: \'circular\',
        label: \'Circular\',
        icon: <Circle className="size-4" />,
    },
    {
        style: \'particles\',
        label: \'Particles\',
        icon: <Sparkles className="size-4" />,
    },
];

export function VisualizerSettings({
    currentStyle,
    onStyleChange,
}: VisualizerSettingsProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 text-muted-foreground hover:text-foreground"
                    aria-label="Visualizer settings"
                >
                    <Settings className="size-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="end">
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                        Visualizer Style
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        {visualizerOptions.map((option) => (
                            <Button
                                key={option.style}
                                variant="outline"
                                size="sm"
                                onClick={() => onStyleChange(option.style)}
                                className={cn(
                                    \'justify-start gap-2\',
                                    currentStyle === option.style &&
                                        \'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground\',
                                )}
                            >
                                {option.icon}
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
',
                    ],
                    [
                        'path' => 'resources/js/registry/new-york/components/music-player/volume-control.tsx',
                        'type' => 'registry:block',
                        'content' => '\'use client\';

import { Volume2, Volume1, VolumeX } from \'lucide-react\';
import { useState } from \'react\';
import { Button } from \'@/components/ui/button\';

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
    const [previousVolume, setPreviousVolume] = useState(volume);
    const [isHovered, setIsHovered] = useState(false);

    const toggleMute = () => {
        if (volume > 0) {
            setPreviousVolume(volume);
            onVolumeChange(0);
        } else {
            onVolumeChange(previousVolume || 0.7);
        }
    };

    const VolumeIcon =
        volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

    return (
        <div
            className="group flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label={volume === 0 ? \'Unmute\' : \'Mute\'}
            >
                <VolumeIcon className="h-5 w-5" />
            </Button>

            <div
                className={`overflow-hidden transition-all duration-200 ${isHovered ? \'w-24 opacity-100\' : \'w-0 opacity-0 @md:w-24 @md:opacity-100\'} `}
            >
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                    style={{
                        background: `linear-gradient(to right, var(--primary) ${volume * 100}%, var(--muted) ${volume * 100}%)`,
                    }}
                    aria-label="Volume"
                />
            </div>
        </div>
    );
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'blocks',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'blocks',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'gsap-marquee',
                'type' => 'registry:ui',
                'title' => 'Gsap Marquee',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    'gsap',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/animations/gsap-marquee.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import { gsap } from \'gsap\';
import * as React from \'react\';
import { useCallback, useEffect, useMemo, useRef } from \'react\';
import { cn } from \'@/lib/utils\';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type MarqueeDirection = \'left\' | \'right\' | \'up\' | \'down\';
export type MarqueeLoopMode = \'continuous\' | \'yoyo\';
export type MarqueeEasing =
    | \'none\'
    | \'power1.inOut\'
    | \'power2.inOut\'
    | \'power3.inOut\'
    | \'elastic.out\'
    | \'bounce.out\'
    | \'back.inOut\';

export interface GSAPMarqueeProps {
    /** Content to be displayed in the marquee */
    children: React.ReactNode;
    /** Direction of movement */
    direction?: MarqueeDirection;
    /** Loop mode: continuous or yoyo (ping-pong) */
    loopMode?: MarqueeLoopMode;
    /** Base duration in seconds for one complete cycle */
    duration?: number;
    /** Gap between repeated items (in pixels or CSS value) */
    gap?: number;
    /** Number of times to repeat the content */
    repeat?: number;
    /** Pause animation on hover */
    pauseOnHover?: boolean;
    /** Enable scroll-based velocity adjustment */
    scrollVelocity?: boolean;
    /** Multiplier for scroll velocity effect (higher = more responsive) */
    velocityMultiplier?: number;
    /** Maximum velocity cap to prevent extreme speeds */
    maxVelocity?: number;
    /** Minimum velocity (can be negative for reverse on scroll) */
    minVelocity?: number;
    /** GSAP easing function for yoyo mode */
    easing?: MarqueeEasing;
    /** Delay before animation starts (in seconds) */
    delay?: number;
    /** Whether the animation should start automatically */
    autoPlay?: boolean;
    /** Callback when animation completes one cycle */
    onCycleComplete?: () => void;
    /** Callback when animation updates */
    onUpdate?: (progress: number) => void;
    /** Additional class names for the container */
    className?: string;
    /** Additional class names for the track */
    trackClassName?: string;
    /** Additional class names for individual items */
    itemClassName?: string;
    /** Enable GPU acceleration */
    useGPU?: boolean;
    /** Scrub animation to scroll position (0-1 for smoothness, true for instant) */
    scrub?: boolean | number;
    /** Reverse the default direction */
    reverse?: boolean;
}

export interface GSAPMarqueeRef {
    /** Play the animation */
    play: () => void;
    /** Pause the animation */
    pause: () => void;
    /** Reverse the animation direction */
    reverse: () => void;
    /** Seek to a specific progress (0-1) */
    seek: (progress: number) => void;
    /** Get current progress (0-1) */
    getProgress: () => number;
    /** Set animation speed (1 = normal, 2 = double speed, etc.) */
    setSpeed: (speed: number) => void;
    /** Kill the animation and clean up */
    kill: () => void;
    /** Restart the animation */
    restart: () => void;
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

function useScrollVelocity(
    enabled: boolean,
    multiplier: number,
    maxVelocity: number,
    minVelocity: number,
) {
    const velocityRef = useRef(1);
    const lastScrollY = useRef(0);
    const lastTime = useRef(0);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        lastTime.current = Date.now();

        const calculateVelocity = () => {
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            const deltaY = Math.abs(currentScrollY - lastScrollY.current);
            const deltaTime = currentTime - lastTime.current;

            if (deltaTime > 0) {
                const rawVelocity = (deltaY / deltaTime) * multiplier;
                const targetVelocity = Math.max(
                    minVelocity,
                    Math.min(maxVelocity, 1 + rawVelocity),
                );

                // Smooth interpolation
                velocityRef.current = gsap.utils.interpolate(
                    velocityRef.current,
                    targetVelocity,
                    0.1,
                );
            }

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;
            rafId.current = requestAnimationFrame(calculateVelocity);
        };

        rafId.current = requestAnimationFrame(calculateVelocity);

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [enabled, multiplier, maxVelocity, minVelocity]);

    return velocityRef;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const GSAPMarquee = React.forwardRef<GSAPMarqueeRef, GSAPMarqueeProps>(
    (
        {
            children,
            direction = \'left\',
            loopMode = \'continuous\',
            duration = 20,
            gap = 24,
            repeat = 4,
            pauseOnHover = true,
            scrollVelocity = false,
            velocityMultiplier = 0.5,
            maxVelocity = 5,
            minVelocity = 0.2,
            easing = \'none\',
            delay = 0,
            autoPlay = true,
            onCycleComplete,
            onUpdate,
            className,
            trackClassName,
            itemClassName,
            useGPU = true,
            reverse = false,
            scrub = false,
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const trackRef = useRef<HTMLDivElement>(null);
        const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(
            null,
        );
        const velocityRef = useScrollVelocity(
            scrollVelocity,
            velocityMultiplier,
            maxVelocity,
            minVelocity,
        );
        const isPausedRef = useRef(false);

        const isHorizontal = direction === \'left\' || direction === \'right\';
        const isPositive = direction === \'right\' || direction === \'down\';
        const actualDirection = reverse ? !isPositive : isPositive;

        // Calculate animation properties
        const animationProps = useMemo(() => {
            const prop = isHorizontal ? \'xPercent\' : \'yPercent\';
            const startValue = actualDirection ? -100 / repeat : 0;
            const endValue = actualDirection ? 0 : -100 / repeat;

            return { prop, startValue, endValue };
        }, [isHorizontal, actualDirection, repeat]);

        // Create and manage animation
        useEffect(() => {
            if (!trackRef.current) {
                return;
            }

            const track = trackRef.current;
            const { prop, startValue, endValue } = animationProps;

            // Set initial position
            gsap.set(track, { [prop]: startValue });

            // Create the animation
            if (loopMode === \'continuous\') {
                tweenRef.current = gsap.to(track, {
                    [prop]: endValue,
                    duration,
                    ease: \'none\',
                    repeat: -1,
                    delay,
                    force3D: useGPU,
                    onRepeat: onCycleComplete,
                    onUpdate: () => {
                        if (onUpdate && tweenRef.current) {
                            onUpdate(tweenRef.current.progress());
                        }
                    },
                });
            } else {
                // Yoyo mode
                tweenRef.current = gsap.to(track, {
                    [prop]: endValue,
                    duration,
                    ease: easing,
                    repeat: -1,
                    yoyo: true,
                    delay,
                    force3D: useGPU,
                    onRepeat: onCycleComplete,
                    onUpdate: () => {
                        if (onUpdate && tweenRef.current) {
                            onUpdate(tweenRef.current.progress());
                        }
                    },
                });
            }

            if (!autoPlay) {
                tweenRef.current.pause();
            }

            return () => {
                tweenRef.current?.kill();
            };
        }, [
            animationProps,
            duration,
            loopMode,
            easing,
            delay,
            autoPlay,
            useGPU,
            onCycleComplete,
            onUpdate,
        ]);

        // Handle scroll velocity
        useEffect(() => {
            if (!scrollVelocity || !tweenRef.current) {
                return;
            }

            const updateVelocity = () => {
                if (tweenRef.current && !isPausedRef.current) {
                    tweenRef.current.timeScale(velocityRef.current);
                }

                requestAnimationFrame(updateVelocity);
            };

            const rafId = requestAnimationFrame(updateVelocity);

            return () => cancelAnimationFrame(rafId);
        }, [scrollVelocity, velocityRef]);

        // Handle scrub
        useEffect(() => {
            if (!scrub || !trackRef.current) {
                return;
            }

            const { prop, startValue, endValue } = animationProps;

            // Kill existing tween for scrub mode
            tweenRef.current?.kill();

            const handleScroll = () => {
                const scrollProgress =
                    window.scrollY /
                    (document.body.scrollHeight - window.innerHeight);
                const value = gsap.utils.interpolate(
                    startValue,
                    endValue,
                    scrollProgress,
                );

                if (typeof scrub === \'number\') {
                    gsap.to(trackRef.current, {
                        [prop]: value,
                        duration: scrub,
                        ease: \'power2.out\',
                        overwrite: true,
                    });
                } else {
                    gsap.set(trackRef.current, { [prop]: value });
                }
            };

            window.addEventListener(\'scroll\', handleScroll, { passive: true });

            return () => window.removeEventListener(\'scroll\', handleScroll);
        }, [scrub, animationProps]);

        // Hover handlers
        const handleMouseEnter = useCallback(() => {
            if (pauseOnHover && tweenRef.current) {
                isPausedRef.current = true;
                gsap.to(tweenRef.current, {
                    timeScale: 0,
                    duration: 0.5,
                    ease: \'power2.out\',
                });
            }
        }, [pauseOnHover]);

        const handleMouseLeave = useCallback(() => {
            if (pauseOnHover && tweenRef.current) {
                isPausedRef.current = false;
                gsap.to(tweenRef.current, {
                    timeScale: scrollVelocity ? velocityRef.current : 1,
                    duration: 0.5,
                    ease: \'power2.out\',
                });
            }
        }, [pauseOnHover, scrollVelocity, velocityRef]);

        // Expose imperative handle
        React.useImperativeHandle(ref, () => ({
            play: () => {
                isPausedRef.current = false;
                tweenRef.current?.play();
            },
            pause: () => {
                isPausedRef.current = true;
                tweenRef.current?.pause();
            },
            reverse: () => {
                tweenRef.current?.reverse();
            },
            seek: (progress: number) => {
                tweenRef.current?.progress(progress);
            },
            getProgress: () => tweenRef.current?.progress() ?? 0,
            setSpeed: (speed: number) => {
                tweenRef.current?.timeScale(speed);
            },
            kill: () => {
                tweenRef.current?.kill();
            },
            restart: () => {
                tweenRef.current?.restart();
            },
        }));

        // Generate repeated children
        const repeatedChildren = useMemo(() => {
            return Array.from({ length: repeat }, (_, i) => (
                <div
                    key={i}
                    className={cn(
                        \'shrink-0\',
                        isHorizontal
                            ? \'flex items-center\'
                            : \'flex flex-col items-center\',
                        itemClassName,
                    )}
                    style={{
                        [isHorizontal ? \'paddingRight\' : \'paddingBottom\']: gap,
                    }}
                >
                    {children}
                </div>
            ));
        }, [children, repeat, gap, isHorizontal, itemClassName]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    \'overflow-hidden\',
                    isHorizontal ? \'w-full\' : \'h-full\',
                    className,
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={trackRef}
                    className={cn(
                        \'flex will-change-transform\',
                        isHorizontal ? \'flex-row\' : \'flex-col\',
                        trackClassName,
                    )}
                    style={{
                        [isHorizontal ? \'width\' : \'height\']: `${repeat * 100}%`,
                    }}
                >
                    {repeatedChildren}
                </div>
            </div>
        );
    },
);

GSAPMarquee.displayName = \'GSAPMarquee\';

// ============================================================================
// PRESET COMPONENTS
// ============================================================================

export interface MarqueeTextProps extends Omit<GSAPMarqueeProps, \'children\'> {
    text: string;
    separator?: React.ReactNode;
    textClassName?: string;
}

export function MarqueeText({
    text,
    separator = <span className="px-8 text-muted-foreground/50">•</span>,
    textClassName,
    ...props
}: MarqueeTextProps) {
    return (
        <GSAPMarquee {...props}>
            <span
                className={cn(
                    \'whitespace-nowrap text-foreground\',
                    textClassName,
                )}
            >
                {text}
            </span>
            {separator}
        </GSAPMarquee>
    );
}

export interface MarqueeImagesProps extends Omit<GSAPMarqueeProps, \'children\'> {
    images: Array<{
        src: string;
        alt: string;
        width?: number;
        height?: number;
    }>;
    imageClassName?: string;
}

export function MarqueeImages({
    images,
    imageClassName,
    gap = 32,
    ...props
}: MarqueeImagesProps) {
    return (
        <GSAPMarquee gap={gap} {...props}>
            <div className="flex items-center gap-8">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className={cn(
                            \'h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0\',
                            imageClassName,
                        )}
                    />
                ))}
            </div>
        </GSAPMarquee>
    );
}

export interface MarqueeCardsProps extends Omit<GSAPMarqueeProps, \'children\'> {
    cards: Array<{
        id: string | number;
        content: React.ReactNode;
    }>;
    cardClassName?: string;
}

export function MarqueeCards({
    cards,
    cardClassName,
    gap = 24,
    ...props
}: MarqueeCardsProps) {
    return (
        <GSAPMarquee gap={gap} {...props}>
            <div
                className={cn(
                    \'flex items-stretch\',
                    props.direction === \'up\' || props.direction === \'down\'
                        ? \'flex-col gap-6\'
                        : \'gap-6\',
                )}
            >
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={cn(
                            \'shrink-0 rounded-xl border border-border bg-card p-6 shadow-sm\',
                            cardClassName,
                        )}
                    >
                        {card.content}
                    </div>
                ))}
            </div>
        </GSAPMarquee>
    );
}

// ============================================================================
// STAGGERED MARQUEE (Multiple rows with different speeds)
// ============================================================================

export interface StaggeredMarqueeProps {
    rows: Array<{
        children: React.ReactNode;
        direction?: MarqueeDirection;
        duration?: number;
        reverse?: boolean;
    }>;
    gap?: number;
    rowGap?: number;
    className?: string;
    pauseOnHover?: boolean;
    scrollVelocity?: boolean;
}

export function StaggeredMarquee({
    rows,
    gap = 24,
    rowGap = 16,
    className,
    pauseOnHover = true,
    scrollVelocity = false,
}: StaggeredMarqueeProps) {
    return (
        <div className={cn(\'flex flex-col\', className)} style={{ gap: rowGap }}>
            {rows.map((row, index) => (
                <GSAPMarquee
                    key={index}
                    direction={row.direction ?? \'left\'}
                    duration={row.duration ?? 20 + index * 5}
                    reverse={row.reverse}
                    gap={gap}
                    pauseOnHover={pauseOnHover}
                    scrollVelocity={scrollVelocity}
                >
                    {row.children}
                </GSAPMarquee>
            ))}
        </div>
    );
}

// ============================================================================
// VERTICAL SCROLL MARQUEE (Scroll-triggered)
// ============================================================================

export interface ScrollTriggeredMarqueeProps extends GSAPMarqueeProps {
    /** Start position (e.g., "top bottom" means animation starts when top of element hits bottom of viewport) */
    start?: string;
    /** End position */
    end?: string;
    /** Pin the element during scroll */
    pin?: boolean;
}

export function ScrollTriggeredMarquee({
    start = \'top bottom\',
    end = \'bottom top\',
    pin = false,
    children,
    ...props
}: ScrollTriggeredMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !trackRef.current) {
            return;
        }

        const isHorizontal =
            props.direction === \'left\' ||
            props.direction === \'right\' ||
            !props.direction;
        const prop = isHorizontal ? \'xPercent\' : \'yPercent\';
        const repeat = props.repeat ?? 4;
        const isPositive =
            props.direction === \'right\' || props.direction === \'down\';
        const startValue = isPositive ? -100 / repeat : 0;
        const endValue = isPositive ? 0 : -100 / repeat;

        // Dynamic import ScrollTrigger
        import(\'gsap/ScrollTrigger\').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);

            const tween = gsap.fromTo(
                trackRef.current,
                { [prop]: startValue },
                {
                    [prop]: endValue,
                    ease: \'none\',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start,
                        end,
                        scrub: props.scrub ?? 1,
                        pin,
                    },
                },
            );

            return () => {
                tween.kill();
                ScrollTrigger.getAll().forEach((st) => st.kill());
            };
        });
    }, [props.direction, props.repeat, props.scrub, start, end, pin]);

    const isHorizontal =
        props.direction === \'left\' ||
        props.direction === \'right\' ||
        !props.direction;
    const repeat = props.repeat ?? 4;
    const gap = props.gap ?? 24;

    const repeatedChildren = useMemo(() => {
        return Array.from({ length: repeat }, (_, i) => (
            <div
                key={i}
                className={cn(
                    \'shrink-0\',
                    isHorizontal
                        ? \'flex items-center\'
                        : \'flex flex-col items-center\',
                )}
                style={{
                    [isHorizontal ? \'paddingRight\' : \'paddingBottom\']: gap,
                }}
            >
                {children}
            </div>
        ));
    }, [children, repeat, gap, isHorizontal]);

    return (
        <div
            ref={containerRef}
            className={cn(
                \'overflow-hidden\',
                isHorizontal ? \'w-full\' : \'h-full\',
                props.className,
            )}
        >
            <div
                ref={trackRef}
                className={cn(
                    \'flex will-change-transform\',
                    isHorizontal ? \'flex-row\' : \'flex-col\',
                )}
                style={{
                    [isHorizontal ? \'width\' : \'height\']: `${repeat * 100}%`,
                }}
            >
                {repeatedChildren}
            </div>
        </div>
    );
}

export default GSAPMarquee;
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'animations',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'marquee',
                'type' => 'registry:ui',
                'title' => 'Marquee',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    '@gsap/react',
                    'gsap',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/animations/marquee.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import { useGSAP } from \'@gsap/react\';
import gsap from \'gsap\';
import { ScrollTrigger } from \'gsap/ScrollTrigger\';
import type { CSSProperties, ReactNode } from \'react\';
import React, { useCallback, useEffect, useRef, useState } from \'react\';
import { cn } from \'@/lib/utils\';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type MarqueeDirection = \'left\' | \'right\';

export interface MarqueeItemStyle {
    className?: string;
    style?: CSSProperties;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    padding?: string;
    borderRadius?: string;
}

export interface MarqueeRowData<T = unknown> {
    id: string | number;
    items: T[];
    direction?: MarqueeDirection;
    /** Base speed in px/frame at 60fps. Default: 0.5 */
    speed?: number;
}

export interface MarqueeStyleProps {
    textColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    textTransform?: CSSProperties[\'textTransform\'];
    gap?: number;
    className?: string;
}

export interface MarqueeProps extends MarqueeStyleProps {
    children: ReactNode;
    /** Base movement speed in px/frame at 60fps. Default: 0.5 */
    speed?: number;
    direction?: MarqueeDirection;
    pauseOnHover?: boolean;
    /**
     * When true, the mouse wheel / trackpad controls the marquee:
     *   - Scroll magnitude  → speed boost on top of base speed
     *   - Scroll direction  → flips marquee direction while scrolling
     *   - Stopping scroll   → eases back to base speed + base direction
     * Default: true.
     */
    scrollEnabled?: boolean;
    /**
     * Extra px/frame added at peak normalised scroll input.
     * Default: 8.
     */
    scrollBoostFactor?: number;
    /**
     * Seconds to ease back to base speed + direction after scrolling stops.
     * Default: 0.6.
     */
    scrollDecay?: number;
    /**
     * ms of inactivity after the last wheel event before the ease-back starts.
     * Default: 120.
     */
    scrollTimeout?: number;
    contentClassName?: string;
    style?: CSSProperties;
}

export interface MultiRowMarqueeProps<T = unknown> extends MarqueeStyleProps {
    rows: MarqueeRowData<T>[];
    speed?: number;
    direction?: MarqueeDirection;
    pauseOnHover?: boolean;
    scrollEnabled?: boolean;
    scrollBoostFactor?: number;
    scrollDecay?: number;
    scrollTimeout?: number;
    renderItem: (item: T, index: number, rowIndex: number) => ReactNode;
    rowGap?: number;
    contentClassName?: string;
}

// ============================================================================
// Wheel input bus
//
// One \'wheel\' listener shared across every mounted Marquee.
// Normalises raw deltaY so mouse wheel and trackpad feel identical,
// then broadcasts to all subscribers.
// ============================================================================

interface WheelSubscriber {
    idleMs: number;

    onWheel(normalisedDelta: number): void;

    onIdle(): void;
}

const wheelBus = (() => {
    const subs = new Set<WheelSubscriber>();
    const timers = new WeakMap<
        WheelSubscriber,
        ReturnType<typeof setTimeout>
    >();
    let listening = false;

    /**
     * Normalise raw deltaY to a consistent [-60, 60] range.
     *
     * Trackpad: sends continuous small deltas (|delta| < 30) at high frequency.
     * Mouse wheel: sends discrete larger deltas (~100 px per notch).
     *
     * We scale trackpad up (×3) so both inputs land in the same perceived range,
     * then clamp the result.
     */
    function normalise(deltaY: number): number {
        const isTrackpad = Math.abs(deltaY) < 30;
        const scaled = isTrackpad ? deltaY * 3 : deltaY;

        return Math.max(-60, Math.min(60, scaled));
    }

    function onWheel(e: WheelEvent) {
        const norm = normalise(e.deltaY);
        subs.forEach((sub) => {
            sub.onWheel(norm);
            // Reset this subscriber\'s idle timer on every wheel event
            const prev = timers.get(sub);

            if (prev) {
clearTimeout(prev);
}

            timers.set(
                sub,
                setTimeout(() => sub.onIdle(), sub.idleMs),
            );
        });
    }

    function boot() {
        if (listening) {
return;
}

        listening = true;
        window.addEventListener(\'wheel\', onWheel, { passive: true });
    }

    function teardown() {
        if (!listening) {
return;
}

        listening = false;
        window.removeEventListener(\'wheel\', onWheel);
    }

    return {
        subscribe(sub: WheelSubscriber): () => void {
            subs.add(sub);
            boot();

            return () => {
                const t = timers.get(sub);

                if (t) {
clearTimeout(t);
}

                timers.delete(sub);
                subs.delete(sub);

                if (subs.size === 0) {
teardown();
}
            };
        },
    };
})();

// ============================================================================
// Marquee — single row
// ============================================================================

export function Marquee({
    children,
    speed,
    direction = \'left\',
    pauseOnHover = false,
    scrollEnabled = true,
    scrollBoostFactor = 8,
    scrollDecay = 0.6,
    scrollTimeout = 120,
    gap = 24,
    textColor,
    fontSize,
    fontWeight,
    textTransform,
    className,
    contentClassName,
    style,
}: MarqueeProps) {
    const baseSpeed = speed ?? 0.5;

    // baseSign controls which axis the track moves along.
    // direction=\'left\'  → track moves left  → x decreases → baseSign = -1
    // direction=\'right\' → track moves right → x increases → baseSign = +1
    //
    // liveSpeed.value is always in px/frame; its sign encodes direction:
    //   positive → forward (baseSign direction)
    //   negative → reversed
    // The ticker applies: xRef += liveSpeed.value * baseSign
    const baseSign = direction === \'left\' ? -1 : 1;

    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const xRef = useRef(0);
    const setWRef = useRef(0);
    const isPausedRef = useRef(false);

    // liveSpeed.value: positive = forward, negative = reversed
    const liveSpeed = useRef({ value: baseSpeed });
    const quickToRef = useRef<gsap.QuickToFunc | null>(null);

    const [cloneCount, setCloneCount] = useState(3);

    // ── GSAP: ticker + measure + resize ───────────────────────────────────────
    useGSAP(
        () => {
            if (!trackRef.current) {
return;
}

            const measure = () => {
                const contentEl = trackRef.current!.querySelector(
                    \'[data-marquee-content]\',
                ) as HTMLElement | null;

                if (!contentEl) {
return;
}

                const singleW = contentEl.offsetWidth + gap;

                if (singleW === 0) {
return;
}

                setWRef.current = singleW;

                const copies = Math.max(
                    3,
                    Math.ceil((window.innerWidth * 3) / singleW) + 1,
                );
                setCloneCount(copies);

                // Right-moving strips start mid-track so content is visible immediately.
                const rawStart =
                    baseSign === 1 ? -singleW * Math.floor(copies / 2) : 0;
                xRef.current = ((rawStart % singleW) - singleW) % singleW;
                gsap.set(trackRef.current!, { x: xRef.current });
            };

            const raf1 = requestAnimationFrame(() => {
                const raf2 = requestAnimationFrame(() => {
                    measure();

                    // quickTo eases liveSpeed.value to any target smoothly
                    liveSpeed.current.value = baseSpeed;
                    quickToRef.current = gsap.quickTo(
                        liveSpeed.current,
                        \'value\',
                        {
                            duration: scrollDecay,
                            ease: \'power2.inOut\',
                        },
                    );

                    let resizeTimer: ReturnType<typeof setTimeout>;
                    const onResize = () => {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(measure, 150);
                    };
                    window.addEventListener(\'resize\', onResize);

                    return () => {
                        clearTimeout(resizeTimer);
                        window.removeEventListener(\'resize\', onResize);
                    };
                });

                return () => cancelAnimationFrame(raf2);
            });

            const tick = () => {
                if (isPausedRef.current || setWRef.current === 0) {
return;
}

                // liveSpeed.value sign encodes direction; baseSign encodes axis.
                xRef.current += liveSpeed.current.value * baseSign;

                // True modulo wrap — never jumps regardless of speed magnitude
                const setW = setWRef.current;
                xRef.current = ((xRef.current % setW) - setW) % setW;

                gsap.set(trackRef.current!, { x: xRef.current });
            };

            gsap.ticker.add(tick);

            return () => {
                cancelAnimationFrame(raf1);
                gsap.ticker.remove(tick);
            };
        },
        {
            scope: containerRef,
            dependencies: [baseSpeed, baseSign, gap, scrollDecay, cloneCount],
        },
    );

    // ── Wheel bus subscription ─────────────────────────────────────────────────
    // Separate from the GSAP context so toggling scrollEnabled doesn\'t
    // teardown and re-run the entire animation.
    useEffect(() => {
        if (!scrollEnabled) {
return;
}

        const unsub = wheelBus.subscribe({
            idleMs: scrollTimeout,

            onWheel(norm) {
                if (!quickToRef.current) {
return;
}

                // norm: positive = scroll down = forward, negative = scroll up = reverse
                // Map magnitude to a speed boost, preserve direction sign
                const boost = (Math.abs(norm) / 60) * scrollBoostFactor;
                const targetSpeed = (norm >= 0 ? 1 : -1) * (baseSpeed + boost);
                quickToRef.current(targetSpeed);
            },

            onIdle() {
                // Ease back to original speed in original (forward) direction
                if (!quickToRef.current) {
return;
}

                quickToRef.current(baseSpeed);
            },
        });

        return unsub;
    }, [
        scrollEnabled,
        scrollBoostFactor,
        scrollDecay,
        scrollTimeout,
        baseSpeed,
    ]);

    // ── Hover pause ────────────────────────────────────────────────────────────
    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) {
isPausedRef.current = true;
}
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) {
isPausedRef.current = false;
}
    }, [pauseOnHover]);

    // ── Render ─────────────────────────────────────────────────────────────────
    const contentStyle: CSSProperties = {
        gap: `${gap}px`,
        color: textColor,
        fontSize,
        fontWeight,
        textTransform,
    };

    const contentElements = Array.from({ length: cloneCount }, (_, i) => (
        <div
            key={`mq-${i}`}
            {...(i === 0
                ? { \'data-marquee-content\': \'true\' }
                : { \'data-marquee-clone\': \'true\', \'aria-hidden\': \'true\' })}
            className={cn(\'flex shrink-0 items-center\', contentClassName)}
            style={contentStyle}
        >
            {children}
        </div>
    ));

    return (
        <div
            ref={containerRef}
            className={cn(
                \'relative flex items-center overflow-hidden\',
                className,
            )}
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={trackRef}
                className="flex shrink-0 items-center whitespace-nowrap"
                style={{ gap: `${gap}px`, willChange: \'transform\' }}
            >
                {contentElements}
            </div>
        </div>
    );
}

// ============================================================================
// MultiRowMarquee
// ============================================================================

export function MultiRowMarquee<T>({
    rows,
    speed = 0.5,
    direction = \'left\',
    pauseOnHover = false,
    scrollEnabled = true,
    scrollBoostFactor = 8,
    scrollDecay = 0.6,
    scrollTimeout = 120,
    gap = 24,
    rowGap = 16,
    textColor,
    fontSize,
    fontWeight,
    textTransform,
    className,
    contentClassName,
    renderItem,
}: MultiRowMarqueeProps<T>) {
    return (
        <div
            className={cn(\'flex flex-col\', className)}
            style={{ gap: `${rowGap}px` }}
        >
            {rows.map((row, rowIndex) => (
                <Marquee
                    key={row.id}
                    speed={row.speed ?? speed}
                    direction={row.direction ?? direction}
                    pauseOnHover={pauseOnHover}
                    scrollEnabled={scrollEnabled}
                    scrollBoostFactor={scrollBoostFactor}
                    scrollDecay={scrollDecay}
                    scrollTimeout={scrollTimeout}
                    gap={gap}
                    textColor={textColor}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    textTransform={textTransform}
                    contentClassName={contentClassName}
                >
                    {row.items.map((item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                            {renderItem(item, itemIndex, rowIndex)}
                        </React.Fragment>
                    ))}
                </Marquee>
            ))}
        </div>
    );
}

// ============================================================================
// MarqueeText — preset with per-item style support
// ============================================================================

export interface MarqueeTextItem {
    label: string;
    itemStyle?: MarqueeItemStyle;
}

export interface MarqueeTextProps extends Omit<MarqueeProps, \'children\'> {
    items: string[] | MarqueeTextItem[];
    separator?: string | ReactNode;
    separatorColor?: string;
}

function isItemArray(
    items: string[] | MarqueeTextItem[],
): items is MarqueeTextItem[] {
    return items.length > 0 && typeof items[0] === \'object\';
}

export function MarqueeText({
    items,
    separator = \'•\',
    separatorColor,
    textColor = \'currentColor\',
    fontSize = \'clamp(1.5rem, 4vw, 3rem)\',
    fontWeight = \'bold\',
    textTransform = \'uppercase\',
    ...props
}: MarqueeTextProps) {
    const normalized: MarqueeTextItem[] = isItemArray(items)
        ? items
        : items.map((label) => ({ label }));

    return (
        <Marquee
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            textTransform={textTransform}
            {...props}
        >
            {normalized.map((item, index) => {
                const { label, itemStyle } = item;
                const resolvedStyle: CSSProperties = {
                    color: itemStyle?.color,
                    backgroundColor: itemStyle?.backgroundColor,
                    fontSize: itemStyle?.fontSize,
                    fontWeight: itemStyle?.fontWeight,
                    padding: itemStyle?.padding,
                    borderRadius: itemStyle?.borderRadius,
                    ...itemStyle?.style,
                };

                return (
                    <span
                        key={index}
                        className={cn(
                            \'flex shrink-0 items-center gap-4\',
                            itemStyle?.className,
                        )}
                    >
                        <span
                            className="shrink-0 select-none"
                            style={{
                                letterSpacing: \'0.02em\',
                                ...resolvedStyle,
                            }}
                        >
                            {label}
                        </span>
                        {separator && (
                            <span
                                className="shrink-0 opacity-50 select-none"
                                style={{
                                    color:
                                        separatorColor ||
                                        itemStyle?.color ||
                                        textColor,
                                    fontSize: \'0.5em\',
                                }}
                            >
                                {separator}
                            </span>
                        )}
                    </span>
                );
            })}
        </Marquee>
    );
}

export default Marquee;
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'animations',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'text-animator',
                'type' => 'registry:ui',
                'title' => 'Text Animator',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    '@gsap/react',
                    'gsap',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/animations/text-animator.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import { useGSAP } from \'@gsap/react\';
import gsap from \'gsap\';
import { ScrollTrigger } from \'gsap/ScrollTrigger\';
import type { CSSProperties, ElementType, KeyboardEvent } from \'react\';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from \'react\';

// ─── Animation Type Union ────────────────────────────────────────────────────

export type AnimationType =
    // Fades
    | \'fadeIn\'
    | \'fadeInUp\'
    | \'fadeInDown\'
    | \'fadeInLeft\'
    | \'fadeInRight\'
    | \'fadeInTopLeft\'
    | \'fadeInTopRight\'
    | \'fadeInBottomLeft\'
    | \'fadeInBottomRight\'
    // Slides
    | \'slideUp\'
    | \'slideDown\'
    | \'slideLeft\'
    | \'slideRight\'
    | \'slideTopLeft\'
    | \'slideTopRight\'
    | \'slideBottomLeft\'
    | \'slideBottomRight\'
    // Scale
    | \'scaleUp\'
    | \'scaleDown\'
    | \'scaleIn\'
    | \'scaleInUp\'
    | \'scaleInDown\'
    // Blur
    | \'blurIn\'
    | \'blurOut\'
    | \'blurInLeft\'
    | \'blurInRight\'
    | \'blurInUp\'
    | \'blurInDown\'
    // Rotate
    | \'rotateIn\'
    | \'rotateOut\'
    | \'rotateInLeft\'
    | \'rotateInRight\'
    | \'rotateOutLeft\'
    | \'rotateOutRight\'
    // Physics
    | \'bounce\'
    | \'elastic\'
    | \'jelly\'
    | \'squash\'
    | \'liquid\'
    | \'swing\'
    | \'stretch\'
    | \'spring\'
    | \'wobble\'
    | \'shake\'
    | \'drift\'
    | \'float\'
    // Character
    | \'wave\'
    | \'pop\'
    | \'flip\'
    | \'rollIn\'
    | \'skewIn\'
    | \'spiral\'
    | \'morph\'
    | \'crash\'
    | \'explode\'
    | \'letterByLetter\'
    | \'typewriter\'
    | \'jitter\'
    // Text effects
    | \'reveal\'
    | \'glitch\'
    | \'gradient\'
    | \'shadow\'
    | \'neon\'
    | \'marquee\'
    | \'flicker\'
    | \'spotlight\'
    | \'outline\'
    | \'pulse\'
    | \'breathe\'
    | \'aurora\'
    // Special effects
    | \'matrix\'
    | \'fire\'
    | \'rainbow\'
    | \'magnetic\'
    | \'particles\'
    | \'dissolve\'
    | \'scramble\'
    | \'zap\'
    | \'orbit\'
    | \'vortex\'
    | \'ripple\'
    | \'piano\'
    | \'domino\'
    | \'pendulum\'
    | \'shatter\'
    | \'smoke\'
    | \'thunder\'
    | \'crystallize\'
    | \'warp\'
    | \'cinema\'
    | \'gravity\'
    | \'levitate\'
    | \'twinkle\'
    | \'shimmerFade\'
    | \'fold\'
    | \'cascade\'
    | \'pinball\'
    | \'neonFlicker\'
    | \'rise\'
    | \'unfurl\'
    | \'stampIn\'
    | \'blinds\';

// ─── Trigger Type ─────────────────────────────────────────────────────────────

export type TriggerType = \'onClick\' | \'onHover\' | \'scrollTrigger\';

// ─── Split Mode ────────────────────────────────────────────────────────────────

export type SplitMode = \'chars\' | \'words\' | \'lines\';

// ─── Easing Presets ───────────────────────────────────────────────────────────

export type EasePreset =
    | \'power1.in\'
    | \'power1.out\'
    | \'power1.inOut\'
    | \'power2.in\'
    | \'power2.out\'
    | \'power2.inOut\'
    | \'power3.in\'
    | \'power3.out\'
    | \'power3.inOut\'
    | \'power4.in\'
    | \'power4.out\'
    | \'power4.inOut\'
    | \'back.in\'
    | \'back.out\'
    | \'back.inOut\'
    | \'bounce.in\'
    | \'bounce.out\'
    | \'bounce.inOut\'
    | \'elastic.in\'
    | \'elastic.out\'
    | \'elastic.inOut\'
    | \'circ.in\'
    | \'circ.out\'
    | \'circ.inOut\'
    | \'expo.in\'
    | \'expo.out\'
    | \'expo.inOut\'
    | \'sine.in\'
    | \'sine.out\'
    | \'sine.inOut\'
    | \'none\'
    | (string & {});

// ─── ScrollTrigger Options ────────────────────────────────────────────────────

export interface ScrollTriggerOptions {
    /** ScrollTrigger start position. Default: `"top 80%"` */
    start?: string;
    /** ScrollTrigger end position. Default: `"bottom 20%"` */
    end?: string;
    /** Scrub the animation to scroll position. Default: `false` */
    scrub?: boolean | number;
    /** Markers for debugging (dev only). Default: `false` */
    markers?: boolean;
    /** Toggle actions string. Default: `"play none none reverse"` */
    toggleActions?: string;
    /** Pin the element while animating. Default: `false` */
    pin?: boolean;
}

// ─── Stagger Options ─────────────────────────────────────────────────────────

export interface StaggerOptions {
    /** Time between each character animation in seconds. Default: `0.04` */
    each?: number;
    /** Stagger from: `"start"` | `"end"` | `"center"` | `"edges"` | number */
    from?: \'start\' | \'end\' | \'center\' | \'edges\' | number;
    /** Grid stagger for 2D layouts */
    grid?: [number, number] | \'auto\';
    /** Axis for grid stagger */
    axis?: \'x\' | \'y\';
    /** Amount distributes the stagger across total duration */
    amount?: number;
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface TextAnimatorProps {
    text?: string;
    children?: string;
    animation?: AnimationType;
    trigger?: TriggerType;
    splitBy?: SplitMode;
    duration?: number;
    delay?: number;
    stagger?: number | StaggerOptions;
    ease?: EasePreset;
    repeat?: number;
    yoyo?: boolean;
    scrollTrigger?: ScrollTriggerOptions;
    tag?: ElementType;
    color?: string;
    fontSize?: string | number;
    className?: string;
    style?: CSSProperties;
    /**
     * Custom color(s) for color-driven animations:
     * aurora, fire, glitch, gradient, matrix, neon, neonFlicker, rainbow, zap.
     * Accepts a single CSS color string or an array.
     * When one color is given it fills both the primary and secondary slots.
     */
    effectColor?: string | string[];
    onComplete?: () => void;
    onStart?: () => void;
    onRepeat?: () => void;
}

// ─── Ref API ──────────────────────────────────────────────────────────────────

export interface TextAnimatorRef {
    play: () => void;
    pause: () => void;
    reverse: () => void;
    restart: () => void;
    seek: (timeOrProgress: number) => void;
    kill: () => void;
    timeline: () => gsap.core.Timeline | null;
    isPlaying: () => boolean;
    progress: () => number;
}

// ─── Animation Config (internal) ─────────────────────────────────────────────

export interface AnimationContext {
    chars: HTMLElement[];
    words: HTMLElement[];
    el: HTMLElement;
    opts: ResolvedAnimOpts;
    effectColors: string[];
}

export interface ResolvedAnimOpts {
    duration: number;
    delay: number;
    stagger: number | StaggerOptions;
    ease: string;
    repeat: number;
    yoyo: boolean;
}

export interface AnimationConfig {
    targets?: HTMLElement[];
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    overrideEase?: boolean;
    special?: (tl: gsap.core.Timeline) => void;
}

export type AnimationDefinition = (ctx: AnimationContext) => AnimationConfig;

// ─── Plugin Registration ─────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger);

// ─── Utility: Resolve stagger ─────────────────────────────────────────────────

function resolveStagger(s: number | StaggerOptions, fallback = 0.04): number {
    return typeof s === \'number\' ? s : fallback;
}

// ─── Utility: Text Splitting ─────────────────────────────────────────────────

function splitChars(el: HTMLElement): HTMLElement[] {
    const text = el.textContent ?? \'\';
    el.innerHTML = \'\';

    return [...text].map((ch) => {
        const span = document.createElement(\'span\');
        span.textContent = ch === \' \' ? \'\\u00A0\' : ch;
        span.style.display = \'inline-block\';
        el.appendChild(span);

        return span;
    });
}

function splitWords(el: HTMLElement): HTMLElement[] {
    const words = (el.textContent ?? \'\').split(\' \');
    el.innerHTML = \'\';

    return words.map((word, i) => {
        const clip = document.createElement(\'span\');
        clip.style.cssText =
            \'display:inline-block;overflow:hidden;vertical-align:bottom;\';
        const inner = document.createElement(\'span\');
        inner.textContent = word;
        inner.style.display = \'inline-block\';
        clip.appendChild(inner);
        el.appendChild(clip);

        if (i < words.length - 1) {
            el.appendChild(document.createTextNode(\'\\u00A0\'));
        }

        return inner;
    });
}

function splitLines(el: HTMLElement): HTMLElement[] {
    const lines = (el.textContent ?? \'\').split(\'\\n\');
    el.innerHTML = \'\';

    return lines.map((line, lineIndex) => {
        const lineWrap = document.createElement(\'span\');
        lineWrap.style.cssText = \'display:block;\';
        const lineInner = document.createElement(\'span\');
        lineInner.style.cssText =
            \'display:inline-block;overflow:hidden;vertical-align:bottom;\';
        const words = line.split(\' \');
        words.forEach((word, wordIndex) => {
            const wordClip = document.createElement(\'span\');
            wordClip.style.cssText =
                \'display:inline-block;overflow:hidden;vertical-align:bottom;\';
            const wordInner = document.createElement(\'span\');
            wordInner.textContent = word;
            wordInner.style.display = \'inline-block\';
            wordClip.appendChild(wordInner);
            lineInner.appendChild(wordClip);

            if (wordIndex < words.length - 1) {
                lineInner.appendChild(document.createTextNode(\'\\u00A0\'));
            }
        });
        lineWrap.appendChild(lineInner);
        el.appendChild(lineWrap);

        if (lineIndex < lines.length - 1) {
            el.appendChild(document.createTextNode(\'\\n\'));
        }

        return lineInner;
    });
}

// ─── Shared special builder helpers ──────────────────────────────────────────

/** Builds a standard `from` tween over chars with stagger. */
function fromChars(
    tl: gsap.core.Timeline,
    chars: HTMLElement[],
    opts: ResolvedAnimOpts,
    vars: gsap.TweenVars,
    staggerFallback = 0.04,
): void {
    tl.from(chars, {
        ...vars,
        duration: opts.duration,
        stagger: resolveStagger(opts.stagger, staggerFallback),
        ease: vars.ease ?? opts.ease,
    });
}

// ─── Animation Definitions ───────────────────────────────────────────────────

const ANIMATIONS: Partial<Record<AnimationType, AnimationDefinition>> = {
    // ── Fades ─────────────────────────────────────────────────────────────────

    fadeIn: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0 },
        to: { opacity: 1 },
    }),
    fadeInUp: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
    }),
    fadeInDown: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, y: -40 },
        to: { opacity: 1, y: 0 },
    }),
    fadeInLeft: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, x: -40 },
        to: { opacity: 1, x: 0 },
    }),
    fadeInRight: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, x: 40 },
        to: { opacity: 1, x: 0 },
    }),
    fadeInTopLeft: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, x: -40, y: -40 },
        to: { opacity: 1, x: 0, y: 0 },
    }),
    fadeInTopRight: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, x: 40, y: -40 },
        to: { opacity: 1, x: 0, y: 0 },
    }),
    fadeInBottomLeft: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, x: -40, y: 40 },
        to: { opacity: 1, x: 0, y: 0 },
    }),
    fadeInBottomRight: ({ chars }) => ({
        targets: chars,
        from: { opacity: 0, x: 40, y: 40 },
        to: { opacity: 1, x: 0, y: 0 },
    }),

    // ── Slides ────────────────────────────────────────────────────────────────

    slideUp: ({ chars }) => ({
        targets: chars,
        from: { y: \'100%\', opacity: 0 },
        to: { y: \'0%\', opacity: 1 },
    }),
    slideDown: ({ chars }) => ({
        targets: chars,
        from: { y: \'-100%\', opacity: 0 },
        to: { y: \'0%\', opacity: 1 },
    }),
    slideLeft: ({ chars }) => ({
        targets: chars,
        from: { x: \'-120%\', opacity: 0 },
        to: { x: \'0%\', opacity: 1 },
    }),
    slideRight: ({ chars }) => ({
        targets: chars,
        from: { x: \'120%\', opacity: 0 },
        to: { x: \'0%\', opacity: 1 },
    }),
    slideTopLeft: ({ chars }) => ({
        targets: chars,
        from: { x: \'-120%\', y: \'-100%\', opacity: 0 },
        to: { x: \'0%\', y: \'0%\', opacity: 1 },
    }),
    slideTopRight: ({ chars }) => ({
        targets: chars,
        from: { x: \'120%\', y: \'-100%\', opacity: 0 },
        to: { x: \'0%\', y: \'0%\', opacity: 1 },
    }),
    slideBottomLeft: ({ chars }) => ({
        targets: chars,
        from: { x: \'-120%\', y: \'100%\', opacity: 0 },
        to: { x: \'0%\', y: \'0%\', opacity: 1 },
    }),
    slideBottomRight: ({ chars }) => ({
        targets: chars,
        from: { x: \'120%\', y: \'100%\', opacity: 0 },
        to: { x: \'0%\', y: \'0%\', opacity: 1 },
    }),

    // ── Scale ─────────────────────────────────────────────────────────────────

    scaleUp: ({ chars }) => ({
        targets: chars,
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
    }),
    scaleDown: ({ chars }) => ({
        targets: chars,
        from: { scale: 2.5, opacity: 0 },
        to: { scale: 1, opacity: 1 },
    }),
    scaleIn: ({ chars }) => ({
        targets: chars,
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1, ease: \'back.out(2)\' },
        overrideEase: true,
    }),
    scaleInUp: ({ chars }) => ({
        targets: chars,
        from: { scale: 0, y: 30, opacity: 0 },
        to: { scale: 1, y: 0, opacity: 1 },
    }),
    scaleInDown: ({ chars }) => ({
        targets: chars,
        from: { scale: 0, y: -30, opacity: 0 },
        to: { scale: 1, y: 0, opacity: 1 },
    }),

    // ── Blur ──────────────────────────────────────────────────────────────────

    blurIn: ({ chars }) => ({
        targets: chars,
        from: { filter: \'blur(12px)\', opacity: 0 },
        to: { filter: \'blur(0px)\', opacity: 1 },
    }),
    blurOut: ({ chars }) => ({
        targets: chars,
        from: { filter: \'blur(0px)\', opacity: 1 },
        to: { filter: \'blur(12px)\', opacity: 0 },
    }),
    blurInLeft: ({ chars }) => ({
        targets: chars,
        from: { filter: \'blur(12px)\', x: -40, opacity: 0 },
        to: { filter: \'blur(0px)\', x: 0, opacity: 1 },
    }),
    blurInRight: ({ chars }) => ({
        targets: chars,
        from: { filter: \'blur(12px)\', x: 40, opacity: 0 },
        to: { filter: \'blur(0px)\', x: 0, opacity: 1 },
    }),
    blurInUp: ({ chars }) => ({
        targets: chars,
        from: { filter: \'blur(12px)\', y: 40, opacity: 0 },
        to: { filter: \'blur(0px)\', y: 0, opacity: 1 },
    }),
    blurInDown: ({ chars }) => ({
        targets: chars,
        from: { filter: \'blur(12px)\', y: -40, opacity: 0 },
        to: { filter: \'blur(0px)\', y: 0, opacity: 1 },
    }),

    // ── Rotate ────────────────────────────────────────────────────────────────

    rotateIn: ({ chars }) => ({
        targets: chars,
        from: { rotation: -180, opacity: 0, scale: 0 },
        to: { rotation: 0, opacity: 1, scale: 1 },
    }),
    rotateOut: ({ chars }) => ({
        targets: chars,
        from: { rotation: 0, opacity: 1 },
        to: { rotation: 180, opacity: 0 },
    }),
    rotateInLeft: ({ chars }) => ({
        targets: chars,
        from: { rotation: -90, x: -40, opacity: 0 },
        to: { rotation: 0, x: 0, opacity: 1 },
    }),
    rotateInRight: ({ chars }) => ({
        targets: chars,
        from: { rotation: 90, x: 40, opacity: 0 },
        to: { rotation: 0, x: 0, opacity: 1 },
    }),
    rotateOutLeft: ({ chars }) => ({
        targets: chars,
        from: { rotation: 0, opacity: 1 },
        to: { rotation: -90, x: -40, opacity: 0 },
    }),
    rotateOutRight: ({ chars }) => ({
        targets: chars,
        from: { rotation: 0, opacity: 1 },
        to: { rotation: 90, x: 40, opacity: 0 },
    }),

    // ── Physics ───────────────────────────────────────────────────────────────

    bounce: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                y: -60,
                opacity: 0,
                ease: \'bounce.out\',
            });
        },
    }),

    elastic: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                scale: 0,
                opacity: 0,
                ease: \'elastic.out(1, 0.3)\',
            });
        },
    }),

    jelly: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                scaleX: 1.6,
                scaleY: 0.4,
                opacity: 0,
                ease: \'elastic.out(1, 0.4)\',
            });
        },
    }),

    squash: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                scaleY: 2.5,
                scaleX: 0.5,
                y: -30,
                opacity: 0,
                ease: \'bounce.out\',
            });
        },
    }),

    liquid: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                scaleY: 2.5,
                scaleX: 0.4,
                opacity: 0,
                ease: \'elastic.out(0.5, 0.3)\',
            });
        },
    }),

    swing: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                rotation: -45,
                transformOrigin: \'top center\',
                opacity: 0,
                ease: \'elastic.out(0.8, 0.4)\',
            });
        },
    }),

    stretch: ({ chars }) => ({
        targets: chars,
        from: { scaleX: 3, opacity: 0 },
        to: { scaleX: 1, opacity: 1 },
    }),

    spring: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                scale: 0,
                opacity: 0,
                ease: \'elastic.out(1, 0.5)\',
            });
        },
    }),

    wobble: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                rotation: -15,
                opacity: 0,
                ease: \'elastic.out(1, 0.3)\',
            });
        },
    }),

    shake: ({ chars, opts }) => ({
        special: (tl) => {
            tl.from(chars, {
                x: -10,
                opacity: 0,
                duration: opts.duration * 0.5,
                stagger: resolveStagger(opts.stagger),
                ease: \'power1.inOut\',
            });
        },
    }),

    drift: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                x: -30,
                y: 20,
                opacity: 0,
                ease: \'power2.out\',
            });
        },
    }),

    float: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, { y: 30, opacity: 0, ease: \'sine.out\' });
        },
    }),

    // ── Character ─────────────────────────────────────────────────────────────

    wave: ({ chars, opts }) => ({
        special: (tl) => {
            tl.from(chars, {
                y: -20,
                opacity: 0,
                duration: opts.duration,
                ease: \'sine.inOut\',
                stagger: {
                    each: resolveStagger(opts.stagger, 0.06),
                    yoyo: true,
                    repeat: 1,
                },
            });
        },
    }),

    pop: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                scale: 0,
                opacity: 0,
                ease: \'back.out(3)\',
            });
        },
    }),

    flip: ({ chars }) => ({
        targets: chars,
        from: { rotationX: 90, opacity: 0, transformPerspective: 400 },
        to: { rotationX: 0, opacity: 1, transformPerspective: 400 },
    }),

    rollIn: ({ chars }) => ({
        targets: chars,
        from: { x: -60, rotation: -120, opacity: 0 },
        to: { x: 0, rotation: 0, opacity: 1 },
    }),

    skewIn: ({ chars }) => ({
        targets: chars,
        from: { skewX: 30, opacity: 0, x: -30 },
        to: { skewX: 0, opacity: 1, x: 0 },
    }),

    spiral: ({ chars }) => ({
        targets: chars,
        from: {
            rotation: -720,
            scale: 0,
            opacity: 0,
            x: () => gsap.utils.random(-40, 40) as number,
        },
        to: { rotation: 0, scale: 1, opacity: 1, x: 0 },
    }),

    morph: ({ chars }) => ({
        targets: chars,
        from: { borderRadius: \'50%\', scale: 0.3, opacity: 0 },
        to: { borderRadius: \'0%\', scale: 1, opacity: 1 },
    }),

    crash: ({ chars, opts }) => ({
        special: (tl) => {
            tl.from(chars, {
                y: () => gsap.utils.random(-200, -80) as number,
                x: () => gsap.utils.random(-20, 20) as number,
                rotation: () => gsap.utils.random(-30, 30) as number,
                opacity: 0,
                scale: () => gsap.utils.random(0.5, 1.5) as number,
                duration: opts.duration * 0.6,
                stagger: resolveStagger(opts.stagger),
                ease: \'bounce.out\',
            });
        },
    }),

    explode: ({ chars, opts }) => ({
        special: (tl) => {
            tl.from(chars, {
                x: () => gsap.utils.random(-120, 120) as number,
                y: () => gsap.utils.random(-120, 120) as number,
                rotation: () => gsap.utils.random(-360, 360) as number,
                opacity: 0,
                scale: 0,
                duration: opts.duration,
                stagger: resolveStagger(opts.stagger),
                ease: opts.ease,
            });
        },
    }),

    // ── Text Entry ────────────────────────────────────────────────────────────

    letterByLetter: ({ chars, opts }) => ({
        special: (tl) => {
            gsap.set(chars, { visibility: \'hidden\' });
            tl.to(chars, {
                visibility: \'visible\',
                duration: 0,
                stagger: (opts.duration * 0.9) / chars.length,
            });
        },
    }),

    typewriter: ({ chars, opts }) => ({
        special: (tl) => {
            const firstChar = chars[0];

            if (!firstChar?.parentNode) {
                return;
            }

            const cursor = document.createElement(\'span\');
            cursor.textContent = \'|\';
            cursor.style.cssText = \'display:inline-block;margin-left:1px;\';

            const styleEl = document.createElement(\'style\');
            styleEl.textContent =
                \'@keyframes cursorBlink{0%,50%{opacity:1}51%,100%{opacity:0}}\';
            cursor.style.animation = \'cursorBlink 0.8s infinite\';
            document.head.appendChild(styleEl);

            firstChar.parentNode.insertBefore(cursor, firstChar);
            gsap.set(chars, { visibility: \'hidden\' });

            const charTime = (opts.duration * 0.8) / chars.length;
            chars.forEach((char, i) => {
                tl.call(
                    () => {
                        char.style.visibility = \'visible\';
                        cursor.parentNode?.insertBefore(
                            cursor,
                            char.nextSibling,
                        );
                    },
                    undefined,
                    i * charTime,
                );
            });

            tl.call(
                () => {
                    const last = chars[chars.length - 1];

                    if (last) {
                        cursor.parentNode?.insertBefore(
                            cursor,
                            last.nextSibling,
                        );
                    }
                },
                undefined,
                chars.length * charTime,
            );

            tl.eventCallback(\'onComplete\', () => {
                cursor.remove();
                styleEl.remove();
            });
        },
    }),

    jitter: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.02);

                for (let j = 0; j < 3; j++) {
                    tl.to(
                        char,
                        {
                            x: () => gsap.utils.random(-3, 3),
                            duration: 0.05,
                            ease: \'none\',
                        },
                        t + j * 0.05,
                    );
                }

                tl.to(
                    char,
                    {
                        x: 0,
                        opacity: 1,
                        duration: opts.duration * 0.3,
                        ease: \'power2.out\',
                    },
                    t,
                );
            });
        },
    }),

    reveal: ({ words, opts }) => ({
        special: (tl) => {
            tl.from(words, {
                y: \'110%\',
                opacity: 0,
                duration: opts.duration,
                stagger:
                    typeof opts.stagger === \'number\'
                        ? opts.stagger * 2
                        : opts.stagger,
                ease: opts.ease,
            });
        },
    }),

    // ── Visual Effects ────────────────────────────────────────────────────────

    glitch: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const glitchChars = \'!@#$%^&*()[]{}|;:,.<>?~`\';
            const primary = effectColors[0] ?? \'#ff003c\';
            const secondary = effectColors[1] ?? \'#00f7ff\';

            chars.forEach((char, i) => {
                const originalText = char.textContent ?? \'\';
                const t = i * resolveStagger(opts.stagger, 0.02);
                const glitchCount = 5 + Math.floor(Math.random() * 3);

                gsap.set(char, { opacity: 0, scale: 0.8 });
                tl.to(
                    char,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: opts.duration * 0.15,
                        ease: \'power2.out\',
                    },
                    t,
                );

                for (let g = 0; g < glitchCount; g++) {
                    const gs =
                        t + opts.duration * 0.2 + g * opts.duration * 0.08;
                    tl.to(
                        char,
                        {
                            x: () => gsap.utils.random(-6, 6),
                            y: () => gsap.utils.random(-4, 4),
                            duration: 0.03,
                            ease: \'none\',
                        },
                        gs,
                    );
                    tl.to(
                        char,
                        {
                            textShadow: `${gsap.utils.random(-4, 4)}px ${gsap.utils.random(-2, 2)}px ${primary}, ${gsap.utils.random(-4, 4)}px ${gsap.utils.random(-2, 2)}px ${secondary}`,
                            duration: 0.03,
                            ease: \'none\',
                        },
                        gs,
                    );
                    tl.to(
                        char,
                        {
                            opacity: () => (Math.random() > 0.3 ? 1 : 0.5),
                            duration: 0.02,
                        },
                        gs,
                    );
                    tl.call(
                        () => {
                            if (Math.random() > 0.4) {
                                char.textContent =
                                    glitchChars[
                                        Math.floor(
                                            Math.random() * glitchChars.length,
                                        )
                                    ] ?? originalText;
                            }
                        },
                        [],
                        gs + 0.015,
                    );
                }

                tl.to(
                    char,
                    {
                        x: 0,
                        y: 0,
                        textShadow: \'none\',
                        opacity: 1,
                        scale: 1,
                        duration: opts.duration * 0.15,
                        ease: \'elastic.out(1, 0.3)\',
                    },
                    t + opts.duration * 0.6,
                );
                tl.call(
                    () => {
                        char.textContent = originalText;
                    },
                    [],
                    t + opts.duration * 0.8,
                );
            });
        },
    }),

    gradient: ({ el, opts, effectColors }) => ({
        special: (tl) => {
            const colors =
                effectColors.length > 0
                    ? effectColors
                    : [\'#ff6ec7\', \'#ffe259\', \'#4af\', \'#ff6ec7\'];
            el.style.backgroundImage = `linear-gradient(90deg, ${colors.join(\', \')})`;
            el.style.backgroundSize = \'300% 100%\';
            el.style.backgroundClip = \'text\';
            (
                el.style as CSSStyleDeclaration & {
                    webkitTextFillColor: string;
                }
            ).webkitTextFillColor = \'transparent\';
            tl.fromTo(
                el,
                { backgroundPosition: \'0% 50%\' },
                {
                    backgroundPosition: \'100% 50%\',
                    duration: opts.duration,
                    ease: \'none\',
                    repeat: opts.repeat,
                },
            );
        },
    }),

    shadow: ({ chars, opts }) => ({
        special: (tl) => {
            tl.from(chars, {
                opacity: 0,
                duration: opts.duration,
                stagger: resolveStagger(opts.stagger),
            }).to(
                chars,
                {
                    textShadow: \'4px 4px 12px rgba(0,0,0,0.5)\',
                    duration: opts.duration * 0.6,
                },
                0,
            );
        },
    }),

    neon: ({ el, opts, effectColors }) => ({
        special: (tl) => {
            const c = effectColors[0] ?? \'#39ff14\';
            tl.fromTo(
                el,
                { textShadow: `0 0 0px ${c}`, opacity: 0 },
                {
                    textShadow: `0 0 8px ${c}, 0 0 20px ${c}, 0 0 40px ${c}`,
                    opacity: 1,
                    duration: opts.duration,
                },
            );
        },
    }),

    marquee: ({ chars, opts }) => ({
        special: (tl) => {
            fromChars(tl, chars, opts, {
                x: \'110%\',
                opacity: 0,
                ease: \'power3.out\',
            });
        },
    }),

    flicker: ({ chars, opts }) => ({
        special: (tl) => {
            gsap.set(chars, { opacity: 0 });
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.03);
                tl.to(char, { opacity: 1, duration: 0.02 }, t);
                tl.to(char, { opacity: 0.3, duration: 0.02 }, t + 0.02);
                tl.to(char, { opacity: 1, duration: 0.02 }, t + 0.04);
                tl.to(char, { opacity: 0.5, duration: 0.02 }, t + 0.06);
                tl.to(
                    char,
                    { opacity: 1, duration: opts.duration * 0.3 },
                    t + 0.08,
                );
            });
        },
    }),

    spotlight: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                tl.from(
                    char,
                    {
                        opacity: 0,
                        scale: 0.8,
                        textShadow: \'0 0 0px transparent\',
                        duration: opts.duration,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        textShadow:
                            \'0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)\',
                        duration: opts.duration * 0.2,
                    },
                    t,
                );
            });
        },
    }),

    outline: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                tl.from(
                    char,
                    {
                        opacity: 0,
                        textShadow: \'0 0 0 transparent\',
                        duration: opts.duration,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        textShadow:
                            \'0 0 2px white, 0 0 4px white, 0 0 6px white\',
                        duration: opts.duration * 0.5,
                    },
                    t,
                );
            });
        },
    }),

    pulse: ({ chars, opts }) => ({
        special: (tl) => {
            gsap.set(chars, { opacity: 0, scale: 0.8 });
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.03);
                tl.to(
                    char,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: opts.duration * 0.3,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        scale: 1.15,
                        duration: opts.duration * 0.15,
                        ease: \'sine.inOut\',
                        yoyo: true,
                        repeat: 1,
                    },
                    t + opts.duration * 0.3,
                );
                tl.to(
                    char,
                    {
                        scale: 1,
                        duration: opts.duration * 0.15,
                        ease: \'power2.out\',
                    },
                    t + opts.duration * 0.6,
                );
            });
        },
    }),

    breathe: ({ chars, opts }) => ({
        special: (tl) => {
            gsap.set(chars, { opacity: 0, scale: 0.9 });
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                tl.to(
                    char,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: opts.duration * 0.4,
                        ease: \'sine.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        scale: 1.05,
                        duration: opts.duration * 0.25,
                        ease: \'sine.inOut\',
                        yoyo: true,
                        repeat: 1,
                    },
                    t + opts.duration * 0.4,
                );
                tl.to(
                    char,
                    {
                        scale: 1,
                        duration: opts.duration * 0.35,
                        ease: \'sine.inOut\',
                    },
                    t + opts.duration * 0.9,
                );
            });
        },
    }),

    aurora: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const colors =
                effectColors.length > 0
                    ? effectColors
                    : [\'#00d4ff\', \'#7b2cbf\', \'#2ec4b6\', \'#ff6b6b\', \'#4ecdc4\'];
            gsap.set(chars, { opacity: 0, filter: \'blur(6px)\' });
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                const c = colors[i % colors.length]!;
                tl.to(
                    char,
                    {
                        opacity: 1,
                        filter: \'blur(0px)\',
                        textShadow: `0 0 10px ${c}, 0 0 20px ${c}40`,
                        duration: opts.duration * 0.5,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        textShadow: `0 0 5px ${c}, 0 0 10px ${c}20`,
                        duration: opts.duration * 0.5,
                        ease: \'sine.inOut\',
                    },
                    t + opts.duration * 0.5,
                );
            });
        },
    }),

    // ── Special Effects ───────────────────────────────────────────────────────

    matrix: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const charset =
                \'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*\';
            const originals = chars.map((c) => c.textContent ?? \'\');
            const color1 = effectColors[0] ?? \'#00ff41\';
            const color2 = effectColors[1] ?? \'#39ff14\';

            gsap.set(chars, { opacity: 0 });
            chars.forEach((char, i) => {
                const scrambleCount = 6;
                const stepDuration = (opts.duration * 0.6) / scrambleCount;
                const startTime = i * resolveStagger(opts.stagger, 0.05);

                for (let s = 0; s < scrambleCount; s++) {
                    tl.call(
                        () => {
                            char.textContent =
                                charset[
                                    Math.floor(Math.random() * charset.length)
                                ] ?? originals[i];
                            char.style.opacity = \'1\';
                            char.style.color = s % 2 === 0 ? color1 : color2;
                        },
                        [],
                        startTime + s * stepDuration,
                    );
                }

                tl.call(
                    () => {
                        char.textContent = originals[i];
                        char.style.color = \'\';
                    },
                    [],
                    startTime + scrambleCount * stepDuration,
                );
            });
        },
    }),

    fire: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const colors =
                effectColors.length > 0
                    ? effectColors
                    : [\'#ff4500\', \'#ff6a00\', \'#ffae00\', \'#ffffff\'];
            gsap.set(chars, {
                opacity: 0,
                y: 40,
                scaleY: 1.4,
                transformOrigin: \'bottom center\',
            });
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.05);
                tl.to(
                    char,
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: opts.duration * 0.5,
                        ease: \'power2.out\',
                    },
                    t,
                );
                colors.forEach((color, ci) => {
                    tl.to(
                        char,
                        { color, duration: opts.duration * 0.15, ease: \'none\' },
                        t + ci * opts.duration * 0.15,
                    );
                });
                tl.to(
                    char,
                    { color: \'\', duration: opts.duration * 0.15 },
                    t + colors.length * opts.duration * 0.15,
                );
            });
        },
    }),

    rainbow: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const defaultHues = [0, 30, 60, 120, 180, 240, 270, 310];
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                const color =
                    effectColors.length > 0
                        ? effectColors[i % effectColors.length]!
                        : `hsl(${defaultHues[i % defaultHues.length]}, 100%, 60%)`;
                tl.from(
                    char,
                    {
                        opacity: 0,
                        y: -20,
                        duration: opts.duration,
                        ease: opts.ease,
                    },
                    t,
                );
                tl.to(char, { color, duration: opts.duration * 0.5 }, t);
            });
        },
    }),

    magnetic: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const a = Math.random() * Math.PI * 2;
                const d = gsap.utils.random(100, 250) as number;
                tl.from(
                    char,
                    {
                        x: Math.cos(a) * d,
                        y: Math.sin(a) * d,
                        opacity: 0,
                        scale: 0.2,
                        duration: opts.duration,
                        ease: \'power4.out\',
                    },
                    i * resolveStagger(opts.stagger, 0.05),
                );
            });
        },
    }),

    particles: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        scale: 3,
                        opacity: 0,
                        rotation: gsap.utils.random(-180, 180) as number,
                        x: gsap.utils.random(-60, 60) as number,
                        y: gsap.utils.random(-60, 60) as number,
                        filter: \'blur(8px)\',
                        duration: opts.duration,
                        ease: \'expo.out\',
                    },
                    i * resolveStagger(opts.stagger, 0.06),
                );
            });
        },
    }),

    dissolve: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                const steps = 5;
                gsap.set(char, { opacity: 0 });

                for (let s = 0; s < steps; s++) {
                    tl.to(
                        char,
                        {
                            opacity: s % 2 === 0 ? 0.6 : 0.1,
                            duration: opts.duration / steps / 2,
                            ease: \'none\',
                        },
                        t + s * (opts.duration / steps / 2),
                    );
                }

                tl.to(
                    char,
                    {
                        opacity: 1,
                        duration: opts.duration / steps,
                        ease: \'power2.out\',
                    },
                    t + steps * (opts.duration / steps / 2),
                );
            });
        },
    }),

    scramble: ({ chars, opts }) => ({
        special: (tl) => {
            const pool = \'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%\';
            const originals = chars.map((c) => c.textContent ?? \'\');
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.05);
                const iters = 8;
                const step = (opts.duration * 0.7) / iters;
                gsap.set(char, { opacity: 1 });

                for (let s = 0; s < iters; s++) {
                    tl.call(
                        () => {
                            char.textContent =
                                pool[Math.floor(Math.random() * pool.length)] ??
                                originals[i];
                        },
                        [],
                        t + s * step,
                    );
                }

                tl.call(
                    () => {
                        char.textContent = originals[i];
                    },
                    [],
                    t + iters * step,
                );
            });
        },
    }),

    zap: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const c1 = effectColors[0] ?? \'#ffe600\';
            const c2 = effectColors[1] ?? \'#ff6a00\';
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                tl.set(char, { opacity: 0 }, t)
                    .to(
                        char,
                        {
                            opacity: 1,
                            color: \'#fff\',
                            textShadow: `0 0 20px ${c1}, 0 0 40px ${c2}`,
                            scale: 1.3,
                            duration: 0.06,
                        },
                        t,
                    )
                    .to(
                        char,
                        {
                            color: \'\',
                            textShadow: \'none\',
                            scale: 1,
                            duration: opts.duration * 0.6,
                            ease: \'power3.out\',
                        },
                        t + 0.06,
                    );
            });
        },
    }),

    orbit: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const angle = (i / chars.length) * Math.PI * 2 - Math.PI / 2;
                tl.from(
                    char,
                    {
                        x: Math.cos(angle) * 80,
                        y: Math.sin(angle) * 80,
                        opacity: 0,
                        scale: 0,
                        duration: opts.duration,
                        ease: \'power3.out\',
                    },
                    i * resolveStagger(opts.stagger),
                );
            });
        },
    }),

    vortex: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        rotation: (i / chars.length) * 720,
                        scale: 0,
                        opacity: 0,
                        x: Math.sin((i / chars.length) * Math.PI * 4) * 60,
                        y: Math.cos((i / chars.length) * Math.PI * 4) * 60,
                        duration: opts.duration,
                        ease: \'power3.out\',
                    },
                    i * resolveStagger(opts.stagger, 0.03),
                );
            });
        },
    }),

    ripple: ({ chars, opts }) => ({
        special: (tl) => {
            const center = Math.floor(chars.length / 2);
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        y: -30,
                        opacity: 0,
                        scale: 0.5,
                        duration: opts.duration,
                        ease: \'elastic.out(1, 0.5)\',
                    },
                    Math.abs(i - center) *
                        resolveStagger(opts.stagger, 0.04) *
                        1.5,
                );
            });
        },
    }),

    piano: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.05);
                tl.from(
                    char,
                    {
                        y: -80,
                        scaleY: 1.5,
                        opacity: 0,
                        duration: opts.duration * 0.4,
                        ease: \'power2.in\',
                    },
                    t,
                )
                    .to(
                        char,
                        { y: 5, scaleY: 0.9, duration: opts.duration * 0.1 },
                        t + opts.duration * 0.4,
                    )
                    .to(
                        char,
                        {
                            y: 0,
                            scaleY: 1,
                            duration: opts.duration * 0.5,
                            ease: \'bounce.out\',
                        },
                        t + opts.duration * 0.5,
                    );
            });
        },
    }),

    domino: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        rotationZ: -90,
                        transformOrigin: \'bottom center\',
                        opacity: 0,
                        duration: opts.duration * 0.6,
                        ease: \'power2.out\',
                    },
                    i * resolveStagger(opts.stagger, 0.07),
                );
            });
        },
    }),

    pendulum: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        rotationZ: (i % 2 === 0 ? 1 : -1) * 60,
                        transformOrigin: \'top center\',
                        opacity: 0,
                        duration: opts.duration,
                        ease: \'elastic.out(0.6, 0.3)\',
                    },
                    i * resolveStagger(opts.stagger, 0.05),
                );
            });
        },
    }),

    shatter: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        skewX: gsap.utils.random(-40, 40) as number,
                        skewY: gsap.utils.random(-20, 20) as number,
                        x: gsap.utils.random(-50, 50) as number,
                        scale: gsap.utils.random(0.1, 2) as number,
                        opacity: 0,
                        rotation: gsap.utils.random(-45, 45) as number,
                        duration: opts.duration,
                        ease: \'power4.out\',
                    },
                    i * resolveStagger(opts.stagger),
                );
            });
        },
    }),

    smoke: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        y: gsap.utils.random(20, 60) as number,
                        x: gsap.utils.random(-15, 15) as number,
                        opacity: 0,
                        filter: \'blur(8px)\',
                        scale: gsap.utils.random(0.8, 1.4) as number,
                        duration: opts.duration,
                        ease: \'power1.out\',
                    },
                    i * resolveStagger(opts.stagger, 0.05),
                );
            });
        },
    }),

    thunder: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.05);
                tl.set(char, { opacity: 0 }, t)
                    .to(char, { opacity: 1, y: -100, duration: 0.01 }, t)
                    .to(
                        char,
                        {
                            y: 0,
                            duration: opts.duration * 0.3,
                            ease: \'power4.in\',
                        },
                        t + 0.01,
                    )
                    .to(
                        char,
                        { textShadow: \'0 0 20px #ffe600\', duration: 0.05 },
                        t + opts.duration * 0.3,
                    )
                    .to(
                        char,
                        {
                            textShadow: \'none\',
                            duration: opts.duration * 0.3,
                            ease: \'power2.out\',
                        },
                        t + opts.duration * 0.35,
                    )
                    .to(
                        char,
                        { y: -5, duration: 0.06 },
                        t + opts.duration * 0.3,
                    )
                    .to(
                        char,
                        { y: 0, duration: 0.1, ease: \'bounce.out\' },
                        t + opts.duration * 0.36,
                    );
            });
        },
    }),

    crystallize: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.06);
                tl.from(
                    char,
                    {
                        opacity: 0,
                        scale: 1.8,
                        skewX: gsap.utils.random(-30, 30) as number,
                        skewY: gsap.utils.random(-15, 15) as number,
                        filter: \'blur(4px) brightness(2)\',
                        color: \'#a0e4ff\',
                        duration: opts.duration,
                        ease: \'power3.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        color: \'\',
                        filter: \'none\',
                        duration: opts.duration * 0.3,
                    },
                    t + opts.duration * 0.7,
                );
            });
        },
    }),

    warp: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                tl.from(
                    char,
                    {
                        scaleX: 8,
                        opacity: 0,
                        duration: opts.duration * 0.4,
                        ease: \'power3.out\',
                    },
                    t,
                )
                    .to(
                        char,
                        { scaleX: 0.8, duration: opts.duration * 0.15 },
                        t + opts.duration * 0.4,
                    )
                    .to(
                        char,
                        {
                            scaleX: 1,
                            duration: opts.duration * 0.45,
                            ease: \'elastic.out(1, 0.6)\',
                        },
                        t + opts.duration * 0.55,
                    );
            });
        },
    }),

    cinema: ({ el, opts }) => ({
        special: (tl) => {
            gsap.set(el, {
                opacity: 0,
                filter: \'sepia(1) contrast(2) brightness(0.5)\',
            });

            for (let f = 0; f < 8; f++) {
                tl.to(el, {
                    opacity:
                        f % 2 === 0
                            ? (gsap.utils.random(0.2, 0.7) as number)
                            : 0,
                    duration: opts.duration / 16,
                    ease: \'none\',
                });
            }

            tl.to(el, { opacity: 1, duration: opts.duration * 0.3 }).to(el, {
                filter: \'sepia(0) contrast(1) brightness(1)\',
                duration: opts.duration * 0.5,
                ease: \'power2.inOut\',
            });
        },
    }),

    gravity: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        y: -100,
                        rotation: -30,
                        opacity: 0,
                        duration: opts.duration * 0.7,
                        ease: \'bounce.out\',
                    },
                    i * resolveStagger(opts.stagger),
                );
            });
        },
    }),

    levitate: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        y: 50,
                        opacity: 0,
                        duration: opts.duration,
                        ease: \'power3.out\',
                    },
                    i * resolveStagger(opts.stagger, 0.05),
                );
            });
        },
    }),

    twinkle: ({ chars, opts }) => ({
        special: (tl) => {
            gsap.set(chars, { opacity: 0, scale: 0.5 });
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.03);
                tl.to(
                    char,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: opts.duration * 0.3,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        opacity: 0.3,
                        scale: 0.8,
                        duration: opts.duration * 0.15,
                        ease: \'sine.inOut\',
                        yoyo: true,
                        repeat: 1,
                    },
                    t + opts.duration * 0.3,
                );
                tl.to(
                    char,
                    { opacity: 1, scale: 1, duration: opts.duration * 0.2 },
                    t + opts.duration * 0.6,
                );
            });
        },
    }),

    shimmerFade: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger);
                tl.from(
                    char,
                    {
                        opacity: 0,
                        duration: opts.duration * 0.5,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        opacity: 0.7,
                        duration: opts.duration * 0.2,
                        ease: \'sine.inOut\',
                        yoyo: true,
                        repeat: 1,
                    },
                    t + opts.duration * 0.5,
                );
                tl.to(
                    char,
                    { opacity: 1, duration: opts.duration * 0.3 },
                    t + opts.duration * 0.9,
                );
            });
        },
    }),

    fold: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        scaleY: 0,
                        opacity: 0,
                        transformOrigin: \'bottom center\',
                        duration: opts.duration,
                        ease: \'back.out(1.5)\',
                    },
                    i * resolveStagger(opts.stagger, 0.05),
                );
            });
        },
    }),

    cascade: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const startY = gsap.utils.random(-120, -40) as number;
                const t = i * resolveStagger(opts.stagger, 0.04);
                tl.from(
                    char,
                    {
                        y: startY,
                        opacity: 0,
                        duration: opts.duration * 0.6,
                        ease: \'power3.in\',
                    },
                    t,
                ).to(
                    char,
                    { y: 0, duration: opts.duration * 0.4, ease: \'bounce.out\' },
                    t + opts.duration * 0.6,
                );
            });
        },
    }),

    pinball: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.06);
                const dir = i % 2 === 0 ? 1 : -1;
                gsap.set(char, { opacity: 0 });
                tl.to(char, { opacity: 1, duration: 0.01 }, t)
                    .from(
                        char,
                        {
                            x: dir * 80,
                            duration: opts.duration * 0.25,
                            ease: \'power2.in\',
                        },
                        t,
                    )
                    .to(
                        char,
                        {
                            x: -dir * 30,
                            duration: opts.duration * 0.2,
                            ease: \'power1.out\',
                        },
                        t + opts.duration * 0.25,
                    )
                    .to(
                        char,
                        {
                            x: dir * 10,
                            duration: opts.duration * 0.15,
                            ease: \'power1.in\',
                        },
                        t + opts.duration * 0.45,
                    )
                    .to(
                        char,
                        {
                            x: 0,
                            duration: opts.duration * 0.2,
                            ease: \'bounce.out\',
                        },
                        t + opts.duration * 0.6,
                    );
            });
        },
    }),

    neonFlicker: ({ chars, opts, effectColors }) => ({
        special: (tl) => {
            const glowColor = effectColors[0] ?? \'#39ff14\';
            const flickerOffsets = [0, 0.05, 0.1, 0.16, 0.22, 0.3];
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.05);
                gsap.set(char, { opacity: 0 });
                flickerOffsets.forEach((offset, fi) => {
                    tl.to(
                        char,
                        {
                            opacity: fi % 2 === 0 ? 1 : 0.15,
                            color: glowColor,
                            textShadow:
                                fi % 2 === 0
                                    ? `0 0 6px ${glowColor}, 0 0 20px ${glowColor}`
                                    : \'none\',
                            duration: 0.04,
                            ease: \'none\',
                        },
                        t + offset,
                    );
                });
                tl.to(
                    char,
                    {
                        opacity: 1,
                        color: \'\',
                        textShadow: \'none\',
                        duration: opts.duration * 0.4,
                        ease: \'power2.out\',
                    },
                    t + 0.34,
                );
            });
        },
    }),

    rise: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const sway = gsap.utils.random(-12, 12) as number;
                const t = i * resolveStagger(opts.stagger, 0.05);
                tl.from(
                    char,
                    {
                        y: 60,
                        x: sway,
                        opacity: 0,
                        scale: 0.7,
                        filter: \'blur(4px)\',
                        duration: opts.duration,
                        ease: \'power2.out\',
                    },
                    t,
                );
                tl.to(
                    char,
                    {
                        x: 0,
                        filter: \'blur(0px)\',
                        duration: opts.duration * 0.4,
                        ease: \'sine.out\',
                    },
                    t + opts.duration * 0.6,
                );
            });
        },
    }),

    unfurl: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                tl.from(
                    char,
                    {
                        rotationY: -90,
                        opacity: 0,
                        transformPerspective: 600,
                        transformOrigin: \'left center\',
                        duration: opts.duration,
                        ease: \'back.out(1.4)\',
                    },
                    i * resolveStagger(opts.stagger, 0.05),
                );
            });
        },
    }),

    stampIn: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                const t = i * resolveStagger(opts.stagger, 0.12);
                tl.from(
                    char,
                    {
                        y: -120,
                        scaleY: 1.4,
                        opacity: 0,
                        transformOrigin: \'top center\',
                        duration: opts.duration * 0.35,
                        ease: \'power4.in\',
                    },
                    t,
                )
                    .to(
                        char,
                        {
                            scaleY: 0.6,
                            scaleX: 1.3,
                            duration: opts.duration * 0.1,
                            ease: \'power1.out\',
                        },
                        t + opts.duration * 0.35,
                    )
                    .to(
                        char,
                        {
                            scaleY: 1.1,
                            scaleX: 0.95,
                            duration: opts.duration * 0.12,
                            ease: \'power1.inOut\',
                        },
                        t + opts.duration * 0.45,
                    )
                    .to(
                        char,
                        {
                            scaleY: 1,
                            scaleX: 1,
                            duration: opts.duration * 0.31,
                            ease: \'elastic.out(1, 0.5)\',
                        },
                        t + opts.duration * 0.57,
                    );
            });
        },
    }),

    blinds: ({ chars, opts }) => ({
        special: (tl) => {
            chars.forEach((char, i) => {
                gsap.set(char, {
                    transformOrigin: \'top center\',
                    scaleY: 0,
                    opacity: 1,
                });
                tl.to(
                    char,
                    {
                        scaleY: 1,
                        duration: opts.duration,
                        ease: \'back.out(1.6)\',
                    },
                    i * resolveStagger(opts.stagger, 0.1),
                );
            });
        },
    }),
};

// ─── Component ───────────────────────────────────────────────────────────────

const TextAnimator = forwardRef<TextAnimatorRef, TextAnimatorProps>(
    function TextAnimator(
        {
            text,
            children,
            animation = \'fadeInUp\',
            trigger = \'scrollTrigger\',
            splitBy = \'chars\',
            tag: Tag = \'span\',
            duration = 0.8,
            delay = 0,
            stagger = 0.04,
            ease = \'power3.out\',
            repeat = 0,
            yoyo = false,
            scrollTrigger: scrollTriggerOpts,
            color,
            fontSize,
            className = \'\',
            style = {},
            effectColor,
            onComplete,
            onStart,
            onRepeat,
        },
        ref,
    ) {
        const elRef = useRef<HTMLElement>(null);
        const tlRef = useRef<gsap.core.Timeline | null>(null);
        const stRef = useRef<ScrollTrigger | null>(null);

        // ── Stable callback refs ────────────────────────────────────────────
        const onCompleteRef = useRef(onComplete);
        const onStartRef = useRef(onStart);
        const onRepeatRef = useRef(onRepeat);

        useEffect(() => {
            onCompleteRef.current = onComplete;
        }, [onComplete]);
        useEffect(() => {
            onStartRef.current = onStart;
        }, [onStart]);
        useEffect(() => {
            onRepeatRef.current = onRepeat;
        }, [onRepeat]);

        const content: string = children ?? text ?? \'Animate Me\';

        const resolvedOpts: ResolvedAnimOpts = useMemo(
            () => ({ duration, delay, stagger, ease, repeat, yoyo }),
            [duration, delay, stagger, ease, repeat, yoyo],
        );

        // ── Build timeline ──────────────────────────────────────────────────
        const buildTimeline = useCallback((): gsap.core.Timeline | null => {
            const el = elRef.current;

            if (!el) {
                return null;
            }

            const def = ANIMATIONS[animation] ?? ANIMATIONS[\'fadeIn\']!;
            el.textContent = content;

            let chars: HTMLElement[] = [];
            let words: HTMLElement[] = [];

            if (splitBy === \'chars\') {
                chars = splitChars(el);
            } else if (splitBy === \'words\') {
                words = splitWords(el);
                chars = words;
            } else if (splitBy === \'lines\') {
                words = splitLines(el);
                chars = words;
            }

            const rawColors = Array.isArray(effectColor)
                ? effectColor
                : effectColor
                  ? [effectColor]
                  : [];
            const effectColors =
                rawColors.length === 1
                    ? [rawColors[0]!, rawColors[0]!]
                    : rawColors;

            const ctx: AnimationContext = {
                chars,
                words,
                el,
                opts: resolvedOpts,
                effectColors,
            };
            const config = def(ctx);

            const tl = gsap.timeline({
                paused: true,
                defaults: {
                    duration: resolvedOpts.duration,
                    ease: resolvedOpts.ease,
                },
                onStart: () => onStartRef.current?.(),
                onComplete: () => onCompleteRef.current?.(),
                onRepeat: () => onRepeatRef.current?.(),
                delay: resolvedOpts.delay,
                repeat: resolvedOpts.repeat,
                yoyo: resolvedOpts.yoyo,
            });

            if (config.special) {
                config.special(tl);
            } else if (config.targets && config.from && config.to) {
                tl.fromTo(config.targets, config.from, {
                    ...config.to,
                    stagger: resolvedOpts.stagger,
                    ease: config.overrideEase
                        ? config.to.ease
                        : resolvedOpts.ease,
                });
            }

            return tl;
        }, [animation, content, splitBy, effectColor, resolvedOpts]);

        // ── GSAP context ────────────────────────────────────────────────────
        useGSAP(
            () => {
                const el = elRef.current;

                if (!el) {
                    return;
                }

                stRef.current?.kill();
                tlRef.current?.kill();

                const tl = buildTimeline();
                tlRef.current = tl;

                if (!tl) {
                    return;
                }

                if (trigger === \'scrollTrigger\') {
                    stRef.current = ScrollTrigger.create({
                        trigger: el,
                        start: scrollTriggerOpts?.start ?? \'top 80%\',
                        end: scrollTriggerOpts?.end ?? \'bottom 20%\',
                        scrub: scrollTriggerOpts?.scrub ?? false,
                        markers: scrollTriggerOpts?.markers ?? false,
                        pin: scrollTriggerOpts?.pin ?? false,
                        toggleActions:
                            scrollTriggerOpts?.toggleActions ??
                            \'play none none reverse\',
                        animation: tl,
                    });
                }
            },
            {
                scope: elRef,
                dependencies: [
                    animation,
                    content,
                    trigger,
                    splitBy,
                    resolvedOpts,
                    scrollTriggerOpts,
                    buildTimeline,
                ],
            },
        );

        // ── Trigger handlers ────────────────────────────────────────────────
        const handleClick = useCallback(() => {
            if (trigger !== \'onClick\') {
                return;
            }

            tlRef.current?.restart();
        }, [trigger]);

        const handleMouseEnter = useCallback(() => {
            if (trigger !== \'onHover\') {
                return;
            }

            tlRef.current?.play();
        }, [trigger]);

        const handleMouseLeave = useCallback(() => {
            if (trigger !== \'onHover\') {
                return;
            }

            tlRef.current?.reverse();
        }, [trigger]);

        const handleKeyDown = useCallback(
            (e: KeyboardEvent<Element>) => {
                if (
                    trigger === \'onClick\' &&
                    (e.key === \'Enter\' || e.key === \' \')
                ) {
                    handleClick();
                }
            },
            [trigger, handleClick],
        );

        // ── Ref API ─────────────────────────────────────────────────────────
        useImperativeHandle(ref, () => ({
            play: () => tlRef.current?.play(),
            pause: () => tlRef.current?.pause(),
            reverse: () => tlRef.current?.reverse(),
            restart: () => tlRef.current?.restart(),
            seek: (t: number) => tlRef.current?.seek(t),
            kill: () => {
                tlRef.current?.kill();
                stRef.current?.kill();
            },
            timeline: () => tlRef.current,
            isPlaying: () => tlRef.current?.isActive() ?? false,
            progress: () => tlRef.current?.progress() ?? 0,
        }));

        // ── Render ──────────────────────────────────────────────────────────
        const tagStyle: React.CSSProperties = {
            display: \'inline-block\',
            cursor: trigger === \'onClick\' ? \'pointer\' : \'default\',
            ...(color ? { color } : {}),
            ...(fontSize ? { fontSize } : {}),
            ...style,
        };

        return (
            <Tag
                ref={elRef as React.RefObject<HTMLElement>}
                className={`text-animator ${className}`.trim()}
                style={tagStyle}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={content}
                role={trigger === \'onClick\' ? \'button\' : undefined}
                tabIndex={trigger === \'onClick\' ? 0 : undefined}
                onKeyDown={trigger === \'onClick\' ? handleKeyDown : undefined}
            >
                {content}
            </Tag>
        );
    },
);

export default TextAnimator;
export { ANIMATIONS };
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'animations',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'button-particles',
                'type' => 'registry:ui',
                'title' => 'Button Particles',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    '@radix-ui/react-slot',
                    'class-variance-authority',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/buttons/button-particles.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';
import { Slot } from \'@radix-ui/react-slot\';
import type { VariantProps } from \'class-variance-authority\';
import { cva } from \'class-variance-authority\';
import * as React from \'react\';
import { useEffect, useRef } from \'react\';
import { cn } from \'@/lib/utils\';

const buttonVariants = cva(
    "relative isolate inline-flex items-center justify-center gap-2 overflow-visible rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",
    {
        variants: {
            variant: {
                default:
                    \'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90\',
                destructive:
                    \'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40\',
                outline:
                    \'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground\',
                secondary:
                    \'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80\',
                ghost: \'hover:bg-accent hover:text-accent-foreground\',
                link: \'text-primary underline-offset-4 hover:underline\',
            },
            size: {
                default: \'h-9 px-4 py-2 has-[>svg]:px-3\',
                sm: \'h-8 rounded-md px-3 has-[>svg]:px-2.5\',
                lg: \'h-10 rounded-md px-6 has-[>svg]:px-4\',
                icon: \'size-9\',
            },
        },
        defaultVariants: {
            variant: \'default\',
            size: \'default\',
        },
    },
);

// --- Particle style injection ---
// One unique keyframe per particle slot so each gets its own randomised
// endpoint baked in at style-injection time. CSS custom properties
// (--pdx, --pdy, --pdur) are set on the element at click time.

const DEFAULT_PARTICLE_COUNT = 20;
const PARTICLE_STYLE_ID = \'button-particle-styles-v2\';

function injectParticleStyles(maxIndex: number) {
    if (typeof document === \'undefined\') {
        return;
    }

    let style = document.getElementById(PARTICLE_STYLE_ID);
    let existingCss = \'\';
    let existingMax = 0;

    if (style) {
        existingCss = style.textContent || \'\';
        existingMax = parseInt(style.dataset.maxIndex || \'0\', 10);

        if (existingMax >= maxIndex) {
            return;
        }
    } else {
        style = document.createElement(\'style\');
        style.id = PARTICLE_STYLE_ID;
    }

    style.dataset.maxIndex = String(maxIndex);

    let css = existingCss;

    if (!css) {
        css = `
        .bp-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            will-change: transform, opacity;
        }
    `;
    }

    for (let i = existingMax + 1; i <= maxIndex; i++) {
        css += `
            @keyframes particle-burst-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); opacity: 1; }
                60%  { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) scale(0); opacity: 0; }
            }
            .bp-particle[data-particle="burst"][data-idx="${i}"] {
                animation: particle-burst-${i} var(--pdur) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            @keyframes sparkle-burst-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(1); opacity: 1; }
                60%  { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) rotate(180deg) scale(0.3); opacity: 0; }
            }
            .bp-particle[data-particle="sparkle"][data-idx="${i}"] {
                animation: sparkle-burst-${i} var(--pdur) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }

            @keyframes confetti-spray-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(1); opacity: 1; }
                60%  { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) rotate(360deg) scale(0.5); opacity: 0; }
            }
            .bp-particle[data-particle="confetti"][data-idx="${i}"] {
                animation: confetti-spray-${i} var(--pdur) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            @keyframes vburst-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); opacity: 1; }
                60%  { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) scale(0); opacity: 0; }
            }
            .bp-particle[data-particle="vburst"][data-idx="${i}"] {
                animation: vburst-${i} var(--pdur) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            @keyframes hburst-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); opacity: 1; }
                60%  { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) scale(0); opacity: 0; }
            }
            .bp-particle[data-particle="hburst"][data-idx="${i}"] {
                animation: hburst-${i} var(--pdur) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            @keyframes spiral-burst-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(1); opacity: 1; }
                60%  { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) rotate(720deg) scale(0); opacity: 0; }
            }
            .bp-particle[data-particle="spiral"][data-idx="${i}"] {
                animation: spiral-burst-${i} var(--pdur) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
        `;
    }

    style.textContent = css;
    document.head.appendChild(style);
}

injectParticleStyles(DEFAULT_PARTICLE_COUNT);

// --- Colour palette ---
const DEFAULT_COLORS = [
    \'#ff0083\', // hot pink
    \'#ff6b6b\', // coral red
    \'#ffd93d\', // golden yellow
    \'#6bcb77\', // mint green
    \'#4d96ff\', // vivid blue
    \'#c77dff\', // violet
    \'#ff9f1c\', // amber orange
    \'#00f5d4\', // cyan
];

export type ParticleType =
    | \'burst\'
    | \'sparkle\'
    | \'confetti\'
    | \'vburst\'
    | \'hburst\'
    | \'spiral\';

function ButtonParticles({
    className,
    variant,
    size,
    particle = \'burst\',
    particles = DEFAULT_PARTICLE_COUNT,
    colors = DEFAULT_COLORS,
    children,
    asChild = false,
    ...props
}: React.ComponentProps<\'button\'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        particle?: ParticleType;
        particles?: number;
        colors?: string[];
    }) {
    const Comp = asChild ? Slot : \'button\';
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        injectParticleStyles(particles);
    }, [particles]);

    const createParticle = (
        buttonEl: HTMLElement,
        originX: number,
        originY: number,
        index: number,
    ) => {
        if (!buttonEl) {
            return;
        }

        const el = document.createElement(\'div\');
        el.classList.add(\'bp-particle\');
        el.dataset.idx = String(index);
        el.dataset.particle = particle;

        const color = colors[Math.floor(Math.random() * colors.length)];
        // Odd index → stroke only (mirrors the SCSS nth-of-type(odd) rule)
        const isStroke = index % 2 === 1;

        switch (particle) {
            case \'burst\': {
                const angle = Math.random() * 2 * Math.PI;
                const dist = 70 + Math.random() * 90;
                const sz = 14 + Math.random() * 14;
                el.style.width = `${sz}px`;
                el.style.height = `${sz}px`;

                if (isStroke) {
                    el.style.backgroundColor = \'transparent\';
                    el.style.border = `3px solid ${color}`;
                } else {
                    el.style.backgroundColor = color;
                    el.style.border = \'none\';
                }

                const dur = 550 + Math.random() * 400;
                el.style.setProperty(\'--pdx\', `${Math.cos(angle) * dist}px`);
                el.style.setProperty(\'--pdy\', `${Math.sin(angle) * dist}px`);
                el.style.setProperty(\'--pdur\', `${dur}ms`);
                el.style.left = `${originX - sz / 2}px`;
                el.style.top = `${originY - sz / 2}px`;
                buttonEl.appendChild(el);
                setTimeout(() => el.remove(), dur + 50);
                break;
            }
            case \'sparkle\': {
                const dx = (Math.random() - 0.5) * 80;
                const dy = -(60 + Math.random() * 100);
                const sz = 8 + Math.random() * 12;
                el.style.width = `${sz}px`;
                el.style.height = `${sz}px`;

                if (isStroke) {
                    el.style.backgroundColor = \'transparent\';
                    el.style.border = `2px solid ${color}`;
                } else {
                    el.style.backgroundColor = color;
                    el.style.border = \'none\';
                }

                const dur = 600 + Math.random() * 400;
                el.style.setProperty(\'--pdx\', `${dx}px`);
                el.style.setProperty(\'--pdy\', `${dy}px`);
                el.style.setProperty(\'--pdur\', `${dur}ms`);
                el.style.left = `${originX - sz / 2}px`;
                el.style.top = `${originY - sz / 2}px`;
                buttonEl.appendChild(el);
                setTimeout(() => el.remove(), dur + 50);
                break;
            }
            case \'confetti\': {
                const spreadAngle = (Math.random() - 0.5) * Math.PI * 0.8;
                const angle = -Math.PI / 2 + spreadAngle;
                const dist = 80 + Math.random() * 120;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist - 40;
                const sz = 10 + Math.random() * 8;
                el.style.width = `${sz}px`;
                el.style.height = `${sz * 0.5}px`;
                el.style.borderRadius = \'2px\';
                el.style.backgroundColor = color;
                el.style.border = \'none\';
                const dur = 700 + Math.random() * 400;
                el.style.setProperty(\'--pdx\', `${dx}px`);
                el.style.setProperty(\'--pdy\', `${dy}px`);
                el.style.setProperty(\'--pdur\', `${dur}ms`);
                el.style.left = `${originX - sz / 2}px`;
                el.style.top = `${originY - sz / 4}px`;
                buttonEl.appendChild(el);
                setTimeout(() => el.remove(), dur + 50);
                break;
            }
            case \'vburst\': {
                const isUp = index % 2 === 0;
                const dist = 80 + Math.random() * 100;
                const sz = 12 + Math.random() * 12;
                el.style.width = `${sz}px`;
                el.style.height = `${sz}px`;
                el.style.backgroundColor = color;
                el.style.border = \'none\';
                const dur = 550 + Math.random() * 400;
                el.style.setProperty(
                    \'--pdx\',
                    `${(Math.random() - 0.5) * 20}px`,
                );
                el.style.setProperty(\'--pdy\', `${isUp ? -dist : dist}px`);
                el.style.setProperty(\'--pdur\', `${dur}ms`);
                el.style.left = `${originX - sz / 2}px`;
                el.style.top = `${originY - sz / 2}px`;
                buttonEl.appendChild(el);
                setTimeout(() => el.remove(), dur + 50);
                break;
            }
            case \'hburst\': {
                const isRight = index % 2 === 0;
                const dist = 80 + Math.random() * 100;
                const sz = 12 + Math.random() * 12;
                el.style.width = `${sz}px`;
                el.style.height = `${sz}px`;
                el.style.backgroundColor = color;
                el.style.border = \'none\';
                const dur = 550 + Math.random() * 400;
                el.style.setProperty(\'--pdx\', `${isRight ? dist : -dist}px`);
                el.style.setProperty(
                    \'--pdy\',
                    `${(Math.random() - 0.5) * 40}px`,
                );
                el.style.setProperty(\'--pdur\', `${dur}ms`);
                el.style.left = `${originX - sz / 2}px`;
                el.style.top = `${originY - sz / 2}px`;
                buttonEl.appendChild(el);
                setTimeout(() => el.remove(), dur + 50);
                break;
            }
            case \'spiral\': {
                const baseAngle = Math.random() * 2 * Math.PI;
                const dist = 60 + Math.random() * 100;
                const sz = 8 + Math.random() * 8;
                el.style.width = `${sz}px`;
                el.style.height = `${sz}px`;
                el.style.backgroundColor = color;
                el.style.border = \'none\';
                const dur = 600 + Math.random() * 400;
                el.style.setProperty(
                    \'--pdx\',
                    `${Math.cos(baseAngle) * dist}px`,
                );
                el.style.setProperty(
                    \'--pdy\',
                    `${Math.sin(baseAngle) * dist}px`,
                );
                el.style.setProperty(\'--pdur\', `${dur}ms`);
                el.style.left = `${originX - sz / 2}px`;
                el.style.top = `${originY - sz / 2}px`;
                buttonEl.appendChild(el);
                setTimeout(() => el.remove(), dur + 50);
                break;
            }
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) {
            return;
        }

        props.onClick?.(e);

        if (e.defaultPrevented) {
            return;
        }

        const cx = ref.current.offsetWidth / 2;
        const cy = ref.current.offsetHeight / 2;
        const buttonEl = ref.current;

        for (let i = 1; i <= particles; i++) {
            setTimeout(() => createParticle(buttonEl, cx, cy, i), i * 12);
        }
    };

    return (
        <Comp
            ref={ref}
            data-slot="button"
            data-particle={particle}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
            onClick={handleClick}
        >
            {children}
        </Comp>
    );
}

export { ButtonParticles, buttonVariants };
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'buttons',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'buttons',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'pixel-canvas',
                'type' => 'registry:ui',
                'title' => 'Pixel Canvas',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    'class-variance-authority',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                    'https://ui.test/r/use-pixel-canvas.json',
                    'https://ui.test/r/pixel-canvas-helper.json',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/canvas/pixel-canvas.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import type { VariantProps } from \'class-variance-authority\';
import { cva } from \'class-variance-authority\';
import * as React from \'react\';
import { cn } from \'@/lib/utils\';
import { usePixelCanvas } from \'@/registry/new-york/hooks/use-pixel-canvas\';
import type {
    AnimationType,
    PixelConfig,
    PixelShape,
} from \'@/registry/new-york/lib/pixel-canvas-helper\';
import { colorPresets } from \'@/registry/new-york/lib/pixel-canvas-helper\';

const pixelCanvasVariants = cva(\'relative overflow-hidden\', {
    variants: {
        /**
         * Visual style variant
         * - default: Standard pixel animation
         * - subtle: Softer, more muted animation
         * - vibrant: Bold, high-contrast colors
         * - glow: Adds a subtle glow effect
         * - minimal: Very sparse pixel density
         */
        variant: {
            default: \'\',
            subtle: \'\',
            vibrant: \'\',
            glow: \'\',
            minimal: \'\',
        },
    },
    defaultVariants: {
        variant: \'default\',
    },
});

// Variant configurations
const variantConfigs: Record<string, Partial<PixelConfig>> = {
    default: {
        colors: colorPresets.slate,
        gap: 6,
        speed: 35,
        shimmerIntensity: 0.5,
    },
    subtle: {
        colors: [\'#f8fafc\', \'#f1f5f9\', \'#e2e8f0\'],
        gap: 8,
        speed: 20,
        shimmerIntensity: 0.3,
    },
    vibrant: {
        colors: colorPresets.neon,
        gap: 5,
        speed: 50,
        shimmerIntensity: 0.7,
    },
    glow: {
        colors: colorPresets.cyan,
        gap: 6,
        speed: 40,
        shimmerIntensity: 0.6,
    },
    minimal: {
        colors: colorPresets.slate,
        gap: 12,
        speed: 25,
        shimmerIntensity: 0.4,
    },
};

export interface PixelCanvasProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof pixelCanvasVariants> {
    /** Custom colors array (overrides variant colors) - e.g. [\'#ff0000\', \'#00ff00\', \'#0000ff\'] */
    colors?: string[];
    /** Color preset name */
    colorPreset?: keyof typeof colorPresets;
    /** Gap between pixels */
    gap?: number;
    /** Animation speed (0-100) */
    speed?: number;
    /** Minimum pixel size */
    minSize?: number;
    /** Maximum pixel size */
    maxSize?: number;
    /** Shimmer intensity (0-1) */
    shimmerIntensity?: number;
    /** Pixel shape */
    shape?: PixelShape;
    /** Animation pattern type */
    animationType?: AnimationType;
    /**
     * Controls continuous animation
     * - true: Animation runs continuously without interaction
     * - false: Animation only runs when triggered
     */
    active?: boolean;
    /**
     * Enable mouse interaction
     * - true: Hover triggers appear/disappear
     * - false: Mouse events are ignored
     */
    mouseActive?: boolean;
    /** @deprecated Use `active` instead */
    autoStart?: boolean;
    /** @deprecated Use `mouseActive` instead */
    hoverTrigger?: boolean;
    /** Disable focus events */
    noFocus?: boolean;
}

const PixelCanvas = React.forwardRef<HTMLDivElement, PixelCanvasProps>(
    (
        {
            className,
            variant = \'default\',
            colors,
            colorPreset,
            gap,
            speed,
            minSize,
            maxSize,
            shimmerIntensity,
            shape,
            animationType,
            active,
            mouseActive,
            autoStart,
            hoverTrigger,
            noFocus = false,
            style,
            ...props
        },
        ref,
    ) => {
        const variantConfig = variantConfigs[variant || \'default\'];

        const resolvedColors =
            colors ||
            (colorPreset ? colorPresets[colorPreset] : variantConfig.colors);

        // Handle backwards compatibility
        const resolvedActive = active ?? autoStart ?? false;
        // If active is explicitly set, disable mouse events to override hover behavior
        const resolvedMouseActive =
            active !== undefined
                ? false
                : (mouseActive ?? hoverTrigger ?? true);

        const { canvasRef, containerRef } = usePixelCanvas({
            colors: resolvedColors,
            gap: gap ?? variantConfig.gap,
            speed: speed ?? variantConfig.speed,
            minSize: minSize ?? 0.5,
            maxSize: maxSize ?? 2,
            shimmerIntensity:
                shimmerIntensity ?? variantConfig.shimmerIntensity,
            shape: shape ?? \'square\',
            animationType: animationType ?? \'radial\',
            active: resolvedActive,
            mouseActive: resolvedMouseActive,
            noFocus,
        });

        // Merge refs
        React.useImperativeHandle(
            ref,
            () => containerRef.current as HTMLDivElement,
        );

        return (
            <div
                ref={containerRef}
                className={cn(pixelCanvasVariants({ variant }), className)}
                style={style}
                {...props}
            >
                <canvas
                    ref={canvasRef}
                    className={cn(
                        \'absolute inset-0 h-full w-full\',
                        variant === \'glow\' && \'blur-[0.5px]\',
                    )}
                    style={{ pointerEvents: \'none\' }}
                />
            </div>
        );
    },
);
PixelCanvas.displayName = \'PixelCanvas\';

export { PixelCanvas, pixelCanvasVariants };
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'canvas',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'canvas',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'back-light',
                'type' => 'registry:ui',
                'title' => 'Back Light',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/glow/back-light.tsx',
                        'type' => 'registry:ui',
                        'content' => 'import type { ReactNode } from \'react\';
import { useId } from \'react\';
import { cn } from \'@/lib/utils\';

type BackLightProps = {
    children?: ReactNode;
    className?: string;
    blur?: number;
    intensity?: number;
    saturation?: number;
    opacity?: number;
};

export function BackLight({
    blur = 20,
    intensity = 1,
    saturation = 4,
    opacity = 0.6,
    children,
    className,
}: BackLightProps) {
    const id = useId();

    return (
        <div className={cn(\'relative\', className)}>
            <svg width="0" height="0" aria-hidden="true">
                <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation={blur} result="blur" />
                    <feColorMatrix
                        in="blur"
                        type="matrix"
                        values={`
              ${saturation} 0 0 0 0
              0 ${saturation} 0 0 0
              0 0 ${saturation} 0 0
              0 0 0 ${intensity} 0
            `}
                    />
                </filter>
            </svg>

            {/* Glow layer */}
            <div
                style={{
                    position: \'absolute\',
                    inset: 0,
                    filter: `url(#${id})`,
                    opacity,
                    pointerEvents: \'none\',
                    willChange: \'filter\',
                    transform: \'translateZ(0)\',
                }}
            >
                {children}
            </div>

            {/* Actual content */}
            <div style={{ position: \'relative\' }}>{children}</div>
        </div>
    );
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'glow',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'glow',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'glow-conic',
                'type' => 'registry:ui',
                'title' => 'Glow Conic',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/glow/glow-conic.tsx',
                        'type' => 'registry:ui',
                        'content' => 'import { useEffect } from \'react\';
import { cn } from \'@/lib/utils\';

export interface GlowConicProps {
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export default function GlowConic({
    className,
    style,
    ...props
}: GlowConicProps) {
    useEffect(() => {
        if (typeof CSS !== \'undefined\' && CSS.registerProperty) {
            CSS.registerProperty({
                name: \'--glow-conic-angle\',
                syntax: \'<angle>\',
                initialValue: \'0deg\',
                inherits: false,
            });
        }
    }, []);

    return (
        <div
            {...props}
            className={cn(
                \'absolute inset-0 animate-glow-conic rounded-[inherit] p-px\',
                className,
            )}
            style={{
                background:
                    \'repeating-conic-gradient(from var(--glow-conic-angle), var(--conic-color) 0%, transparent 50%)\',
                mask: \'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box\',
                maskComposite: \'exclude\' as const,
                WebkitMask:
                    \'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box\',
                WebkitMaskComposite: \'xor\' as const,
                ...style,
            }}
        ></div>
    );
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'glow',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'glow',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'glow-radial',
                'type' => 'registry:ui',
                'title' => 'Glow Radial',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                    'https://ui.test/r/glow-stack.json',
                    'https://ui.test/r/glow-geometry.json',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/glow/glow-radial.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';
import type { HTMLAttributes, ReactNode } from \'react\';
import { useEffect, useRef, useState } from \'react\';
import { cn } from \'@/lib/utils\';
import { useGlowStack } from \'@/registry/new-york/components/ui/glow/glow-stack\';
import { isCircleOverlappingRect, isPointInRect, toElementSpace } from \'@/registry/new-york/lib/glow-geometry\';

const BORDER_MASK = {
    padding: \'2px\',
    background: \'transparent\',
    mask: \'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box\',
    maskComposite: \'exclude\' as const,
    WebkitMask:
        \'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box\',
    WebkitMaskComposite: \'xor\' as const,
} as const;

interface GlowRadialProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    /** Colors for the radial gradient. First color is the center. */
    colors?: string | string[];
    /** Gradient radius in px. Default: 500 */
    size?: number;
    /** Border width in px. Default: 2 */
    borderWidth?: number;
    /** Render as any block element. Default: "div" */
    as?: \'div\' | \'section\' | \'article\' | \'main\' | \'header\' | \'footer\' | \'aside\';
}

export function GlowRadial({
    className,
    children,
    colors = \'var(--color-primary)\',
    size = 500,
    borderWidth = 3,
    as: Comp = \'div\',
    style,
    ...props
}: GlowRadialProps) {
    const ref = useRef<HTMLDivElement>(null);
    const glowStack = useGlowStack();
    const position = glowStack?.position ?? { x: -1000, y: -1000 };
    const radius = glowStack?.radius ?? 100;
    const [rect, setRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const updateRect = () => {
            setRect(ref.current?.getBoundingClientRect() ?? null);
        };

        updateRect();

        const handleUpdate = () => updateRect();
        window.addEventListener(\'resize\', handleUpdate, { passive: true });
        window.addEventListener(\'scroll\', handleUpdate, { passive: true });

        return () => {
            window.removeEventListener(\'resize\', handleUpdate);
            window.removeEventListener(\'scroll\', handleUpdate);
        };
    }, []);

    const near = rect ? isCircleOverlappingRect(position, radius, rect) : false;
    const over = rect ? isPointInRect(position, rect) : false;
    const ep = rect ? toElementSpace(position, rect) : { x: 0, y: 0 };

    const colorsArray = Array.isArray(colors)
        ? colors
        : [colors, \'transparent\'];
    const gradient = `radial-gradient(circle at ${ep.x}px ${ep.y}px, ${colorsArray.join(\', \')}, transparent ${size}px)`;
    const borderMask = { ...BORDER_MASK, padding: `${borderWidth}px` };

    return (
        <Comp
            ref={ref}
            className={cn(
                \'absolute inset-0 isolate z-10 rounded-[inherit]\',
                children ? \'pointer-events-auto\' : \'pointer-events-none\',
                className,
            )}
            style={style}
            {...props}
        >
            {/* Hard border glow */}
            <div
                aria-hidden
                className={cn(
                    \'pointer-events-none! absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300\',
                    near ? \'opacity-100\' : \'opacity-0\',
                )}
                style={{ ...borderMask, background: gradient }}
            />
            {/* Soft blur halo */}
            <div
                aria-hidden
                className={cn(
                    \'pointer-events-none! absolute inset-0 rounded-[inherit] blur-2xl transition-opacity duration-300\',
                    near ? \'opacity-10\' : \'opacity-0\',
                )}
                style={{ ...borderMask, background: gradient }}
            />
            {/* Subtle fill when directly over */}
            <div
                aria-hidden
                className={cn(
                    \'pointer-events-none! absolute inset-0 rounded-[inherit] transition-opacity duration-300\',
                    over ? \'opacity-5\' : \'opacity-0\',
                )}
                style={{ background: gradient }}
            />
            {children}
        </Comp>
    );
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'glow',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'glow',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'glow-stack',
                'type' => 'registry:ui',
                'title' => 'Glow Stack',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/glow/glow-stack.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';
import { createContext, useContext, useEffect, useRef, useState } from \'react\';
import type { ReactNode } from \'react\';

interface MouseGlowContext {
    position: { x: number; y: number };
    radius: number;
}
export const GlowContext = createContext<MouseGlowContext>({
    position: { x: -9999, y: -9999 },
    radius: 100,
});
export const useGlowStack = (): MouseGlowContext => {
    const context = useContext(GlowContext);

    return context ?? { position: { x: -9999, y: -9999 }, radius: 100 };
};

interface GlowStackProps {
    children: ReactNode;
    radius?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function GlowStack({
    children,
    radius = 100,
    className,
    style,
}: GlowStackProps) {
    const [pos, setPos] = useState({ x: -9999, y: -9999 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() =>
                setPos({ x: e.clientX, y: e.clientY }),
            );
        };

        window.addEventListener(\'mousemove\', onMove, { passive: true });

        return () => {
            window.removeEventListener(\'mousemove\', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <GlowContext.Provider value={{ position: pos, radius }}>
            <div className={className} style={style}>{children}</div>
        </GlowContext.Provider>
    );
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'glow',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'glow',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'input-slug',
                'type' => 'registry:ui',
                'title' => 'Input Slug',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'input',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/inputs/input-slug.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import * as React from \'react\';
import { Input } from \'@/components/ui/input\';

interface InputSlugProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    \'value\' | \'onChange\'
> {
    /**
     * The controlled display value (already-slugified string)
     */
    value?: string;
    /**
     * Callback when the slug value changes (debounced, fully cleaned)
     */
    onValueChange?: (value: string) => void;
    /**
     * Callback fires on every keystroke with the intermediate display value
     */
    onSlugChange?: (slug: string) => void;
    /**
     * Custom slug generation function
     */
    slugify?: (value: string) => string;
}

/**
 * Partial slugify — applied on every keystroke so the input feels live.
 * Allows a trailing dash while the user is still typing.
 */
function partialSlugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[\\s_]+/g, \'-\') // spaces / underscores → dash
        .replace(/[^\\w-]/g, \'\') // strip everything that isn\'t a word char or dash
        .replace(/-{2,}/g, \'-\') // collapse consecutive dashes
        .replace(/^-+/, \'\'); // strip leading dashes
}

/**
 * Final slugify — strips the trailing dash once the debounce fires.
 */
function defaultSlugify(value: string): string {
    return partialSlugify(value).replace(/-+$/, \'\');
}

const InputSlug = React.forwardRef<HTMLInputElement, InputSlugProps>(
    (
        {
            value: controlledValue,
            onValueChange,
            onSlugChange,
            slugify = defaultSlugify,
            ...props
        },
        ref,
    ) => {
        // Always drive the input from internal state so we can strip the trailing
        // dash on debounce regardless of whether the component is controlled.
        const [displayValue, setDisplayValue] = React.useState(
            controlledValue !== undefined ? controlledValue : \'\',
        );

        const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );
        // Keep the latest partial value so the debounce closure always reads it.
        const latestPartialRef = React.useRef(\'\');
        const isControlled = controlledValue !== undefined;

        // Sync external controlled value changes (e.g. form reset, programmatic update).
        // Skip if the incoming value matches what we already show — prevents the parent
        // echoing onValueChange back and overwriting our debounced cleanup.
        const prevControlledRef = React.useRef(controlledValue);
        React.useEffect(() => {
            if (isControlled && controlledValue !== prevControlledRef.current) {
                prevControlledRef.current = controlledValue;
                setDisplayValue(controlledValue ?? \'\');
            }
        }, [controlledValue, isControlled]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;

            // Partial transform: live, allows trailing dash mid-typing
            const partial = partialSlugify(raw);
            latestPartialRef.current = partial;

            // Always update display immediately so typing feels instant
            setDisplayValue(partial);

            // Fire onSlugChange on every keystroke with the intermediate value
            onSlugChange?.(partial);

            // Debounce the final cleanup (strip trailing dash)
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                const final = slugify(latestPartialRef.current);

                // Strip trailing dash in the input itself
                setDisplayValue(final);
                prevControlledRef.current = final;

                onValueChange?.(final);
            }, 1000);
        };

        // Clean up on unmount
        React.useEffect(() => {
            return () => {
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
            };
        }, []);

        return (
            <Input
                ref={ref}
                type="text"
                value={displayValue}
                onChange={handleChange}
                {...props}
            />
        );
    },
);

InputSlug.displayName = \'InputSlug\';

export { InputSlug, defaultSlugify, partialSlugify };
export type { InputSlugProps };
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'inputs',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'inputs',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'multi-select',
                'type' => 'registry:ui',
                'title' => 'Multi Select',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    'cmdk',
                    'lucide-react',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'badge',
                    'popover',
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/inputs/multi-select.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import { Command as CommandPrimitive } from \'cmdk\';
import { CheckIcon, ChevronsUpDownIcon, PlusIcon, XIcon } from \'lucide-react\';
import * as React from \'react\';

import { Badge } from \'@/components/ui/badge\';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from \'@/components/ui/popover\';
import { cn } from \'@/lib/utils\';

// Context for the MultiSelect compound component
interface MultiSelectContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    selected: string[];
    onSelect: (value: string) => void;
    onDeselect: (value: string) => void;
    search: string;
    setSearch: (search: string) => void;
    options: Map<string, string>;
    registerOption: (value: string, label: string) => void;
    onCreateOption?: (value: string) => void;
    allowCreate: boolean;
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(
    null,
);

function useMultiSelect() {
    const context = React.useContext(MultiSelectContext);

    if (!context) {
        throw new Error(
            \'MultiSelect components must be used within a MultiSelect\',
        );
    }

    return context;
}

// Root component
interface MultiSelectProps {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    onCreateOption?: (value: string) => void;
    allowCreate?: boolean;
    children: React.ReactNode;
}

function MultiSelect({
    value,
    defaultValue = [],
    onValueChange,
    onCreateOption,
    allowCreate = true,
    children,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(\'\');
    const [internalSelected, setInternalSelected] =
        React.useState<string[]>(defaultValue);
    const [options, setOptions] = React.useState<Map<string, string>>(
        new Map(),
    );

    const selected = value ?? internalSelected;

    const registerOption = React.useCallback(
        (optionValue: string, label: string) => {
            setOptions((prev) => {
                const next = new Map(prev);
                next.set(optionValue, label);

                return next;
            });
        },
        [],
    );

    const handleSelect = React.useCallback(
        (itemValue: string) => {
            const newSelected = selected.includes(itemValue)
                ? selected.filter((v) => v !== itemValue)
                : [...selected, itemValue];

            if (value === undefined) {
                setInternalSelected(newSelected);
            }

            onValueChange?.(newSelected);
        },
        [selected, value, onValueChange],
    );

    const handleDeselect = React.useCallback(
        (itemValue: string) => {
            const newSelected = selected.filter((v) => v !== itemValue);

            if (value === undefined) {
                setInternalSelected(newSelected);
            }

            onValueChange?.(newSelected);
        },
        [selected, value, onValueChange],
    );

    const handleCreateOption = React.useCallback(
        (newValue: string) => {
            if (onCreateOption) {
                onCreateOption(newValue);
            }

            // Select the new option
            const newSelected = [...selected, newValue];

            if (value === undefined) {
                setInternalSelected(newSelected);
            }

            onValueChange?.(newSelected);
            setSearch(\'\');
        },
        [selected, value, onValueChange, onCreateOption],
    );

    return (
        <MultiSelectContext.Provider
            value={{
                open,
                setOpen,
                selected,
                onSelect: handleSelect,
                onDeselect: handleDeselect,
                search,
                setSearch,
                options,
                registerOption,
                onCreateOption: handleCreateOption,
                allowCreate,
            }}
        >
            <Popover open={open} onOpenChange={setOpen}>
                {children}
            </Popover>
        </MultiSelectContext.Provider>
    );
}

// Trigger component
type MultiSelectTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

function MultiSelectTrigger({
    className,
    children,
    ...props
}: MultiSelectTriggerProps) {
    const { selected, options, onDeselect } = useMultiSelect();

    return (
        <PopoverTrigger asChild {...props}>
            <button
                type="button"
                role="combobox"
                data-slot="multi-select-trigger"
                className={cn(
                    \'flex min-h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50\',
                    className,
                )}
            >
                <div className="flex flex-1 flex-wrap items-center gap-1.5">
                    {selected.length > 0
                        ? selected.map((value) => (
                              <Badge
                                  key={value}
                                  variant="secondary"
                                  className="gap-1 pr-1"
                              >
                                  {options.get(value) || value}
                                  <button
                                      type="button"
                                      className="rounded-sm p-0.5 hover:bg-muted"
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          onDeselect(value);
                                      }}
                                  >
                                      <XIcon className="size-3" />
                                      <span className="sr-only">
                                          Remove {options.get(value) || value}
                                      </span>
                                  </button>
                              </Badge>
                          ))
                        : children}
                </div>
                <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
            </button>
        </PopoverTrigger>
    );
}

// Value/placeholder component
interface MultiSelectValueProps {
    placeholder?: string;
}

function MultiSelectValue({ placeholder }: MultiSelectValueProps) {
    const { selected } = useMultiSelect();

    if (selected.length > 0) {
        return null;
    }

    return (
        <span className="pointer-events-none text-muted-foreground">
            {placeholder}
        </span>
    );
}

// Content component
type MultiSelectContentProps = React.ComponentProps<typeof PopoverContent>;

function MultiSelectContent({
    className,
    children,
    ...props
}: MultiSelectContentProps) {
    const {
        search,
        setSearch,
        selected,
        options,
        onCreateOption,
        allowCreate,
    } = useMultiSelect();

    // Check if the current search matches any existing option
    const searchLower = search.toLowerCase().trim();
    const hasExactMatch = React.useMemo(() => {
        for (const [value, label] of options) {
            if (
                value.toLowerCase() === searchLower ||
                label.toLowerCase() === searchLower
            ) {
                return true;
            }
        }

        return false;
    }, [options, searchLower]);

    const showCreateOption =
        allowCreate &&
        search.trim() !== \'\' &&
        !hasExactMatch &&
        !selected.includes(search.trim());

    return (
        <PopoverContent
            data-slot="multi-select-content"
            className={cn(\'w-(--radix-popover-trigger-width) p-0\', className)}
            align="start"
            {...props}
        >
            <CommandPrimitive
                className="flex h-full w-full flex-col overflow-hidden rounded-md"
                shouldFilter={true}
            >
                <div className="flex items-center border-b px-3">
                    <CommandPrimitive.Input
                        data-slot="multi-select-input"
                        placeholder="Search or create..."
                        value={search}
                        onValueChange={setSearch}
                        className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <CommandPrimitive.List className="max-h-50 overflow-y-auto p-1">
                    <CommandPrimitive.Empty className="py-6 text-center text-sm">
                        No options found.
                    </CommandPrimitive.Empty>
                    {children}
                    {showCreateOption && (
                        <CommandPrimitive.Item
                            data-slot="multi-select-create"
                            value={`create-${search}`}
                            onSelect={() => onCreateOption?.(search.trim())}
                            className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                        >
                            <PlusIcon className="size-4 shrink-0" />
                            <span>Create &quot;{search.trim()}&quot;</span>
                        </CommandPrimitive.Item>
                    )}
                </CommandPrimitive.List>
            </CommandPrimitive>
        </PopoverContent>
    );
}

// Group component
type MultiSelectGroupProps = React.ComponentProps<
    typeof CommandPrimitive.Group
>;

function MultiSelectGroup({ className, ...props }: MultiSelectGroupProps) {
    return (
        <CommandPrimitive.Group
            data-slot="multi-select-group"
            className={cn(
                \'overflow-hidden text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground\',
                className,
            )}
            {...props}
        />
    );
}

// Item component
interface MultiSelectItemProps extends Omit<
    React.ComponentProps<typeof CommandPrimitive.Item>,
    \'onSelect\'
> {
    value: string;
    children: React.ReactNode;
}

function MultiSelectItem({
    value,
    children,
    className,
    ...props
}: MultiSelectItemProps) {
    const { selected, onSelect, registerOption } = useMultiSelect();
    const isSelected = selected.includes(value);

    // Register this option
    React.useEffect(() => {
        const label = typeof children === \'string\' ? children : value;
        registerOption(value, label);
    }, [value, children, registerOption]);

    return (
        <CommandPrimitive.Item
            data-slot="multi-select-item"
            value={value}
            onSelect={() => onSelect(value)}
            className={cn(
                \'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground\',
                className,
            )}
            {...props}
        >
            <div
                className={cn(
                    \'flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary\',
                    isSelected
                        ? \'bg-primary text-primary-foreground\'
                        : \'opacity-50\',
                )}
            >
                {isSelected && <CheckIcon className="size-3" />}
            </div>
            <span>{children}</span>
        </CommandPrimitive.Item>
    );
}

export {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
};
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'inputs',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'inputs',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'animated-tabs',
                'type' => 'registry:ui',
                'title' => 'Animated Tabs',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    'motion',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/tabs/animated-tabs.tsx',
                        'type' => 'registry:ui',
                        'content' => '\'use client\';

import { LayoutGroup, motion } from \'motion/react\';
import type { HTMLAttributes, ReactNode } from \'react\';
import { useId, useState } from \'react\';

import { cn } from \'@/lib/utils\';

export type AnimatedTabsProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    \'onChange\'
> & {
    tabs: {
        id: string;
        label: ReactNode;
        content?: ReactNode;
    }[];
    value?: string;
    defaultValue?: string;
    onChange?: (tabId: string) => void;
    tabsClassName?: string;
    tabClassName?: string;
    activeTabClassName?: string;
    inactiveTabClassName?: string;
    indicatorClassName?: string;
    contentClassName?: string;
    showContent?: boolean;
};

export function AnimatedTabs({
    tabs,
    value,
    defaultValue,
    onChange,
    className,
    tabsClassName,
    tabClassName,
    activeTabClassName,
    inactiveTabClassName,
    indicatorClassName,
    contentClassName,
    showContent = false,
    ...props
}: AnimatedTabsProps) {
    const id = useId();

    const resolveIndex = (tabId?: string) => {
        if (!tabId) {
            return 0;
        }

        const idx = tabs.findIndex((t) => t.id === tabId);

        return idx >= 0 ? idx : 0;
    };

    const [activeIndex, setActiveIndex] = useState(() =>
        resolveIndex(defaultValue),
    );

    const isControlled = value !== undefined;
    const activeTabIndex = isControlled ? resolveIndex(value) : activeIndex;
    const activeTab = tabs[activeTabIndex] ?? tabs[0];

    const handleChange = (index: number) => {
        if (!isControlled) {
            setActiveIndex(index);
        }

        onChange?.(tabs[index].id);
    };

    return (
        <div className={cn(\'w-full\', className)} {...props}>
            <LayoutGroup id={id}>
                <div
                    role="tablist"
                    className={cn(
                        \'flex items-center gap-1 rounded-md border border-border bg-background p-1\',
                        tabsClassName,
                    )}
                >
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTabIndex === index}
                            aria-controls={`${id}-panel-${tab.id}`}
                            id={`${id}-tab-${tab.id}`}
                            onClick={() => handleChange(index)}
                            className={cn(
                                \'relative rounded-sm px-4 py-2 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none\',
                                tabClassName,
                                activeTabIndex === index
                                    ? cn(\'text-foreground\', activeTabClassName)
                                    : cn(
                                          \'text-muted-foreground hover:text-foreground\',
                                          inactiveTabClassName,
                                      ),
                            )}
                        >
                            {activeTabIndex === index && (
                                <motion.div
                                    layoutId="indicator"
                                    className={cn(
                                        \'absolute inset-0 rounded-sm bg-muted\',
                                        indicatorClassName,
                                    )}
                                    transition={{
                                        type: \'spring\',
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </LayoutGroup>

            {showContent && activeTab?.content && (
                <div
                    role="tabpanel"
                    id={`${id}-panel-${activeTab.id}`}
                    aria-labelledby={`${id}-tab-${activeTab.id}`}
                    className={cn(\'mt-4\', contentClassName)}
                >
                    <motion.div
                        key={activeTab.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab.content}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'tabs',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'tabs',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'waves-three',
                'type' => 'registry:ui',
                'title' => 'Waves Three',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [
                    'three',
                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'utils',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/components/ui/threejs/waves-three.tsx',
                        'type' => 'registry:ui',
                        'content' => '/* eslint-disable */
`use client`;

import { useEffect, useRef, useState } from \'react\';
import * as THREE from \'three\';
import { cn } from \'@/lib/utils\';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WaveStyle =
    | \'wireframe\' // triangulated mesh (has diagonals — legacy)
    | \'grid\' // axis-aligned squares, no diagonals
    | \'dots\' // round filled circles at every vertex (shader-based)
    | \'dots-wave\' // round dots that scale in size with Z height
    | \'crosses\' // small + at every vertex
    | \'diagonal-left\' // parallel lines leaning left  (\\\\\\)
    | \'diagonal-right\' // parallel lines leaning right (///)
    | \'zigzag\' // alternating chevron rows
    | \'hexagons\' // hexagonal cell grid
    | \'dashes\' // dashed horizontal + vertical lines (gaps between cells)
    | \'contour\' // topographic iso-lines drawn at fixed Z thresholds
    | \'solid\'; // shaded solid surface with lighting

export interface WavesThreeProps {
    className?: string;

    /**
     * Visual style of the wave. See WaveStyle for all options.
     * Default: \'grid\'
     */
    style?: WaveStyle;

    /**
     * Which lines to draw — applies to \'grid\' and \'dashes\' styles.
     *  - \'both\'       — horizontal + vertical (default)
     *  - \'horizontal\' — only lines running left→right
     *  - \'vertical\'   — only lines running top→bottom
     */
    lines?: \'both\' | \'horizontal\' | \'vertical\';

    /**
     * CSS/hex color strings blended left→right across the mesh.
     * Minimum 2. Auto-detects dark/light mode if omitted.
     */
    colors?: string[];

    /** Camera XYZ position. Default: { x:0, y:0, z:10 } */
    cameraPosition?: { x: number; y: number; z: number };

    /** Plane width in world units. Default: 80 */
    planeWidth?: number;
    /** Plane height in world units. Default: 40 */
    planeHeight?: number;

    /** Grid columns — higher = denser. Default: 60 */
    segmentsX?: number;
    /** Grid rows. Default: 30 */
    segmentsY?: number;

    /** Animation speed multiplier. Default: 1 */
    speed?: number;
    /** Wave peak height. Default: 1.5 */
    amplitude?: number;
    /** Wave spatial density — lower = wider. Default: 0.3 */
    frequency?: number;
    /** Global opacity 0–1. Default: 0.6 */
    opacity?: number;
    /** Pause animation. Default: false */
    paused?: boolean;

    /** Mouse influence on wave phase. Default: 2 */
    mouseInfluence?: number;
    /** Mouse influence on mesh tilt. Default: 0.1 */
    mouseRotation?: number;

    /**
     * Dot radius in screen pixels — \'dots\' and \'dots-wave\' styles.
     * Dots are perfectly round via a GLSL discard shader. Default: 3
     */
    dotSize?: number;

    /**
     * For \'dots-wave\': minimum dot size at wave valleys. Default: 1
     */
    dotSizeMin?: number;

    /** Cross arm half-length in world units — \'crosses\' style. Default: 0.3 */
    crossSize?: number;

    /**
     * Dash fill ratio 0–1 — \'dashes\' style.
     * 0.5 = half line, half gap. Default: 0.5
     */
    dashRatio?: number;

    /**
     * Number of contour threshold levels — \'contour\' style. Default: 6
     */
    contourLevels?: number;

    /** High-DPI pixel ratio cap. Default: 2 */
    maxPixelRatio?: number;

    /** Called once the renderer and first frame are ready */
    onReady?: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_LIGHT: string[] = [\'#525252\', \'#525252\'];
const DEFAULT_DARK: string[] = [\'#444444\', \'#757575\'];

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

function lerpPalette(t: number, stops: THREE.Color[]): THREE.Color {
    const scaled = Math.max(0, Math.min(1, t)) * (stops.length - 1);
    const lo = Math.floor(scaled);
    const hi = Math.min(lo + 1, stops.length - 1);

    return stops[lo].clone().lerp(stops[hi], scaled - lo);
}

function makeColorBuffer(count: number, stops: THREE.Color[]): Float32Array {
    const buf = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const c = lerpPalette(i / Math.max(count - 1, 1), stops);
        buf[i * 3] = c.r;
        buf[i * 3 + 1] = c.g;
        buf[i * 3 + 2] = c.b;
    }

    return buf;
}

// ---------------------------------------------------------------------------
// Shared vertex-grid builder
// Returns a flat XY grid of (cols+1)×(rows+1) vertices, Z=0.
// ---------------------------------------------------------------------------

function makeVertexGrid(
    cols: number,
    rows: number,
    w: number,
    h: number,
): Float32Array {
    const cx = cols + 1;
    const ry = rows + 1;
    const pos = new Float32Array(cx * ry * 3);
    const sx = w / cols;
    const sy = h / rows;

    for (let r = 0; r < ry; r++) {
        for (let c = 0; c < cx; c++) {
            const i = (r * cx + c) * 3;
            pos[i] = -w / 2 + c * sx;
            pos[i + 1] = -h / 2 + r * sy;
            pos[i + 2] = 0;
        }
    }

    return pos;
}

// ---------------------------------------------------------------------------
// Wave Z calculator — used in every style\'s animation loop
// ---------------------------------------------------------------------------

function calcZ(
    x: number,
    y: number,
    time: number,
    freq: number,
    amp: number,
    mx: number,
    my: number,
    mi: number,
): number {
    return (
        Math.sin(x * freq + time * 2 + mx * mi) * amp +
        Math.cos(y * freq + time * 1.5 + my * mi)
    );
}

// ---------------------------------------------------------------------------
// Geometry builders
// ---------------------------------------------------------------------------

// GRID — axis-aligned lines only, no diagonals
function buildGrid(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
    lines: \'both\' | \'horizontal\' | \'vertical\',
): { geo: THREE.BufferGeometry; pos: Float32Array } {
    const cx = cols + 1;
    const ry = rows + 1;
    const total = cx * ry;
    const pos = makeVertexGrid(cols, rows, w, h);

    const hSegs = lines !== \'vertical\' ? ry * cols : 0;
    const vSegs = lines !== \'horizontal\' ? cx * rows : 0;
    const idx = new Uint32Array((hSegs + vSegs) * 2);
    let ptr = 0;

    if (lines !== \'vertical\') {
        for (let r = 0; r < ry; r++) {
            for (let c = 0; c < cols; c++) {
                idx[ptr++] = r * cx + c;
                idx[ptr++] = r * cx + c + 1;
            }
        }
    }

    if (lines !== \'horizontal\') {
        for (let c = 0; c < cx; c++) {
            for (let r = 0; r < rows; r++) {
                idx[ptr++] = r * cx + c;
                idx[ptr++] = (r + 1) * cx + c;
            }
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(\'position\', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(makeColorBuffer(total, stops), 3),
    );
    geo.setIndex(new THREE.BufferAttribute(idx, 1));

    return { geo, pos };
}

// DOTS — round circles via ShaderMaterial + gl_PointCoord discard
function buildDots(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
): { geo: THREE.BufferGeometry; pos: Float32Array } {
    const total = (cols + 1) * (rows + 1);
    const pos = makeVertexGrid(cols, rows, w, h);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(\'position\', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(makeColorBuffer(total, stops), 3),
    );

    return { geo, pos };
}

// Round-dot ShaderMaterial — discards fragments outside the circle
function makeRoundDotMaterial(
    size: number,
    opacity: number,
): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: size },
            uOpacity: { value: opacity },
        },
        vertexShader: /* glsl */ `
            attribute vec3 color;
            varying   vec3 vColor;
            uniform   float uSize;
            void main() {
                vColor = color;
                vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = uSize;
                gl_Position  = projectionMatrix * mvPos;
            }
        `,
        fragmentShader: /* glsl */ `
            varying vec3  vColor;
            uniform float uOpacity;
            void main() {
                // gl_PointCoord is 0..1 across the point sprite
                vec2  uv   = gl_PointCoord - vec2(0.5);
                float dist = length(uv);
                if (dist > 0.5) discard;          // outside circle → transparent
                // soft anti-alias ring at the edge
                float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha * uOpacity);
            }
        `,
        transparent: true,
        depthWrite: false,
    });
}

// DOTS-WAVE — same as dots but size is modulated by Z in the vertex shader
function makeRoundDotWaveMaterial(
    sizeMin: number,
    sizeMax: number,
    amplitude: number,
    opacity: number,
): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        uniforms: {
            uSizeMin: { value: sizeMin },
            uSizeMax: { value: sizeMax },
            uAmp: { value: amplitude },
            uOpacity: { value: opacity },
        },
        vertexShader: /* glsl */ `
            attribute vec3  color;
            varying   vec3  vColor;
            uniform   float uSizeMin;
            uniform   float uSizeMax;
            uniform   float uAmp;
            void main() {
                vColor = color;
                // Map Z (-amp..+amp) → (sizeMin..sizeMax)
                float t       = clamp((position.z + uAmp) / (2.0 * uAmp), 0.0, 1.0);
                gl_PointSize  = mix(uSizeMin, uSizeMax, t);
                gl_Position   = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: /* glsl */ `
            varying vec3  vColor;
            uniform float uOpacity;
            void main() {
                vec2  uv   = gl_PointCoord - vec2(0.5);
                float dist = length(uv);
                if (dist > 0.5) discard;
                float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha * uOpacity);
            }
        `,
        transparent: true,
        depthWrite: false,
    });
}

// CROSSES
function buildCrosses(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
    armLen: number,
): { geo: THREE.BufferGeometry; centers: Float32Array; pos: Float32Array } {
    const cx = cols + 1;
    const ry = rows + 1;
    const total = cx * ry;
    const half = armLen / 2;
    const sx = w / cols;
    const sy = h / rows;

    const centers = new Float32Array(total * 3);
    const pos = new Float32Array(total * 4 * 3);
    const col = new Float32Array(total * 4 * 3);

    for (let r = 0; r < ry; r++) {
        for (let c = 0; c < cx; c++) {
            const vi = r * cx + c;
            const bx = -w / 2 + c * sx;
            const by = -h / 2 + r * sy;
            centers[vi * 3] = bx;
            centers[vi * 3 + 1] = by;
            centers[vi * 3 + 2] = 0;
            const b = vi * 12;
            pos[b] = bx - half;
            pos[b + 1] = by;
            pos[b + 2] = 0;
            pos[b + 3] = bx + half;
            pos[b + 4] = by;
            pos[b + 5] = 0;
            pos[b + 6] = bx;
            pos[b + 7] = by - half;
            pos[b + 8] = 0;
            pos[b + 9] = bx;
            pos[b + 10] = by + half;
            pos[b + 11] = 0;
            const clr = lerpPalette(vi / Math.max(total - 1, 1), stops);

            for (let p = 0; p < 4; p++) {
                col[b + p * 3] = clr.r;
                col[b + p * 3 + 1] = clr.g;
                col[b + p * 3 + 2] = clr.b;
            }
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(\'position\', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(\'color\', new THREE.BufferAttribute(col, 3));

    return { geo, centers, pos };
}

// DIAGONAL-LEFT (\\\\\\) or DIAGONAL-RIGHT (///)
function buildDiagonal(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
    dir: \'left\' | \'right\',
): { geo: THREE.BufferGeometry; pos: Float32Array } {
    const cx = cols + 1;
    const ry = rows + 1;
    const pos = makeVertexGrid(cols, rows, w, h);

    // Each diagonal goes from (r,c) → (r+1,c+1) for right, (r,c+1) → (r+1,c) for left
    const idx = new Uint32Array(cols * rows * 2);
    let ptr = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (dir === \'right\') {
                idx[ptr++] = r * cx + c;
                idx[ptr++] = (r + 1) * cx + c + 1;
            } else {
                idx[ptr++] = r * cx + c + 1;
                idx[ptr++] = (r + 1) * cx + c;
            }
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(\'position\', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(makeColorBuffer(cx * ry, stops), 3),
    );
    geo.setIndex(new THREE.BufferAttribute(idx, 1));

    return { geo, pos };
}

// ZIGZAG — alternating row direction creates chevrons
function buildZigzag(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
): { geo: THREE.BufferGeometry; pos: Float32Array } {
    const cx = cols + 1;
    const ry = rows + 1;
    const pos = makeVertexGrid(cols, rows, w, h);

    // Per row: connect across the row as a zigzag (top vertices to bottom vertices alternating)
    const segCount = rows * cols * 2; // 2 segments per cell (v-shape)
    const idx = new Uint32Array(segCount * 2);
    let ptr = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const even = r % 2 === 0;

            // Each cell: draw one diagonal and horizontal to form chevron
            if (even) {
                idx[ptr++] = r * cx + c;
                idx[ptr++] = (r + 1) * cx + c + 1;
                idx[ptr++] = r * cx + c + 1;
                idx[ptr++] = (r + 1) * cx + c + 1;
            } else {
                idx[ptr++] = r * cx + c + 1;
                idx[ptr++] = (r + 1) * cx + c;
                idx[ptr++] = r * cx + c;
                idx[ptr++] = (r + 1) * cx + c;
            }
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(\'position\', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(makeColorBuffer(cx * ry, stops), 3),
    );
    geo.setIndex(new THREE.BufferAttribute(idx, 1));

    return { geo, pos };
}

// HEXAGONS — flat-top hexagonal cells
function buildHexagons(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
): { geo: THREE.BufferGeometry; pos: Float32Array; hexCenters: Float32Array } {
    // Each hexagon = 6 line segments = 12 endpoints (no shared verts → clean vertex colors)
    const hexCols = cols;
    const hexRows = rows;
    const hexCount = hexCols * hexRows;
    const hexR = w / hexCols / 2; // circumradius
    const hexH = hexR * Math.sqrt(3); // flat-top hex height

    const pos = new Float32Array(hexCount * 12 * 3); // 6 edges × 2 pts × 3 floats
    const col = new Float32Array(hexCount * 12 * 3);
    const centers = new Float32Array(hexCount * 3);

    let hi = 0; // hex index

    for (let row = 0; row < hexRows; row++) {
        for (let col2 = 0; col2 < hexCols; col2++) {
            const offset = col2 % 2 === 0 ? 0 : hexH * 0.5;
            const cx2 = -w / 2 + hexR + col2 * hexR * 1.5;
            const cy2 = -h / 2 + hexH * 0.5 + row * hexH + offset;

            centers[hi * 3] = cx2;
            centers[hi * 3 + 1] = cy2;
            centers[hi * 3 + 2] = 0;

            const t = hi / Math.max(hexCount - 1, 1);
            const clr = lerpPalette(t, stops);

            // 6 vertices of flat-top hexagon
            const verts: [number, number][] = [];

            for (let k = 0; k < 6; k++) {
                const angle = (Math.PI / 3) * k; // 0°,60°,120°…
                verts.push([
                    cx2 + hexR * Math.cos(angle),
                    cy2 + hexR * Math.sin(angle),
                ]);
            }

            // 6 edges — each as a line segment pair
            for (let k = 0; k < 6; k++) {
                const a = verts[k];
                const b = verts[(k + 1) % 6];
                const base = (hi * 6 + k) * 6; // 2 pts × 3 floats per edge
                pos[base] = a[0];
                pos[base + 1] = a[1];
                pos[base + 2] = 0;
                pos[base + 3] = b[0];
                pos[base + 4] = b[1];
                pos[base + 5] = 0;

                for (let p = 0; p < 2; p++) {
                    col[base + p * 3] = clr.r;
                    col[base + p * 3 + 1] = clr.g;
                    col[base + p * 3 + 2] = clr.b;
                }
            }

            hi++;
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
        \'position\',
        new THREE.BufferAttribute(pos.slice(0, hi * 6 * 6), 3),
    );
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(col.slice(0, hi * 6 * 6), 3),
    );

    return { geo, pos, hexCenters: centers.slice(0, hi * 3) };
}

// DASHES — like grid but with a gap in the middle of each segment
function buildDashes(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
    lines: \'both\' | \'horizontal\' | \'vertical\',
    dashRatio: number,
): { geo: THREE.BufferGeometry; pos: Float32Array; basePos: Float32Array } {
    const cx = cols + 1;
    const ry = rows + 1;
    const sx = w / cols;
    const sy = h / rows;
    const half = dashRatio / 2;

    // Each dash = 2 endpoints, no shared verts
    const hCount = lines !== \'vertical\' ? ry * cols : 0;
    const vCount = lines !== \'horizontal\' ? cx * rows : 0;
    const total = (hCount + vCount) * 2;

    const pos = new Float32Array(total * 3);
    const basePos = new Float32Array(total * 3); // stored XY, updated Z each frame
    const col = new Float32Array(total * 3);

    let p = 0;

    const push = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        ci: number,
    ) => {
        const clr = ci / Math.max(cx * ry - 1, 1);
        const c = lerpPalette(clr, stops);

        for (let k = 0; k < 2; k++) {
            const [px2, py] = k === 0 ? [x1, y1] : [x2, y2];
            pos[p * 3] = px2;
            pos[p * 3 + 1] = py;
            pos[p * 3 + 2] = 0;
            basePos[p * 3] = px2;
            basePos[p * 3 + 1] = py;
            basePos[p * 3 + 2] = 0;
            col[p * 3] = c.r;
            col[p * 3 + 1] = c.g;
            col[p * 3 + 2] = c.b;
            p++;
        }
    };

    if (lines !== \'vertical\') {
        for (let r = 0; r < ry; r++) {
            for (let c2 = 0; c2 < cols; c2++) {
                const x1 = -w / 2 + c2 * sx;
                const x2 = x1 + sx;
                const y = -h / 2 + r * sy;
                push(x1 + sx * half, y, x2 - sx * half, y, r * cx + c2);
            }
        }
    }

    if (lines !== \'horizontal\') {
        for (let c2 = 0; c2 < cx; c2++) {
            for (let r = 0; r < rows; r++) {
                const y1 = -h / 2 + r * sy;
                const y2 = y1 + sy;
                const x = -w / 2 + c2 * sx;
                push(x, y1 + sy * half, x, y2 - sy * half, r * cx + c2);
            }
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(\'position\', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(\'color\', new THREE.BufferAttribute(col, 3));

    return { geo, pos, basePos };
}

// CONTOUR — draws horizontal lines only at fixed Z thresholds (resampled each frame)
// We build a flat placeholder geo; indices are rebuilt each frame as Z changes.
// For performance we use a fixed vertex pool and swap positions.
function buildContourPlaceholder(
    cols: number,
    rows: number,
    w: number,
    h: number,
    _stops: THREE.Color[],
    _levels: number,
): { geo: THREE.BufferGeometry; vtxGrid: Float32Array } {
    // Max line segments = rows * cols * 4 (at most 4 crossing per cell edge), generous upper bound
    const maxSegs = cols * rows * 4 * 2;
    const pos = new Float32Array(maxSegs * 3);
    const col = new Float32Array(maxSegs * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
        \'position\',
        new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geo.setDrawRange(0, 0);
    const vtxGrid = makeVertexGrid(cols, rows, w, h);

    return { geo, vtxGrid };
}

// SOLID — PlaneGeometry + MeshPhongMaterial with lighting
function buildSolid(
    cols: number,
    rows: number,
    w: number,
    h: number,
    stops: THREE.Color[],
): { geo: THREE.PlaneGeometry; pos: Float32Array } {
    const geo = new THREE.PlaneGeometry(w, h, cols, rows);
    const count = geo.attributes.position.count;
    geo.setAttribute(
        \'color\',
        new THREE.BufferAttribute(makeColorBuffer(count, stops), 3),
    );
    const pos = geo.attributes.position.array as Float32Array;

    return { geo, pos };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const WavesThree = ({
    className,
    style = \'grid\',
    lines = \'both\',
    colors,
    cameraPosition = { x: 0, y: 0, z: 10 },
    planeWidth = 80,
    planeHeight = 40,
    segmentsX = 60,
    segmentsY = 30,
    speed = 1,
    amplitude = 1.5,
    frequency = 0.3,
    opacity = 0.6,
    paused = false,
    mouseInfluence = 2,
    mouseRotation = 0.1,
    dotSize = 3,
    dotSizeMin = 1,
    crossSize = 0.3,
    dashRatio = 0.5,
    contourLevels = 6,
    maxPixelRatio = 2,
    onReady,
}: WavesThreeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    // Hot-update refs — no scene restart needed for these
    const mouseRef = useRef({ x: 0, y: 0 });
    const speedRef = useRef(speed);
    const pausedRef = useRef(paused);
    const amplitudeRef = useRef(amplitude);
    const frequencyRef = useRef(frequency);
    const mouseInfluenceRef = useRef(mouseInfluence);
    const mouseRotationRef = useRef(mouseRotation);
    const opacityRef = useRef(opacity);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);
    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);
    useEffect(() => {
        amplitudeRef.current = amplitude;
    }, [amplitude]);
    useEffect(() => {
        frequencyRef.current = frequency;
    }, [frequency]);
    useEffect(() => {
        mouseInfluenceRef.current = mouseInfluence;
    }, [mouseInfluence]);
    useEffect(() => {
        mouseRotationRef.current = mouseRotation;
    }, [mouseRotation]);
    useEffect(() => {
        opacityRef.current = opacity;
    }, [opacity]);

    // Container size
    useEffect(() => {
        const el = containerRef.current;

        if (!el) {
            return;
        }

        const ro = new ResizeObserver((entries) => {
            const r = entries[0].contentRect;
            setSize({ width: r.width, height: r.height });
        });
        ro.observe(el);

        return () => ro.disconnect();
    }, []);

    // Main scene
    useEffect(() => {
        const el = containerRef.current;

        if (!el || size.width === 0 || size.height === 0) {
            return;
        }

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            size.width / size.height,
            0.1,
            1000,
        );
        camera.position.set(
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
        );
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, maxPixelRatio),
        );
        renderer.setSize(size.width, size.height);
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);

        // Colors
        const isDark = document.documentElement.classList.contains(\'dark\');
        const rawColors = colors ?? (isDark ? DEFAULT_DARK : DEFAULT_LIGHT);
        const colorStops = rawColors.map((c) => new THREE.Color(c));

        // Per-style setup
        let object3d: THREE.Object3D;
        let geo: THREE.BufferGeometry;
        let mat: THREE.Material;
        let posBuf: Float32Array | null = null;
        let baseBuf: Float32Array | null = null; // for dashes: stores XY reference
        let posAttr: THREE.BufferAttribute | null = null;
        let crossCenters: Float32Array | null = null;
        let hexCentersBuf: Float32Array | null = null;
        let hexPosBuf: Float32Array | null = null;
        let contourVtxGrid: Float32Array | null = null;
        const extraDispose: THREE.Material[] = [];
        let lights: THREE.Light[] = [];

        const cols = segmentsX;
        const rows = segmentsY;

        if (style === \'wireframe\') {
            const g = new THREE.PlaneGeometry(
                planeWidth,
                planeHeight,
                cols,
                rows,
            );
            g.setAttribute(
                \'color\',
                new THREE.BufferAttribute(
                    makeColorBuffer(g.attributes.position.count, colorStops),
                    3,
                ),
            );
            const m = new THREE.MeshBasicMaterial({
                vertexColors: true,
                wireframe: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.Mesh(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = posAttr.array as Float32Array;
            geo = g;
            mat = m;
        } else if (style === \'grid\') {
            const { geo: g, pos } = buildGrid(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
                lines,
            );
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            geo = g;
            mat = m;
        } else if (style === \'dots\') {
            const { geo: g, pos } = buildDots(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
            );
            const m = makeRoundDotMaterial(dotSize * 2, opacityRef.current);
            object3d = new THREE.Points(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            geo = g;
            mat = m;
        } else if (style === \'dots-wave\') {
            const { geo: g, pos } = buildDots(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
            );
            const m = makeRoundDotWaveMaterial(
                dotSizeMin * 2,
                dotSize * 2,
                amplitude,
                opacityRef.current,
            );
            object3d = new THREE.Points(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            geo = g;
            mat = m;
        } else if (style === \'crosses\') {
            const {
                geo: g,
                centers,
                pos,
            } = buildCrosses(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
                crossSize,
            );
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            crossCenters = centers;
            geo = g;
            mat = m;
        } else if (style === \'diagonal-left\' || style === \'diagonal-right\') {
            const dir = style === \'diagonal-left\' ? \'left\' : \'right\';
            const { geo: g, pos } = buildDiagonal(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
                dir,
            );
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            geo = g;
            mat = m;
        } else if (style === \'zigzag\') {
            const { geo: g, pos } = buildZigzag(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
            );
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            geo = g;
            mat = m;
        } else if (style === \'hexagons\') {
            const {
                geo: g,
                pos,
                hexCenters,
            } = buildHexagons(cols, rows, planeWidth, planeHeight, colorStops);
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            hexPosBuf = pos;
            hexCentersBuf = hexCenters;
            geo = g;
            mat = m;
        } else if (style === \'dashes\') {
            const {
                geo: g,
                pos,
                basePos,
            } = buildDashes(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
                lines,
                dashRatio,
            );
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            baseBuf = basePos;
            geo = g;
            mat = m;
        } else if (style === \'contour\') {
            const { geo: g, vtxGrid } = buildContourPlaceholder(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
                contourLevels,
            );
            const m = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
            });
            object3d = new THREE.LineSegments(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            contourVtxGrid = vtxGrid;
            geo = g;
            mat = m;
        } else {
            // solid
            const { geo: g, pos } = buildSolid(
                cols,
                rows,
                planeWidth,
                planeHeight,
                colorStops,
            );
            const m = new THREE.MeshPhongMaterial({
                vertexColors: true,
                transparent: true,
                opacity: opacityRef.current,
                side: THREE.DoubleSide,
                shininess: 60,
            });
            const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
            keyLight.position.set(5, 10, 7);
            const fillLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(keyLight, fillLight);
            lights = [keyLight, fillLight];
            object3d = new THREE.Mesh(g, m);
            posAttr = g.attributes.position as THREE.BufferAttribute;
            posBuf = pos;
            geo = g;
            mat = m;
        }

        scene.add(object3d);

        // Event listeners
        const handleResize = () => {
            camera.aspect = el.clientWidth / el.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(el.clientWidth, el.clientHeight);
        };
        const handleMouse = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener(\'resize\', handleResize);
        window.addEventListener(\'mousemove\', handleMouse);

        // Contour iso-line builder (marching squares, edge-interpolated)
        const rebuildContour = (
            vtxGrid: Float32Array,
            zGrid: Float32Array,
            thresholds: number[],
            posAttrC: THREE.BufferAttribute,
            colAttrC: THREE.BufferAttribute,
        ) => {
            const cx2 = cols + 1;
            let ptr = 0;
            const posArr = posAttrC.array as Float32Array;
            const colArr = colAttrC.array as Float32Array;

            for (const thresh of thresholds) {
                const t = (thresh - (-amplitude - 1)) / ((amplitude + 1) * 2);
                const clr = lerpPalette(t, colorStops);

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const i00 = r * cx2 + c;
                        const i10 = r * cx2 + c + 1;
                        const i01 = (r + 1) * cx2 + c;
                        const i11 = (r + 1) * cx2 + c + 1;

                        const z00 = zGrid[i00];
                        const z10 = zGrid[i10];
                        const z01 = zGrid[i01];
                        const z11 = zGrid[i11];

                        const x00 = vtxGrid[i00 * 3];
                        const y00 = vtxGrid[i00 * 3 + 1];
                        const x10 = vtxGrid[i10 * 3];
                        const y10 = vtxGrid[i10 * 3 + 1];
                        const x01 = vtxGrid[i01 * 3];
                        const y01 = vtxGrid[i01 * 3 + 1];
                        const x11 = vtxGrid[i11 * 3];
                        const y11 = vtxGrid[i11 * 3 + 1];

                        // Collect edge crossing points
                        const pts: [number, number, number][] = [];

                        const cross = (
                            zA: number,
                            zB: number,
                            xA: number,
                            yA: number,
                            _zA2: number,
                            xB: number,
                            yB: number,
                            _zB2: number,
                        ) => {
                            if (zA < thresh !== zB < thresh) {
                                const t2 = (thresh - zA) / (zB - zA);
                                pts.push([
                                    xA + (xB - xA) * t2,
                                    yA + (yB - yA) * t2,
                                    thresh,
                                ]);
                            }
                        };
                        cross(z00, z10, x00, y00, z00, x10, y10, z10); // bottom edge
                        cross(z10, z11, x10, y10, z10, x11, y11, z11); // right edge
                        cross(z01, z11, x01, y01, z01, x11, y11, z11); // top edge
                        cross(z00, z01, x00, y00, z00, x01, y01, z01); // left edge

                        if (pts.length >= 2 && ptr + 6 <= posArr.length) {
                            for (let k = 0; k < 2; k++) {
                                posArr[ptr] = pts[k][0];
                                posArr[ptr + 1] = pts[k][1];
                                posArr[ptr + 2] = pts[k][2];
                                colArr[ptr] = clr.r;
                                colArr[ptr + 1] = clr.g;
                                colArr[ptr + 2] = clr.b;
                                ptr += 3;
                            }
                        }
                    }
                }
            }

            posAttrC.needsUpdate = true;
            colAttrC.needsUpdate = true;
            (object3d as THREE.LineSegments).geometry.setDrawRange(0, ptr / 3);
        };

        // Z grid for contour (shared scratch)
        const zGrid =
            style === \'contour\'
                ? new Float32Array((cols + 1) * (rows + 1))
                : null;

        // Animation loop
        let rafId: number;

        const animate = () => {
            rafId = requestAnimationFrame(animate);

            // Sync opacity to all material types
            if ((mat as any).opacity !== undefined) {
                (mat as any).opacity = opacityRef.current;
            }

            if ((mat as any).uniforms?.uOpacity) {
                (mat as any).uniforms.uOpacity.value = opacityRef.current;
            }

            if (!pausedRef.current) {
                const time = performance.now() * 0.001 * speedRef.current;
                const freq = frequencyRef.current;
                const amp = amplitudeRef.current;
                const mi = mouseInfluenceRef.current;
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;

                if (style === \'crosses\' && crossCenters && posAttr && posBuf) {
                    const vtxCount = (cols + 1) * (rows + 1);

                    for (let vi = 0; vi < vtxCount; vi++) {
                        const bx = crossCenters[vi * 3];
                        const by = crossCenters[vi * 3 + 1];
                        const z = calcZ(bx, by, time, freq, amp, mx, my, mi);
                        const b = vi * 12;
                        posBuf[b + 2] = z;
                        posBuf[b + 5] = z;
                        posBuf[b + 8] = z;
                        posBuf[b + 11] = z;
                    }

                    posAttr.needsUpdate = true;
                } else if (
                    style === \'hexagons\' &&
                    hexCentersBuf &&
                    hexPosBuf &&
                    posAttr
                ) {
                    const hexCount = hexCentersBuf.length / 3;

                    for (let hi = 0; hi < hexCount; hi++) {
                        const bx = hexCentersBuf[hi * 3];
                        const by = hexCentersBuf[hi * 3 + 1];
                        const z = calcZ(bx, by, time, freq, amp, mx, my, mi);
                        // 6 edges × 2 pts = 12 endpoints per hex
                        const base = hi * 6 * 6; // 6edges × 6floats

                        for (let k = 0; k < 12; k++) {
                            hexPosBuf[base + k * 3 + 2] = z;
                        }
                    }

                    // Sync the slice used in geo
                    const posA = geo.attributes
                        .position as THREE.BufferAttribute;
                    const arr = posA.array as Float32Array;
                    arr.set(hexPosBuf.slice(0, arr.length));
                    posA.needsUpdate = true;
                } else if (style === \'dashes\' && posBuf && baseBuf && posAttr) {
                    const total = posBuf.length / 3;

                    for (let i = 0; i < total; i++) {
                        const x = baseBuf[i * 3];
                        const y = baseBuf[i * 3 + 1];
                        posBuf[i * 3 + 2] = calcZ(
                            x,
                            y,
                            time,
                            freq,
                            amp,
                            mx,
                            my,
                            mi,
                        );
                    }

                    posAttr.needsUpdate = true;
                } else if (
                    style === \'contour\' &&
                    contourVtxGrid &&
                    zGrid &&
                    posAttr
                ) {
                    const vtxCount = (cols + 1) * (rows + 1);

                    for (let i = 0; i < vtxCount; i++) {
                        const x = contourVtxGrid[i * 3];
                        const y = contourVtxGrid[i * 3 + 1];
                        zGrid[i] = calcZ(x, y, time, freq, amp, mx, my, mi);
                    }

                    const thresholds: number[] = [];

                    for (let l = 0; l < contourLevels; l++) {
                        thresholds.push(
                            -amp -
                                1 +
                                (l / (contourLevels - 1)) * (amp + 1) * 2,
                        );
                    }

                    rebuildContour(
                        contourVtxGrid,
                        zGrid,
                        thresholds,
                        geo.attributes.position as THREE.BufferAttribute,
                        geo.attributes.color as THREE.BufferAttribute,
                    );
                } else if (posBuf && posAttr) {
                    // All other styles: simple per-vertex Z update
                    const total = posBuf.length / 3;

                    for (let i = 0; i < total; i++) {
                        const x = posBuf[i * 3];
                        const y = posBuf[i * 3 + 1];
                        posBuf[i * 3 + 2] = calcZ(
                            x,
                            y,
                            time,
                            freq,
                            amp,
                            mx,
                            my,
                            mi,
                        );
                    }

                    posAttr.needsUpdate = true;

                    // Solid needs normals recomputed for correct lighting
                    if (style === \'solid\') {
                        (geo as THREE.PlaneGeometry).computeVertexNormals();
                    }
                }

                object3d.rotation.x = my * mouseRotationRef.current;
                object3d.rotation.y = mx * mouseRotationRef.current;
            }

            renderer.render(scene, camera);
        };

        animate();
        onReady?.();

        // Cleanup
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener(\'resize\', handleResize);
            window.removeEventListener(\'mousemove\', handleMouse);
            lights.forEach((l) => scene.remove(l));
            scene.remove(object3d);
            geo.dispose();
            mat.dispose();
            extraDispose.forEach((m2) => m2.dispose());
            renderer.dispose();

            if (el.contains(renderer.domElement)) {
                el.removeChild(renderer.domElement);
            }
        };
    }, [
        size.width,
        size.height,
        style,
        colors,
        lines,
        cameraPosition,
        planeWidth,
        planeHeight,
        segmentsX,
        segmentsY,
        dotSize,
        dotSizeMin,
        crossSize,
        dashRatio,
        contourLevels,
        maxPixelRatio,
        onReady,
    ]);

    return (
        <div
            ref={containerRef}
            className={cn(`pointer-events-none absolute inset-0`, className)}
            aria-hidden="true"
        />
    );
};

export default WavesThree;
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'threejs',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'threejs',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'use-dark-mode',
                'type' => 'registry:hook',
                'title' => 'Use Dark Mode',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/hooks/use-dark-mode.ts',
                        'type' => 'registry:hook',
                        'content' => 'import { useSyncExternalStore } from \'react\';

function getSnapshot(): boolean {
    return document.documentElement.classList.contains(\'dark\');
}

function getServerSnapshot(): boolean {
    return false;
}

function subscribe(callback: () => void): () => void {
    const observer = new MutationObserver(callback);

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [\'class\'],
    });

    return () => {
        observer.disconnect();
    };
}

function useDarkMode(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useDarkMode;
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'hooks',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'hooks',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'use-headroom',
                'type' => 'registry:hook',
                'title' => 'Use Headroom',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/hooks/use-headroom.ts',
                        'type' => 'registry:hook',
                        'content' => '\'use client\';
import { useCallback, useEffect, useRef, useState } from \'react\';

export interface ToleranceConfig {
    up: number;
    down: number;
}

export interface UseHeadroomOptions {
    enabled?: boolean;
    offset?: number;
    tolerance?: number | ToleranceConfig;
    scroller?: Element | null;
}

/**
 * useHeadroom - A React hook that replicates headroom.js behavior.
 *
 * Returns an object with CSS class flags based on scroll direction and position,
 * plus a ref to attach to your header element (for scroll offset calculation).
 *
 * @param {Object} options
 * @param {boolean} [options.enabled=true]    - Enable/disable the headroom behavior. When false, header is always pinned.
 * @param {number} [options.offset=0]        - Scroll distance (px) before the hook activates.
 * @param {number} [options.tolerance=0]     - Scroll delta (px) required to trigger a state change.
 *                                             Can also be { up: number, down: number }.
 * @param {Element|null} [options.scroller]  - Scrollable element to listen on (default: window).
 *
 * @returns {{
 *   ref: React.RefObject,   - Attach this to your header element.
 *   pinned: boolean,        - true when header should be visible (scroll up or at top).
 *   unpinned: boolean,      - true when header should be hidden (scroll down).
 *   top: boolean,          - true when at the very top (within offset).
 *   notTop: boolean,       - true when scrolled past offset.
 *   bottom: boolean,       - true when at the bottom of the page/scroller.
 *   notBottom: boolean,    - true when not at the bottom.
 * }}
 *
 */
function useHeadroom({
    enabled = true,
    offset = 0,
    tolerance = 0,
    scroller = null,
}: UseHeadroomOptions = {}) {
    const ref = useRef(null);

    const getInitialState = useCallback(
        () => ({
            pinned: true,
            unpinned: false,
            top: true,
            notTop: false,
            bottom: false,
            notBottom: true,
        }),
        [],
    );

    const [state, setState] = useState(getInitialState);

    // Normalize tolerance into { up, down }
    const getTolerance = useCallback((): ToleranceConfig => {
        if (typeof tolerance === \'number\') {
            return { up: tolerance, down: tolerance };
        }

        return tolerance;
    }, [tolerance]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const scrollEl = scroller ?? window;

        const getScrollY = () =>
            scrollEl instanceof Element
                ? scrollEl.scrollTop
                : (window.scrollY ?? window.pageYOffset);

        const getScrollHeight = () =>
            scrollEl instanceof Element
                ? scrollEl.scrollHeight
                : document.documentElement.scrollHeight;

        const getClientHeight = () =>
            scrollEl instanceof Element
                ? scrollEl.clientHeight
                : window.innerHeight;

        let lastScrollY = getScrollY();
        let ticking = false;

        const update = () => {
            const currentScrollY = getScrollY();
            const scrollHeight = getScrollHeight();
            const clientHeight = getClientHeight();
            const tolerances = getTolerance();

            const isTop = currentScrollY <= offset;
            const isBottom = currentScrollY + clientHeight >= scrollHeight - 1;
            const delta = currentScrollY - lastScrollY;
            const scrollingDown = delta > 0;
            const scrollingUp = delta < 0;

            // Determine pin/unpin only when tolerance is exceeded
            setState((prev) => {
                let pinned = prev.pinned;

                if (isTop) {
                    // Always pin at the top
                    pinned = true;
                } else if (
                    scrollingDown &&
                    Math.abs(delta) >= tolerances.down
                ) {
                    pinned = false;
                } else if (scrollingUp && Math.abs(delta) >= tolerances.up) {
                    pinned = true;
                }

                return {
                    pinned,
                    unpinned: !pinned,
                    top: isTop,
                    notTop: !isTop,
                    bottom: isBottom,
                    notBottom: !isBottom,
                };
            });

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        scrollEl.addEventListener(\'scroll\', onScroll, { passive: true });

        // Run once on mount to set initial state
        update();

        return () => {
            scrollEl.removeEventListener(\'scroll\', onScroll);
        };
    }, [enabled, offset, getTolerance, scroller]);

    return { ref, ...state };
}

export default useHeadroom;
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'hooks',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'hooks',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'use-hover',
                'type' => 'registry:hook',
                'title' => 'Use Hover',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/hooks/use-hover.tsx',
                        'type' => 'registry:hook',
                        'content' => '\'use client\';
import { useCallback, useState } from \'react\';

export function useHover() {
    const [isHovered, setIsHovered] = useState(false);

    const hoverRef = useCallback((node: HTMLElement | null) => {
        if (!node) {
            return;
        }

        node.onmouseenter = () => setIsHovered(true);
        node.onmouseleave = () => setIsHovered(false);
    }, []);

    return { isHovered, hoverRef };
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'hooks',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'hooks',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'use-pixel-canvas',
                'type' => 'registry:hook',
                'title' => 'Use Pixel Canvas',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [
                    'https://ui.test/r/pixel-canvas-helper.json',
                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/hooks/use-pixel-canvas.ts',
                        'type' => 'registry:hook',
                        'content' => '\'use client\';

import { useCallback, useEffect, useRef, useState } from \'react\';
import type {
    AnimationDirection,
    PixelConfig,
    PixelState,
} from \'@/registry/new-york/lib/pixel-canvas-helper\';
import {
    calculateDelay,
    createPixelState,
    defaultPixelConfig,
    drawPixel,
    updatePixelAppear,
    updatePixelDisappear,
} from \'@/registry/new-york/lib/pixel-canvas-helper\';

interface UsePixelCanvasOptions extends Partial<PixelConfig> {
    /**
     * Controls whether animation runs continuously
     * - When true: animation runs automatically and continuously
     * - When false: animation only runs when triggered via JS or mouse
     */
    active?: boolean;
    /**
     * Enable mouse interaction (hover triggers animation)
     * - When true: mouseenter triggers appear, mouseleave triggers disappear
     * - When false: mouse events are ignored
     */
    mouseActive?: boolean;
    /** @deprecated Use `active` instead. Auto-start animation on mount */
    autoStart?: boolean;
    /** @deprecated Use `mouseActive` instead. Trigger animation on hover */
    hoverTrigger?: boolean;
}

interface UsePixelCanvasReturn {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    isAnimating: boolean;
    triggerAppear: () => void;
    triggerDisappear: () => void;
    reset: () => void;
}

export function usePixelCanvas(
    options: UsePixelCanvasOptions = {},
): UsePixelCanvasReturn {
    const config: PixelConfig = { ...defaultPixelConfig, ...options };

    // Handle both old and new prop names for backwards compatibility
    const {
        active,
        mouseActive,
        autoStart = false,
        hoverTrigger = true,
    } = options;

    // New props take precedence over deprecated ones
    const shouldAutoStart = active ?? autoStart;
    const shouldReactToMouse = mouseActive ?? hoverTrigger;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pixelsRef = useRef<PixelState[]>([]);
    const animationRef = useRef<number | null>(null);
    const directionRef = useRef<AnimationDirection>(\'appear\');
    const isInitializedRef = useRef(false);
    const activeRef = useRef(shouldAutoStart);
    const [isAnimating, setIsAnimating] = useState(false);

    const speedMultiplier = config.speed * 0.001;

    // Keep activeRef in sync with prop
    useEffect(() => {
        activeRef.current = shouldAutoStart;
    }, [shouldAutoStart]);

    const initPixels = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext(\'2d\');

        if (!ctx) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);

        if (width <= 0 || height <= 0) {
            return;
        }

        // Set canvas size with device pixel ratio for crisp rendering
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        const pixels: PixelState[] = [];
        const reducedMotion = window.matchMedia(
            \'(prefers-reduced-tabs: reduce)\',
        ).matches;

        for (let x = 0; x < width; x += config.gap) {
            for (let y = 0; y < height; y += config.gap) {
                const color =
                    config.colors[
                        Math.floor(Math.random() * config.colors.length)
                    ];
                const delay = reducedMotion
                    ? 0
                    : calculateDelay(x, y, width, height, config.animationType);

                pixels.push(
                    createPixelState(
                        x,
                        y,
                        color,
                        delay,
                        speedMultiplier,
                        config.minSize,
                        config.maxSize,
                        width,
                        height,
                    ),
                );
            }
        }

        pixelsRef.current = pixels;
        isInitializedRef.current = true;
    }, [
        config.gap,
        config.colors,
        config.animationType,
        config.minSize,
        config.maxSize,
        speedMultiplier,
    ]);

    const animateRef = useRef<() => void>(() => {});

    const animate = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext(\'2d\');

        if (!ctx) {
            return;
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        ctx.clearRect(0, 0, width, height);

        let allIdle = true;
        const direction = directionRef.current;

        pixelsRef.current = pixelsRef.current.map((pixel) => {
            let updated: PixelState;

            if (direction === \'appear\') {
                updated = updatePixelAppear(pixel, config.shimmerIntensity);
            } else {
                updated = updatePixelDisappear(pixel);
            }

            // Draw pixel if it has size > 0 (clamp to prevent negative values)
            const safeSize = Math.max(0, updated.size);

            if (safeSize > 0.01) {
                allIdle = false;
                drawPixel(
                    ctx,
                    updated.x,
                    updated.y,
                    safeSize,
                    config.maxSize,
                    updated.color,
                    config.shape,
                );
            } else if (!updated.isIdle) {
                allIdle = false;
            }

            return updated;
        });

        // For disappear: stop when all pixels are gone
        // For appear: never stop - keep shimmering
        if (direction === \'disappear\' && allIdle) {
            setIsAnimating(false);

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }

            // Reset pixels for next appear animation
            initPixels();

            return;
        }

        animationRef.current = requestAnimationFrame(animateRef.current);
    }, [config.shimmerIntensity, config.maxSize, config.shape, initPixels]);

    useEffect(() => {
        animateRef.current = animate;
    }, [animate]);

    const startAnimation = useCallback(
        (direction: AnimationDirection) => {
            // If disappearing, just change direction - don\'t reinit
            if (direction === \'disappear\') {
                directionRef.current = direction;

                if (!animationRef.current) {
                    setIsAnimating(true);
                    animationRef.current = requestAnimationFrame(animate);
                }

                return;
            }

            // For appear, always reset pixel states for fresh animation
            initPixels();

            directionRef.current = direction;
            setIsAnimating(true);

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            animationRef.current = requestAnimationFrame(animate);
        },
        [animate, initPixels],
    );

    const triggerAppear = useCallback(() => {
        startAnimation(\'appear\');
    }, [startAnimation]);

    const triggerDisappear = useCallback(() => {
        startAnimation(\'disappear\');
    }, [startAnimation]);

    const reset = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        setIsAnimating(false);
        directionRef.current = \'appear\';
        initPixels();

        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext(\'2d\');

            if (ctx) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            }
        }
    }, [initPixels]);

    // Initialize and handle resize
    useEffect(() => {
        initPixels();

        const container = containerRef.current;

        if (!container) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            initPixels();

            // Restart animation if it was running and we\'re in active mode
            if (activeRef.current && animationRef.current) {
                triggerAppear();
            }
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initPixels, triggerAppear]);

    // Handle mouse events
    useEffect(() => {
        if (!shouldReactToMouse) {
            return;
        }

        const container = containerRef.current;

        if (!container) {
            return;
        }

        const handleMouseEnter = () => {
            // Reset and start fresh appear animation
            triggerAppear();
        };

        const handleMouseLeave = () => {
            triggerDisappear();
        };

        container.addEventListener(\'mouseenter\', handleMouseEnter);
        container.addEventListener(\'mouseleave\', handleMouseLeave);

        if (!config.noFocus) {
            container.addEventListener(\'focusin\', handleMouseEnter);
            container.addEventListener(\'focusout\', handleMouseLeave);
        }

        return () => {
            container.removeEventListener(\'mouseenter\', handleMouseEnter);
            container.removeEventListener(\'mouseleave\', handleMouseLeave);
            container.removeEventListener(\'focusin\', handleMouseEnter);
            container.removeEventListener(\'focusout\', handleMouseLeave);
        };
    }, [shouldReactToMouse, config.noFocus, triggerAppear, triggerDisappear]);

    // Handle active prop - continuous animation
    useEffect(() => {
        if (shouldAutoStart) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            startAnimation(\'appear\');
        } else if (!shouldReactToMouse) {
            // If neither active nor mouseActive, clear canvas
            reset();
        }
    }, [shouldAutoStart, shouldReactToMouse, startAnimation, reset]);

    return {
        canvasRef,
        containerRef,
        isAnimating,
        triggerAppear,
        triggerDisappear,
        reset,
    };
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'hooks',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'hooks',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'audio-context',
                'type' => 'registry:lib',
                'title' => 'Audio Context',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/lib/audio-context.ts',
                        'type' => 'registry:lib',
                        'content' => 'export interface Track {
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
        id: \'1\',
        title: \'Cold Steel Sheets\',
        artist: \'Iron & Oak\',
        album: \'Forged\',
        duration: 475,
        src: \'/music/cold-steel-sheets.mp3\',
        coverUrl:
            \'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop\',
    },
    {
        id: \'2\',
        title: \'Laughter at the Gale\',
        artist: \'Storm Chaser\',
        album: \'Braving the Wind\',
        duration: 353,
        src: \'/music/laughter-at-the-gale.mp3\',
        coverUrl:
            \'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop\',
    },
    {
        id: \'3\',
        title: \'Roses in the Sink\',
        artist: \'Violet Glass\',
        album: \'Fading Petals\',
        duration: 393,
        src: \'/music/roses-in-the-sink.mp3\',
        coverUrl:
            \'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop\',
    },
    {
        id: \'4\',
        title: "Storm Walker\'s Oath",
        artist: \'Thunder Pass\',
        album: \'The Reckoning\',
        duration: 462,
        src: \'/music/storm-walkers-oath.mp3\',
        coverUrl:
            \'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop\',
    },
    {
        id: \'5\',
        title: \'The Empty Chair\',
        artist: \'Silent Hollow\',
        album: \'Left Behind\',
        duration: 259,
        src: \'/music/the-empty-chair.mp3\',
        coverUrl:
            \'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=400&fit=crop\',
    },
];

export const samplePlaylists: Playlist[] = [
    {
        id: \'1\',
        name: \'Chill Vibes\',
        tracks: [sampleTracks[0], sampleTracks[2], sampleTracks[4]],
        coverUrl: sampleTracks[0].coverUrl,
    },
    {
        id: \'2\',
        name: \'Dark & Stormy\',
        tracks: [sampleTracks[1], sampleTracks[3]],
        coverUrl: sampleTracks[1].coverUrl,
    },
    {
        id: \'3\',
        name: \'All Tracks\',
        tracks: sampleTracks,
        coverUrl: sampleTracks[3].coverUrl,
    },
];

export type VisualizerStyle = \'bars\' | \'wave\' | \'circular\' | \'particles\';

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, \'0\')}`;
};
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'lib',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'lib',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'glow-geometry',
                'type' => 'registry:lib',
                'title' => 'Glow Geometry',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/lib/glow-geometry.ts',
                        'type' => 'registry:lib',
                        'content' => 'export interface Point {
    x: number;
    y: number;
}
export interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export const isCircleOverlappingRect = (p: Point, r: number, rect: Rect) =>
    p.x + r >= rect.left &&
    p.x - r <= rect.right &&
    p.y + r >= rect.top &&
    p.y - r <= rect.bottom;

export const isPointInRect = (p: Point, rect: Rect) =>
    p.x >= rect.left &&
    p.x <= rect.right &&
    p.y >= rect.top &&
    p.y <= rect.bottom;

export const toElementSpace = (p: Point, rect: Rect): Point => ({
    x: p.x - rect.left,
    y: p.y - rect.top,
});
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'lib',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'lib',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
            [
                'name' => 'pixel-canvas-helper',
                'type' => 'registry:lib',
                'title' => 'Pixel Canvas Helper',
                'description' => null,
                'author' => 'designbycode',
                'dependencies' => [

                ],
                'devDependencies' => [

                ],
                'registryDependencies' => [

                ],
                'files' => [
                    [
                        'path' => 'resources/js/registry/new-york/lib/pixel-canvas-helper.ts',
                        'type' => 'registry:lib',
                        'content' => 'export type PixelShape = \'square\' | \'circle\' | \'diamond\' | \'star\' | \'hexagon\';

export type AnimationType =
    | \'radial\'
    | \'wave\'
    | \'random\'
    | \'diagonal\'
    | \'spiral\';

export type AnimationDirection = \'appear\' | \'disappear\';

export interface PixelConfig {
    /** Array of colors for pixels */
    colors: string[];
    /** Gap between pixels in pixels */
    gap: number;
    /** Animation speed (0-100) */
    speed: number;
    /** Minimum pixel size */
    minSize: number;
    /** Maximum pixel size */
    maxSize: number;
    /** Shimmer intensity (0-1) */
    shimmerIntensity: number;
    /** Shape of pixels */
    shape: PixelShape;
    /** Animation pattern type */
    animationType: AnimationType;
    /** Whether to disable focus events */
    noFocus: boolean;
}

export interface PixelState {
    x: number;
    y: number;
    color: string;
    size: number;
    maxSize: number;
    minSize: number;
    speed: number;
    delay: number;
    sizeStep: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isReverse: boolean;
    isShimmer: boolean;
}

export const defaultPixelConfig: PixelConfig = {
    colors: [\'#f8fafc\', \'#f1f5f9\', \'#cbd5e1\'],
    gap: 6,
    speed: 35,
    minSize: 0.5,
    maxSize: 2,
    shimmerIntensity: 0.5,
    shape: \'square\',
    animationType: \'radial\',
    noFocus: false,
};

// Preset color palettes
export const colorPresets = {
    slate: [\'#f8fafc\', \'#f1f5f9\', \'#cbd5e1\'],
    blue: [\'#dbeafe\', \'#93c5fd\', \'#3b82f6\'],
    emerald: [\'#d1fae5\', \'#6ee7b7\', \'#10b981\'],
    amber: [\'#fef3c7\', \'#fcd34d\', \'#f59e0b\'],
    rose: [\'#ffe4e6\', \'#fda4af\', \'#f43f5e\'],
    violet: [\'#ede9fe\', \'#c4b5fd\', \'#8b5cf6\'],
    cyan: [\'#cffafe\', \'#67e8f9\', \'#06b6d4\'],
    sunset: [\'#fef3c7\', \'#fdba74\', \'#f97316\'],
    ocean: [\'#cffafe\', \'#7dd3fc\', \'#0ea5e9\'],
    forest: [\'#dcfce7\', \'#86efac\', \'#22c55e\'],
    neon: [\'#f0fdf4\', \'#4ade80\', \'#22d3ee\'],
    midnight: [\'#1e293b\', \'#334155\', \'#475569\'],
};

export function getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function clampValue(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/** Maximum delay cap in milliseconds to ensure responsive animations */
const MAX_DELAY = 1200;

/**
 * Calculate delay based on animation type
 * All delays are capped at MAX_DELAY to ensure responsive animations
 */
export function calculateDelay(
    x: number,
    y: number,
    canvasWidth: number,
    canvasHeight: number,
    animationType: AnimationType,
): number {
    let delay: number;

    switch (animationType) {
        case \'radial\': {
            const dx = x - canvasWidth / 2;
            const dy = y - canvasHeight / 2;
            delay = Math.sqrt(dx * dx + dy * dy);
            break;
        }
        case \'wave\': {
            delay = x + y * 0.5;
            break;
        }
        case \'random\': {
            delay =
                Math.random() *
                Math.min(MAX_DELAY, Math.max(canvasWidth, canvasHeight));
            break;
        }
        case \'diagonal\': {
            delay = (x + y) * 0.7;
            break;
        }
        case \'spiral\': {
            const dx = x - canvasWidth / 2;
            const dy = y - canvasHeight / 2;
            const angle = Math.atan2(dy, dx);
            const distance = Math.sqrt(dx * dx + dy * dy);
            delay = distance + angle * 50;
            break;
        }
        default:
            delay = 0;
    }

    // Normalize delay to be within 0 to MAX_DELAY range
    const maxRawDelay = Math.sqrt(
        canvasWidth * canvasWidth + canvasHeight * canvasHeight,
    );
    const normalizedDelay = (delay / maxRawDelay) * MAX_DELAY;

    return Math.min(normalizedDelay, MAX_DELAY);
}

/**
 * Draw pixel with specified shape
 */
export function drawPixel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    maxSize: number,
    color: string,
    shape: PixelShape,
): void {
    // Ensure size is never negative
    const safeSize = Math.max(0, size);

    if (safeSize <= 0) {
        return;
    }

    const centerOffset = maxSize * 0.5 - safeSize * 0.5;
    const cx = x + centerOffset + safeSize / 2;
    const cy = y + centerOffset + safeSize / 2;

    ctx.fillStyle = color;

    switch (shape) {
        case \'square\':
            ctx.fillRect(
                x + centerOffset,
                y + centerOffset,
                safeSize,
                safeSize,
            );
            break;

        case \'circle\':
            ctx.beginPath();
            ctx.arc(cx, cy, safeSize / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

        case \'diamond\':
            ctx.beginPath();
            ctx.moveTo(cx, cy - safeSize / 2);
            ctx.lineTo(cx + safeSize / 2, cy);
            ctx.lineTo(cx, cy + safeSize / 2);
            ctx.lineTo(cx - safeSize / 2, cy);
            ctx.closePath();
            ctx.fill();
            break;

        case \'star\': {
            const spikes = 5;
            const outerRadius = safeSize / 2;
            const innerRadius = safeSize / 4;
            ctx.beginPath();

            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes - Math.PI / 2;
                const px = cx + Math.cos(angle) * radius;
                const py = cy + Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.closePath();
            ctx.fill();
            break;
        }

        case \'hexagon\': {
            const sides = 6;
            const radius = safeSize / 2;
            ctx.beginPath();

            for (let i = 0; i < sides; i++) {
                const angle = (i * Math.PI * 2) / sides - Math.PI / 2;
                const px = cx + Math.cos(angle) * radius;
                const py = cy + Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.closePath();
            ctx.fill();
            break;
        }
    }
}

/**
 * Create initial pixel state
 */
export function createPixelState(
    x: number,
    y: number,
    color: string,
    delay: number,
    speed: number,
    minSize: number,
    maxSize: number,
    canvasWidth: number,
    canvasHeight: number,
): PixelState {
    return {
        x,
        y,
        color,
        size: 0,
        maxSize: getRandomValue(minSize, maxSize),
        minSize,
        speed: getRandomValue(0.1, 0.9) * speed,
        delay,
        sizeStep: Math.random() * 0.4,
        counter: 0,
        counterStep: Math.random() * 4 + (canvasWidth + canvasHeight) * 0.01,
        isIdle: false,
        isReverse: false,
        isShimmer: false,
    };
}

/**
 * Update pixel state for appear animation
 */
export function updatePixelAppear(
    pixel: PixelState,
    shimmerIntensity: number,
): PixelState {
    const updated = { ...pixel, isIdle: false };

    if (updated.counter <= updated.delay) {
        updated.counter += updated.counterStep;

        return updated;
    }

    if (updated.size >= updated.maxSize) {
        updated.isShimmer = true;
    }

    if (updated.isShimmer) {
        return updatePixelShimmer(updated, shimmerIntensity);
    } else {
        updated.size += updated.sizeStep;
    }

    return updated;
}

/**
 * Update pixel state for disappear animation
 */
export function updatePixelDisappear(pixel: PixelState): PixelState {
    const updated = { ...pixel, isShimmer: false, counter: 0 };

    if (updated.size <= 0) {
        updated.isIdle = true;
        updated.size = 0;

        return updated;
    }

    updated.size = Math.max(0, updated.size - 0.1);

    return updated;
}

/**
 * Update pixel shimmer effect
 */
export function updatePixelShimmer(
    pixel: PixelState,
    intensity: number,
): PixelState {
    const updated = { ...pixel };
    const shimmerSpeed = updated.speed * intensity;

    // Ensure minSize is at least 0.1 to prevent negative sizes
    const safeMinSize = Math.max(0.1, updated.minSize);

    if (updated.size >= updated.maxSize) {
        updated.isReverse = true;
    } else if (updated.size <= safeMinSize) {
        updated.isReverse = false;
        updated.size = safeMinSize; // Ensure we don\'t go below minSize
    }

    if (updated.isReverse) {
        updated.size -= shimmerSpeed;
    } else {
        updated.size += shimmerSpeed;
    }

    // Clamp size to prevent negative values and keep within bounds
    updated.size = Math.max(
        safeMinSize,
        Math.min(updated.size, updated.maxSize * 1.2),
    );

    return updated;
}
',
                    ],
                ],
                'css' => null,
                'tailwind' => null,
                'vars_theme' => null,
                'vars_light' => null,
                'vars_dark' => null,
                'font_family' => null,
                'font_mono' => null,
                'font_serif' => null,
                'meta' => [
                    'category' => 'lib',
                    'version' => '1.0.0',
                ],
                'docs' => null,
                'categories' => [
                    'lib',
                ],
                'extends' => null,
                'style' => null,
                'icon_library' => null,
                'base_color' => null,
                'theme' => null,
            ],
        ];

        $total = 0;

        foreach ($items as $item) {
            Registry::updateOrCreate(
                ['name' => $item['name']],
                array_merge($item, ['user_id' => $userId])
            );
            $total++;
        }

        $this->command->info("Seeded {$total} registry items.");
    }
}