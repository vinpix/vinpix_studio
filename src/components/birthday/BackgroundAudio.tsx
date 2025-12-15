"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundAudioProps {
  startPlaying?: boolean;
}

export const BackgroundAudio = ({
  startPlaying = false,
}: BackgroundAudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (startPlaying && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current!.volume = 0.4;
          await audioRef.current!.play();
          setIsPlaying(true);
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      };
      playAudio();
    }
  }, [startPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (!startPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      {/* Note: Please place a valid mp3 file at public/music/birthday-bgm.mp3 */}
      <audio ref={audioRef} loop src="/music/birthday-bgm.mp3" />
      <button
        onClick={toggleMute}
        className="bg-black/20 backdrop-blur-md p-3 rounded-full hover:bg-black/40 transition-all text-white border border-white/30 shadow-lg cursor-pointer"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};
