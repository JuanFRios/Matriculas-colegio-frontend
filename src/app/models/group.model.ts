import { Degree } from "./degree.model";

export class Group{
    public _id: string;
    public mainTeacher: string;
    public dayShift: string;
    public quota: number;
    public degree: Degree;
}

export class GroupMin{
    public _id: string;
    public mainTeacher: string;
    public dayShift: string;
    public degree: string;
}

export class NewGroup{
    public mainTeacher: string;
    public dayShift: string;
    public quota: number;
    public degree: string;
}