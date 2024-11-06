import React, { useState, useRef } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onSendVoice: (blob: Blob, duration: number) => void;
  onSendFile: (file: File) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendVoice,
  onSendFile,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        {!isRecording && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,application/*"
        />

        {isRecording ? (
          <VoiceRecorder
            onRecordingComplete={(blob, duration) => {
              setIsRecording(false);
              onSendVoice(blob, duration);
            }}
          />
        ) : (
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        {message.trim() ? (
          <button
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsRecording(true)}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};