import { GroupMin } from '../models/group.model';

export class Enrollment{
    public _id: string;
    public enrollmentYear: string;
    public group: GroupMin;
    public student: string;

}

export class NewEnrollment{
    public enrollmentYear: string;
    public group: string;
    public student: string;

}