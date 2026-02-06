// src/app/store/categories/categories.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialCategoriesState, categoriesAdapter } from './categories.state';
import * as CategoriesActions from './categories.actions';

export const categoriesReducer = createReducer(
  initialCategoriesState,

  // Load categories
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) =>
    categoriesAdapter.setAll(categories, state)
  ),

  // Add category
  on(CategoriesActions.addCategory, (state, { category }) =>
    categoriesAdapter.addOne(category, state)
  ),

  // Update category
  on(CategoriesActions.updateCategory, (state, { category }) =>
    categoriesAdapter.updateOne(
      { id: category.id, changes: category },
      state
    )
  ),

  // Delete category
  on(CategoriesActions.deleteCategory, (state, { id }) =>
    categoriesAdapter.removeOne(id, state)
  ),

  // Select category
  on(CategoriesActions.selectCategory, (state, { id }) => ({
    ...state,
    selectedCategoryId: id
  }))
);