import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  //private students = new BehaviorSubject<Student[]>([]);
  //students$ = this.students.asObservable();
  students = signal<Student[]>([]);

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.update((students) => [...students, student]);
  }

  deleteOne(id: number) {
    this.students.update((students) => students.filter((s) => s.id !== id));
  }
}
