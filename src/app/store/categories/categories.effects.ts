// src/app/store/categories/categories.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import * as CategoriesActions from './categories.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      switchMap(() =>
        this.categoriesService.getCategories().pipe(
          map(categories => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError(error =>
            of(CategoriesActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}