// src/app/store/categories/categories.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState, categoriesAdapter } from './categories.state';

// Feature selector
export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

// Entity adapter selectors
const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = categoriesAdapter.getSelectors(selectCategoriesState);

// Export podstawowych selektorów
export const selectAllCategories = selectAll;
export const selectCategoryEntities = selectEntities;
export const selectCategoryIds = selectIds;
export const selectTotalCategories = selectTotal;

// Selected category ID
export const selectSelectedCategoryId = createSelector(
  selectCategoriesState,
  (state) => state.selectedCategoryId
);

// Selected category object
export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  selectSelectedCategoryId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Category by ID
export const selectCategoryById = (id: string) => createSelector(
  selectCategoryEntities,
  (entities) => entities[id]
);