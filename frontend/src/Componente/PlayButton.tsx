import React from 'react';

interface PlayButtonProps {
    youtubeId: string;
    playingId: string | null;
    onPlay: (youtubeId: string) => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ youtubeId, playingId, onPlay }) => {
    const isPlaying = playingId === youtubeId;

    return (
        <button
            className="play-button"
            onClick={() => onPlay(youtubeId)}
        >
            {isPlaying ? '⏹' : '▶'}
        </button>
    );
};

export default PlayButton;