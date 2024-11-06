import React, { useState } from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';
import { VoiceMessage } from './VoiceMessage';
import { ChatInput } from './ChatInput';
import { FileMessage } from './FileMessage';

export const ChatWindow = () => {
  const { chats, activeChat, sendMessage, sendVoiceMessage, sendFileMessage } = useChatStore();
  const currentChat = chats.find((chat) => chat.id === activeChat);

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  const handleSendFile = async (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    sendFileMessage(currentChat.id, {
      url: fileUrl,
      name: file.name,
      size: file.size,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {currentChat.contact.avatar ? (
              <img
                src={currentChat.contact.avatar}
                alt={currentChat.contact.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-medium text-gray-600">
                {currentChat.contact.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{currentChat.contact.name}</h2>
            <p className="text-sm text-gray-500">
              {currentChat.contact.lastSeen
                ? `Last seen ${format(currentChat.contact.lastSeen, 'HH:mm')}`
                : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {currentChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'me'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {msg.type === 'voice' ? (
                <VoiceMessage audioUrl={msg.audioUrl!} duration={msg.duration!} />
              ) : msg.type === 'file' ? (
                <FileMessage
                  fileName={msg.fileName!}
                  fileUrl={msg.fileUrl!}
                  fileSize={msg.fileSize!}
                />
              ) : (
                <p>{msg.content}</p>
              )}
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-75">
                  {format(new Date(msg.timestamp), 'HH:mm')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChatInput
        onSendMessage={(content) => sendMessage(currentChat.id, content)}
        onSendVoice={(blob, duration) => {
          const audioUrl = URL.createObjectURL(blob);
          sendVoiceMessage(currentChat.id, audioUrl, duration);
        }}
        onSendFile={handleSendFile}
      />
    </div>
  );
};