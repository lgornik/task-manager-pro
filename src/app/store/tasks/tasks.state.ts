import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../models/task.model';

export interface TasksState extends EntityState<Task> {
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
  error: string | null;
  selectedTaskId: string | null;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: false
});

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  filter: 'all',
  loading: false,
  error: null,
  selectedTaskId: null
});