import { Degree } from "./degree.model";

export class Group{
    public _id: String;
    public mainTeacher: String;
    public dayShift: String;
    public quota: Number;
    public degree: Degree;
}

export class GroupMin{
    public _id: String;
    public degree: Degree;
}

export class NewGroup{
    public mainTeacher: String;
    public dayShift: String;
    public quota: Number;
    public degree: Degree;
}