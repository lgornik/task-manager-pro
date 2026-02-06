// store/categories/categories.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState, categoriesAdapter } from './categories.state';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

const { selectAll, selectEntities } = categoriesAdapter.getSelectors();

export const selectAllCategories = createSelector(
  selectCategoriesState,
  selectAll
);

export const selectCategoryEntities = createSelector(
  selectCategoriesState,
  selectEntities
);

export const selectSelectedCategoryId = createSelector(
  selectCategoriesState,
  (state) => state.selectedCategoryId
);

export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  selectSelectedCategoryId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);