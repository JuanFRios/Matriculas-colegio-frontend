export class Student {

    constructor(
        public _id: string,
        public identityDocument: string,
        public fullName: string,
        public age: number,
        public address: string,
        public email: string,
        public contactNumber: string,
        public guardianName: string,
        public guardianContactNumber: string,
        public lastApprovedGrade: string,
        public password?: string,
        public img?: string
    ) { }
}