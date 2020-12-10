import { Student } from '../models/student.model';

export interface LoadStudents {
    total: number;
    students: Student[];
}