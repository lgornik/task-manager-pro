import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from '../../models/category.model';

export interface CategoriesState extends EntityState<Category> {
  selectedCategoryId: string | null;
}

export const categoriesAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (category: Category) => category.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialCategoriesState: CategoriesState = categoriesAdapter.getInitialState({
  selectedCategoryId: null
});