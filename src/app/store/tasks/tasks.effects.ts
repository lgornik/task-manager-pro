// store/tasks/tasks.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../../services/tasks.service';
import * as TasksActions from './tasks.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private tasksService = inject(TasksService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.tasksService.getTasks().pipe(
          map(tasks => TasksActions.loadTasksSuccess({ tasks })),
          catchError(error => 
            of(TasksActions.loadTasksFailure({ 
              error: error.message 
            }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTaskRequest),
      switchMap(({ task }) =>
        this.tasksService.addTask(task).pipe(
          map(newTask => TasksActions.addTaskSuccess({ task: newTask })),
          catchError(error =>
            of(TasksActions.addTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );
}