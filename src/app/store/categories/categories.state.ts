// store/categories/categories.state.ts
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from '../../models/category.model';

export interface CategoriesState extends EntityState<Category> {
  loading: boolean;
  error: string | null;
  selectedCategoryId: string | null;
}

export const categoriesAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialCategoriesState: CategoriesState = categoriesAdapter.getInitialState({
  loading: false,
  error: null,
  selectedCategoryId: null
});