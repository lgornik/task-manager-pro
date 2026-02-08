import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CategoriesActions from '../../store/categories/categories.actions';
import { selectAllCategories } from '../../store/categories/categories.selectors';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import * as TasksActions from '../../store/tasks/tasks.actions';
import {
  selectFilteredTasks,
  selectTasksCount,
  selectLoading,
  selectError,
  selectFilter
} from '../../store/tasks/tasks.selectors';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
//   private store = inject(Store);

//   // Tasks z kategoriami
//   tasksWithCategories$ = this.store.select(selectFilteredTasksWithCategories);
  
//   // Statystyki per kategoria
//   categoryStats$ = this.store.select(selectCategoryStats);

//   ngOnInit() {
//     // Zobacz w konsoli jak wygląda struktura danych
//     this.tasksWithCategories$.subscribe(tasks => {
//       console.log('Tasks with categories:', tasks);
//     });

//     this.categoryStats$.subscribe(stats => {
//       console.log('Category stats:', stats);
//     });
//   }

private store = inject(Store);

  tasks$ = this.store.select(selectFilteredTasks);
  count$ = this.store.select(selectTasksCount);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  filter$ = this.store.select(selectFilter);
  categories$ = this.store.select(selectAllCategories);

  newTaskTitle = '';
  newTaskPriority: 'low' | 'medium' | 'high' = 'medium';
  newTaskCategoryId: string | null = null;

  ngOnInit() {
    this.store.dispatch(TasksActions.loadTasks());
    this.store.dispatch(CategoriesActions.loadCategories());
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const task: Omit<Task, 'id'> = {
        title: this.newTaskTitle,
        description: '',
        completed: false,
        createdAt: new Date(),
        priority: this.newTaskPriority,
        categoryId: this.newTaskCategoryId // ← UŻYWAMY WYBRANEJ KATEGORII
      };

      this.store.dispatch(TasksActions.addTaskRequest({ task }));
      this.newTaskTitle = '';
      this.newTaskCategoryId = null; // ← RESET
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