export interface Notification {
    id: number;
    message: string;
    createdAt: Date;
    isRead: boolean;
    userId: string;
    type: string;
    relatedEntityId?: string;
    image?: string;
  }