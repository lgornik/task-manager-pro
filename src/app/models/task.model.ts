// models/task.model.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  categoryId?: string;
  dueDate?: Date;
  tags?: string[];
}