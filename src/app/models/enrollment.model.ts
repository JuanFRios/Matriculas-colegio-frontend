import { Group } from "./group.model";

import { GroupMin } from '../models/group.model';

export class Enrollment{
    public _id: String;
    public enrollmentYear: String;
    public group: GroupMin;
    public student: String;

}

export class NewEnrollment{
    public enrollmentYear: String;
    public group: String;
    public student: String;

}