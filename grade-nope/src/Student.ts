import AbstractUser from './AbstractUser'
import Assignment from './Assignment'

/**
 * Class to represent a Student user
 * Extends abstract user class
 * Assignments: List of assignments this student has submitted a program to
 */
export default class Student extends AbstractUser {
    private assignments: Assignment[]
    constructor(id: number, username: string, password: string, assignments?: Assignment[]) {
        super(id, username, password)
        this.assignments = assignments != undefined? assignments : <Assignment[]>[]
    }

    // getter for assignments
    public getAssignments() : Assignment[] {
        return this.assignments;
    }
}