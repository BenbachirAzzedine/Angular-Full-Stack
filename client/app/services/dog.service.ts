import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dog } from '../shared/models/dog.model';

@Injectable()
export class DogService {

  constructor(private http: HttpClient) { }

  getdogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>('/api/dogs');
  }

  countdogs(): Observable<number> {
    return this.http.get<number>('/api/dogs/count');
  }

  adddog(dog: Dog): Observable<Dog> {
    return this.http.post<Dog>('/api/dog', dog);
  }

  getdog(dog: Dog): Observable<Dog> {
    return this.http.get<Dog>(`/api/dog/${dog._id}`);
  }

  editdog(dog: Dog): Observable<string> {
    return this.http.put(`/api/dog/${dog._id}`, dog, { responseType: 'text' });
  }

  deletedog(dog: Dog): Observable<string> {
    return this.http.delete(`/api/dog/${dog._id}`, { responseType: 'text' });
  }

}
