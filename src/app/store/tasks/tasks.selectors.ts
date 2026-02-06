// store/tasks/tasks.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, tasksAdapter } from './tasks.state';

// Feature selector
export const selectTasksState = createFeatureSelector<TasksState>('tasks');

// Entity adapter selectors - WAŻNE: najpierw wyciągnij selektory
const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = tasksAdapter.getSelectors(selectTasksState); // ← przekaż selectTasksState

// ===== PODSTAWOWE SELEKTORY =====

export const selectAllTasks = selectAll; // już gotowe z adaptera

export const selectTaskEntities = selectEntities; // już gotowe z adaptera

export const selectTaskIds = selectIds; // już gotowe z adaptera

export const selectTotalTasks = selectTotal; // już gotowe z adaptera

// ===== STATE PROPERTIES =====

export const selectFilter = createSelector(
  selectTasksState,
  (state) => state.filter
);

export const selectLoading = createSelector(
  selectTasksState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTasksState,
  (state) => state.error
);

// ===== FILTERED & COMPUTED SELECTORS =====

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectFilter,
  (tasks, filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }
);

export const selectTasksCount = createSelector(
  selectAllTasks,
  (tasks) => ({
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  })
);

export const selectTasksByPriority = createSelector(
  selectAllTasks,
  (tasks) => ({
    high: tasks.filter(t => t.priority === 'high'),
    medium: tasks.filter(t => t.priority === 'medium'),
    low: tasks.filter(t => t.priority === 'low')
  })
);

// ===== PARAMETRIZED SELECTORS =====

// Selector do pojedynczego taska po ID
export const selectTaskById = (id: string) => createSelector(
  selectTaskEntities,
  (entities) => entities[id]
);

// Alternatywnie można użyć jako funkcji:
export const selectTaskByIdFn = createSelector(
  selectTaskEntities,
  (entities) => (id: string) => entities[id]
);