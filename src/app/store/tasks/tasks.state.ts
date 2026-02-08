import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../models/task.model';

export interface TasksState extends EntityState<Task> {
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
  error: string | null;
  selectedTaskId: string | null;
}

const priorityOrder: Record<'high' | 'medium' | 'low', number> = {
  high: 3,
  medium: 2,
  low: 1
};

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: (a, b) => {
    // 1. Sortuj po priorytecie (high → medium → low)
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    
    // 2. Jeśli priorytety są takie same, sortuj alfabetycznie po tytule
    return a.title.localeCompare(b.title);
  }
});

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  filter: 'all',
  loading: false,
  error: null,
  selectedTaskId: null
});