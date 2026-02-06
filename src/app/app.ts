// src/app/app.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from './models/task.model';
import * as TasksActions from './store/tasks/tasks.actions';
import {
  selectFilteredTasks,
  selectTasksCount,
  selectLoading,
  selectError,
  selectFilter
} from './store/tasks/tasks.selectors';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private store = inject(Store);

  tasks$ = this.store.select(selectFilteredTasks);
  count$ = this.store.select(selectTasksCount);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  filter$ = this.store.select(selectFilter);

  newTaskTitle = '';
  newTaskPriority: 'low' | 'medium' | 'high' = 'medium';

  ngOnInit() {
    this.store.dispatch(TasksActions.loadTasks());
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const task: Omit<Task, 'id'> = {
        title: this.newTaskTitle,
        description: '',
        completed: false,
        createdAt: new Date(),
        priority: this.newTaskPriority
      };

      this.store.dispatch(TasksActions.addTaskRequest({ task }));
      this.newTaskTitle = '';
    }
  }

  toggleTask(id: string) {
    this.store.dispatch(TasksActions.toggleTask({ id }));
  }

  deleteTask(id: string) {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.store.dispatch(TasksActions.setFilter({ filter }));
  }

  deleteCompleted() {
    this.store.dispatch(TasksActions.deleteCompletedTasks());
  }

  toggleAll(completed: boolean) {
    this.store.dispatch(TasksActions.toggleAllTasks({ completed }));
  }
}