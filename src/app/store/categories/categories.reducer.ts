// store/categories/categories.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialCategoriesState, categoriesAdapter } from './categories.state';
import * as CategoriesActions from './categories.actions';

export const categoriesReducer = createReducer(
  initialCategoriesState,
  
  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) =>
    categoriesAdapter.setAll(categories, {
      ...state,
      loading: false
    })
  ),
  
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(CategoriesActions.addCategory, (state, { category }) =>
    categoriesAdapter.addOne(category, state)
  ),
  
  on(CategoriesActions.updateCategory, (state, { category }) =>
    categoriesAdapter.updateOne(
      { id: category.id, changes: category },
      state
    )
  ),
  
  on(CategoriesActions.deleteCategory, (state, { id }) =>
    categoriesAdapter.removeOne(id, state)
  ),
  
  on(CategoriesActions.selectCategory, (state, { id }) => ({
    ...state,
    selectedCategoryId: id
  }))
);