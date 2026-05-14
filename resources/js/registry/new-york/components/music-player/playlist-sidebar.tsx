'use client';

import { Plus, Music, ChevronRight, X, Play } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Playlist, Track } from '@/registry/new-york/lib/audio-context';
import { formatTime } from '@/registry/new-york/lib/audio-context';

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
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(
        null,
    );

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            onCreatePlaylist(newPlaylistName.trim());
            setNewPlaylistName('');
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
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-full w-80 border-r border-border bg-card lg:relative',
                    'transform transition-transform duration-300 ease-in-out',
                    isOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0',
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
                                className="text-muted-foreground hover:text-foreground lg:hidden"
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
                                    e.key === 'Enter' && handleCreatePlaylist()
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
                                        setNewPlaylistName('');
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
                                        'flex w-full items-center gap-3 p-4 transition-colors hover:bg-muted/50',
                                        currentPlaylist?.id === playlist.id &&
                                            'bg-muted',
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
                                            'h-5 w-5 text-muted-foreground transition-transform',
                                            expandedPlaylist === playlist.id &&
                                                'rotate-90',
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
                                                    'flex w-full items-center gap-3 px-4 py-2 transition-colors hover:bg-muted/50',
                                                    currentTrack?.id ===
                                                        track.id &&
                                                        'bg-primary/10',
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
                                                            'truncate text-sm',
                                                            currentTrack?.id ===
                                                                track.id
                                                                ? 'text-primary'
                                                                : 'text-foreground',
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
