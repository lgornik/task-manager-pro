// store/tasks/tasks.actions.ts
import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);

export const toggleTask = createAction(
  '[Tasks] Toggle Task',
  props<{ id: string }>()
);

export const setFilter = createAction(
  '[Tasks] Set Filter',
  props<{ filter: 'all' | 'active' | 'completed' }>()
);

// store/tasks/tasks.actions.ts
export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTaskRequest = createAction(
  '[Tasks] Add Task Request',
  props<{ task: Omit<Task, 'id'> }>()
);
export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[Tasks] Add Task Failure',
  props<{ error: string }>()
);

// Bulk operations (dzięki Entity Adapter)
export const deleteCompletedTasks = createAction(
  '[Tasks] Delete Completed Tasks'
);

export const toggleAllTasks = createAction(
  '[Tasks] Toggle All Tasks',
  props<{ completed: boolean }>()
);

export const updateTaskPriority = createAction(
  '[Tasks] Update Task Priority',
  props<{ id: string; priority: 'low' | 'medium' | 'high' }>()
);