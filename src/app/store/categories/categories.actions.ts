// src/app/store/categories/categories.actions.ts
import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

// Load categories
export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: string }>()
);

// Add category
export const addCategory = createAction(
  '[Categories] Add Category',
  props<{ category: Category }>()
);

// Update category
export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ category: Category }>()
);

// Delete category
export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ id: string }>()
);

// Select category for filtering
export const selectCategory = createAction(
  '[Categories] Select Category',
  props<{ id: string | null }>()
);