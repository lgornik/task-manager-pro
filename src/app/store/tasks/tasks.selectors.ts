// store/tasks/tasks.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, tasksAdapter } from './tasks.state';
import { selectCategoryEntities } from '../categories/categories.selectors';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

// Feature selector
export const selectTasksState = createFeatureSelector<TasksState>('tasks');

// Entity adapter selectors - WAŻNE: najpierw wyciągnij selektory
const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = tasksAdapter.getSelectors(selectTasksState);

// ===== PODSTAWOWE SELEKTORY =====

export const selectAllTasks = selectAll;
export const selectTaskEntities = selectEntities;
export const selectTaskIds = selectIds;
export const selectTotalTasks = selectTotal;

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

export const selectTaskById = (id: string) => createSelector(
  selectTaskEntities,
  (entities) => entities[id]
);

export const selectTaskByIdFn = createSelector(
  selectTaskEntities,
  (entities) => (id: string) => entities[id]
);

// ========================================
// ===== NOWE: SELEKTORY Z KATEGORIAMI =====
// ========================================

// Interface dla task z kategorią
export interface TaskWithCategory extends Task {
  category?: Category;
}

// Tasks z pełnymi danymi kategorii
export const selectTasksWithCategories = createSelector(
  selectAllTasks,
  selectCategoryEntities,
  (tasks, categoryEntities): TaskWithCategory[] => {
    return tasks.map(task => ({
      ...task,
      category: task.categoryId ? categoryEntities[task.categoryId] : undefined
    }));
  }
);

// Filtered tasks z kategoriami
export const selectFilteredTasksWithCategories = createSelector(
  selectTasksWithCategories,
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

// Tasks pogrupowane według kategorii
export const selectTasksByCategory = createSelector(
  selectAllTasks,
  selectCategoryEntities,
  (tasks, categoryEntities) => {
    const grouped: { [categoryId: string]: Task[] } = {
      uncategorized: []
    };

    tasks.forEach(task => {
      if (task.categoryId && categoryEntities[task.categoryId]) {
        if (!grouped[task.categoryId]) {
          grouped[task.categoryId] = [];
        }
        grouped[task.categoryId].push(task);
      } else {
        grouped['uncategorized'].push(task);
      }
    });

    return grouped;
  }
);

// Statystyki per kategoria
export const selectCategoryStats = createSelector(
  selectAllTasks,
  selectCategoryEntities,
  (tasks, categoryEntities) => {
    const stats: {
      categoryId: string;
      category?: Category;
      total: number;
      active: number;
      completed: number;
    }[] = [];

    // Grupuj według kategorii
    const grouped: { [key: string]: Task[] } = {};
    
    tasks.forEach(task => {
      const key = task.categoryId || 'uncategorized';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(task);
    });

    // Generuj statystyki
    Object.keys(grouped).forEach(categoryId => {
      const categoryTasks = grouped[categoryId];
      stats.push({
        categoryId,
        category: categoryId !== 'uncategorized' ? categoryEntities[categoryId] : undefined,
        total: categoryTasks.length,
        active: categoryTasks.filter(t => !t.completed).length,
        completed: categoryTasks.filter(t => t.completed).length
      });
    });

    return stats;
  }
);