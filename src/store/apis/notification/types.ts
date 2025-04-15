export interface Notification {
  _id?: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
  createdAt: string;
  userId?: string;
}
