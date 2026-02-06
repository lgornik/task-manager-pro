// store/app.state.ts
import { CategoriesState } from './categories/categories.state';
import { TasksState } from './tasks/tasks.state';

export interface AppState {
  tasks: TasksState;
  categories: CategoriesState;
}