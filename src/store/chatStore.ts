import { create } from 'zustand';
import { Chat, Message } from '../types/chat';
import { mockChats } from '../services/mockData';

interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  markAsRead: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => void;
  sendVoiceMessage: (chatId: string, audioUrl: string, duration: number) => void;
  sendFileMessage: (chatId: string, file: { url: string; name: string; size: number }) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: mockChats,
  activeChat: null,
  setActiveChat: (chatId) => {
    set((state) => ({
      activeChat: chatId,
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
    }));
  },
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              unreadCount: chat.unreadCount + (message.sender === 'other' ? 1 : 0),
            }
          : chat
      ),
    })),
  markAsRead: (chatId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
    })),
  sendMessage: (chatId, content) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  content,
                  timestamp: new Date(),
                  sender: 'me',
                  status: 'sent',
                  type: 'text',
                },
              ],
            }
          : chat
      ),
    })),
  sendVoiceMessage: (chatId, audioUrl, duration) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  content: '',
                  timestamp: new Date(),
                  sender: 'me',
                  status: 'sent',
                  type: 'voice',
                  audioUrl,
                  duration,
                },
              ],
            }
          : chat
      ),
    })),
  sendFileMessage: (chatId, file) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  content: '',
                  timestamp: new Date(),
                  sender: 'me',
                  status: 'sent',
                  type: 'file',
                  fileUrl: file.url,
                  fileName: file.name,
                  fileSize: file.size,
                },
              ],
            }
          : chat
      ),
    })),
}));