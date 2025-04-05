import React, { createContext, useContext, useState } from 'react';

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType>({
    isMuted: false,
    toggleMute: () => {}
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(prev => !prev);

        // Mute all HTML audio elements
        document.querySelectorAll('audio').forEach((audio: HTMLAudioElement) => {
            audio.muted = !isMuted;
            if (!isMuted) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        // Remove all YouTube iframes when muting
        if (!isMuted) {
            document.querySelectorAll('iframe').forEach((iframe: HTMLIFrameElement) => {
                if (iframe.src.includes('youtube.com') && iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
            });
        }
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
}

export const useSound = () => useContext(SoundContext);