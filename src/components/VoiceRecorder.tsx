import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, duration: number) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const duration = (Date.now() - startTimeRef.current) / 1000;
        onRecordingComplete(audioBlob, duration);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      startTimeRef.current = Date.now();
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {isRecording ? (
        <>
          <button
            onClick={stopRecording}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Square className="w-5 h-5" />
          </button>
          <span className="text-sm text-red-500">{formatTime(recordingTime)}</span>
        </>
      ) : (
        <button
          onClick={startRecording}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};