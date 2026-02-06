// services/tasks.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      delay(500) // symulacja opóźnienia
    );
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      delay(500)
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      delay(500)
    );
  }
}