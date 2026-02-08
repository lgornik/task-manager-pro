import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  // Mock data - w prawdziwej aplikacji byłoby to API call
  private mockCategories: Category[] = [
    { id: '1', name: 'Praca', color: '#2196F3', icon: '💼' },
    { id: '2', name: 'Osobiste', color: '#4CAF50', icon: '🏠' },
    { id: '3', name: 'Zakupy', color: '#FF9800', icon: '🛒' },
    { id: '4', name: 'Zdrowie', color: '#E91E63', icon: '💪' },
    { id: '5', name: 'Nauka', color: '#9C27B0', icon: '📚' }
  ];

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories);
  }

  addCategory(category: Category): Observable<Category> {
    return of(category);
  }

  deleteCategory(id: string): Observable<void> {
    return of(undefined);
  }
}