import { Chat } from '../types/chat';

export const mockChats: Chat[] = [
  {
    id: '1',
    contact: {
      name: 'Alice Johnson',
      phone: '+1234567890',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      lastSeen: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    messages: [
      {
        id: '1a',
        content: 'Hey! How are you doing?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        sender: 'me',
        status: 'read',
      },
      {
        id: '1b',
        content: 'I\'m good, thanks! Just finished my project.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        sender: 'other',
        status: 'read',
      },
      {
        id: '1c',
        content: 'That\'s great! Would you like to grab coffee tomorrow?',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        sender: 'me',
        status: 'delivered',
      },
    ],
    unreadCount: 0,
  },
  {
    id: '2',
    contact: {
      name: 'Bob Smith',
      phone: '+1987654321',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      lastSeen: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    messages: [
      {
        id: '2a',
        content: 'Did you see the latest updates?',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        sender: 'other',
        status: 'read',
      },
      {
        id: '2b',
        content: 'Yes, the new features look amazing!',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        sender: 'me',
        status: 'read',
      },
    ],
    unreadCount: 2,
  },
  {
    id: '3',
    contact: {
      name: 'Carol White',
      phone: '+1122334455',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    messages: [
      {
        id: '3a',
        content: 'Meeting at 3 PM tomorrow',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        sender: 'other',
        status: 'read',
      },
      {
        id: '3b',
        content: 'Perfect, I\'ll be there!',
        timestamp: new Date(Date.now() - 1000 * 60 * 115),
        sender: 'me',
        status: 'sent',
      },
    ],
    unreadCount: 1,
  },
];