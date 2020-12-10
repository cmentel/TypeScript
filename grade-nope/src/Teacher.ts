import AbstractUser from './AbstractUser'
import Assignment from './Assignment'

/**
 * Class to represent a teacher user
 * Extends the abstract user class
 * assignments: A list of assignments that this teacher has created
 */
export default class Teacher extends AbstractUser {
    private assignments: Assignment[]
    constructor(id: number, username: string, password: string, assignments?: Assignment[]) {
        super(id, username, password)
        this.assignments = assignments != undefined? assignments : <Assignment[]>[]
    }
    // creates a new assignment given a name and due date and add it to the list of assignments
    public createAssignment(name: string, dueDate: Date): void {
        let newAssignment =  new Assignment(dueDate, name);
        if (this.assignments == undefined) {
            this.assignments = new Array(newAssignment)
        }
        else {
            this.assignments.push(newAssignment);
        }
    }

    // Move the given assignment from the list
    public removeAssignment(targetAssign : Assignment): void {
        let index = this.assignments.indexOf(targetAssign)
        this.assignments.splice(index,1);

    }

    // getter for assignments
    public getAssignments() : Assignment[] {
        return this.assignments;
    }
}