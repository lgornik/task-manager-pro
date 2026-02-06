// components/task-list/task-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFilteredTasks, selectTasksCount } from '../../store/tasks/tasks.selectors';
import * as TasksActions from '../../store/tasks/tasks.actions';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-list">
      <h2>Zadania</h2>
      
      <div class="stats">
        <p>Wszystkich: {{ (count$ | async)?.total }}</p>
        <p>Aktywnych: {{ (count$ | async)?.active }}</p>
        <p>Ukończonych: {{ (count$ | async)?.completed }}</p>
      </div>

      <div class="filters">
        <button (click)="setFilter('all')">Wszystkie</button>
        <button (click)="setFilter('active')">Aktywne</button>
        <button (click)="setFilter('completed')">Ukończone</button>
      </div>

      <ul>
        @for (task of tasks$ | async; track task.id) {
          <li [class.completed]="task.completed">
            <input 
              type="checkbox" 
              [checked]="task.completed"
              (change)="toggleTask(task.id)"
            >
            <span>{{ task.title }}</span>
            <button (click)="deleteTask(task.id)">Usuń</button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .completed { text-decoration: line-through; opacity: 0.6; }
    .stats { display: flex; gap: 1rem; }
  `]
})
export class TaskListComponent {
  private store = inject(Store);
  
  tasks$ = this.store.select(selectFilteredTasks);
  count$ = this.store.select(selectTasksCount);

  toggleTask(id: string) {
    this.store.dispatch(TasksActions.toggleTask({ id }));
  }

  deleteTask(id: string) {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.store.dispatch(TasksActions.setFilter({ filter }));
  }
}