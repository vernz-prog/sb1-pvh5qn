import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface VoiceMessageProps {
  audioUrl: string;
  duration: number;
}

export const VoiceMessage: React.FC<VoiceMessageProps> = ({ audioUrl, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="flex items-center space-x-2 min-w-[160px]">
      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      
      <div className="flex-1">
        <div className="bg-gray-200 h-1 rounded-full">
          <div
            className="bg-green-500 h-1 rounded-full"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
        </div>
      </div>

      <span className="text-xs">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};