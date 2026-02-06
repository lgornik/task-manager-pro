import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectFilteredTasksWithCategories,
  selectCategoryStats,
  TaskWithCategory
} from '../../store/tasks/tasks.selectors';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private store = inject(Store);

  // Tasks z kategoriami
  tasksWithCategories$ = this.store.select(selectFilteredTasksWithCategories);
  
  // Statystyki per kategoria
  categoryStats$ = this.store.select(selectCategoryStats);

  ngOnInit() {
    // Zobacz w konsoli jak wygląda struktura danych
    this.tasksWithCategories$.subscribe(tasks => {
      console.log('Tasks with categories:', tasks);
    });

    this.categoryStats$.subscribe(stats => {
      console.log('Category stats:', stats);
    });
  }
}