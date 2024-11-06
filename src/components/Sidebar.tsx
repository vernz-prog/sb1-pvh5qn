import React from 'react';
import { Search, Settings } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';

export const Sidebar = () => {
  const { chats, activeChat, setActiveChat } = useChatStore();

  return (
    <div className="w-80 h-screen border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              activeChat === chat.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={chat.contact.avatar || `https://ui-avatars.com/api/?name=${chat.contact.name}`}
                  alt={chat.contact.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.contact.lastSeen && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{chat.contact.name}</h3>
                  {chat.messages.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {format(chat.messages[chat.messages.length - 1].timestamp, 'HH:mm')}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 truncate">
                    {chat.messages[chat.messages.length - 1]?.content}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};