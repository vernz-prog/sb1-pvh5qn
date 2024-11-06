export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'voice' | 'file';
  duration?: number;
  audioUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export interface Contact {
  name: string;
  phone: string;
  avatar?: string;
  lastSeen?: Date;
}

export interface Chat {
  id: string;
  contact: Contact;
  messages: Message[];
  unreadCount: number;
}

export interface GreenAPIConfig {
  idInstance: string;
  apiTokenInstance: string;
}