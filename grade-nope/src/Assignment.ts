import Program from './Program'

/**
 * Class to represent an assignment that can be submitted to
 * dueDate: The latest date students can submit this assignment
 * subHistory: All the programs that have been submitted to this assignment
 * assignName: Name of this assignment
 */
export default class Assignment {
    private dueDate: Date
    private subHistory: Program[]
    private assignName: string
    constructor(dueDate: Date, name: string) {
        this.dueDate = dueDate
        this.assignName = name
        this.subHistory = <Program[]>[]
    }

    // getter for the due date
    public getDueDate() :Date {
        return this.dueDate;
    }

    // getter for assignName
    public getAssignName() :string {
        return this.assignName;
    }

    // getter for subHistory
    public getSubHis() :Program[] {
        return this.subHistory;
    }

    // adding to the submission history with the given program
    public addSubHistory(submission : Program): void {
        this.subHistory.push(submission);
    }
}