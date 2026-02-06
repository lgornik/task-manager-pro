// src/app/services/tasks.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks(): Observable<Task[]> {
    // Jeśli puste, dodaj przykładowe dane
    if (this.tasks.length === 0) {
      this.tasks = [
        {
          id: String(this.nextId++),
          title: 'Nauczyć się NgRx',
          description: 'Actions, Reducers, Effects, Selectors',
          completed: false,
          createdAt: new Date(),
          priority: 'high',
          categoryId: '5'
        },
        {
          id: String(this.nextId++),
          title: 'Zrobić zakupy',
          description: 'Mleko, chleb, masło',
          completed: false,
          createdAt: new Date(),
          priority: 'medium',
          categoryId: '3'
        }
      ];
    }
    
    console.log('📋 getTasks returning:', this.tasks);
    return of([...this.tasks]).pipe(delay(500));
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: String(this.nextId++)  // ← Unikalny inkrementalny ID
    };
    
    this.tasks.push(newTask);
    console.log('✅ Task added:', newTask);
    console.log('📊 Total tasks:', this.tasks.length);
    
    return of(newTask).pipe(delay(300));
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      console.log('✏️ Task updated:', task);
    }
    return of(task).pipe(delay(300));
  }

  deleteTask(id: string): Observable<void> {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log('🗑️ Task deleted:', id);
    console.log('📊 Tasks before/after:', before, '→', this.tasks.length);
    
    return of(undefined).pipe(delay(300));
  }
}